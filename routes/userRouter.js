import express from "express"
import { isAuth } from "../utils.js";
import User from "../models/userSchema.js";
import expressAsyncHandler from 'express-async-handler'

const UserRouter = express.Router();

UserRouter.get('/', isAuth,
 expressAsyncHandler(async (req, res) => {
    let list = [];
    try {
        list = await User.find().populate('myList');
        res.status(200).json(list);
    }
    catch(err) {
        res.status(500).json(err);
    }
}))

UserRouter.post('/addFavorite', isAuth,
expressAsyncHandler(async(req,res)=>{
    const favoriteId = req.body.favoriteId;
    console.log(favoriteId);
    try{
        const user = await User.findOne(req.user.id);
        console.log(user);
        if (user) {
            user.myList.push(favoriteId);
            const updatedUser = await User.updateOne(user);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch(err){
        res.status(500).json(err);
    }
}))

export default UserRouter;