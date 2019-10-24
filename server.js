const express = require('express');
const bodyParser= require('body-parser');
const app = express();
let port = 3001;

const MongoClient = require('mongodb').MongoClient
let db;

MongoClient.connect('mongodb://localhost:27017/mydb', (err, client) => {
    if (err) {
        console.log(`Error connecting to database ${err}`);
    } else {

        debugger;
        console.log(`successfully connected to database ${client.db('mydb')}`);
        db = client.db('mydb');
        // console.log(db);

        app.listen(port, () => {
            console.log(`listening on ${port}`);
        });

        app.set('view engine', 'ejs');

        app.use(bodyParser.urlencoded({extended: true}));

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray((err, result) => {
                if (err) return console.log(err);
                res.render('index.ejs', {quotes: result});
            });
        });

        app.post('/quotes', (req, res) => {
            db.collection('quotes').save(req.body, (err, result) => {
                if (err) return console.log(err);

                console.log('saved to database');
                res.redirect('/');
            });
        });
    }
});