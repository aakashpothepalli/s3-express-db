const S3DB = require('../s3-json-db');
const db = new S3DB(process.env.ACCESS_KEY, process.env.SECRET_KEY, 'myfiles', null, null, 'gateway.ap1.storjshare.io');
const table = 'entries';
module.exports = async function(req,res){
//   console.log(req.body)
    if((req.body == undefined) || req.body.id==undefined){
        res.status(400).send("id param missing in POST body")
        return;
    }
    if(req.query.API_KEY!=process.env.API_KEY){
        res.status(401).send("Invalid API Key")
        return;
    }

   db.delete(table, req.body.id).then(id => {
    res.send("successfully deleted ",id)

    }).catch(err=>{
        console.log(err);
        res.status(500).send("An unknown error occured. (ik not a very helpful message.. but i am working hard to fix it :)")
    });
}