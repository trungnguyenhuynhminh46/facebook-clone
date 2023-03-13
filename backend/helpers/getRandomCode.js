module.exports = function getRandomCode(length) {
  const schema = "0123456789";
  let chars = [];
  for (let i = 0; i < length; i++) {
    chars.push(schema[Math.floor(Math.random() * length)]);
  }
  return chars.join("");
};
