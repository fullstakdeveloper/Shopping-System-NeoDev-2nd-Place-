import { config } from "dotenv";
config();

import app from "./server";

app.listen(3000, () => console.log("server started"));
