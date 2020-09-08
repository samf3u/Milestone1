const express = require('express');
const { unescapeLeadingUnderscores } = require('typescript');
const router = express.Router()
var fs = require('fs');

class Room {
    constructor(rID, name, users, history) {
        this.rID = rID;
        this.name = name;
        this.users = users;
        this.history = history
    }
}

router.post('/create', (req, res) => {
    // Request body: gID and Room name

    lv_return = ''
    lv_path = './localStorage/groups.txt'

    if (req.body.gID == '' || req.body.gID == undefined){
        lv_return =  {"Status":1, "StatusMessage": 'gID not supplied' }
    } else {
        if (req.body.name == '' || req.body.name == undefined){
            lv_return =  {"Status":1, "StatusMessage": 'name not supplied' }
        } else {
            if(fs.existsSync(lv_path)){
                lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
                lv_groups = JSON.parse(lv_groupsJSON)

                for (i=0; i < lv_groups.length; i++) {
                    lv_IDiterator = lv_groups.length
                    lv_exists = false

                    for(let j=0; j<lv_groups[i].rooms.length;j++){
                        if(lv_groups[i].rooms[j].rID == lv_IDiterator.toString()){
                            lv_exists = true
                            lv_IDiterator += 1
                            continue
                        }
                    }

                    if (lv_groups[i].gID == req.body.gID) {
                        lv_newRoom = new Room(lv_IDiterator.toString(), req.body.name, lv_groups[i].users, [])
                        lv_groups[i].rooms.push(lv_newRoom)
                    }

                    
                    
                }
                fs.writeFile(lv_path, JSON.stringify(lv_groups), function(err){
                        if (err)
                            console.log(err)
                        else
                            console.log('Write Operation Complete.')
                    })
                lv_return = {"Status":0, "StatusMessage": 'Room created successfully', "room": JSON.stringify(lv_newRoom)}
            } else {
               lv_return =  {"Status":1, "StatusMessage": 'File does not exist' }
            }
        }
    }   

    res.send(lv_return) 
})

router.post('/addUser', (req, res) => {
    // Request body: username, gID and rID

    lv_return = ''
    lv_path = './localStorage/groups.txt'

    if (req.body.username == '' || req.body.username == undefined){
        lv_return =  {"Status":1, "StatusMessage": 'Username not supplied' }
    }
    else if(req.body.rID == '' || req.body.rID == undefined) {
        lv_return =  {"Status":1, "StatusMessage": 'rID not supplied' }
    }
    else {
        if (req.body.gID == '' || req.body.gID == undefined){
            lv_return =  {"Status":1, "StatusMessage": 'gID not supplied' }
        } else {
            if(fs.existsSync(lv_path)){
                lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
                lv_groups = JSON.parse(lv_groupsJSON)

                for (i=0; i < lv_groups.length; i++) {
                    if(req.body.gID == lv_groups[i].gID){
                        for(let j=0; j<lv_groups[i].rooms.length;j++){
                            if(req.body.rID == lv_groups[i].rooms[j].rID){
                                for(let k=0; k<lv_groups[i].rooms[j].users.length;k++){
                                    lv_groups[i].rooms[j].users.push(req.body.username)
                                    break
                                }
                            }
                        }
                    }

                    
                    
                }
                 fs.writeFile(lv_path, JSON.stringify(lv_groups), function(err){
                        if (err)
                            console.log(err)
                        else
                            console.log('Write Operation Complete.')
                    }) 
                lv_return = {"Status":0, "StatusMessage": 'User added to room successfully' }
            } else {
               lv_return =  {"Status":1, "StatusMessage": 'File does not exist' }
            }
        }
    }   

    res.send(lv_return) 
})

