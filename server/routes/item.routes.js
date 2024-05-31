const uploadMiddleware = require ('../config/image.config')
upload = require("../config/image.config")

const CollectionController = require("../controllers/item.controller");
module.exports = (app) => {

  app.post("/api/items",upload.array("files",5), CollectionController.createNewDoc);
  app.get("/api/items", CollectionController.findAllDocs);
  app.get("/api/items/:id", CollectionController.findOneDoc);
  app.put("/api/items/:id",upload.array("files",5), CollectionController.updateExisitingDoc);
  app.delete("/api/items/:id", CollectionController.deleteOneDoc);
  // app.post ('/api/items/uploadimg',upload.array("files",5),CollectionController.uploadImg);
}