function shortenNumber(num: number) {
  const suffixes = ["", "K", "M", "B", "T"];
  const suffixNum = Math.floor(("" + num).length / 3);
  let shortNum = parseFloat(
    (suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(3)
  );
  if (shortNum % 1 !== 0) {
    shortNum = Number(shortNum.toFixed(3));
  }
  return shortNum + suffixes[suffixNum];
}
export default shortenNumber;
