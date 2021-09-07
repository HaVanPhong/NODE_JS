const Joi = require("joi");

const postValidateField = {
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().min(3).max(2000).required(),
  userId: Joi.number().integer().greater(0).required(),
};

const postSchema = Joi.object(postValidateField);

module.exports.postValidate = (post) => postSchema.validate(post);

module.exports.postUpdateValidate = (post) => {
  let postSchemaUpdate = {};

  if (post.title) {
    postSchemaUpdate = {
      ...postSchemaUpdate,
      title: postValidateField.title,
    };
  }

  if (post.content) {
    postSchemaUpdate = {
      ...postSchemaUpdate,
      content: postValidateField.content,
    };
  }

  if (post.userId) {
    postSchemaUpdate = {
      ...postSchemaUpdate,
      userId: postValidateField.userId,
    };
  }

  return Joi.object(postSchemaUpdate).validate(post);
};
