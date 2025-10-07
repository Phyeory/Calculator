// Structured Data Helpers for SEO

import { Exam, Calculator } from '@/types';

export function generateExamFAQSchema(exam: Exam, allowedCalcs: Calculator[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Can I use a graphing calculator in ${exam.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: allowedCalcs.some(c => c.type === 'graphing')
            ? `Yes, specific graphing calculators are allowed in ${exam.name}. Check the allowed list for approved models.`
            : `No, graphing calculators are generally not permitted in ${exam.name}. Only scientific calculators from the allowed list are accepted.`
        }
      },
      {
        '@type': 'Question',
        name: `What calculators are allowed in ${exam.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Allowed calculators for ${exam.name} include: ${allowedCalcs.slice(0, 5).map(c => `${c.brand} ${c.model}`).join(', ')}, and more. Check the complete list above.`
        }
      },
      {
        '@type': 'Question',
        name: `How do I make my calculator exam-ready for ${exam.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Clear all memory and stored programs before the exam. Some calculators have an "exam mode" - activate this if required. Check with your exam invigilator for specific requirements.`
        }
      },
      ...exam.allowed.slice(0, 5).map(slug => {
        const calc = allowedCalcs.find(c => c.slug === slug);
        if (!calc) return null;
        return {
          '@type': 'Question',
          name: `Is the ${calc.brand} ${calc.model} allowed in ${exam.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes, the ${calc.brand} ${calc.model} is allowed in ${exam.name}. ${calc.notes}`
          }
        };
      }).filter(Boolean)
    ]
  };
}

export function generateCalculatorProductSchema(calculator: Calculator) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${calculator.brand} ${calculator.model}`,
    image: calculator.image,
    description: calculator.notes,
    brand: {
      '@type': 'Brand',
      name: calculator.brand
    },
    category: `${calculator.type} calculator`,
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD'
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Type',
        value: calculator.type
      },
      {
        '@type': 'PropertyValue',
        name: 'Graphing',
        value: calculator.features.graphing ? 'Yes' : 'No'
      },
      {
        '@type': 'PropertyValue',
        name: 'Programmable',
        value: calculator.features.programmable ? 'Yes' : 'No'
      },
      {
        '@type': 'PropertyValue',
        name: 'CAS',
        value: calculator.features.symbolic ? 'Yes' : 'No'
      }
    ]
  };
}

export function generateItemListSchema(calculators: Calculator[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: calculators.map((calc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: `${calc.brand} ${calc.model}`,
        image: calc.image,
        url: `https://ismycalculatorallowed.com/calculator/${calc.slug}`
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
