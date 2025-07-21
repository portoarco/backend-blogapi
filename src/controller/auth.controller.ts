import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, img, role } = req.body;

    const newUser = await prisma.accounts.create({
      data: { username, email, password, img, role },
    });

    res.status(201).send({ message: "Add Data Success", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const login = await prisma.accounts.findFirst({
      where: {
        email,
        password,
      },
    });

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
