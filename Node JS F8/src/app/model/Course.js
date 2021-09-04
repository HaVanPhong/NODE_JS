const mogoose = require('mongoose');
const Schema = mogoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');

const Course = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String },
    img: { type: String },
    videoId: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    deletedAt: {type: Date},
  },
  {
    timestamps: true,
  },
  );
  
  //add plugin 
mogoose.plugin(slug);
Course.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mogoose.model('Course', Course);
