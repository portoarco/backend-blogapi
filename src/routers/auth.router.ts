import {Router} from "express";
import { createUser, loginUser } from "../controller/auth.controller";

const route = Router();

// Create New Data 
route.post("/register",createUser)
// Login Data 
route.post("/login",loginUser)


export default route