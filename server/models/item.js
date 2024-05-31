const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
    {    

      id: {
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
          return this._id;
        }
      },
    
        title: {
            type: String,
            required: [true, "req-title"],
            minlength: [3, "minlength"],
            // default: "default",
            validate: {
                validator(value) {
                  return value!== "undefined";
                },
                message: "val-req",
              },
        },
        // photo:{
        //     type:File
        // },
        category: {
            type: String,
            required: [true, "req-category"],
            // default: "default",
            validate: {
                validator(value) {
                  return value!== "undefined";
                },
                message: "val-req",
              },
        },
        brand: {
            type: String,
            required: [true, "req-brand"],
            // default: "default",
            validate: {
                validator(value) {
                  return value!== "undefined";
                },
                message: "val-req",
              },
        },
        size: {
            type: String,
            required: [true, "req-size"],
            // minlength: [3, "minlength"],
            // default: "default",
            validate: {
                validator(value) {
                  return value!== "undefined";
                },
                message: "val-req",
              },
        },
        description: {
            type: String,
            required: [true, "req-description"],
            // default: "default",
            validate: {
                validator(value) {
                  return value!== "undefined";
                },
                message: "val-req",
              },
        },
        price: {
            type: Number,
            required: [true, "req-price"],
            // default: 0,
            validate: {
                validator(value) {
                  return value!== "undefined";
                },
                message: "val-req",
              },
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            default: "pending",
        },
        itemPics: { type: Array, required:[true, "req-images"] },
    },
    { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
//   module.exports=ItemSchema

// validate: {
//   validator(value) {
//     return !value.toLowerCase().includes("cake");
//   },
//   message: "censored",
// },
