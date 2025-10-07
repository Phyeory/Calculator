import fs from 'fs';
import path from 'path';
import { Exam, Calculator } from '@/types';

const dataDir = path.join(process.cwd(), 'data');

export function getAllExams(): Exam[] {
  const examsDir = path.join(dataDir, 'exams');
  const fileNames = fs.readdirSync(examsDir);
  
  const exams = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const filePath = path.join(examsDir, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Exam;
    });
  
  return exams;
}

export function getExamBySlug(slug: string): Exam | null {
  try {
    const filePath = path.join(dataDir, 'exams', `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Exam;
  } catch (error) {
    return null;
  }
}

export function getAllCalculators(): Calculator[] {
  const calculatorsDir = path.join(dataDir, 'calculators');
  const fileNames = fs.readdirSync(calculatorsDir);
  
  const calculators = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const filePath = path.join(calculatorsDir, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Calculator;
    });
  
  return calculators;
}

export function getCalculatorBySlug(slug: string): Calculator | null {
  try {
    const filePath = path.join(dataDir, 'calculators', `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Calculator;
  } catch (error) {
    return null;
  }
}

export function getExamSlugs(): string[] {
  const examsDir = path.join(dataDir, 'exams');
  const fileNames = fs.readdirSync(examsDir);
  return fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => fileName.replace('.json', ''));
}

export function getCalculatorSlugs(): string[] {
  const calculatorsDir = path.join(dataDir, 'calculators');
  const fileNames = fs.readdirSync(calculatorsDir);
  return fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => fileName.replace('.json', ''));
}

export function searchCalculators(query: string): Calculator[] {
  const allCalculators = getAllCalculators();
  const lowerQuery = query.toLowerCase();
  
  return allCalculators.filter(calc => 
    calc.model.toLowerCase().includes(lowerQuery) ||
    calc.brand.toLowerCase().includes(lowerQuery) ||
    calc.slug.toLowerCase().includes(lowerQuery)
  );
}

export function getCalculatorsForExam(examSlug: string, status: 'allowed' | 'banned' | 'conditional'): Calculator[] {
  const exam = getExamBySlug(examSlug);
  if (!exam) return [];
  
  let slugs: string[] = [];
  
  if (status === 'allowed') {
    slugs = exam.allowed;
  } else if (status === 'banned') {
    slugs = exam.banned;
  } else if (status === 'conditional' && exam.conditional) {
    slugs = exam.conditional.map(c => c.model);
  }
  
  return slugs
    .map(slug => getCalculatorBySlug(slug))
    .filter((calc): calc is Calculator => calc !== null);
}
