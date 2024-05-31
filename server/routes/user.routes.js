const CollectionController = require("../controllers/user.controller");
upload = require("../config/image.config")

module.exports = (app) => {
  app.post('/api/register', CollectionController.register)
    // app.post('/api/admin/register', registerAdmin)
    app.post('/api/login', CollectionController.login)
    app.post('/api/logout', CollectionController.logout)
    app.get('/api/user', CollectionController.getLoggedUser)
    app.get('/api/users', CollectionController.findAllUsers)
    app.put('/api/users/:id',upload.array("files",1), CollectionController.editUser)
    app.delete('/api/users/:id', CollectionController.deleteUser)
    app.get('/api/users/:id',CollectionController.findOneUserById)
  };


// module.exports.findAllDocs = (req, res) => {
//   Collection.find()
//   .then((docs) => {
//     res.json(docs);
//   })
//   .catch((err) => res.json(err));
// };
