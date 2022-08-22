export default async function checkWordExists(attemptStr) {
  const raw = await fetch(`/.netlify/functions/word-exists?word=${attemptStr}`);
  const found = await raw.json();

  // if (!found) {
  return found;
  // }
}
