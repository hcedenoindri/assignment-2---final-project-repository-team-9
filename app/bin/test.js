const signup = require('../routes/signup')
const login = require('../routes/login')
const users = require('../users.json')

describe("testing sign up functionality", ()=>{

    test("testing sign up json", ()=>{

        expect(users).toMatchObject({first_name: signup.first_name});
        expect(users).toMatchObject({last_name: signup.last_name});
        expect(users).toMatchObject({email: signup.email});
        expect(users).toMatchObject({password: signup.password});
    })
})

describe("testing login", ()=>{

    test("account already created", ()=>{
        expect(login.found_flag).toBeTruthy();
    })

    test("account not created", ()=>{
        expect(login.found_flag).toBeFalsy();
    })
})