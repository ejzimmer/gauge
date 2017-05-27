const express = require('express')
const app = express()

const connections = [];

app.use(express.static(__dirname));

app.use((req, res, next) => {
    res.sseSetup = () => {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        })
    };

    res.sseSend = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    next();
});

app.get('/subscribe', function (req, res) {
    res.sseSetup();
    connections.push(res)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

setInterval(() => {
    const number = Math.random();
    console.log(number);
    connections.forEach(connection => {
        connection.sseSend(`${number}`);
    });
}, 1500);
