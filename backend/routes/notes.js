const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')

// ROUTE-1 fetch all notes using GET: "/api/notes/fetchall". Login is required
router.get('/fetchall', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        onsole.log(error.message)
        res.status(500).send({ "error": "internal server error while fetching all notes" })
    }
})


// ROUTE-2 add a new note using POST: "/api/notes/addnote". Login is required
router.post('/addnote', fetchuser, [
    body('title', 'title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    // if there are errors in validation return the bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })

        res.status(200).json(note)
    } catch (error) {
        console.log("Error -> ", error.message)
        res.status(500).send({ "error": "internal server error while adding new note" })
    }
})


// ROUTE-3: Update notes using the POST: "/api/notes/updatenote" login required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    const { title, description, tag } = req.body

    // creting a newNote object
    const newNote = {};

    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    try {
        // find the note to be updated
        var note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Note not found")
        }

        // check if the user id of the user requesting for update is same for the note he's updating
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unatherised Access")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "error": "internal server error while updating the note" })
    }

})


// ROUTE-4: delete a note using the POST: "/api/notes/deletenote" login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // find the note to be deleted
        var note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Note not found")
        }

        // check if the user id of the user requesting for update is same for the note he's updating
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unatherised Access")
        }

        // note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true}) 
        note = await Notes.findByIdAndDelete(req.params.id)
        res.send("note deleted successfully")
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "error": "internal server error while deleting the note" })
    }

})


module.exports = router