import express from "express";
import router from "@/presentation/routes/survey.routes";

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

app.use(express.json());
app.use("/surveys", router);

app.listen(PORT, HOST);
