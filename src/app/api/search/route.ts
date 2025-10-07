import { NextRequest, NextResponse } from 'next/server';
import { getAllCalculators, getAllExams } from '@/lib/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  if (query.length < 2) {
    return NextResponse.json({ calculators: [], exams: [] });
  }

  const lowerQuery = query.toLowerCase();
  
  // Search calculators
  const allCalculators = getAllCalculators();
  const calculators = allCalculators.filter(calc =>
    calc.model.toLowerCase().includes(lowerQuery) ||
    calc.brand.toLowerCase().includes(lowerQuery) ||
    calc.slug.toLowerCase().includes(lowerQuery) ||
    calc.notes.toLowerCase().includes(lowerQuery)
  );

  // Search exams
  const allExams = getAllExams();
  const exams = allExams.filter(exam =>
    exam.name.toLowerCase().includes(lowerQuery) ||
    exam.slug.toLowerCase().includes(lowerQuery) ||
    exam.regions.some(region => region.toLowerCase().includes(lowerQuery)) ||
    exam.boards?.some(board => board.toLowerCase().includes(lowerQuery))
  );

  return NextResponse.json({
    calculators: calculators.slice(0, 10),
    exams: exams.slice(0, 10)
  });
}
