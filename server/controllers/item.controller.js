
const Collection = require("../models/item");
const User = require('../models/user');


module.exports.findAllDocs = (req, res) => {
    Collection.find()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => res.json(err));
};

module.exports.findOneDoc = (req, res) => {
    Collection.findOne({ _id: req.params.id })
    .then((oneDoc) => {
      res.json(oneDoc);

    })
    .catch((err) => res.json(err));
};


module.exports.createNewDoc = (req, res) => {
  console.log('THIS IS REQ FILE =====>',req.files);
  console.log('THIS IS REQ BODY =====>',{...req.body});
  let files = req.files;
  let userId=req.body.user
  let images = []
  files.forEach((file) => {
      images.push({url:'/images/'+file.filename})
  })
  Collection.create({...req.body,itemPics:images} )
    .then((newDoc) => {
      itemId = newDoc._id
      res.json(newDoc);
      console.log('item id ==>',itemId, "user id ==>",userId);
      User.findOneAndUpdate({_id:userId},  { $push: { itemsHistory: newDoc._id } })
      .then(res => console.log(res))
    })
      .catch((err) => res.status(400).json(err));
      // .then( (res)=> {
      //   console.log("Ipdated user =>",res);
      // }
      // ).catch(err=> console.log(err))
    };

// UPDATE

module.exports.updateExisitingDoc = (req, res) => {

  console.log('THIS IS REQ FILE update =====>',req.files);
  console.log('THIS IS REQ BODY update =====>',req.body);
  console.log('THIS IS REQ BODY PICS =====>',req.body.itemPics);
  if (req.files){

     files = req.files;
  }
  else {
     files = false;
  }
  let images = []
  if (files!==false && files.length>0){
    files.forEach((file) => {
      images.push({url:'/images/'+file.filename})
  })
  }
  else {
    req.body.itemPics.forEach((image) => {
      images.push({url:image})
  })  
    }
  console.log(
    "images ===+>",
    images
  );
    Collection.findOneAndUpdate({ _id: req.params.id }, {...req.body,itemPics:images}, 
  //     {new: true,
  //     runValidators: true,
  // }
  )
    .then((updatedDoc) => {
      res.json(updatedDoc);
    })
    .catch((err) => res.status(400).json(err));
};

// DELETE
module.exports.deleteOneDoc = (req, res) => {
    Collection.deleteOne({ _id: req.params.id })
    .then((DeletedDoc) => {
      res.json(DeletedDoc);
    })
    .catch((err) => res.json(err));
};

module.exports.uploadImg = (req,res) => {
  

  // console.log('THIS IS REQ BODY  =====>',req.body);
  console.log('THIS IS REQ FILE =====>',req.files);
  console.log('THIS IS REQ BODY =====>',req.body);
  let files = req.files;
  let paths = []
  if (files){
    files.forEach((file) => {
        paths.push('/images/'+file.filename)
    })
  }
  else {
    files.forEach((path) => {
      req.body.itemPics.push(path)
  })
  }
  Collection.create({itemPics:paths,...req.body})
    .then((newDoc) => {
      res.json(newDoc);
    })
    .catch((err) => res.status(400).json(err));
  // Save the document to the database


}
// module.exports.uploa upload.single('image'), async (req, res) => {
//   const { filename, path } = req.file;
//   const newImage = new Image({ filename, path });
//   await newImage.save();
//   res.send('Image uploaded successfully');
// }