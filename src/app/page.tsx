import Link from 'next/link';
import { getAllExams } from '@/lib/data';

export default function HomePage() {
  const exams = getAllExams();
  
  // Define regional groupings with continent headers
  const regionalGroups = {
    'North America': ['United States', 'Canada', 'USA', 'US'],
    'Europe': ['UK', 'United Kingdom', 'Germany', 'France', 'Austria', 'Netherlands', 'Italy', 'Switzerland', 'Poland', 'Russia'],
    'Asia': ['India', 'China', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Pakistan', 'Hong Kong'],
    'Africa': ['Uganda', 'Kenya', 'Nigeria', 'Ghana', 'South Africa', 'West Africa', 'East Africa'],
    'Oceania': ['Australia', 'New South Wales', 'New Zealand'],
    'South America': ['Brazil', 'Colombia', 'Peru'],
    'Worldwide': ['Worldwide', 'International']
  };

  // Categorize exams by continent
  const examsByContinent: Record<string, typeof exams> = {};
  
  exams.forEach((exam) => {
    const firstRegion = exam.regions[0];
    let assigned = false;
    
    for (const [continent, regions] of Object.entries(regionalGroups)) {
      if (regions.some(r => firstRegion.includes(r) || r.includes(firstRegion))) {
        if (!examsByContinent[continent]) {
          examsByContinent[continent] = [];
        }
        examsByContinent[continent].push(exam);
        assigned = true;
        break;
      }
    }
    
    // If not assigned to any continent, add to Worldwide
    if (!assigned) {
      if (!examsByContinent['Worldwide']) {
        examsByContinent['Worldwide'] = [];
      }
      examsByContinent['Worldwide'].push(exam);
    }
  });
  
  // Sort order for continents
  const continentOrder = ['North America', 'Europe', 'Asia', 'Africa', 'Oceania', 'South America', 'Worldwide'];
  
  // Helper function to get continent emoji
  const getContinentEmoji = (continent: string) => {
    const emojiMap: Record<string, string> = {
      'North America': '🌎',
      'South America': '🌎',
      'Europe': '🌍',
      'Africa': '🌍',
      'Asia': '🌏',
      'Oceania': '🌏',
      'Worldwide': '🌐'
    };
    return emojiMap[continent] || '🌍';
  };

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
          <p className="mt-3 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Comprehensive calculator rules for 40+ exams worldwide. From GCSE to SAT, JEE to Abitur, 
            Gaokao to NCEA – check verified policies for allowed, banned, and conditional calculators 
            with official exam board sources.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>🌍 40+ Exams</span>
            <span>•</span>
            <span>🌎 6 Continents</span>
            <span>•</span>
            <span>📚 Official Sources</span>
          </div>
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
          Browse by Region
        </h3>

        {continentOrder
          .filter(continent => examsByContinent[continent]?.length > 0)
          .map(continent => (
          <div key={continent} className="mb-10">
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <span className="mr-2">{getContinentEmoji(continent)}</span>
              {continent}
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {examsByContinent[continent].map((exam) => (
                <Link
                  key={exam.slug}
                  href={`/exam/${exam.slug}`}
                  className="block p-5 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
                >
                  <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {exam.name}
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
                    {exam.boards ? exam.boards.join(', ') : exam.regions.join(', ')}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="badge-allowed text-xs">
                      ✓ {exam.allowed.length}
                    </span>
                    <span className="badge-banned text-xs">
                      ✗ {exam.banned.length}
                    </span>
                    {exam.conditional && exam.conditional.length > 0 && (
                      <span className="badge-conditional text-xs">
                        ⚠ {exam.conditional.length}
                      </span>
                    )}
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
