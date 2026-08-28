//載入 Express 框架。
import express from "express";

//載入拆分出去的路由與 middleware。
import userRoutes from "./routes/useRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
//MONGODB
import connectDB from "./data/connectDB.js";

//建立 Express 應用程式。
const app = express();
const PORT = Number(process.env.PORT) || 3000;

console.log("PORT NUMMER", PORT);

//啟用 JSON 解析的 middleware。
app.use(express.json());

//把 /users 開頭的請求，全部交給 userRoutes 這個路由器處理。
app.use("/users", userRoutes);

//處理找不到的路由，放在所有正常路由之後。
app.use(notFoundHandler);

//處理所有被 next(err) 傳遞過來的錯誤，放在檔案最後。
app.use(errorHandler);

const startServer = async () => {
  try {
    // connection with Database
    await connectDB(process.env.MONGODB_URL);
    console.log("Connection with MongoDB worked");

    // Start the server.
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
  }
};

startServer();

export default app;
