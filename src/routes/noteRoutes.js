import express from "express";
import Note from '../models/Note.js'

const router = express.Router()

//get single note
router.get('/:id', async(req, res)=>{
    try{
        const note= await Note.findById(req.params.id)
        if(!note)
        {
            return res.status(404).json({message: "Note not found ."})
        }
        res.json(note)
    }
    catch(error)
        {
             res.status(400).json({message: error.message})
        }
    
})

//update note 
 router.put('/:id', async(req,res)=>
 {
    try{
        const note = await Note.findById(req.params.id);
        if(!note)
        {
            return res.status(400).json({message:"Note not found "});
        }
        if(req.body.title)note.title=req.body.title;
        if(req.body.content)note.content = req.body.content;
        if(req.body.color)note.title=req.body.color;

        const updatedNote = await note.save()
        res.json(updatedNote)
    }
    catch(error)
    {
          return res.status(400).json({message: error.message})
    }
})

//Create a note 
router.post('/' ,async(req , res)=> 
{
    const note = new Note ({
        title: req.body.title,
        content :req.body.content,
        color: req.body.color,

    })

     try 
     {
        const newNote = await note.save()
        res.status(201).json(newNote)
     }
     catch
     {
        res.status(400).json({message: error.message})
     }

})


// delete note 
router.delete('/:id', async(req, res) => 
{
    try{
        const note = await Note.findById(req.params.id)
        if(!note)
        {
            return res.status(400).json({messag: "Note not found "})
        }
        
        await note.deleteOne()
        res.json({message: "Note Deleted "})
    }

    catch(error)
    {
        res.status(500).json({message: error.message})
    }
})

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find(); 
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router