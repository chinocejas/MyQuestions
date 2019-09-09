const { Router } = require('express');
const router     = Router();
const fetch      = require('node-fetch');

router.get('/users', async (req,res) => {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let users = await response.json();
    res.json(users);
});

module.exports = router ;