# Milestone1

## GIT:

### Layout:

The layout for the Git repository used in the first assignment is similar to a default Angular project. The project file consists of everything that is created by Angular when initiating a project, with one exception being the server folder. The server folder was created manually inside the Angular project. Once created, an express project was initiated. The reason for this is to simply make the server more accessable and in the same folder rather than having to find both folders when using the command prompt.

### Version Control Approach: 

The approach that I took for version control is that everytime I would stop working on the project or whenever I would take a small break, I made a commit with a message of what has been changed. I came accross some issues when trying to push to the remote repository even though I had already pushed a number of times. Due to these issues I had to create a new repository and write my commits again.

### Git Log:

 
1. **Date:** Friday 04/09/20 9:15AM  
**Command:** Git remote add orgin https://github.com/samf3u/Milestone1.git  
**Description:** Sets the remote name to origin for the remote repository  

2. **Date:** Friday 04/09/20 9:20AM  
**Command:** Git clone origin  
**Description:** Copy the content of the remote repository

3. **Date:** Friday 04/09/20 10:10AM  
**Command:** Copy and paste  
**Description:** Copy new files into the local repository 

4. **Date:** Friday 04/09/20 10:11AM  
**Command:** Git add .  
**Description:** Adds the files that were just copied 

5. **Date:** Friday 04/09/20 10:14AM  
**Command:** Git commit -m 'First Commit'   
**Description:** Commit the changes 

6. **Date:** Friday 04/09/20 10:16AM  
**Command:** Git push origin master   
**Description:** Pushes the changes to the remote repository

Following this, every time a change was made, step 4, 5 and 6 was repeated with a different commit message.

## DATA STRUCTURES:

        USER {  
          uID : String;		// User ID  
          username: String;	  
          email: String;  
          password: String;  
          role: String;		// Admin, Super, User  
        }

        GROUP {  
          gID : String;		//Group ID  
          name: String;  
          admin: String;  
          assis: String;  
          users: [String];		// Users in group  
          rooms: [Room];		// List of rooms with room type  
        }

        ROOM{  
          rID : String;		// Room ID  
          name: String;  
          users: [String];		// Users in room  
          history: [String];	// Chat history  
        }

## REST API:

ROUTE | REQUEST BODY | RESPONSE | DESCRIPTION
----|-----|-----|----
**Login**||
login/auth|username and password|logged in user | checks if user exists
login/create|username and email| status and statusMessage | create a new user
login/delete|username|status and statusMessage | delete existing user
**Groups**||
groups/fetch|user ID|groups for this user | get groups for logged in user
groups/create|group name, admin and assis| status and statusMessage | create new group
groups/delete| group ID| status and statusMessage | delete existing group
groups/addUser| username and group ID| status and statusMessage| add user to a group
groups/removeUser| username and group ID|  status and statusMessage| remove user from a group
groups/assisUser| username and group ID|  status and statusMessage| change the assis of a group
**Rooms**||
rooms/create|group ID and room name| status, statusMessage and new room| create a new room
rooms/addUser| username, group ID and room ID|status and statusMessage| add user to a room
rooms/removeUser| username, group ID and room ID|status and statusMessage| remove user from a room
rooms/saveChat| history, group ID and room ID| status and statusMessage| save the chat history of a room


## ANGULAR ARCHITECTURE:

### Models:
The models used for the angular architecture are provided in the 'Data Structures' section. 

### Components:
* **Login Component:** User can enter username and password
* **Groups Component:** If user logs in successfully, the user's groups are displayed
* **Rooms Component:** When a group is clicked, the rooms for this group are displayed
* **Chat Component:** When a room is clicked, the chat for this room is displayed



