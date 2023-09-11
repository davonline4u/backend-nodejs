import express, { urlencoded } from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import { notfound, errorHandler } from "./middleware/errorMiddleware.js"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
 
dotenv.config()
connectDB()
const app = express();
const PORT = 3000


app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/user", userRoutes)

app.get("/", (req, res)=> {
    res.json("Welcome to home page")
})

app.use(notfound)
app.use(errorHandler)

app.get("/user", (req, res)=> {
    const qu = "SELECT * from USERS";
    db.query(qu, (err, data) => {
        if(err)return res.json(err)
        return res.json(data)
    })
})

app.listen(PORT, () => console.log("server started"))