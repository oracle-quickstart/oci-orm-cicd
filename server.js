//Copyright (c) 2020 Oracle and/or its affiliates.

//Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.

let express = require("express");

let app = express();
let http = require('http').Server(app);

app.get('/', (req, res) => res.send('Hello World!'))

http.listen(process.env.PORT || 3001, function(){
    console.log('listening on *:' + (process.env.PORT || 3001));
});