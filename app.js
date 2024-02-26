const express = require('express');

const app = express();
let ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./models/User');

const port = process.env.PORT || 3000;
const url = 'mongodb+srv://user:9014@project0.w1jwxrm.mongodb.net/website?retryWrites=true&w=majority&appName=Project0';
mongoose.connect(url).then(console.log('conneted')).catch(err => console.log(err));

app.set('view engine', 'ejs')
app.use(express.static('public'));
//parse form data
app.use(bodyParser.urlencoded({ extended: false}))

//parse application/json
app.use(bodyParser.json());
app.get('/', (req,res) => {
    res.render('Home')
})
app.post('/add' ,  (req,res) => {
    const data = new user({
        name  : req.body.name,
        email : req.body.email,
        fname : req.body.fname,
        number : req.body.number,
        
    })
    console.log(
        data
    )
    data.save().then(() => {
        res.redirect('/');
    }).catch(err => console.log(err));
    
})
app.get('/admin',(req,res) => {
    user.find().then((data) => {
        res.render('data', {data,data})
    })
})

app.listen(port, (req,res) =>  {
    console.log(`listening on ${port}`)
})