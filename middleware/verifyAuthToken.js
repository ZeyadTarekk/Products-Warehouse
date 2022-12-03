import jwt from "jsonwebtoken";
export function verifyAuthToken(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    // console.log(authorizationHeader);
    const token = authorizationHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({
      error: "Invalid Token",
    });
  }
}
