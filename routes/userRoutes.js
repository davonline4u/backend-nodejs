import express from "express"
import { 
    auth,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile

} from "../userController/userAuth.js"



const router = express.Router()


router.post("/", registerUser )
router.post("/auth", auth )
router.post("/logout", logoutUser )
router.get("/auth", getUserProfile )
router.route("/profile").get(getUserProfile).put(updateUserProfile)


export default router