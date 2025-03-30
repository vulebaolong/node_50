import 'dotenv/config'

export const DATABASE_URL = process.env.DATABASE_URL
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES

console.log({
   DATABASE_URL,
   ACCESS_TOKEN_SECRET,
   ACCESS_TOKEN_EXPIRES
});