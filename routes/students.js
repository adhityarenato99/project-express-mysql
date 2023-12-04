var express = require('express')
var router = express.Router();

// import database
var con = require('../config/db');

// Index Students
router.get('/', function (req, res, next) {
    // query
    var sql = 'SELECT s.firstname, s.lastname, s.email, c.class_name as class, g.grade_name as grade FROM tbl_student s JOIN tbl_class c ON c.id = s.class JOIN tbl_grade g ON g.id = s.grade';

    con.query(sql, function (err, rows) {
        if (err) {
            req.flash('error', err);
            req.render('students', {
                data: ''
            })

        } else {
            // parsing data ke dalam view students index
            res.render('students/index', {
                data: rows
            })
        };

    })
})

// create data
router.get('/create', function(req, res, next) {
    res.render('students/create', {
        firstname:'',
        lastname: '',
        email: '',
        v_class: '',
        grade: ''
    })
})

// store data
router.post('/store', function (req, res, next) {

    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var v_class = req.body.v_class;
    var grade = req.body.grade;

    var errors = false;

    if (firstname.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', 'Masukkan Nama Depan!')
        // render ke add.ejs dengan flash message
        res.render('students/create', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            v_class: v_class,
            grade: grade
        })
    }

    if (lastname.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', 'Masukkan Nama Belakang!')
        // render ke add.ejs with flash message
        res.render('students/create', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            v_class: v_class,
            grade: grade
        })
    }

    if (email.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', 'Masukkan Email!')
        // render ke add.ejs with flash message
        res.render('students/create', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            v_class: v_class,
            grade: grade
        })
    }

    if (v_class.length === 0) {
        errors = true

        // set flash message
        req.flash('error', 'Masukkan Kelas!')
        // render ke add.ejs with flash message
        res.render('students/create', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            v_class: v_class,
            grade: grade
        })
    }

    if (grade.length === 0) {
        errors = true

        // set flash message
        req.flash('error', 'Masukkan Grade!')
        // render ke add.ejs with flash message
        res.render('students/create', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            v_class: v_class,
            grade: grade
        })
    }

    if (!errors) {
        var formData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            class: v_class,
            grade: grade
        }

        con.query('INSERT INTO tbl_student SET ?', formData, function(err, result) {

            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('students/create', {
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    v_class: formData.class,
                    grade: formData.grade
                })
            } else {
                req.flash('success', 'Data Berhasil Tersimpan!')
                res.redirect('/students')
            }
        })
    }
})

module.exports = router;