const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, 'public'))

    app.use('/public', publicPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })
    app.set('port', process.env.PORT || 3000);
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    io.on('connection', (socket) => {
      console.log('Client connected');
      socket.on('disconnect', () => console.log('Client disconnected'));
    });
    server.listen(app.get('port'))
    return app 
    } 
}
