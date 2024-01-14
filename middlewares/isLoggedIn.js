import prisma from "../prisma/index.js";
import jwt from "jsonwebtoken";

// it is maandatory to have next in middleware
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      res.send("Please Login");
      throw new Error(error);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    next();
  } catch (error) {
    throw new Error(error);
  }
};
export default isLoggedIn;
