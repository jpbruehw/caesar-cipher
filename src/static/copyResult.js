// helper function to let user copy the final output
export default async function copyResult(output) {
  try {
    await navigator.clipboard.writeText(output);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
