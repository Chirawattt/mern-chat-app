import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  }); // sign the token with user id and secret key

  // set the cookie with the token which will be used for authentication
  // and expires in 15 days
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // cookie cannot be accessed by client side scripts (javascript) for security reasons (prevent XSS attacks cross-site scripting attacks)
    sameSite: "strict", // cookie will only be sent in a first-party context and not be sent along with requests initiated by third party websites
    secure: process.env.NODE_ENV !== "development", // cookie will only be set on HTTPS (secure) connection in production
  });
};

export default generateTokenAndSetCookie;
