import {Router} from "express";
import { getAllData } from "../controller/accounts.controller";


const route = Router();

// getAllUsersData
route.get("/",getAllData);


export default route;