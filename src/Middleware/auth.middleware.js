import jwt from "jsonwebtoken";

export const authenticator = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      await jwt.verify(token, process.env.SECRET);
      next();
    } else {
      return res.status(403).json("Access Denied");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};
