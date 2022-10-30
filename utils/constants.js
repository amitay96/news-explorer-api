const {
  PORT = 3000,
  MONGODB_URI = 'mongodb://localhost:27017/newsexplorer',
  JWT_SECRET = 'development-secret',
  NODE_ENV,
} = process.env;

module.exports = {
  PORT, MONGODB_URI, JWT_SECRET, NODE_ENV,
};
