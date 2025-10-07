import Link from 'next/link';
import { getAllExams } from '@/lib/data';

export default function HomePage() {
  const exams = getAllExams();
  
  // Group exams by region
  const examsByRegion = exams.reduce((acc, exam) => {
    const region = exam.regions[0];
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(exam);
    return acc;
  }, {} as Record<string, typeof exams>);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📐 Is My Calculator Allowed?
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Is your calculator allowed in this exam?
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Before every exam students ask the same thing: "Can I use my calculator?" 
            This site lists allowed and banned models per exam board worldwide. 
            Select your exam or type your model to check verified rules and official sources.
          </p>
        </div>

        {/* Quick Search */}
        <div className="mt-10 max-w-xl mx-auto">
          <Link
            href="/search"
            className="block w-full px-6 py-4 text-left text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-gray-500 dark:text-gray-400">Search by calculator model or exam...</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Exams by Region */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Browse by Exam
        </h3>

        {Object.entries(examsByRegion).map(([region, regionExams]) => (
          <div key={region} className="mb-8">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              {region}
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regionExams.map((exam) => (
                <Link
                  key={exam.slug}
                  href={`/exam/${exam.slug}`}
                  className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-600"
                >
                  <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {exam.name}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {exam.boards ? exam.boards.join(', ') : region}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Last updated: {exam.last_updated}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span className="badge-allowed">
                      {exam.allowed.length} Allowed
                    </span>
                    <span className="badge-banned">
                      {exam.banned.length} Banned
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-semibold mb-3">About</h5>
              <p className="text-gray-400 text-sm">
                Check calculator rules for exams worldwide. Always verify with your exam board.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/sources" className="text-gray-400 hover:text-white">Sources</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Is My Calculator Allowed. All rights reserved.</p>
            <p className="mt-2">Disclaimer: Always verify calculator rules with your official exam board.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
