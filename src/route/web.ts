import express, { Application, Request, Response, Router } from "express";
import homeController from "../controller/homeController";

const router: Router = express.Router();

const initWebRoutes = (app: Application): Application => {
  router.get("/", (req: Request, res: Response) => {
    return res.send("Trần Nhật Minh");
  });

  router.get("/home", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.getFindAllCrud);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  return app.use("/", router);
};

export default initWebRoutes;