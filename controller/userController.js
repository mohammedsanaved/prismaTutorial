// bring in prisma and cookie

import prisma from "../prisma/index.js";
import cookieToken from "../utils/cookieToken.js";
import bcrypt from "bcrypt";

// user signUp
export const signUp = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !email || !password) {
      throw new Error("Please provide some valid Info");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    // send user a token
    cookieToken(user, res);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

//user login

export const login = async (req, res) => {
  try {
    // taking the info form user to login
    const { email, password } = req.body;

    // first we haave to check both field are not empty
    if (!email || !password) {
      throw new Error("Email and Password is Required");
    }

    // we have find the based on email bcz it sits to unique
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // if there is no user we have to handle that
    if (!user) {
      throw new Error("User Not Found");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Password does not match");
    }
    //if user is there
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

// user logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
      message: "logout successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
};
