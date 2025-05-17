const mongodb = require('../db/connect'); //Imports your custom database connection module.
const ObjectId = require('mongodb').ObjectId; //Lets you work with MongoDB's _id field, which is a special object type (not just a string).

// GET all contacts
const getAll = async (req, res, next) => { //Connects to the contacts collection in the database.
  const result = await mongodb.getDatabase().collection('contacts').find(); //Runs .find() to get all documents (contacts).
  result.toArray().then((contacts) => { //Converts the results into an array with .toArray().
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts); //Sends the array back to the client as a JSON response.
  });
};

// GET a single contact by ID
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id); // Convert the id from the request params to a MongoDB ObjectId
  
  // Access the database and search the 'contacts' collection for a document with that _id
  const result = await mongodb
    .getDatabase()
    .collection('contacts')
    .find({ _id: userId });
  
  // Convert the result (a cursor) to an array
  result.toArray().then((contacts) => {
    // Set the response header to indicate JSON content
    res.setHeader('Content-Type', 'application/json');
    // Send the first (and only) result back to the client with a 200 OK status
    res.status(200).json(contacts[0]);
  });
};

// POST (create) a new contact
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const response = await mongodb.getDatabase().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ error: 'Failed to create contact' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

//Put (update) an existing contact
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const updatedData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb
      .getDatabase()
      .collection('contacts')
      .updateOne({ _id: contactId }, { $set: updatedData });

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Contact not found or no changes made' });
    } else {
      res.status(200).json({ message: 'Contact updated successfully' });
    }
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'An error occurred while updating the contact' });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  const db = require('../db/connect').getDatabase();
  const contactId = new ObjectId(req.params.id);

  try {
    const result = await db.collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};