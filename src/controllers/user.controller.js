const { UserService } = require('../services');
const { validateNewUser } = require('../validations/validateInputs');
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
  const { displayName, email, password, image } = req.body;

  const isUserInvalid = validateNewUser(displayName, email, password, image);
  if (isUserInvalid) return next({ status: 400, message: isUserInvalid.message });

  const doesUserExist = await UserService.getUserByEmail(email);
  if (doesUserExist) return next({ status: 409, message: 'User already registered' });

  const newUser = await UserService.createUser(displayName, email, password, image);
  const token = generateToken(newUser);
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