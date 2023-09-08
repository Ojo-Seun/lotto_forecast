export default () => ({
  DB_URL: process.env.NODE_ENV === 'development' ? process.env.LOCAL_DB_URL : process.env.PRO_DB_URL,
  PORT: process.env.NODE_ENV === 'development' ? 3000 : parseInt(process.env.PORT!, 10),
  JWT_SECRETE: process.env.JWT_SECRETE,
  HOST: process.env.MAIL_HOST,
  USER: process.env.MAIL_USER_NAME,
  PASS: process.env.MAIL_PWD,
})
