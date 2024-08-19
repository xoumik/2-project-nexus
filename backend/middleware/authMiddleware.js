import jwt from "jsonwebtoken";
export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id };

    //console.log("Token:", token);
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};
