const dotenv = require("dotenv")
dotenv.config()
const express = require('express');
const path = require("path")
const cors = require("cors")
const bodyParser = require('body-parser');
const commonRouter = require("./routes/commonRoutes");
const customerRouter = require('./routes/customerRoutes');
const sellerRouter = require('./routes/sellerRoutes');
// const adminRouter = require('./routes/adminRoutes');
require("./db"); 
require("./associations")

const app = express();
const port = process.env.PORT || 5000;
const server = require('http').createServer(app)

// const io = require('socket.io')(server,{
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//        }
// })

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(bodyParser.json())
app.use(cors());

// app.use(adminRouter);
app.use(commonRouter);
app.use(customerRouter);
app.use(sellerRouter);

server.listen(port, () => {
    console.log("Listening on port", port)
});

// let members = {}

// io.on('connection', (socket) => {

//     socket.on('memberconnect', username => {
//         console.log("memberconnect...",username)
//         if(username.length!==0 || typeof(username)===String){
//             members = {...members, [username]: socket.id}
//         }
//         console.log("members..",members)
//     })

//     socket.on('sendmessage', async (data) => {
//         const message = data["message"]
//         const to = data["to"]

//         socket.broadcast.to(members[to]).emit('message', message)

//         const order = data["order"]
//         let from;
//         let keys = Object.keys(members)
//         console.log("socket.id...",socket.id)
//         console.log("members...",members)
//         for(let i=0; i<keys.length; i++){
//             if(members[keys[i]]===socket.id){
//                 from = keys[i]
//                 break;
//             }
//         }
//         console.log("from...",from)

//         const msg_data = {
//             "message": message,
//             "from": from,
//             "to": to,
//             "createdat": new Date(),
//             "order": order
//         }
        
//         const msg = new Message(msg_data)
//         await msg.save()

//     })

//     socket.on('disconnect',()=>{
//         console.log("disconnect...",socket.id)
//         let keys = Object.keys(members)
//         console.log("members before...",members)
//         for(let i=0; i<keys.length; i++){
//             if(members[keys[i]]===socket.id)
//             {
//                 delete members[keys[i]]
//             }
//         }
//         console.log("members after...",members)
//     })
// })