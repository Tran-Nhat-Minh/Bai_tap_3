import { Request, Response } from "express";
import db from "../models/index";
import CRUDService from "../services/CRUDService";

// hàm getHomePage
const getHomePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await db.User.findAll();
    res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};

// hàm getAboutPage
const getAboutPage = (req: Request, res: Response): void => {
  res.render("test/about.ejs");
};

// hàm CRUD
const getCRUD = (req: Request, res: Response): void => {
  res.render("crud.ejs");
};

// hàm findAll CRUD
const getFindAllCrud = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await CRUDService.getAllUsers();
    res.render("users/findAllUser.ejs", {
      datalist: data,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};

// hàm post CRUD
const postCRUD = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    res.send("Post crud to server");
  } catch (e) {
    console.log(e);
    res.status(500).send("Error creating user");
  }
};

// hàm lấy dữ liệu để edit
const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.id as string;
    if (userId) {
      const userData = await CRUDService.getUserInfoById(userId);
      res.render("users/editUser.ejs", {
        data: userData,
      });
    } else {
      res.send("không lấy được id");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};

const putCRUD = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const updatedData = await CRUDService.updateUserData(data);
    res.render("users/findAllUser.ejs", {
      datalist: updatedData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error updating user");
  }
};

const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.query.id as string;
    if (id) {
      await CRUDService.deleteUserById(id);
      res.send("Deleted!!!!!!!!!!!");
    } else {
      res.send("Not find user");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Error deleting user");
  }
};

export default {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getFindAllCrud,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};