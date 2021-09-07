const { User, Post } = require("../sequelize");

const {
  postValidate,
  postUpdateValidate,
} = require("../validations/post.validate");

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: { exclude: ["password"] },
      },
    });

    res.status(200).json({
      statusCode: 200,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports.findPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOne({
      where: {
        id: postId,
      },
      include: {
        model: User,
        attributes: { exclude: ["password"] },
      },
    });

    if (!post) {
      return res.status(404).json({
        statusCode: 404,
        error: `Not found post by id: ${postId}`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      post,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports.createNewPost = async (req, res) => {
  try {
    const { userId } = req.body;

    const { value, error } = postValidate(req.body);

    if (error) {
      return res.status(400).json({
        statusCode: 400,
        error: error,
      });
    }

    const user = await User.scope("withoutPassword").findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        error: `Not found post by id: ${userId}`,
      });
    }

    const post = await Post.create(value);

    res.status(201).json({
      statusCode: 201,
      post,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports.editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const { value, error } = postUpdateValidate(req.body);

    if (error) {
      return res.status(400).json({
        statusCode: 400,
        error: error,
      });
    }

    const post = await Post.findOne({
      where: {
        id: postId,
      },
      include: {
        model: User,
        attributes: { exclude: ["password"] },
      },
    });

    if (!post) {
      return res.status(404).json({
        statusCode: 404,
        error: `Not found post by id: ${postId}`,
      });
    }

    if (userId) {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          error: `Not found user by id: ${userId}`,
        });
      }
    }

    const updatedPost = await post.update(value);

    res.status(200).json({
      statusCode: 200,
      user: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOne({
      where: {
        id: postId,
      },
      include: {
        model: User,
        attributes: { exclude: ["password"] },
      },
    });

    if (!post) {
      return res.status(404).json({
        statusCode: 404,
        error: `Not found post by id: ${postId}`,
      });
    }

    const deletedPost = await post.destroy();

    res.status(200).json({
      statusCode: 200,
      post: deletedPost,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
};
