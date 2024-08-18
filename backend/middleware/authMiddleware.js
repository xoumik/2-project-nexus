import jwt from "jsonwebtoken";
export const authenticateUser = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request object
    console.log(decoded);

    console.log("Token:", token); // Log the token for debugging

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error("Token verification failed:", err); // Log detailed error
    res.status(401).json({ message: "Token is not valid" });
  }
};
