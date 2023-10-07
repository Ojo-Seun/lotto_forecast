export default () => ({
  DB_URI: process.env.NODE_ENV === 'development' ? process.env.LOCAL_DB_URI : process.env.PRO_DB_URI,
  PORT: process.env.NODE_ENV === 'development' ? 8000 : parseInt(process.env.PORT!, 10),
  JWT_SECRET: process.env.JWT_SECRET,
  HOST: process.env.MAIL_HOST,
  USER: process.env.MAIL_USER_NAME,
  PASS: process.env.MAIL_PWD,
})
