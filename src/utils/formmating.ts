export function addCommasToNumber(number: number | string) {
//   add commas to a number
//   e.g. 1000000 => 1,000,000
 const numberString = number.toString();
    const numberArray = numberString.split("");
    const numberArrayReversed = numberArray.reverse();
    const numberArrayReversedWithCommas = [];
    for (let i = 0; i < numberArrayReversed.length; i++) {
        if (i % 3 == 0 && i != 0) {
            numberArrayReversedWithCommas.push(",");
        }
        numberArrayReversedWithCommas.push(numberArrayReversed[i]);
        }
    const numberArrayWithCommas = numberArrayReversedWithCommas.reverse();
    const numberStringWithCommas = numberArrayWithCommas.join("");
    return numberStringWithCommas;
}