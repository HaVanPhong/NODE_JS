const path = require("path");
const gracefulFs = require("graceful-fs");

const Post = require("../models/Post.model");

const { isDenyMimeType, randomFileName } = require("../utils/fileType");

const ResponseError = require("../helpers/ResponseError");

module.exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author");

  res.status(200).json({
    statusCode: 200,
    posts,
  });
};

module.exports.createNewPost = async (req, res, next) => {
  const { ...body } = req.body;
  const { ...file } = req.file;

  if (isDenyMimeType(file.mimetype)) {
    throw new ResponseError(400, "File type not allowed");
  }

  const fileName = randomFileName(file.originalname);

  gracefulFs.writeFile(
    path.join(__dirname, `../public/uploads/${fileName}`),
    file.buffer,
    { encoding: "utf-8" },
    async (err) => {
      if (err) {
        // chỗ này không throw được nên phải dùng next
        // bởi vì function này là call back
        next(new ResponseError(500, "File cannot be written"));
      }

      // sau khi ghi file thành công thì lưu bản ghi vào db
      const newPost = await Post.create({
        title: body.title,
        content: body.content,
        image: `/uploads/${fileName}`,
      });

      res.status(201).json(newPost);
    }
  );
};
