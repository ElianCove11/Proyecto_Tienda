import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const signToken = (ci) => {
  return jwt.sign(
    {
      ci,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24 * 365,
    }
  );
};

export const login = async (req, res, next) => {
  
  const { username, password } = req.body;
  console.log(username, password);

  const userExist = await ifExist(username);

  if (userExist) {
    console.log("user: ", userExist.dataValues);
 
    let compare = await bcryptjs.compare(password, userExist.password);
    console.log("compare ", compare);
    if (compare) {
      const token = signToken(userExist.username);
      const { password, ...user } = userExist.dataValues;
      console.log("user : ", user);
      return res.status(200).json({
        user,
        token,
        message: "correct credentials",
      });
    } else {
      return res.status(404).json({
        message: "conotraseña incorrecta",
      });
    }
  } else {
    return res.status(404).json({
      message: "usuario no existe",
    });
  }
};

export const ifExist = async (username) => {
  const user = await User.findByPk(username);
  return user;
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExist = await ifExist(username);
    console.log(userExist);
    if (!userExist) {
      let passwordHash = await bcryptjs.hash(password, 8);
      console.log(passwordHash);
      const newUser = await User.create({
        username,
        password: passwordHash,
      });

      if (newUser) {
        res.status(201).json({
          message: "usuario creado correctamente",
          data: {
            username,
          },
        });
      }
    } else {
      res.status(409).json({
        message: "username ya existe",
      });
    }
  } catch (error) {
    console.log(error);
    let message = "ocurrio un problema con el servidor";
    if (error.original.code == "22001") {
      message = error.original;
    }
    res.status(500).json({
      message: message.toString(),
      data: {},
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await User.findAndCountAll({
      offset: 0,
      limit: 5,
    });
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ocurrio un problema con el servidor",
      data: [],
    });
  }
};

