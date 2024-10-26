import express from "express";
const app = express()
import {scanItem, pay} from "./data"

app.use(express.json())
app.post("/item", async (req, res) => {
    const {rfid_tag, customer_id} = await req.body
    try {
        await scanItem(rfid_tag)
        await pay(customer_id, rfid_tag)
        res.status(200).json({status: "Success"})
    } catch(e) {
        res.status(500).json({status: e})
    }
})

app.post("/", async(req,res) => {
    res.status(400).json({status: "Do something"})
})

export default app 