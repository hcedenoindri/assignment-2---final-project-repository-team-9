const signup = require('../routes/signup.js')
const login = require('../routes/login.js')
const userdata = require('../users.json')
const signupSubmit = require('../routes/signupSubmit.js')
var express = require('express');
var router = express.Router();
var fs = require('fs');

// describe("testing sign up functionality", ()=>{

//     test("testing sign up json", ()=>{

//         expect(users).toMatchObject({first_name: signup.first_name});
//         expect(users).toMatchObject({last_name: signup.last_name});
//         expect(users).toMatchObject({email: signup.email});
//         expect(users).toMatchObject({password: signup.password});
//     })
// })

// describe("testing login", ()=>{

//     test("account already created", ()=>{
//         expect(login.found_flag).toBeTruthy();
//     })

//     test("account not created", ()=>{
//         expect(login.found_flag).toBeFalsy();
//     })
// })

describe("testing check account functionality", ()=>{

    test("account in json", ()=>{
        let rawdata = fs.readFileSync('users.json');
        let users = JSON.parse(rawdata);
        let user = {first_name:"Test",last_name:"Account",email:"test@gmail.com",password:"YkuiK8tCGk!4Xqe"};
        users.push(user);
        let data = JSON.stringify(users);
        fs.writeFileSync('users.json', data);
        expect(signupSubmit.checkAccount(user['email'], users)).toBeFalsy();
    })

    test("account not in json", ()=>{
        let rawdata = fs.readFileSync('users.json');
        let users = JSON.parse(rawdata);
        expect(signupSubmit.checkAccount('nope@notanemail.com', users)).toBeTruthy();
    })


})

describe("testing check password functionality", ()=>{

    test("correct input", ()=>{
        expect(signupSubmit.checkPassword('Password1#')).toBeTruthy();
    })
    
    test("password too short", ()=>{
        expect(signupSubmit.checkPassword('aF4%h')).toBeFalsy();
    })

    test("password too long", ()=>{
        expect(signupSubmit.checkPassword('aF4%hdfghsdgfh54&*sdakjgfh#jfbdghn')).toBeFalsy();
    })

    test("does not contain special character", ()=>{
        expect(signupSubmit.checkPassword('Password1')).toBeFalsy();
    })

    test("does not contain number", ()=>{
        expect(signupSubmit.checkPassword('Passwordd')).toBeFalsy();
    })

    test("blank entry", ()=>{
        expect(signupSubmit.checkPassword('')).toBeFalsy();
    })

})