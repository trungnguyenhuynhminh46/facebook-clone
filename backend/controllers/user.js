const home = async (req, res) => {
  return res.status(200).json({ msg: "Welcome home! User" });
};

module.exports = { home };
