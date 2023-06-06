const express = require('express');
const port =  8000;

const app = express();
const db = require('./config/mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo');
const adminPassport = require('./config/passport');
const departmentPassport = require('./config/department_passport');

app.use(express.json());
app.use(express.urlencoded());




app.use(session({
    secret: 'rkm seminar',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60*24 },
    store: MongoStore.create({ mongoUrl: 'mongodb://0.0.0.0:27017/seminar_hall_DB',collectionName:"sessions" })
  }))



app.use(adminPassport.initialize())
app.use(adminPassport.session())
app.use(departmentPassport.initialize())
app.use(departmentPassport.session())



app.use('/',require('./routes/index'));






app.listen(port , (err)=>{
    if(err){
        console.log("Error while starting the server ",err);
        return;
    }
    console.log("Server is up and running on port : ",port);

})