import { User } from '../models/index.js';
import { hashPassword } from '../utilities/bcrypt.utility.js';
import { comparePassword } from '../utilities/bcrypt.utility.js';
import { generateAuthToken } from '../utilities/authentication.utility.js';
import { APIError, sendResponse } from '../utilities/index.js';
import { HTTP_STATUS_CODES } from '../constants/status-code.constant.js';
import { MESSAGE } from '../constants/index.js';

const createDefaultAdmin = async () => {
  const adminObj = {
    firstName: 'Megan',
    lastName: 'Smith',
    email: 'admin@gmail.com',
    password: 'admin'
  };

  try {
    let admin = await User.findOne({ email: adminObj.email });

    if (!admin) {
      const hashedPassword = await hashPassword(adminObj.password);
      await User.create({
        ...adminObj,
        password: hashedPassword
      });
    }
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const checkPassword = await comparePassword(password, user.password);
      if (checkPassword) {
        const accessToken = await generateAuthToken({
          id: user._id,
          emial: user.email
        });
        sendResponse(res, { user, accessToken }, 'Successfully logged in');
      } else {
        throw new APIError({
          errors: MESSAGE.INVALID_CREDENTIALS,
          message: 'Please provide correct Credentials',
          status: HTTP_STATUS_CODES.BAD_REQUEST
        });
      }
    } else {
      throw new APIError({
        errors: MESSAGE.INVALID_CREDENTIALS,
        message: 'Please provide correct Credentials',
        status: HTTP_STATUS_CODES.BAD_REQUEST
      });
    }
  } catch (err) {
    next(err);
  }
};

const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return { status: false, message: 'An Account is already aassociated with this email' };
    } else {
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      sendResponse(res, user, 'User created Successfully');
    }
  } catch (err) {
    next(err);
  }
};

export { createDefaultAdmin, signIn, signUp };
