export function addCommasToNumber(number: number | string) {
    const numberString = number.toString();
    const numberArray = numberString.split("");
    const numberArrayWithCommas = [];
  
    for (let i = numberArray.length - 1, count = 0; i >= 0; i--, count++) {
      if (count > 0 && count % 3 === 0) {
        numberArrayWithCommas.unshift(",");
      }
      numberArrayWithCommas.unshift(numberArray[i]);
    }
  
    return numberArrayWithCommas.join("");
  }
  