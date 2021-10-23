const signup = require('../routes/signup.js')
const login = require('../routes/login.js')
//const users = require('../users.json')
const signupSubmit = require('../routes/signupSubmit')
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

})