// http://www.mieliestronk.com/corncob_lowercase.txt

const checkVowels = (currentWord, start, vowels, set) => {
  for (let index = start; index < currentWord.length; index++) {
    if (vowels.includes(currentWord[index])) {
      for (let next = 0; next < vowels.length; next++) {
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

const SpellChecker = (currentSearch, everyWord) => {
  currentSearch = currentSearch.toLowerCase();
  if (currentSearch.includes(" ")) {
    return null;
  }

  const charArr = [...currentSearch];
  const newWord = [];
  let lettersNoSpaces = /^[A-Za-z]+$/;

  for (let i = 0; i < charArr.length; i++) {
    if (lettersNoSpaces.test(charArr[i])) {
      newWord.push(charArr[i]);
    }
  }
  const thisWord = newWord.join("");
  let correctedVowelsInWord;

  if (!everyWord.has(thisWord)) {
    let vowels = ["a", "e", "i", "o", "u"];
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
