const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const socketio = require('socket.io')
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
 
app.use('/api/user', require('./routes/user'))
app.use('/api/message', require('./routes/message'))
app.use('/api/relation', require('./routes/relation'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 4000
const server = app.listen(PORT, ()=> console.log(`Server corriendo en ${PORT}`))

const io = socketio.listen(server)
io.on('connection', (socket)=>{
    socket.on('getUsers', ()=>{
        socket.broadcast.emit('getUsers')
    })

    socket.on('getMessages', (idOrigin)=>{
        //socket.to(idDestiny).emit('newMessage')
        socket.broadcast.emit('getMessages', idOrigin)
    })
})