const express = require('express');
const bodyParser= require('body-parser');
const app = express();
let port = 3001;

const MongoClient = require('mongodb').MongoClient
let db;

app.use(express.static('public')); // making public folder accessible to everyone
app.use(bodyParser.json()); // telling server to read json data 
app.use(bodyParser.urlencoded({extended: true})); // The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.


// connect to local mongodb
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

        app.put('/quotes', (req, res) => {
            db.collection('quotes')
            .findOneAndUpdate(
                { 
                    name: 'tahir' // update where name='tahir'
                },
                {
                    // update this at filtered document
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                }, 
                {
                    sort: {_id: -1}, // search through the db starting from the last entry
                    upsert: true // create new entry if not found
                }, (err, result) => {
                    // callback in case of error or success
                    if (err) return res.send(err);
                    res.send(result);
                }
            );
        });

        app.delete('/quotes', (req, res) => {
            db.collection('quotes').findOneAndDelete({name: req.body.name},
            (err, result) => {
                if (err) return res.send(500, err);
                res.send({message: 'deleted successfully!'});
            });
        });
    }
});

