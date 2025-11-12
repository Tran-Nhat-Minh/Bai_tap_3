import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/configdb';

dotenv.config();

const app: Application = express();

// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

const port: number = parseInt(process.env.PORT || '8080');

app.listen(port, () => {
    console.log(`Backend nodejs is running on the port: ${port}`);
});