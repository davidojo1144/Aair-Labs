/**
 * Intelligently parses natural language dictated text into separate individual task titles.
 * Handles conjunctions ("and", "also", "then", "plus"), commas, newlines, and numbered items.
 *
 * Example:
 *   "Buy provisions and call mom" -> ["Buy provisions", "Call mom"]
 *   "1. Finish project 2. Send email 3. Pay bills" -> ["Finish project", "Send email", "Pay bills"]
 *   "Pick up laundry, then buy groceries" -> ["Pick up laundry", "Buy groceries"]
 */
export function parseNaturalLanguageTasks(text: string): string[] {
  if (!text || !text.trim()) {
    return [];
  }

  const cleanedText = text.trim();

  // 1. Check for numbered pattern like "1. Task one 2. Task two" or "1) Task one 2) Task two"
  const numberedRegex = /(?:\d+[\.\)]\s*)/g;
  if (numberedRegex.test(cleanedText)) {
    const splitByNumber = cleanedText
      .split(/(?:\d+[\.\)]\s*)/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (splitByNumber.length > 1) {
      return splitByNumber.map(capitalizeFirstLetter);
    }
  }

  // 2. Split by newlines if present
  if (cleanedText.includes('\n')) {
    const lineSplit = cleanedText
      .split('\n')
      .map((item) => item.replace(/^[\s\-\*\d\.\)]+/, '').trim())
      .filter((item) => item.length > 0);

    if (lineSplit.length > 1) {
      return lineSplit.map(capitalizeFirstLetter);
    }
  }

  // 3. Split by natural language conjunctions and separators (" and ", ", then ", " also ", ", plus ", "; ")
  const splitRegex = /,\s*then\s+|;\s*|,\s*also\s+|,\s*plus\s+|\s+then\s+|\s+also\s+|\s+and\s+|,/gi;

  const rawSegments = cleanedText
    .split(splitRegex)
    .map((seg) => seg.trim())
    .filter((seg) => seg.length > 0);

  // Re-clean segments (strip leading "and ", "then ", "also " if remaining)
  const finalTasks = rawSegments
    .map((seg) => seg.replace(/^(and|then|also|plus)\s+/i, '').trim())
    .filter((seg) => seg.length > 0)
    .map(capitalizeFirstLetter);

  return finalTasks.length > 0 ? finalTasks : [capitalizeFirstLetter(cleanedText)];
}

function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
