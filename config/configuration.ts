export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3001,
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    uid: process.env.DB_UID,
    pwd: process.env.DB_PWD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
