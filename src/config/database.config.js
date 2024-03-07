import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      retryWrites: true,
      useUnifiedTopology: true,
      majority: true
    });

    console.log(chalk.yellow(' 👉 Temple-Day-Spa database connected successfully!'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDatabase;
