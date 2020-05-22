export const capitalizeString = (text, allWords = false) => {
  if (typeof text !== 'string') {
    return text;
  }
  if (text.length === 0) {
    return text;
  }

  let str = "";

  if (allWords) {
    let words = text.split(" ");
    words = words.map((word) => {
      let updatedWord = word.charAt(0).toUpperCase();

      if (word.length > 1) {
        updatedWord = `${updatedWord}${word.substring(1)}`;
      }
      return updatedWord;
    });
    str = words.join(" ");
  } else {
    str = text.charAt(0).toUpperCase();
    if (text.length > 1) {
      str = `${str}${text.substring(1)}`;
    }
  }

  return str;
};
