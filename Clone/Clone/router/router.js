var express = require('express');
var router = express.Router();
var AccountUser = require('../models/accountModel');

// READ
router.get('/', (req, res, next) => {
    AccountUser.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json('Da co loi!')
    })
})

//CREAT
router.post('/', (req, res, next) => {
    let name = req.body.name;
    let password = req.body.password;

    AccountUser.findOne({
        name: name
    })
    .then(data => {
        if(data) {
            res.json('Ten da ton tai');
        }
        else {
            return AccountUser.create({
                    name: name,
                    password: password,
                })
        }
    })
    .then(data => {
        res.json('Tao tai khoan thanh cong');
    })
    .catch(err => {
        res.status(500).json('Loi server');
    })
})

//UPDATE
router.patch('/:id', (req, res, next) => {
    let newPassword = req.body.newPassword;
    let id = req.params.id;
    AccountUser.findByIdAndUpdate(id, {
        password: newPassword
    })
    .then(data => { 
        res.json('Doi mat khau thanh cong!')
    })
    .catch(err => {
        res.status(500).json('Co loi xay ra!')
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    AccountUser.deleteOne({
        _id: id
    })
    .then(data => {
        res.json('Xoa tai khoan thanh cong!')
    })
    .catch(err => {
        res.status(500).json('Co loi xay ra!')
    })
})
module.exports = router;
