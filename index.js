const express = require('express'),
port = 3000,
app = express(),
expressLayouts = require('express-ejs-layouts'),

// requiring db module to establisth connection with DB
db = require('./config/mongoose');

// use static files
app.use(express.static('./assets'));

// use express layouts
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err) => { 
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})