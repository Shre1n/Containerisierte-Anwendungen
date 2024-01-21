import * as bcrypt from 'bcrypt';

export const getRandomString = async (): Promise<string> => {
  const number = Math.random()
  const saltRounds = 10;

  return await bcrypt.hash(String(number), saltRounds);
};

export const compare = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
