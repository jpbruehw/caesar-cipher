/** function that gives another layer of
 *  encryption that lets you convert a string cipher
 *  to a sequence of numbers
 */
export default function alphabetCharCodeArr(str) {
  // map over string array and get the character codes
  return [...str]
    .map((l, i) => {
      // get the character code
      return str.charCodeAt(i);
    })
    .join("-");
}
