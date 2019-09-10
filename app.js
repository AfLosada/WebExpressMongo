const MongoClient = require("mongodb").MongoClient;
let express = require("express");
let bodyParser = require("body-parser");
const db = "pruebas";
const coll = "countries";

let app = express();
app.use(bodyParser());

var conn = MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });

function deleteMongo(pais, callback){
    conn.then(client => {
        client.db(db).collection(coll).deleteOne({country:pais}, (err,data)=>{
            callback(data);
        });
    })
}

function postMongo(descripcion, callback) {
    conn.then(client => {
        client.db(db).collection(coll).insertOne(descripcion, (err, data) => {
            callback(data);
        });
    })
}

function putMongo(descripcion, item, callback) {
    client.db(db).collection(coll).updateMany({ country: "" + item }, { $set: descripcion }, (err, data) => {
        if (err) throw err;
        callback(data);
    });
}

function getMongo(item, callback) {
    conn.then(client => {
        if (item === undefined) {
            client.db(db).collection(coll).find({}).toArray((err, data) => {
                console.log(data);
                callback(data);
            });
        }
        else {
            client.db(db).collection(coll).find({ "country": item }).toArray((err, data) => {
                console.log(data);
                callback(data);
            });
        }
    })
}

app.get("/countries/", (req, res) => {
    getMongo(undefined, (data) => {
        res.json(data);
    });
});

app.get("/countries/:pais", (req, res) => {
    let pais = req.params.pais;
    getMongo(pais, (data) => {
        res.json(data);
    });
});

app.post("/countries", (req, res) => {
    postMongo(req.body, (data) => {
        res.json(data);
    });
});

app.put("/countries/:pais", (req, res) => {
    let pais = req.params.pais;
    putMongo(req.body, pais, (data) => {
        res.json(data);
    });
});

app.delete("/countries/:pais", (req,res)=>{
    let pais = req.params.pais;
    deleteMongo(pais, (data)=>{
        res.json(data);
    });
});

app.listen(8080);