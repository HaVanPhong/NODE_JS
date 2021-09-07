const { User } = require("../sequelize");

const {
  userValidate,
  userUpdateValidate,
} = require("../validations/user.validate");

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.scope("withoutPassword").findAll();

    res.status(200).json({
      statusCode: 200,
      users,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports.findUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // const user = await User.scope("withoutPassword").findByPk(userId);
    const user = await User.scope("withoutPassword").findOne({
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

    res.status(200).json({
      statusCode: 200,
      user,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports.createNewUser = async (req, res) => {
  try {
    const { value, error } = userValidate(req.body);

    if (error) {
      return res.status(400).json({
        statusCode: 400,
        error: error,
      });
    }

    const user = await User.create(value);

    res.status(201).json({
      statusCode: 201,
      user,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports.editUser = async (req, res) => {
  try {
    const { userId } = req.params;

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

    const { value, error } = userUpdateValidate(req.body);

    if (error) {
      return res.status(400).json({
        statusCode: 400,
        error: error,
      });
    }

    const updatedUser = await user.update(value);

    res.status(200).json({
      statusCode: 200,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // const user = await User.scope("withoutPassword").findByPk(userId);
    const user = await User.scope("withoutPassword").findOne({
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

    const deletedUser = await user.destroy();

    res.status(200).json({
      statusCode: 200,
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
};
