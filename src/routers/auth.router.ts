import {Router} from "express";
import { createUser, keepLogin, loginUser } from "../controller/auth.controller";

const route = Router();

// Create New Data 
route.post("/register",createUser);
// Login Data 
route.post("/login",loginUser);
// keep login
// route.get("/keep/:id",keepLogin);
route.get("/keep",keepLogin);


export default route