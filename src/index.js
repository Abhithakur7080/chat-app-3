//.env
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });



import connectDB from "./config/index.js";
import { app } from "./App.js";
const PORT = 8000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\nServer is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`\nMONGODB connection Error: ${error}`);
  });
