const {Schema, model} = require('mongoose');
const Joi = require("joi");
const {handleSaveError,addUpdateSettings} = require("./hooks")
const contactSchema = new Schema(  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {
    versionKey: false,
    timestamps: true,
});


const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  
  const updateContactSchema = Joi.object({
    name: Joi.string(),
    email:Joi.string(),
    phone:Joi.string(),
    favorite: Joi.boolean(),
  });

  const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean(),
  })
  

contactSchema.post("save", handleSaveError);

contactSchema.pre('findOneAndUpdate', addUpdateSettings);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact",contactSchema);

module.exports = {
    Contact,
    createContactSchema,
    updateContactSchema,
    contactUpdateFavoriteSchema,
  };
  