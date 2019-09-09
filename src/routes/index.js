const { Router } = require('express');
const router     = Router();



router.get('/', (req,res)=> {
    res.json({"title" : "Helloword."})
});

function serverStateNow(){
    if (Math.random() > 0.25) {
        //res.send('Magnificent!');
        return 1;
    } else {
        //res.status(500).send('Ooops!');
        return 0;
    }
}

module.exports = router ;
