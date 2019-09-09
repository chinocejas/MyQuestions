const { Router } = require('express');
const router     = Router();
const underscore = require('underscore');

//import models db
var Question = require('../models/question');
var User = require('../models/user');  
var Answer = require('../models/answer'); 


router.post('/answer/:idUser/:idQuestion', async(req, res) => {
    let {idUser,idQuestion} = req.params;
    let {answer} = req.body;
    if(!idUser || !idQuestion){
        res.status(500).send({message: 'Ups :( no nos mandaste la pregunta o el usuario.'})
    }else{
        if(!answer){
            res.status(500).send({message: 'Ups :( no nos mandaste la respuesta.'})
        }else{
            var newAnswer = new Answer();
            newAnswer.idUser   = idUser;
            newAnswer.idQuestion = idQuestion;
            newAnswer.answer = answer;
            newAnswer.created = new Date();
            await newAnswer.save((err,anserStored)=>{
                if(err){
                    res.status(500).send({message: 'Ups :( no se pudo guardar tu respuesta.'}) 
                }else{
                    if(questionAnswered(idQuestion)){
                        res.status(200).json(anserStored);
                    }else{
                        console.log('Ups :( no se modifico la pregunta.');
                        res.status(200).json(anserStored);
                    }                 
                }
            });
        }
    }
});

function questionAnswered(idQuestion){
    Question.findByIdAndUpdate(idQuestion, {answered: answered+1},(err,questionUpdated)=>{
        if(err){
            return 0;
        }else{
            return 1;
        }
    });
}

module.exports = router ;