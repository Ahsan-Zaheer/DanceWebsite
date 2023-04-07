const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 800;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

// Define Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    mail: String,
    address: String,
    about: String
  });

const Contact = mongoose.model('Contact', contactSchema);

// Express Static Stuff
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded());

// Setting Pug
app.set('view engine', 'pug');

// Setting Pug Endpoint
app.get('/', (req, res)=>{
    const params = {'title': 'Dance Academy'}
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = {'title': 'Dance Academy'}
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("You data send sucessfully");
    }).catch((err)=>{
        res.status(400).send("items not saved")
        console.log(err);
    })
})


// Starting the Sever
app.listen(port, ()=>{
    console.log(`You Sever is sucessfully start on Port ${port}`);
})

