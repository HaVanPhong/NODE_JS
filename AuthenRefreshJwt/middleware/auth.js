const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("authHeader", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);
  if (!token) {
    res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.id;
    if (decoded) next();
  } catch (error) {
    return res.status(403).json({ message: "Lỗi xác thực " + error.message });
  }
};

module.exports = verifyToken;
