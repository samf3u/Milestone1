const express = require('express');
const { unescapeLeadingUnderscores } = require('typescript');
const router = express.Router()
var fs = require('fs');

class User {
    constructor(uID, username, email, password, role) {
        this.uID = uID;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

let user1 = new User("1","sam", "sam@gmail.com", "123", "user")
let user2 = new User("2","james", "james@gmail.com", "123", "assis")
let user3 = new User("3","trent", "trent@gmail.com", "123", "group")
let user4 = new User("4","Super", "supper@gmail.com", "123", "super")



Users = [user1, user2, user3, user4];

router.get('/', (req, res) => {
    // Initiate the file with some dummy data

    lv_return = 'Error'
    lv_path = './localStorage/users.txt'

    if(!fs.existsSync(lv_path)){
        fs.writeFile(lv_path, JSON.stringify(Users), function(err){
            if (err)
                console.log(err)
            else
                console.log('Write Operation Complete.')
        })
        lv_return = JSON.stringify(Users)
    } else {
        lv_usersJSON = fs.readFileSync(lv_path, 'utf-8')
        lv_return = lv_usersJSON
    }
    
    res.send(lv_return) 
})

router.post('/auth', (req, res) => {
    // Request body: username and password 

    lv_return = ''
    lv_path = './localStorage/users.txt'

    if (req.body.username == '' || req.body.username == undefined){
        lv_return = "Username not supplied"
    } else {
        if (req.body.password == '' || req.body.password == undefined){
            lv_return = "Password not supplied"
        } else {
            lv_path = './localStorage/users.txt'
            lv_originalData = []

            if(fs.existsSync(lv_path)){
                lv_usersJSON = fs.readFileSync(lv_path, 'utf-8')
                lv_users = JSON.parse(lv_usersJSON)

                lv_sendBackUser = new User("","","","","")

                for (i=0; i < lv_users.length; i++) {
                    if (lv_users[i].username == req.body.username) {
                        if (lv_users[i].password == req.body.password) {
                            lv_sendBackUser = lv_users[i]
                            lv_sendBackUser.password = ''
                            break
                        }
                    }
                }
                lv_return = JSON.stringify(lv_sendBackUser)
            } else {
                lv_return = 'File does not exist'
            }
        }
    }   

    res.send(lv_return) 
})

router.post('/create', (req, res) => {
    // Request Body: username and email
    lv_return = ''

    if (req.body.username == '' || req.body.username == undefined){
        lv_return = {"Status":1, "StatusMessage": "Username not supplied"}
    } 
    else if (usernameExists(req.body.username)){
        lv_return = {"Status":1, "StatusMessage": "Username exists" }
    }
    else {
        if (req.body.email == '' || req.body.email == undefined){
            lv_return = {"Status":1, "StatusMessage":  "Email not supplied"}
        } else {
            lv_path = './localStorage/users.txt'
            lv_originalData = []

            if(fs.existsSync(lv_path)){
                lv_fileData = fs.readFileSync(lv_path, 'utf-8')
                lv_originalData = JSON.parse(lv_fileData)

                //Find unique id
                lv_IDiterator = lv_originalData.length
                lv_exists = false

                for(i=0;i<lv_originalData.length;i++){
                    if(lv_IDiterator.toString() == lv_originalData[i].uID){
                        lv_exists = true
                        lv_IDiterator += 1
                        continue
                    } 
                }

                lv_newUser = new User(lv_IDiterator.toString(),req.body.username, req.body.email, '123', 'user')
                lv_newData = lv_originalData
                lv_newData.push(lv_newUser)
                lv_newDataJSON = JSON.stringify(lv_newData)

                for (i=0;i<lv_originalData.length; i++){
                    console.log('#### TEST: '+ lv_originalData[i].email)
                }
                fs.writeFile(lv_path, lv_newDataJSON, function(err){
                    if (err)
                        console.log(err)
                    else
                        console.log('Write Operation Complete.')
                })

                lv_return = {"Status":0, "StatusMessage":  'Write Operation Complete.'}//lv_newDataJSON
            } else {
                lv_return = {"Status":1, "StatusMessage": 'No File Exists' }
            } 
        }
    }
    
    res.send(lv_return) 
})

router.post('/delete', (req, res) => {
<<<<<<< HEAD
    // Request body: username 
=======
    // Request body: username and password 
>>>>>>> 1a69ee176cd1be249edc26a6ff3f2dde53ac2a3d

    lv_return = ''
    lv_path = './localStorage/users.txt'

    if (req.body.username == '' || req.body.username == undefined){
        lv_return = {"Status":1, "StatusMessage": "Username not supplied"}
    } 
    else if (!usernameExists(req.body.username)){
        lv_return = {"Status":1, "StatusMessage": "Username does not exists" }
    } else {
            lv_originalData = []
            lv_deletingUserID = ''

            if(fs.existsSync(lv_path)){
                lv_usersJSON = fs.readFileSync(lv_path, 'utf-8')
                lv_users = JSON.parse(lv_usersJSON)

               // lv_sendBackUser = new User("","","","","")

                for (i=0; i < lv_users.length; i++) {
                    if (lv_users[i].username == req.body.username) {
                        lv_users.splice(i, 1)
                    }
                }

                fs.writeFile(lv_path, JSON.stringify(lv_users), function(err){
                    if (err)
                        console.log(err)
                    else
                        console.log('Write Operation Complete.')
                })
                lv_return = lv_return = {"Status":0, "StatusMessage": "User deleted" }
            } else {
                lv_return = {"Status":1, "StatusMessage": "File does not exists" }
            }
        }
        res.send(lv_return)  } 
)
     

    



module.exports = router

function usernameExists(p_username){
    lv_path = './localStorage/users.txt'
    lv_exists = false;

    if(fs.existsSync(lv_path)){
        lv_fileData = fs.readFileSync(lv_path, 'utf-8')
        lv_originalData = JSON.parse(lv_fileData)

        for (i=0;i<lv_originalData.length;i++){
            if (lv_originalData[i].username == p_username){
                lv_exists = true;
                break
            }
        }
    } else {
        lv_return = false
    }
    
    

    return lv_exists
}
/* 
 if(fs.existsSync(lv_path)){
        lv_usersJSON = fs.readFileSync(lv_path, 'utf-8')
        lv_users = JSON.parse(lv_usersJSON)
        lv_sendBackUser = new User("","","","")

        for (i=0; i < lv_users.length; i++) {
            if (lv_users[i].username == requestBody.username) {
                if (lv_users[i].password == requestBody.password) {
                    sendBackUser = Users[i]
                    break
                }
            }
        }

        lv_return = JSON.stringify(lv_sendBackUser)
    } else {
        fs.writeFile(lv_path, JSON.stringify(Users), function(err){
            if (err)
                console.log(err)
            else
                console.log('Write Operation Complete.')
        })
        lv_return = JSON.stringify(Users)
    }
*/