const { UserService } = require('../services');
const validateSchema = require('../validations/validateInputs');
const { addUserSchema } = require('../validations/schemas');
const { generateToken } = require('../middlewares');

const getAll = async (req, res) => {
  const users = await UserService.getAll();
  res.status(200).json(users);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const user = await UserService.getById(id);
  if (!user) return next({ status: 404, message: 'User does not exist' });

  res.status(200).json(user);
};

const create = async (req, res, next) => {
  const newUser = req.body;

  const isUserInvalid = validateSchema(addUserSchema, newUser);
  if (isUserInvalid) return next({ status: 400, message: isUserInvalid.message });

  const doesUserExist = await UserService.getUserByEmail(newUser.email);
  if (doesUserExist) return next({ status: 409, message: 'User already registered' });

  const createdUser = await UserService.create(newUser);
  const token = generateToken(createdUser);
  res.status(201).json({ token });
};

const deleteById = async (req, res) => {
  const { user } = req;
  await UserService.deleteById(user.id);

  res.sendStatus(204);
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};