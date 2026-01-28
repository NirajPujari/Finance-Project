import bcrypt from "bcryptjs";

export async function createHash(value: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(value, salt);
}

export async function compareHash(
  value: string,
  hashedValue: string
): Promise<boolean> {
  return bcrypt.compare(value, hashedValue);
}
