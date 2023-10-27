// import the fethuser func from another file
const fetchuser = require('../Middleware/fetchUserdata');

const Notes = require('../models/Notes');

const express = require('express');
const router = express.Router();
// import validator
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all notes of logged in user only
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user:req.user.id}); 
        
        res.json(notes);
    } catch (error) {
        console.error("Your error is " + error);
    }
})

// ROUTE 2: ADD A NOTE USING POST: "api/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 char').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;   
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({    // creating a new mongodb folder name "notes"
            title, description, tag, user: req.user.id  
                                                        
        })
        const savenote = await note.save(); // now we are saving that variable who stores the new note into "savenote" variable & in new folder in mongodb
        res.json(savenote); // sending the savenote variable as a response

    } catch (error) {
        console.error("Your add error is " + error);
    }
})

//  ROUTE 3: UPDATE A NOTE WHICH BELONG TO THE THAT USER
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    try {
        const {title,description,tag} = req.body;
        // Create a new object
        const newnote = {};
        if(title){newnote.title = title}   
        if(description){newnote.description = description} 
        if(tag){newnote.tag = tag} 
        // Find the note to be update
        let note = await Notes.findById(req.params.id);  
        if(!note){return res.status(404).send("Not Found !")} 

        // only a particular user can update the note
        if(note.user.toString() !== req.user.id){   // it checks if the user is who changing the note is the owner
// note.user.toString() gives id of user who wants to change & req.user.id givethe id of user who logged in 
// so we telling that if the logged in user is not the one who wants to perform changes then give error 
            return res.status(401).json({error:"Please use correct account. You are not owner "})
        }
        // now all the conditions passed so it's safe to assume now the user will be right one
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newnote}, {new:true})
        // this abover function takes 3 argument => 1. id of note want to change, 2. set the prevoius value to newvalue here we changing the object
                                                    3. //new is true means means every time it creates its new
        res.json({note});
    } catch (error) {
        console.error("Your update error is " + error);
    }
})

// ROUTE 4: To delete a note using: DELETE "api/notes/deletenote"
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try {
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);  
        if(!note){return res.status(404).send("Not Found !")}

        if(note.user.toString() !== req.user.id){    
            return res.status(401).json({error:"Please use correct account. You are not owner "})
        }
        
        note = await Notes.findByIdAndDelete(req.params.id)
        
                                                    
        res.json({"Succes": "Note have been deleted",note});
    } catch (error) {
        console.error("Your delete error is " + error);
    }
})

module.exports = router;