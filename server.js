const express = require('express')
const app = express()
const http = require('http').createServer(app)

// const NodeRSA = require('node-rsa');
// const key = new NodeRSA({b: 512});  

const PORT = process.env.PORT || 3000   //for heroku

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected')
    socket.on('message', (msg) => {
        // const encrypted = key.encrypt(msg, 'base64');
        socket.broadcast.emit('message', msg)
    })

})