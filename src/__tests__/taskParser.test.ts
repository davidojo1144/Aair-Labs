import { parseNaturalLanguageTasks } from '../lib/taskParser';

describe('parseNaturalLanguageTasks', () => {
  it('should return empty array for empty or whitespace text', () => {
    expect(parseNaturalLanguageTasks('')).toEqual([]);
    expect(parseNaturalLanguageTasks('   ')).toEqual([]);
  });

  it('should parse single task phrase', () => {
    const result = parseNaturalLanguageTasks('buy groceries');
    expect(result).toEqual(['Buy groceries']);
  });

  it('should split tasks separated by "and" conjunction', () => {
    const result = parseNaturalLanguageTasks('Buy provisions and call mom');
    expect(result).toEqual(['Buy provisions', 'Call mom']);
  });

  it('should split numbered lists correctly', () => {
    const result = parseNaturalLanguageTasks(
      '1. Pick up dry cleaning 2. Pay electric bill 3. Schedule dentist',
    );
    expect(result).toEqual(['Pick up dry cleaning', 'Pay electric bill', 'Schedule dentist']);
  });

  it('should split multi-line speech dictations', () => {
    const text = `Buy milk
    Call client
    Finish project report`;
    const result = parseNaturalLanguageTasks(text);
    expect(result).toEqual(['Buy milk', 'Call client', 'Finish project report']);
  });
});
