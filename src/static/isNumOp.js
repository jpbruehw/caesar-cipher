/** helper function to help the
 *  form submit function to determine
 *  what kind of operation to perform
 *  i.e. is it encrypt or decrypt
 *  and what kind of operation
 */
export default function isNumOp(input) {
  /** see if we can split the input
   *  based on "-" which is what the number
   *  output would be
   *  if this is the case, it would have length
   *  higher than 1
   */
  const splitInput = input.split("-");
  // check length or if it is single number
  if (splitInput.length > 1 || parseInt(input) === true) {
    /** if this condition is true
     *  we return true
     *  otherwise false for text operation
     */
    return true;
  }
  return false;
}
