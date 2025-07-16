
const productNames = [
  'bamboo', 'water', 'bottle', 'organic', 'cotton', 'tote', 'bag', 'eco', 'friendly',
  'sustainable', 'reusable', 'biodegradable', 'solar', 'panel', 'charger', 'hemp',
  'backpack', 'recycled', 'aluminum', 'lunch', 'box', 'glass', 'straw', 'set',
  'compost', 'bin', 'natural', 'soap', 'shampoo', 'toothbrush', 'yoga', 'mat',
  'cork', 'notebook', 'beeswax', 'wrap', 'wooden', 'utensils', 'cleaning',
  'products', 'skincare', 'cosmetics', 'candles', 'clothing', 'shoes', 'accessories'
];

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

export function getSpellingSuggestions(query: string): string[] {
  const words = query.toLowerCase().split(' ');
  const suggestions: string[] = [];
  
  words.forEach(word => {
    if (word.length > 2) {
      const bestMatches = productNames
        .map(productName => ({
          word: productName,
          distance: levenshteinDistance(word, productName)
        }))
        .filter(match => match.distance <= 2 && match.distance > 0)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)
        .map(match => match.word);
      
      suggestions.push(...bestMatches);
    }
  });
  
  return [...new Set(suggestions)];
}
