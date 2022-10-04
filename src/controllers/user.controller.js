const { UserService } = require('../services');
const validateSchema = require('../validations/validateInputs');
const { addUserSchema } = require('../validations/schemas');
const { generateToken } = require('../middlewares');

const getAllUsers = async (req, res) => {
  const users = await UserService.getAllUsers();
  res.status(200).json(users);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  const user = await UserService.getUserById(id);
  if (!user) return next({ status: 404, message: 'User does not exist' });

  res.status(200).json(user);
};

const createUser = async (req, res, next) => {
  const newUser = req.body;

  const isUserInvalid = validateSchema(addUserSchema, newUser);
  if (isUserInvalid) return next({ status: 400, message: isUserInvalid.message });

  const doesUserExist = await UserService.getUserByEmail(newUser.email);
  if (doesUserExist) return next({ status: 409, message: 'User already registered' });

  const createdUser = await UserService.createUser(newUser);
  const token = generateToken(createdUser);
  res.status(201).json({ token });
};

const deleteUser = async (req, res) => {
  const { user } = req;
  await UserService.deleteUser(user.id);

  res.sendStatus(204);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};