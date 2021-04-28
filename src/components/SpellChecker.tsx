// http://www.mieliestronk.com/corncob_lowercase.txt

const checkVowels = (currentWord: Array<string>, start: number, vowels: any, set: Set<string>): string | null => {
  for (let index: number = start; index < currentWord.length; index++) {
    if (vowels.includes(currentWord[index])) {
      for (let next: number = 0; next < vowels.length; next++) {
        currentWord.splice(index, 1, vowels[next]);
        checkVowels(currentWord, index + 1, vowels, set);
        if (set.has(currentWord.join(""))) {
          return currentWord.join("");
        }
      }
    }
  }
  return null;
};

const SpellChecker = (currentSearch: string, everyWord: Set<string>): string | null | undefined => {
  currentSearch = currentSearch.toLowerCase();
  if (currentSearch.includes(" ")) {
    return null;
  }

  const newWord: Array<string> = [];
  let lettersNoSpaces = /^[A-Za-z]+$/;

  for (let i: number = 0; i < currentSearch.length; i++) {
    if (lettersNoSpaces.test(currentSearch.charAt(i))) {
      newWord.push(currentSearch.charAt(i));
    }
  }
  const thisWord: string = newWord.join("");
  let correctedVowelsInWord;

  if (!everyWord.has(thisWord)) {
    let vowels: Array<string> = ["a", "e", "i", "o", "u"];
    correctedVowelsInWord = checkVowels(
      thisWord.split(""),
      0,
      vowels,
      everyWord
    );
  }
  return !everyWord.has(thisWord) ? correctedVowelsInWord : thisWord;
};

export default SpellChecker;
