const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const AccountUser = require('./models/accountModel')

app.use(cookieParser())

class CheckPermission {
    isAll(req, res, next) {
        try {
            let token = req.cookies.token;
            let data = jwt.verify(token, global.SECRET);
            AccountUser.findById(data.id)
                .then(user => {
                    if(user) {
                        res.data = user;
                        next();
                    }
                    else {
                        return res.json({
                            message: 'User not found',
                            role: null
                        });
                    }
                })
                .catch(err => {
                    res.status(500).json('Loi server!');
                })
        } catch {
            return res.json({
                message: 'Denied access',
                role: null 
            })
        }

    }
    isUser(req, res, next) {
        let role = res.data.role;
        if(['creater', 'user', 'admin'].includes(role)) {
            next();
        } else {
            return res.json({
                message: 'Denied access',
                role: role 
            })
        }
    }
    isAdmin(req, res, next) {
        let role = res.data.role;
        if(['creater', 'admin'].includes(role)) {
            next();
        } else {
            return res.json({
                message: 'Denied access',
                role: role 
            })
        }
    }
    isCreater(req, res, next) {
        let role = res.data.role;
        if(['creater'].includes(role)) {
            next();
        } else {
            return res.json({
                message: 'Denied access',
                role: role 
            })
        }
    }
}

module.exports = new CheckPermission();
