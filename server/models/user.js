const mongoose = require("mongoose");
const Item = require("./item")
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: [true, "required"],
    //   // unique:true,
    //   // minlength: [3, "minlength"],
    //   default: "default",
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: function () {
        return this._id;
      }
    },
    // },
    email: {
      type: String,
      required: [true, "required"],
      unique:true,
      // minlength: [3, "minlength"],
      default: "default",

    },
    password: {
      type: String,
      required: [true, "required"],
      // minlength: [3, "minlength"],
      default: "default",

    },
    fName: {
      type: String,
      // required: [true, "required"],
      minlength: [3, "minlength"],
      required: [true, "required"],
      

    },
    lName: {
      type: String,
      // required: [true, "required"],
      minlength: [3, "minlength"],
      required: [true, "required"],

    },
    adress: {
      type: String,
      // required: [true, "required"],
      minlength: [3, "minlength"],
      // default: "default",
      
    },
    phone: {
      type: Number,
      // default: 0,
    },
    profilePic : {
      type: Object,
      // required: [true, "required"],
      minlength: [3, "minlength"],
      // default: "default path",
      
    },
    isAdmin: {type: Boolean, default: false },
    itemsHistory : [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    // itemsHistory :  {
    //   type: mongoose.ObjectId,
    //   ref: 'Item',
    //   required: true,
    // },
    // reviews:
    //   [{
    //     rating: Number,
    //     reviewText: String,
    //   }],
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // }
  },
  { timestamps: true }
  );
  
  UserSchema.virtual('confirmPW').get(() => this._confirmPW).set(value=> this._confirmPW = value)

  UserSchema.pre('validate', async function (next) {
    console.log("Inside PASSWORD validation")
    console.log(this)
    if(this.password!=this.confirmPW){
        this.invalidate('confirmPW', "Passwords must match.")
    }
    next()
}, {timestamps:true})
UserSchema.pre('save', async function (next)  {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        console.log('Hashed PASSWORD : ', hashedPassword)
        this.password = hashedPassword;
        next();
    } catch(error) {
        console.log("Error while hashing Password", error)
    }
} )





  const User = mongoose.model("User", UserSchema);
  
  module.exports = User;
  
  // profilePicture : {
    
  //     fileName: String,
  //     path:String 
    
  // },



  // CENSORED WORD CAKE
  // validate: {
  //   validator(value) {
  //     return !value.toLowerCase().includes("cake");
  //   },
  //   message: "censored",
  // },