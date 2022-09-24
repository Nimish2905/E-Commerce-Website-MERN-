const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const colors = require("colors");
const userRoutes = require("./Routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const productRoutes=require("./Routes/productRouter")
dotenv.config();
const app = express();
app.use(express.json());
connectDb();

app.get("/", (req, res) => {});
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on Port ${PORT}`.blue.italic));
