export const config = () => ({
  jwtSecret: process.env.JWT_SECRET,
  database: {
    type: process.env.DB_TYPE,
    url: process.env.DB_URL,
  },
});
