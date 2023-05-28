var express = require('express');
var router = express.Router();
var fs=require("fs")


const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);
 
router.get("/toMongo", function(req, res){

 async function run() {
     try {
         await mongoClient.connect();
         const db = mongoClient.db("Pasports");
         const collection = db.collection("PasportInfo");
         const pasport = {namePasp: req.query.namePasp, famPasp: req.query.famPasp, datePasp: req.query.datePasp, inn: req.query.inn};
         const result = await collection.insertOne(pasport);
         console.log(result);
         console.log(pasport);


      }catch(err) {
          console.log(err);
      } finally {
          await mongoClient.close();
      }
 }
 run().catch(console.error);

 res.render("pasp.hbs", {})

})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/toTxt", function(req, res){
  fs.writeFileSync("pasp.txt", req.query.namePasp+" "+req.query.famPasp+" "+req.query.datePasp+",")
  res.render("pasp.hbs", {})
})
router.get("/listofPasps", function(req, res){

let paspsList=fs.readFileSync("pasp.txt", "utf-8")
  res.render("paspsList.hbs", {
    key1: paspsList
  })
})

module.exports = router;