const S3DB = require('@dashpilot/s3-json-db');
const db = new S3DB(process.env.ACCESS_KEY, process.env.SECRET_KEY, 'myfiles', null, null, 'gateway.ap1.storjshare.io');
const table = 'entries';
module.exports = async function(req,res){
//   console.log(req.body)
    if((req.body == undefined) || req.body.id==undefined || req.body.data ==undefined){
        res.status(400).send("data or id params missing in POST body")
        return;
    }
   db.update(table, req.body.data, req.body.id).then(id => {
      console.log("updated " + id);
      res.send("updated",id)

    }).catch(err=>{
        console.log(err);
        res.status(500).send("An unknown error occured. (ik not a very helpful message.. but i am working hard to fix it :)")
    });;
}