import { config } from "dotenv"
import app from "./server"

config()

app.listen(3000, () => console.log("server started"))