const express = require("express")
const cors = require("cors")
const app = express()
const { connectDB } = require("./config/db")
const authRoutes = require("./router/userAuth")
require("dotenv").config()
connectDB()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({ msg: "hello from server" })
})

app.use("/api/auth/", authRoutes);
app.use("/api/todo/", authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})
