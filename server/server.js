const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.port;
const cors = require("cors");
var multer = require("multer");
const cookieParser = require('cookie-parser')
const http = require("http");
const { Server } = require("socket.io");


app.use('/uploads', express.static('uploads'));


const range=(req,res, next) => {

  res.header ('Access-Control-Expose-Headers', "*")
  res.header ("Content-Range","items 0-20/20");
  next()
}
app.use(range)

app.use(express.json(), express.urlencoded({ extended: true }),
cors({
  origin:["http://localhost:5173",'http://localhost:3000','http://localhost:8001'],
  // origin:'*',
  credentials:true, methods:['GET', 'POST','PATCH','DELETE',"PUT"]

}
  ));

app.use(cookieParser())

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/item.routes")(app);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 
    "http://localhost:5173", 
    // "*",
    // [,'http://localhost:3000','http://localhost:8001'],
    methods:['GET', 'POST','PATCH','DELETE',"PUT"]
  }, 
});
io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`User : ${data.username} joined room: ${data.room}`);
  });

  socket.on("send_message", (data) => {
    // socket.to(`${data.room}`)
    io.to(data.room).emit("receive_message", data)
    console.log("message sent ==>", data);
  });

  

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
server.listen(8001, () => {
  console.log("SERVER RUNNING");
});