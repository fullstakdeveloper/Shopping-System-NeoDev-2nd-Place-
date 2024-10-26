import express from "express";
import cors from "cors";
const app = express();
import { scanItem, pay, getLog } from "./data";

app.use(express.json());
app.use(cors());
app.post("/item", async (req, res) => {
    const { rfid_tag, customer_id } = req.body;
    console.log({ rfid_tag, customer_id });
    try {
        await scanItem(rfid_tag);
        await pay(customer_id, rfid_tag);
        res.status(200).json({ status: "Success" });
    } catch (e) {
        res.status(500).json({ status: e });
    }
});

app.get("/item", async (req, res) => {
    res.status(400).json({ status: "Expected POST on /item. Got GET" });
});

app.get("/", async (req, res) => {
    res.status(400).json({ status: "Do something bruh" });
});

app.get("/logs", async (req, res) => {
    const params = req.query;
    const start_date = params["start_date"];
    const end_date = params["end_date"];
    var sdn, edn: number | undefined;
    if (start_date != undefined && end_date != undefined) {
        sdn = +start_date;
        edn = +end_date;
    }
    try {
        const log = await getLog(sdn, edn);
        res.status(200).json({ status: "Success", logs: log });
    } catch (e) {
        res.status(500).json({ status: e });
    }
});

export default app;
