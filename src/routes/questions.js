const { Router } = require('express');
const router     = Router();
//const dbQuestions = require('../questions.json');
const underscore = require('underscore');

//import models db
var Question = require('../models/question');
var User = require('../models/user');  
var Answer = require('../models/answer'); 

router.get('/questions', async (req,res) => {
    let questions = await Question.find()
    res.json(questions);
});

router.post('/questions/new',(req,res)=>{
    let newQuestion = new Question();
    let {question, rating} = req.body;
    if (question && rating){
        newQuestion.question = question;
        newQuestion.rating   = rating;
        newQuestion.created  = new Date();
        newQuestion.answer   = 0;
        newQuestion.save((err,questionStore) => {
            if(err){
                res.status(500).send({message: 'Ups :( Error al guardar tu pregunta'});
            }else{
                res.status(200).json(questionStore);
            }
        });
       
    }else{
        res.status(300).json("No se mandaron todos los parametros");
    }
});

router.delete('/questions/:id', async (req,res) => {
    var {id} =  req.params ;
    console.log('id: ' + id);
    if(!id){
        res.status(500).send({message: 'Ups :( no nos mandaste la pregunta a eliminar.'});
        console.log('Ups :( no nos mandaste la pregunta a eliminar.');
    }else{
        await Question.findByIdAndDelete(id,(err,questionRemoved)=>{
            if(err){
                res.status(500).send({message: 'Ups :( no pudimos borrar tu pregunta.'});
            }else{
                res.status(200).json({message: 'Se ha eliminado la pregunta: '+ id });
            }
        });
    }
    
});




module.exports = router ;