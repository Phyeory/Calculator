import { NextRequest, NextResponse } from 'next/server';
import { getAllCalculators, getAllExams } from '@/lib/data';

// Normalize text for better matching (remove special chars, normalize spaces)
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[-_\s]/g, '') // Remove dashes, underscores, spaces
    .replace(/\+/g, 'plus')
    .replace(/\./g, '');
}

// Calculate fuzzy match score (0-100, higher is better)
function fuzzyScore(query: string, target: string): number {
  const normalizedQuery = normalize(query);
  const normalizedTarget = normalize(target);
  
  // Exact match (normalized)
  if (normalizedTarget === normalizedQuery) return 100;
  
  // Starts with query (normalized)
  if (normalizedTarget.startsWith(normalizedQuery)) return 90;
  
  // Contains query (normalized)
  if (normalizedTarget.includes(normalizedQuery)) return 80;
  
  // Check if query words are all in target
  const queryWords = query.toLowerCase().split(/\s+/);
  const targetLower = target.toLowerCase();
  if (queryWords.every(word => targetLower.includes(word))) return 70;
  
  // Partial word matches
  const targetWords = target.toLowerCase().split(/\s+/);
  const matchingWords = queryWords.filter(qw => 
    targetWords.some(tw => tw.includes(qw) || qw.includes(tw))
  );
  if (matchingWords.length > 0) {
    return 50 + (matchingWords.length / queryWords.length) * 20;
  }
  
  return 0;
}

// Common abbreviations and aliases
const examAliases: Record<string, string[]> = {
  'gcse': ['gcse', 'general certificate of secondary education', 'uk gcse'],
  'sat': ['sat', 'scholastic assessment test', 'college board'],
  'act': ['act', 'american college testing'],
  'ap': ['ap', 'advanced placement'],
  'ib': ['ib', 'international baccalaureate'],
  'alevel': ['a-level', 'a level', 'advanced level'],
  'jee': ['jee', 'joint entrance examination', 'iit jee'],
  'neet': ['neet', 'national eligibility cum entrance test'],
  'gre': ['gre', 'graduate record examination'],
  'gmat': ['gmat', 'graduate management admission test'],
  'mcat': ['mcat', 'medical college admission test'],
  'lsat': ['lsat', 'law school admission test'],
};

const calcAliases: Record<string, string[]> = {
  'ti84': ['ti-84', 'ti 84', 'ti84', 'texas instruments 84'],
  'ti89': ['ti-89', 'ti 89', 'ti89', 'texas instruments 89'],
  'tinspire': ['ti-nspire', 'ti nspire', 'tinspire', 'nspire'],
  'casio991': ['fx-991', 'fx991', 'casio 991', 'casio fx 991'],
  'casio83': ['fx-83', 'fx83', 'casio 83', 'casio fx 83'],
  'casio85': ['fx-85', 'fx85', 'casio 85', 'casio fx 85'],
  'hpprime': ['hp prime', 'hp-prime', 'hpprime', 'hewlett packard prime'],
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  if (query.length < 2) {
    return NextResponse.json({ calculators: [], exams: [] });
  }

  const normalizedQuery = normalize(query);
  
  // Check for exam aliases
  let expandedQueries = [query.toLowerCase()];
  for (const [key, aliases] of Object.entries(examAliases)) {
    if (normalize(query).includes(key) || aliases.some(a => normalize(a).includes(normalizedQuery))) {
      expandedQueries.push(...aliases);
    }
  }
  
  // Check for calculator aliases
  for (const [key, aliases] of Object.entries(calcAliases)) {
    if (normalize(query).includes(key) || aliases.some(a => normalize(a).includes(normalizedQuery))) {
      expandedQueries.push(...aliases);
    }
  }

  // Search calculators with scoring
  const allCalculators = getAllCalculators();
  const calculatorMatches = allCalculators.map(calc => {
    const scores = [
      fuzzyScore(query, calc.model),
      fuzzyScore(query, calc.brand),
      fuzzyScore(query, `${calc.brand} ${calc.model}`),
      fuzzyScore(query, calc.slug),
      fuzzyScore(query, calc.type),
      ...expandedQueries.map(q => {
        const text = `${calc.brand} ${calc.model} ${calc.slug}`.toLowerCase();
        return text.includes(q) ? 60 : 0;
      })
    ];
    const maxScore = Math.max(...scores);
    
    return { calc, score: maxScore };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(item => item.calc);

  // Search exams with scoring
  const allExams = getAllExams();
  const examMatches = allExams.map(exam => {
    const scores = [
      fuzzyScore(query, exam.name),
      fuzzyScore(query, exam.slug),
      ...exam.regions.map(r => fuzzyScore(query, r)),
      ...(exam.boards || []).map(b => fuzzyScore(query, b)),
      ...expandedQueries.map(q => {
        const text = `${exam.name} ${exam.slug} ${exam.regions.join(' ')}`.toLowerCase();
        return text.includes(q) ? 60 : 0;
      })
    ];
    const maxScore = Math.max(...scores);
    
    return { exam, score: maxScore };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(item => item.exam);

  return NextResponse.json({
    calculators: calculatorMatches.slice(0, 10),
    exams: examMatches.slice(0, 10)
  });
}
