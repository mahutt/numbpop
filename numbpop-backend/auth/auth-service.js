import bcrypt from 'bcryptjs'

async function hashPassword(plainTextPassword) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(plainTextPassword, salt)
  return hash
}

async function comparePasswords(plainTextPassword, hash) {
  return await bcrypt.compare(plainTextPassword, hash)
}

export { hashPassword, comparePasswords }
