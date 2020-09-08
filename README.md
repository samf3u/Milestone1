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

