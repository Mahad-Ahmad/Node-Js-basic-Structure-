import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import chalk from 'chalk';
dotenv.config();

const genEmailVerificationToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.EMAIL_VERIFICATION_TIMEOUT
  });
};

const validateNDecodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(chalk.red('Error: '), err);
      return false;
    } else {
      return decoded;
    }
  });
};

const destroyToken = (token) => {
  if (!token) {
    return false;
  } else {
    const destroy = jwt.destroy(token);
  }
};

export { genEmailVerificationToken, validateNDecodeToken, destroyToken };
