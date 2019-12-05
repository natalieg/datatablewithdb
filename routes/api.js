const express = require('express');
const router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data/data.json');
const db = low(adapter);

let list = db.get('datatable');

router.get('/', function (req, res, next) {
    res.json(list);
})

// Add new Entry
router.post('/post', function (req, res) {
    let id = parseInt(req.body.id);
    let name = req.body.name;
    let age = req.body.age;
    let job = req.body.job;
    let home = req.body.home;

    db.get('datatable').push({
        id: id,
        name: name,
        age: age,
        job: job,
        home: home
    }).write()
    //res.status(200).send("Inserted Data");
   res.redirect('/')
})

// Delete
router.post('/delete',function(req,res,next){
    console.log('inside router delete...')
    let id = parseInt(req.body.id);
    console.log('ID is: ', id, typeof(id))
    db.get('datatable').remove({id:id}).write();
    res.send('File deleted')
})


module.exports = router;