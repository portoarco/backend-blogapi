import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/hashPassword";
import { compareSync } from "bcrypt";
import { send } from "process";
import { sign } from "jsonwebtoken";
import { verify } from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await prisma.accounts.create({
      data: { ...req.body, password: await hashPassword(req.body.password) },
    });

    res.status(201).send({
      success: true,
      message: "Add Data Success",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const login = await prisma.accounts.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!login) {
      throw { success: false, message: "Account is Not Exist" };
    }
    // Check Password (untuk metode bcrytp)
    const comparePassword = compareSync(req.body.password, login.password);

    if (!comparePassword) {
      throw { success: false, message: "Wrong Password!" };
    }

    // findUnique dapet data bentuknya object
    // Generate token
    const token = sign(
      { id: login.id, role: login.role },
      process.env.TOKEN_KEY || "secret"
    );

    if (login === null) {
      res.status(404).send({ message: "Data Tidak Ditemukan" });
    } else {
      res.status(200).send({
        success: true,
        result: {
          // id: login.id,
          username: login.username,
          email: login.email,
          role: login.role,
          token,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const keepLogin = async (req: Request, res: Response) => {
  try {
    // middleware token
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      throw { success: false, message: "Token is not exist" };
    }
    const checkToken: any = verify(token, process.env.TOKEN_KEY || "secret");
    // sign untuk mengubah data menjadi token
    // verify untuk merubah token menjadi data aslinya (id dan role)
    console.log(checkToken);

    const account = await prisma.accounts.findUnique({
      where: {
        // id: parseInt(req.params.id),
        id: parseInt(checkToken.id),
      },
      omit: {
        password: true,
      },
    });

    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
