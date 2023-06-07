import bcrypt from "bcrypt";

const saltRounds = 10;

export const encryptPassword = async (password) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (raw, hashDB) => {
  try {
    return await bcrypt.compare(raw, hashDB);
  } catch (error) {
    console.log(error);
  }
};
