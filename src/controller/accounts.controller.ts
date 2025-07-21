import { Request, Response } from "express";
import { prisma } from "../config/prisma";


export const getAllData = async (req: Request, res: Response) => {
  try {
    const users = await prisma.accounts.findMany();
    res.send(users);
  } catch (error) {}
};