router.post('/removeUser', (req, res) => {
    // Request body: username, gID and rID

    lv_return = ''
    lv_path = './localStorage/groups.txt'

    if (req.body.username == '' || req.body.username == undefined){
        lv_return =  {"Status":1, "StatusMessage": 'Username not supplied' }
    }
    else if(req.body.rID == '' || req.body.rID == undefined) {
        lv_return =  {"Status":1, "StatusMessage": 'rID not supplied' }
    }
    else {
        console.log('gID ' + req.body.gID)
        if (req.body.gID == '' || req.body.gID == undefined){
            lv_return =  {"Status":1, "StatusMessage": 'gID not supplied' }
        } else {
            if(fs.existsSync(lv_path)){
                lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
                lv_groups = JSON.parse(lv_groupsJSON)

                for (i=0; i < lv_groups.length; i++) {
                    if(req.body.gID == lv_groups[i].gID){
                        for(let j=0; j<lv_groups[i].rooms.length;j++){
                            if(req.body.rID == lv_groups[i].rooms[j].rID){
                                for(let k=0; k<lv_groups[i].rooms[j].users.length;k++){
                                    lv_fileteredGroup = lv_groups[i].rooms[j].users.filter(function(value, index, arr){ return value != req.body.username;})
                                    lv_groups[i].rooms[j].users = lv_fileteredGroup
                                    break
                                }
                            }
                        }
                    }

                    
                    
                }
                 fs.writeFile(lv_path, JSON.stringify(lv_groups), function(err){
                        if (err)
                            console.log(err)
                        else
                            console.log('Write Operation Complete.')
                    }) 
                lv_return = {"Status":0, "StatusMessage": 'User removed from room successfully' }
            } else {
               lv_return =  {"Status":1, "StatusMessage": 'File does not exist' }
            }
        }
    }   

    res.send(lv_return) 
})

router.post('/addUser', (req, res) => {
    // Request body: username, gID and rID

    lv_return = ''
    lv_path = './localStorage/groups.txt'

    if (req.body.username == '' || req.body.username == undefined){
        lv_return =  {"Status":1, "StatusMessage": 'Username not supplied' }
    }
    else if(req.body.rID == '' || req.body.rID == undefined) {
        lv_return =  {"Status":1, "StatusMessage": 'rID not supplied' }
    }
    else {
        if (req.body.gID == '' || req.body.gID == undefined){
            lv_return =  {"Status":1, "StatusMessage": 'gID not supplied' }
        } else {
            if(fs.existsSync(lv_path)){
                lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
                lv_groups = JSON.parse(lv_groupsJSON)

                for (i=0; i < lv_groups.length; i++) {
                    if(req.body.gID == lv_groups[i].gID){
                        for(let j=0; j<lv_groups[i].rooms.length;j++){
                            if(req.body.rID == lv_groups[i].rooms[j].rID){
                                for(let k=0; k<lv_groups[i].rooms[j].users.length;k++){
                                    lv_groups[i].rooms[j].users.push(req.body.username)
                                    break
                                }
                            }
                        }
                    }

                    
                    
                }
                 fs.writeFile(lv_path, JSON.stringify(lv_groups), function(err){
                        if (err)
                            console.log(err)
                        else
                            console.log('Write Operation Complete .')
                    }) 
                lv_return = {"Status":0, "StatusMessage": 'User added to room successfully' }
            } else {
               lv_return =  {"Status":1, "StatusMessage": 'File does not exist' }
            }
        }
    }   

    res.send(lv_return) 
})

router.post('/saveChat', (req, res) => {
    // Request body: history, gID and rID

    lv_return = ''
    lv_path = './localStorage/groups.txt'

    if (req.body.history == '' || req.body.history == undefined){
        lv_return =  {"Status":1, "StatusMessage": 'History not supplied' }
    }
    else if(req.body.rID == '' || req.body.rID == undefined) {
        lv_return =  {"Status":1, "StatusMessage": 'rID not supplied' }
    }
    else {
        if (req.body.gID == '' || req.body.gID == undefined){
            lv_return =  {"Status":1, "StatusMessage": 'gID not supplied' }
        } else {
            if(fs.existsSync(lv_path)){
                lv_groupsJSON = fs.readFileSync(lv_path, 'utf-8')
                lv_groups = JSON.parse(lv_groupsJSON)

                for (i=0; i < lv_groups.length; i++) {
                    if(req.body.gID == lv_groups[i].gID){
                        for(let j=0; j<lv_groups[i].rooms.length;j++){
                            if(req.body.rID == lv_groups[i].rooms[j].rID){
                                for(let k=0; k<lv_groups[i].rooms[j].users.length;k++){
                                    lv_groups[i].rooms[j].history = req.body.history
                                    break
                                }
                            }
                        }
                    }

                    
                    
                }
                 fs.writeFile(lv_path, JSON.stringify(lv_groups), function(err){
                        if (err)
                            console.log(err)
                        else
                            console.log('Write Operation Complete.')
                    }) 
                lv_return = {"Status":0, "StatusMessage": 'User removed from room successfully' }
            } else {
               lv_return =  {"Status":1, "StatusMessage": 'File does not exist' }
            }
        }
    }   

    res.send(lv_return) 
})
module.exports = router 