const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact 
} = require("../controllers/contactsControllers");
const {validateBody, isEmptyBody, isValidId, isEmptyFavorit,authenticate} = require('../middlewares/index')
const { createContactSchema, updateContactSchema,contactUpdateFavoriteSchema} = require("../models/Contact");

const contactsRouter = express.Router();

contactsRouter.use(authenticate)

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.post("/", isEmptyBody,validateBody(createContactSchema),createContact);

contactsRouter.put("/:id", isValidId, isEmptyBody, validateBody(updateContactSchema),updateContact);

contactsRouter.patch('/:id/favorite', isValidId, isEmptyFavorit, validateBody(contactUpdateFavoriteSchema), updateStatusContact )

contactsRouter.delete("/:id", isValidId, deleteContact);

module.exports = contactsRouter;
