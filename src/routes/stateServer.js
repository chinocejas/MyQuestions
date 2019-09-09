const { Router } = require('express');
const router     = Router();
const fs         = require('fs');


router.get('/stateServer', (req,res)=>{ 
    let state = 'OK'
    var requestLoop = setInterval(function(){
        let dateNow = new Date();
        let newLine = '';
        if (serverStateNow()){
            state = 'OK'
        }else{
            state = 'FALLO'
        }
        newLine = 'Date: ' + dateNow + '| State server: ' + state + '\r\n'
        console.log('Date: ' + dateNow + '| State server: ' + state )
        fs.appendFileSync('test.txt',newLine, (err)=>{if (err) console.log(err);});
        
        
    },10000);
    res.json({"state" : state})
});

function serverStateNow(){
    if (Math.random() > 0.25) {
        return 1;
    } else {
        return 0;
    }
}
module.exports = router ;