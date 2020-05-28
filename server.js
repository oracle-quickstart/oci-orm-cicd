let express = require("express");

let app = express();
let http = require('http').Server(app);

app.get('/', (req, res) => res.send('Hello World!'))

http.listen(process.env.PORT || 3001, function(){
    console.log('listening on *:' + (process.env.PORT || 3001));
});