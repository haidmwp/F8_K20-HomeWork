function analyzeValue(value) {
  const type = typeof value;
  
  return {
    input: value,
    type: type,
    isTruthy: Boolean(value),
    isNullOrUndefined: value === null || value === undefined,
    isReferenceType: (type === 'object' && value !== null) || type === 'function'
  };
}

console.log(analyzeValue([]));
console.log(analyzeValue(null)); 