import { userService } from '../services/index.js';

const signIn = async (req, res, next) => {
  await userService.signIn(req, res, next);
};

const signUp = async (req, res, next) => {
  await userService.signUp(req, res, next);
};

export { signIn, signUp };
