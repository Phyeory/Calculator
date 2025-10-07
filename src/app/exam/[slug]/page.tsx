import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getExamBySlug, getExamSlugs, getCalculatorsForExam } from '@/lib/data';
import { generateExamFAQSchema, generateItemListSchema, generateBreadcrumbSchema } from '@/lib/schema';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getExamSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  
  if (!exam) {
    return {
      title: 'Exam Not Found'
    };
  }

  return {
    title: `Is my calculator allowed in ${exam.name}? — Allowed Calculators for ${exam.name}`,
    description: `Check if your calculator is allowed in ${exam.name}. Up-to-date rules for ${exam.regions.join(', ')}. ${exam.boards ? `Boards: ${exam.boards.join(', ')}.` : ''} Search popular models like Casio fx-991EX, TI-30XS and more.`,
    openGraph: {
      title: `Allowed calculators for ${exam.name}`,
      description: exam.notes,
    }
  };
}

export default async function ExamPage({ params }: Props) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  const allowedCalcs = getCalculatorsForExam(slug, 'allowed');
  const bannedCalcs = getCalculatorsForExam(slug, 'banned');
  const conditionalCalcs = getCalculatorsForExam(slug, 'conditional');

  // Generate structured data
  const faqSchema = generateExamFAQSchema(exam, allowedCalcs);
  const itemListSchema = generateItemListSchema(allowedCalcs, `Allowed Calculators for ${exam.name}`);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ismycalculatorallowed.com' },
    { name: exam.name, url: `https://ismycalculatorallowed.com/exam/${slug}` }
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
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
        {/* Exam Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Allowed calculators for {exam.name}
          </h1>
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>📍 {exam.regions.join(', ')}</span>
            {exam.boards && <span>📚 {exam.boards.join(', ')}</span>}
            <span>📅 Updated: {exam.last_updated}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{exam.notes}</p>
          
          {exam.official_links && exam.official_links.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Official Sources:</h3>
              <ul className="space-y-1">
                {exam.official_links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm"
                    >
                      {link.title} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Allowed Calculators */}
        {allowedCalcs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">✓</span>
              Allowed Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allowedCalcs.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/calculator/${calc.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border-2 border-green-200 dark:border-green-800"
                >
                  <div className="aspect-video relative mb-4 bg-gray-100 dark:bg-gray-700 rounded">
                    <Image
                      src={calc.image}
                      alt={calc.alt_text || `${calc.brand} ${calc.model}`}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <span className="badge-allowed mb-2">Allowed</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{calc.brand} {calc.model}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{calc.type}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Conditional Calculators */}
        {conditionalCalcs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-3">⚠️</span>
              Conditional/Check Rules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conditionalCalcs.map((calc) => {
                const condition = exam.conditional?.find(c => c.model === calc.slug);
                return (
                  <div
                    key={calc.slug}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-2 border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="aspect-video relative mb-4 bg-gray-100 dark:bg-gray-700 rounded">
                      <Image
                        src={calc.image}
                        alt={calc.alt_text || `${calc.brand} ${calc.model}`}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <span className="badge-conditional mb-2">Conditional</span>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{calc.brand} {calc.model}</h3>
                    {condition && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                        {condition.condition}
                      </p>
                    )}
                    <Link
                      href={`/calculator/${calc.slug}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm mt-2 inline-block"
                    >
                      View details →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Banned Calculators */}
        {bannedCalcs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">✗</span>
              Banned Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bannedCalcs.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/calculator/${calc.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border-2 border-red-200 dark:border-red-800 opacity-75"
                >
                  <div className="aspect-video relative mb-4 bg-gray-100 dark:bg-gray-700 rounded">
                    <Image
                      src={calc.image}
                      alt={calc.alt_text || `${calc.brand} ${calc.model}`}
                      fill
                      className="object-contain p-4 grayscale"
                    />
                  </div>
                  <span className="badge-banned mb-2">Banned</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{calc.brand} {calc.model}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{calc.type}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I use a graphing calculator in {exam.name}?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {allowedCalcs.some(c => c.type === 'graphing') 
                  ? `Yes, specific graphing calculators are allowed. Check the allowed list above for models.`
                  : `Generally no. Most ${exam.name} exams do not permit graphing calculators. Check the official rules.`
                }
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How do I make my calculator exam-ready?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Clear all memory and stored programs before the exam. Some calculators have an "exam mode" - activate this if required. Check with your exam invigilator for specific requirements.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Where can I verify these rules?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Always check the official exam board websites (linked above). Calculator rules can change, so verify before your exam day.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
