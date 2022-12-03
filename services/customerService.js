import jwt from "jsonwebtoken";
export function generateToken(customer) {
  try {
    const token = jwt.sign(
      { userId: customer.id, username: customer.name },
      process.env.TOKEN_SECRET
    );

    return token;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
}
