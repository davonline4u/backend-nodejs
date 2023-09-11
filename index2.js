const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const otpGenerator = require("generate-otp");



/* api routes */


const app = express()
app.use(express.json())
app.use(cors())
const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    database: "test",
    password: "password"

})
  
app.get("/", (req, res) => {
    console.log(req.body)
    res.json("success")
})
app.get("/users", (req, res)=> {
    const queri = "SELECT * FROM users"
    db.query(queri, (err, data) => {
        if(err) return res.json(err) 
        return res.json(data)
    } )
})

app.post("/users", (req, res)=>{
    const qu = "INSERT INTO users (`phone`, `name`, `surname`, `address`) VALUES (?)"
    const values = [
        req.body.phone,
        req.body.name,
        req.body.surname,
        req.body.address
    ]
    db.query(qu, [values], (err, data) => {
        if(err) return res.json(err) 
        return res.json("registration successful")
    })
})

app.post("/users/:id", (req, res) => {

        const userId = req.params.id;
        console.log(req.body)

        const queryUser = "SELECT name FROM users WHERE phone = ?"
        db.query(queryUser, [userId], (err, data) => {
            if(err){
                 res.status.send(501).res.send(err)
            }
            if(data == " ") {
                 res.send("couldnt find any details")    
            }else {
                return  res.json({"USER DETAILS " : data})   
            }
                

        })
        

})

const localVariables = (req, res, next) => {
    
}

const OtpControl = {
    OTP: null,

    gen(){
        let re = otpGenerator.generate(6)
        this.OTP = re
     }
 
}
 
 
app.get("/generateOTP", (req, res)  => {
    OTP = otpGenerator.generate(6)
    console.log(OTP)
    res.app.locals = OTP
    //console.log(res.app.locals)
    res.status(201).send({code: res.app.locals}) 
    }

)

app.get("/verifyOTP", (req, res)  => {

    let {code} = req.query
    console.log(req.app.locals)
    if(parseInt(code) == parseInt(OtpControl.OtpCode)){
        OtpControl.OTP.OtpCode = null
        OtpControl.OTP
            .resetsession = true
        console.log("verfied")

    } return console.log("invalid OTP")
}

)           




app.listen(2002, ()=> {
    console.log("listening")
})