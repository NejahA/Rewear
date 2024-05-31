
const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    register: async (req, res) => {
        try {
            const userFromDb = await User.findOne({ email: req.body.email });
            if (userFromDb) {
                return res.status(400).json({ email: { message: "Email Already Exist. Try to Login." } })
            }
            console.log('this is reg ==>', req.body);
            const user = await User.create(req.body);
            const userToken = jwt.sign({ id: user._id }, process.env.jwt)
            res.status(201).cookie('userToken', userToken).json({ 'token': userToken });
            // res.status(201).json(user);
        } catch (error) {
            res.status(400).json(error.errors)
        }
    },
    login: async (req, res) => {
        const userFromDb = await User.findOne({ email: req.body.email })
        if (!userFromDb) {
            return res.status(400).json({ email: { message: "Email doesn't exist." } })
        } else {
            try {
                const compareResult = await bcrypt.compare(req.body.password, userFromDb.password);
                if (!compareResult) {
                    return res.status(400).json({ email: { message: "Wrong password ." } })
                } else {
                    const userToken = jwt.sign({ id: userFromDb._id, isAdmin: userFromDb.isAdmin }, process.env.jwt)
                    return res.status(200).cookie('userToken', userToken).json({ 'token': userToken })
                }
            } catch (error) {
                res.status(400).json(error)
            }
        }
    },
    logout: async (req, res) => {
        const { userToken } = req.cookies
        if (!userToken) {
            return res.status(400).json({ message: 'Token not found.' })
        }
        try {
            res.clearCookie('userToken');
            res.status(204).json({ message: "User Logged out successfully." })
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getLoggedUser: async (req, res) => {
        const { userToken } = req.cookies
        // console.log(req.cookies);
        // console.log("user tokFcooken ==> ",userToken);
        if (!userToken) {
            return res.status(400).json({ message: 'Token not found.' })
        }
        try {
            const token = jwt.verify(userToken, process.env.jwt)
            // console.log('TOKEN : ', token);
            const loggedUser = await User.findById(token.id).select('-password -createdAt')
            return res.status(200).json(loggedUser)
        } catch (error) {
            res.status(400).json(error)
        }

    },
    // getLoggedUserWithNotes : async (req,res) => {
    //     const {userToken} = req.cookies
    //     if(!userToken){
    //         return res.status(400).json({message:'Token not found.'})
    //     }
    //     try {
    //         const token = jwt.verify(userToken, process.env.jwt)
    //         console.log('TOKEN : ', token);
    //         const loggedUser  =  await User.findById(token.id).select('-password -createdAt').populate('notes')
    //         return res.status(200).json(loggedUser)
    //     } catch (error) {
    //         res.status(400).json(error)
    //     }
    // }

    findAllUsers: (req, res) => {
        User.find()
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => res.json(err));

    },
    findOneUserById: (req, res) => {
        User.findOne({ _id: req.params.id }).select('-password -createdAt').populate("itemsHistory")
            .then((oneUser) => {
                res.json(oneUser);
            })
            .catch((err) => res.json(err));
    },
    editUser: (req, res) => {
        console.log('THIS IS REQ FILE update =====>', req.files);
        console.log('THIS IS REQ BODY update =====>', req.body);
        console.log('THIS IS REQ BODY PICS =====>', req.body.itemPics);
        if (req.files) {

            files = req.files;
        }
        else {
            files = false;
        }
        let images = []
        if (files !== false && files.length > 0) {
            files.forEach((file) => {
                images.push({ url: '/images/' + file.filename })
            })
        }
        else if ( req.body.itemPics) {
            req.body.itemPics.forEach((image) => {
                images.push(image)
            })
        }

        console.log(
            "images ===+>",
            images[0],

        );
        User.findOneAndUpdate({ _id: req.params.id }, { ...req.body, profilePic: images[0] },
            //     {new: true,  
            //     runValidators: true,
            // }
        )
            .then((updatedDoc) => {
                res.json(updatedDoc);
                console.log("updated user==>", updatedDoc);
            })
            .catch((err) => res.status(400).json(err));
    },
    deleteUser: (req, res) => {
        User.deleteOne({ _id: req.params.id })
            .then((DeletedDoc) => {
                res.json(DeletedDoc);
            })
            .catch((err) => res.json(err));
    }

}

