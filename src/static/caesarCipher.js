// func to decrypt and decrypt strings
export default function caesarCipher(str, shift, decrypt = false) {
  /** calculate the effective shift value based on whether decryption is requested
   *  if decryption is requested, then we can calculate the effective shift
   *  by subtracting the provided shift value from 26
   *  and then taking the modulus to ensure the value falls within
   *  the correct range fo 0-25 -> inclusive 25
   *  if it is an encryption operation, we simply take the provided
   *  shift value and return that as s
   *  EXAMPLE:  if shift is 3 and decryption is requested (decrypt === true)
   *  s will be calculated as (26 - 3) % 26, resulting in s being 23
   *  if there is no remainder, modulus returns the num on the left side
   *  this also means that for decryption, we shift each
   *  letter in the opposite direction by 23 positions
   */
  const s = decrypt ? (26 - shift) % 26 : shift;
  /** this line ensures that the shift value is between 0-25
   *  if the value is already positive, we know it is in the correct
   *  range and can simply return s
   *  if it is negative -- which can happen during decryption --
   *  we add 26 to the value to make sure that we get a valid value
   *  EXAMPLE: if s is -2 (which might occur during decryption with a shift value of 3)
   *  n will be calculated as 26 + (-2 % 26), resulting in n being 24
   *  this ensures that we handle negative shift values correctly
   *  and keep them within the range of 0 to 25
   */
  const n = s > 0 ? s : 26 + (s % 26);
  // convert the input string to an array of characters and apply the caesar cipher
  return (
    // spread original string to individual characters
    [...str]
      .map((l, i) => {
        /** get the unicode code of the current character based on index
         *  we use the index val from the map function to then extract
         *  the original character from the string
         */
        const c = str.charCodeAt(i);
        // check if the character is an uppercase letter --> ASCII range 65 to 90
        if (c >= 65 && c <= 90)
          /** this part of the expression subtracts the
           *  unicode value of the character i.e. A --> 65
           *  from the unicode value of the current character c
           *  this effectively converts uppercase letters to a zero-based index
           *  where A is 0, B is 1, and so on
           *  we can then add the shift value then modulus 26
           *  to ensure that the index value falls within the appropriate range
           *  and then add 65 to the result which converts the value back to
           *  the uppercase equivalent
           */
          return String.fromCharCode(((c - 65 + n) % 26) + 65);
        // check if the character is a lowercase letter --> ASCII range 97 to 122
        if (c >= 97 && c <= 122)
          /** apply the caesar cipher transformation for
           *  lowercase letters and convert back to character
           *  same process as with upper case characters
           *  simply reversed
           */
          return String.fromCharCode(((c - 97 + n) % 26) + 97);
        // if the character is not a letter, leave it unchanged
        return l;
      })
      // join the array of characters back into a string
      .join("")
  );
}
