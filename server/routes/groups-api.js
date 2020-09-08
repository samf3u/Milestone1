const express = require('express')
const router = express.Router()
var fs = require('fs');

class Group {
    constructor(gID, name, admin, assis, users, rooms) {
        this.gID = gID;
        this.name = name;
        this.admin = admin;
        this.assis = assis;
        this.users = users;
        this.rooms = rooms;
    }
}

class User {
    constructor(uID, username, email, password, role) {
        this.uID = uID;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

class Room {
    constructor(rID, name, users, history) {
        this.rID = rID;
        this.name = name;
        this.users = users;
        this.history = history
    }
}

let user1 = new User("1","sam", "sam@gmail.com", "123", "user")
let user2 = new User("2","james", "james@gmail.com", "123", "assis")
let user3 = new User("3","trent", "trent@gmail.com", "123", "group")
let user4 = new User("4","Super", "supper@gmail.com", "123", "super")
Users = [user1, user2, user3, user4];

let room1 = new Room("1", "Room 1",[user1.username, user2.username, user3.username, user4.username],[])
let room2 = new Room("2", "Room 2",[user1.username, user2.username, user3.username, user4.username],[])
let room3 = new Room("3", "Room 1",[user1.username, user2.username, user3.username, user4.username],[])
let room4 = new Room("4", "Room 2",[user1.username, user2.username, user3.username, user4.username],[])
let room5 = new Room("5", "Room 1",[user1.username, user2.username, user3.username, user4.username],[])
let room6 = new Room("6", "Room 2",[user1.username, user2.username, user3.username, user4.username],[])
let room7 = new Room("7", "Room 3",[user1.username, user2.username, user3.username, user4.username],[])
let room8 = new Room("8", "Room 3",[user1.username, user2.username, user3.username, user4.username],[])

let group1 = new Group("1","Group 1", user1.username, user2.username, [user1.username, user2.username, user3.username, user4.username],[room1, room2])
let group2 = new Group("2", "Group 2", user2.username, '', [user1.username, user2.username, user3.username, user4.username],[room3, room4, room8])
let group3 = new Group("3", "Group 3", user1.username, user2.username, [user1.username, user2.username, user3.username, user4.username],[room5, room6, room7])
Groups = [group1, group2, group3]



router.get('/', (req, res) => {
    lv_return = 'Error'
    lv_path = './localStorage/groups.txt'

    if(!fs.existsSync(lv_path)){
        fs.writeFile(lv_path, JSON.stringify(Groups), function(err){
            if (err)
                console.log(err)
            else
                console.log('Write Operation Complete.')
        })
        lv_return = JSON.stringify(Groups)
    }
    
    res.send(lv_return) 
})

router.post('/fetch', (req, res) => {
    // Request body: uID
    lv_return = 'Error'
    lv_path = './localStorage/groups.txt'
    lv_responseList = [];

    if(req.body.username == '' || req.body.username == undefined){
        lv_return = "Username not provided"
    } else {
        if(fs.existsSync(lv_path)){
            lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
            lv_groups = JSON.parse(lv_groupsJSON)

            for(i=0;i<lv_groups.length;i++){
                for(j=0;j<lv_groups[i].users.length;j++){
                    if(lv_groups[i].users[j] == req.body.username){
                        lv_responseList.push(lv_groups[i])
                    }
                }
            }
            /* console.log('########### START ################')
            for(i=0;i<lv_groups.length;i++){
                for(j=0;j<lv_groups[i].rooms.length;j++){
                    for(k=0;k<lv_groups[i].rooms[j].users.length;k++){
                        if(lv_groups[i].rooms[j].users[k] == req.body.uID){
                            if(lv_responseList.length == 0){
                                lv_responseList.push(lv_groups[i])
                                console.log(lv_groups[i].name)
                            } else {
                                lv_groupExists = false;
                                for(l=0; l<lv_responseList.length; l++){
                                    
                                    if(lv_groups[i].gID == lv_responseList[l].gID){
                                        lv_groupExists = true
                                        console.log('###Exists: ' + lv_groupExists)
                                        break
                                    }
                                }
                                if (lv_groupExists == false){
                                    lv_responseList.push(lv_groups[i])
                                    console.log(lv_groups[i].name)
                                }
                            }
                        }
                    }
                }
            }
            console.log('########### End ################') */
            lv_return = JSON.stringify(lv_responseList)
        } else {
            lv_return = {"Status":1, "StatusMessage": 'No File Exists' }
        }
    }
    res.send(lv_return) 
})

router.post('/create', (req, res) => {
    // Request body: name, admin and assis
    lv_return = 'Error'
    lv_path = './localStorage/groups.txt'

    

    if(req.body.name == '' || req.body.name == undefined){
        lv_return = {"Status":1, "StatusMessage": 'Missing "name" in request' }
    } 
    else if(req.body.admin == '' || req.body.admin == undefined){
        lv_return = {"Status":1, "StatusMessage": 'Missing "admin" in request' }
    }
    else if(req.body.assis == '' || req.body.assis == undefined){
        lv_return = {"Status":1, "StatusMessage": 'Missing "assis" in request'}
    }
    
    else {
        if(fs.existsSync(lv_path)){
            lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
            lv_groups = JSON.parse(lv_groupsJSON)

            lv_exists = false;
            for(i=0;i<lv_groups.length;i++){
                //console.log('###I')
                if(lv_groups.name == req.body.name){
                    lv_exists = true;
                    break
                }
            }
            if(lv_exists){
                lv_return = {"Status":1, "StatusMessage": 'Group name exists, please change name' }
            } else {
                //### Find unique group ID
                lv_IDiterator = lv_groups.length
                lv_exists = false

                for(i=0;i<lv_groups.length;i++){
                    if(lv_IDiterator.toString() == lv_groups[i].gID){
                        lv_exists = true
                        lv_IDiterator += 1
                        continue
                    } 
                }

                lv_newGroup = new Group(lv_IDiterator, req.body.name, req.body.admin, req.body.assis, [req.body.admin, req.body.assis],[])
                lv_groups.push(lv_newGroup)
                fs.writeFile(lv_path, JSON.stringify(lv_groups), function(err){
                    if (err)
                        console.log(err)
                    else
                        console.log('Write Operation Complete.')
                })
                lv_return = {"Status":0, "StatusMessage": 'Group created successfully' , "group": JSON.stringify(lv_newGroup)}
            }
        } else {
            lv_return = {"Status":1, "StatusMessage": 'No File Exists' }
        }
    }
    res.send(lv_return) 
})


router.post('/delete', (req, res) => {
    // Request body: gID
    lv_return = 'Error'
    lv_path = './localStorage/groups.txt'

    

    if(req.body.gID == '' || req.body.gID == undefined){
        lv_return = "Group ID not provided (gID)"
    } else {
        if(fs.existsSync(lv_path)){
            lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
            lv_groups = JSON.parse(lv_groupsJSON)

            for (i=0; i < lv_groups.length; i++) {
                if (lv_groups[i].gID == req.body.gID) {
                    lv_groups.splice(i, 1)
                }
            }

            fs.writeFile(lv_path, JSON.stringify(lv_groups), function(err){
                if (err)
                    console.log(err)
                else
                    console.log('Write Operation Complete.')
            })
            lv_return = lv_return = {"Status":0, "StatusMessage": "Group deleted" }
        } else {
            lv_return = {"Status":1, "StatusMessage": 'No File Exists' }
        }
    }
    res.send(lv_return) 
})

router.post('/addUser', (req, res) => {
    // Request body: username and gID
    lv_return = 'Error'
    lv_path = './localStorage/groups.txt'

    if(req.body.username == '' || req.body.username == undefined){
        lv_return = {"Status":1, "StatusMessage": 'Username not provided' }
    } 
    else if(req.body.gID == '' || req.body.gID == undefined){
        lv_return = {"Status":1, "StatusMessage": 'Group ID not provided (gID)' }
    }
    else {
        if(fs.existsSync(lv_path)){
            lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
            lv_groups = JSON.parse(lv_groupsJSON)

            lv_selectedGroup = {}

            for (i=0; i < lv_groups.length; i++) {
                
                if (lv_groups[i].gID == req.body.gID) {
                    lv_groups[i].users.push(req.body.username)
                    console.log('@#3#' + lv_groups[i].users)
                }
                
            }

            
            fs.writeFile(lv_path, JSON.stringify(lv_groups), function(err){
                if (err)
                    console.log(err)
                else
                    console.log('Write Operation Complete.')
            }) 
            lv_return = lv_return = {"Status":0, "StatusMessage": "User Added to Group" }
        } else {
            lv_return = {"Status":1, "StatusMessage": 'No File Exists' }
        }
    }
    res.send(lv_return) 
})

router.post('/removeUser', (req, res) => {
    // Request body: username and gID
    lv_return = 'Error'
    lv_path = './localStorage/groups.txt'

    if(req.body.username == '' || req.body.username == undefined){
        lv_return = {"Status":1, "StatusMessage": 'Username not provided' }
    } 
    else if(req.body.gID == '' || req.body.gID == undefined){
        lv_return = {"Status":1, "StatusMessage": 'Group ID not provided (gID)' }
    }
    else {
        if(fs.existsSync(lv_path)){
            lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
            lv_groups = JSON.parse(lv_groupsJSON)
            lv_filteredGroup = {}
            lv_selectedGroup = {}
            for (i=0; i < lv_groups.length; i++) {
                if (lv_groups[i].gID == req.body.gID) {
                    for(j=0;j<lv_groups[i].users.length;j++){
                        if(req.body.username == lv_groups[i].users[j]){
                            console.log('FOUND: ' + lv_groups[i].users[j])
                            lv_fileteredGroup = lv_groups[i].users.filter(function(value, index, arr){ return value != req.body.username;})
                            console.log(lv_fileteredGroup)
                            console.log(lv_groups[i])
                            break
                        }
                    }
                   
                    lv_groups[i].users = lv_fileteredGroup
                    console.log(lv_groups)
                }
                
            }

            
             fs.writeFile(lv_path, JSON.stringify(lv_groups), function(err){
                if (err)
                    console.log(err)
                else
                    console.log('Write Operation Complete.')
            })  
            lv_return = {"Status":0, "StatusMessage": "User Removed from Group" }
        } else {
            lv_return = {"Status":1, "StatusMessage": 'No File Exists' }
        }
    }
    res.send(lv_return) 
})

router.post('/assisUser', (req, res) => {
    // Request body: username and gID
    lv_return = 'Error'
    lv_path = './localStorage/groups.txt'

    if(req.body.username == '' || req.body.username == undefined){
        lv_return = {"Status":1, "StatusMessage": 'Username not provided' }
    } 
    else if(req.body.gID == '' || req.body.gID == undefined){
        lv_return = {"Status":1, "StatusMessage": 'Group ID not provided (gID)' }
    }
    else {
        if(fs.existsSync(lv_path)){
            lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
            lv_groups = JSON.parse(lv_groupsJSON)
            lv_filteredGroup = {}
            lv_selectedGroup = {}

            for (i=0; i < lv_groups.length; i++) {
                if (lv_groups[i].gID == req.body.gID) {
                    lv_groups[i].assis = req.body.username
                }
            }

            
             fs.writeFile(lv_path, JSON.stringify(lv_groups), function(err){
                if (err)
                    console.log(err)
                else
                    console.log('Write Operation Complete.')
            })  
            lv_return = {"Status":0, "StatusMessage": "User Made Assis for Group" }
        } else {
            lv_return = {"Status":1, "StatusMessage": 'No File Exists' }
        }
    }
    res.send(lv_return) 
})
module.exports = router 