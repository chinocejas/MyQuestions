const { Router } = require('express');
const router     = Router();
const fetch      = require('node-fetch');
const underscore = require('underscore'); //arrays

var User = require('../models/user');  

router.get('/users', async (req,res) => {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let users = await response.json();
    let usersToDb = {} ;
    await underscore.each(users, (usr,i) => {
        let userToAdd = createGhostUsers(usr.name,usr.aka, usr.email);
        usersToDb.push(userToAdd);
        
    });
    console.log(usersToDb.length);
    res.json(usersToDb);
});

function  createGhostUsers(name ,aka, email){
    var newUser = new User();
    newUser.name    = name;
    newUser.aka     = aka;
    newUser.email   = email;
    newUser.created = new Date();

    return newUser;
}

module.exports = router ;