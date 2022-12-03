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

export function verifySameCustomer(req, res, next) {
  console.log(req.payload);
  console.log(req.params.customerId);
  if (req.payload.userId !== parseInt(req.params.customerId)) {
    res.status(401).json({ error: "Unathorized access" });
  } else {
    next();
  }
}
