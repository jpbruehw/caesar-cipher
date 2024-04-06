// import other scripts
import alphabetCharCodeArr from "./src/static/alphabetCharCodeArr.js";
import caesarCipher from "./src/static/caesarCipher.js";
import numStrToCharacter from "./src/static/numStrToCharStr.js";
import isNumOp from "./src/static/isNumOp.js";
import copyResult from "./src/static/copyResult.js";

$(document).ready(() => {
  /** hide the output type initially
   *  which lets the user first choose
   *  if they want to encrypt or decrypt
   *  if the val is decrypt, it will
   *  always return text anyways
   */
  // initialize example tooltip for copying
  const exampleToolTip = $("#copy-tooltip").hide();
  const exampleTestText = $(".example-test");
  exampleTestText.on("click", () => {
    copyResult(exampleTestText.text());
    exampleToolTip.fadeIn();
    setTimeout(function () {
      exampleToolTip.fadeOut();
    }, 2000);
  });
  $("#output-type-section").hide();
  // initially hide the output
  const resultContainer = $(".result-container").hide();
  // select the p tag showing the output
  const resultText = $(".result-text");
  // add an event listener and helper to copy data
  resultText.on("click", () => {
    copyResult(resultText.text());
    resultText.addClass("copied");
  });

  // event listener to for encrypt-select dropdown
  $("#encrypt-select").change(() => {
    // extract the value of the input
    const selectedVal = $("#encrypt-select").val();
    // render if encrypt
    if (selectedVal === "encrypt") {
      // fade in option for output selection
      $("#output-type-section").fadeIn();
    } else {
      // fade back out if decrypt selected
      $("#output-type-section").fadeOut();
    }
  });

  // set up event listener on form
  $("#cipher-form").on("submit", (e) => {
    // prevent default
    e.preventDefault();
    // hide the output again
    resultContainer.hide();
    // remove copied class from result
    resultText.removeClass("copied");
    // remove any inner text
    resultText.text("");
    // extract the text input
    const textInput = $("#text-input").val();
    // extract the shift input
    const shiftValStr = $("#shift").val();
    // parse int from shift
    const shiftVal = parseInt(shiftValStr);
    // check if it is a decrypt or encrypt op
    if ($("#encrypt-select").val() === "decrypt") {
      /** call the isNumOp function to see whether
       *  the operation is a num operation or not
       */
      if (isNumOp(textInput)) {
        // get the string from the character codes
        const strVals = numStrToCharacter(textInput);
        // call the function to decrypt
        const numResult = caesarCipher(strVals, shiftVal, true);
        resultText.text(numResult);
      } else {
        const strResult = caesarCipher(textInput, shiftVal, true);
        resultText.text(strResult);
      }
    } else {
      // get the output type for encrypt cases
      const outputType = $("#output-type").val();
      // encrypt the text input based on the shit and str
      const encryptedRes = caesarCipher(textInput, shiftVal);
      // convert to nums if so chosen
      if (outputType === "numbers") {
        // call function to return num string
        const encryptedNumsRes = alphabetCharCodeArr(encryptedRes);
        // return result
        resultText.text(encryptedNumsRes);
      } else {
        resultText.text(encryptedRes);
      }
    }
    // render the result container
    resultContainer.show();
  });
});
