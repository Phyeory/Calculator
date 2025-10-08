import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCalculatorBySlug, getCalculatorSlugs, getAllExams } from '@/lib/data';
import { generateCalculatorProductSchema, generateBreadcrumbSchema } from '@/lib/schema';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getCalculatorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  
  if (!calculator) {
    return {
      title: 'Calculator Not Found'
    };
  }

  return {
    title: `${calculator.brand} ${calculator.model} — Allowed in which exams? | Is My Calculator Allowed`,
    description: `Is the ${calculator.brand} ${calculator.model} allowed in GCSE, A-Level, IB, SAT, IIT-JEE? See all exam rules, images, and conditional notes.`,
    openGraph: {
      title: `${calculator.brand} ${calculator.model}`,
      description: calculator.notes
    }
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  // Find which exams allow, ban, or conditionally allow this calculator
  const allExams = getAllExams();
  const allowedInExams = allExams.filter(exam => exam.allowed.includes(slug));
  const bannedInExams = allExams.filter(exam => exam.banned.includes(slug));
  const conditionalInExams = allExams.filter(exam => 
    exam.conditional?.some(c => c.model === slug)
  );

  // Generate structured data
  const productSchema = generateCalculatorProductSchema(calculator);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ismycalculatorallowed.com' },
    { name: `${calculator.brand} ${calculator.model}`, url: `https://ismycalculatorallowed.com/calculator/${slug}` }
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm">
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Calculator Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {calculator.brand} {calculator.model}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 capitalize mb-4">
            {calculator.type} Calculator
          </p>
          
          {/* Features Table */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="flex flex-col">
                <dt className="text-gray-600 dark:text-gray-400">Graphing:</dt>
                <dd className="font-medium">{calculator.features.graphing ? '✓ Yes' : '✗ No'}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-gray-600 dark:text-gray-400">Programmable:</dt>
                <dd className="font-medium">{calculator.features.programmable ? '✓ Yes' : '✗ No'}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-gray-600 dark:text-gray-400">Symbolic (CAS):</dt>
                <dd className="font-medium">{calculator.features.symbolic ? '✓ Yes' : '✗ No'}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-gray-600 dark:text-gray-400">Exam Mode:</dt>
                <dd className="font-medium">{calculator.features.examMode ? '✓ Yes' : '✗ No'}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* About This Calculator */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Calculator</h2>
          <p className="text-gray-700 dark:text-gray-300">{calculator.notes}</p>
        </div>

        {/* Allowed In Exams */}
        {allowedInExams.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-2">✓</span>
              Allowed in {allowedInExams.length} exam{allowedInExams.length !== 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allowedInExams.map((exam) => (
                <Link
                  key={exam.slug}
                  href={`/exam/${exam.slug}`}
                  className="block p-4 border-2 border-green-200 dark:border-green-800 rounded-lg hover:border-green-400 dark:hover:border-green-600 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">{exam.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {exam.regions.join(', ')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Conditional/Check Rules */}
        {conditionalInExams.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm mr-2">⚠️</span>
              Conditional in {conditionalInExams.length} exam{conditionalInExams.length !== 1 ? 's' : ''}
            </h2>
            <div className="space-y-3">
              {conditionalInExams.map((exam) => {
                const condition = exam.conditional?.find(c => c.model === slug);
                return (
                  <div
                    key={exam.slug}
                    className="p-4 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg"
                  >
                    <Link href={`/exam/${exam.slug}`} className="block mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-600">
                        {exam.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exam.regions.join(', ')}
                      </p>
                    </Link>
                    {condition && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 italic bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                        ⚠️ {condition.condition}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Banned In Exams */}
        {bannedInExams.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-2">✗</span>
              Banned in {bannedInExams.length} exam{bannedInExams.length !== 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bannedInExams.map((exam) => (
                <Link
                  key={exam.slug}
                  href={`/exam/${exam.slug}`}
                  className="block p-4 border-2 border-red-200 dark:border-red-800 rounded-lg hover:border-red-400 dark:hover:border-red-600 transition-colors opacity-75"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">{exam.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {exam.regions.join(', ')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Models */}
        {calculator.related_models && calculator.related_models.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Models</h2>
            <div className="flex flex-wrap gap-2">
              {calculator.related_models.map((relatedSlug) => (
                <Link
                  key={relatedSlug}
                  href={`/calculator/${relatedSlug}`}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm"
                >
                  {relatedSlug}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
    </>
  );
}
