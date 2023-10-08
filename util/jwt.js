import jwt from "jsonwebtoken"

const generateToken = (res, userId ) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '2000'
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 20000
    })
}

export default generateToken;