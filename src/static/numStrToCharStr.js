/** function that decrypts the num string output
 *  back into a string format
 */
export default function numStrToCharStr(numStr) {
  // split the string into an array
  const numStrArr = numStr.split("-");
  // map and extract the char code
  return numStrArr
    .map((numStr) => {
      // get the char
      return String.fromCharCode(numStr);
    })
    .join("");
}
