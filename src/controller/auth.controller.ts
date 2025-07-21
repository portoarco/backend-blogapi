import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/hashPassword";

export const createUser = async (req: Request, res: Response) => {
  try {

    const newUser = await prisma.accounts.create({
      data: {...req.body,password:await hashPassword(req.body.password)},
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
    const { email, password } = req.body;

    const login = await prisma.accounts.findUnique({
      where: {
        email,
        password,
      },
      omit: {
        password:true // tujuannya supaya password tidak balik ke frontend
      }
    });

    // findUnique dapet data bentuknya object

    if (login === null) {
      res.status(404).send({ message: "Data Tidak Ditemukan" });
    } else {
      res.status(200).send({ message: "Data ditemukan", data: login });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
