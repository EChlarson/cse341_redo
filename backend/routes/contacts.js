//Sets up a router object using Express.
const express = require('express');
const router = express.Router();

//Imports the logic for handling these routes from the controllers/contacts.js file.
//This keeps your route definitions clean while putting the actual “work” (database queries, data processing, etc.) in a separate controller file.
const contactsController = require('../controllers/contacts');

const { ObjectId } = require('mongodb');

//GET - Gets all contacts
router.get('/', contactsController.getAll);

//GET - Gets a single contact based on an ID
router.get('/:id', contactsController.getSingle);

// POST - Create a new contact
router.post('/', contactsController.createContact);

// PUT - Update a contact by ID
router.put('/:id', contactsController.updateContact);

// DELETE - Delete a contact by ID
router.delete('/:id', contactsController.deleteContact);

//Exports this router so it can be used in index.js, which then plugs into app.js.
module.exports = router;