'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Exam } from '@/types';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [calculatorResults, setCalculatorResults] = useState<Calculator[]>([]);
  const [examResults, setExamResults] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchData = async () => {
      if (query.length < 2) {
        setCalculatorResults([]);
        setExamResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setCalculatorResults(data.calculators || []);
        setExamResults(data.exams || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      searchData();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm">
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Search Calculators & Exams
        </h1>

        {/* Search Input */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything: fx991, ti 84, casio, sat, gcse, a-level..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
              ) : (
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {query.length >= 2 && (
          <div className="space-y-8">
            {/* Calculator Results */}
            {calculatorResults.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Calculators ({calculatorResults.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {calculatorResults.map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`/calculator/${calc.slug}`}
                      className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {calc.brand} {calc.model}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 capitalize">
                        {calc.type} Calculator
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 line-clamp-2">
                        {calc.notes}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Exam Results */}
            {examResults.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Exams ({examResults.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {examResults.map((exam) => (
                    <Link
                      key={exam.slug}
                      href={`/exam/${exam.slug}`}
                      className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {exam.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {exam.regions.join(', ')} • {exam.boards?.join(', ')}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                          {exam.allowed.length} allowed
                        </span>
                        <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
                          {exam.banned.length} banned
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {calculatorResults.length === 0 && examResults.length === 0 && !loading && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No results found for "{query}"</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try different keywords or check the examples below
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <button onClick={() => setQuery('fx991')} className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                    fx991
                  </button>
                  <button onClick={() => setQuery('ti84')} className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                    ti84
                  </button>
                  <button onClick={() => setQuery('sat')} className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                    sat
                  </button>
                  <button onClick={() => setQuery('gcse')} className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                    gcse
                  </button>
                </div>
              </div>
            )}
          </div>
        )}


      </div>
    </main>
  );
}
