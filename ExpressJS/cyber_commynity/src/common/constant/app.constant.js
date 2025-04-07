import 'dotenv/config'

export const DATABASE_URL = process.env.DATABASE_URL

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET


console.log({
   DATABASE_URL,
   ACCESS_TOKEN_SECRET,
   ACCESS_TOKEN_EXPIRES,
   REFRESH_TOKEN_SECRET,
   REFRESH_TOKEN_EXPIRES,
   GOOGLE_CLIENT_ID,
   GOOGLE_CLIENT_SECRET
});