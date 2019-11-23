require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

async function auth(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token });

    if (!user) {
      throw new Error('Không thể xác thực');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Vui lòng xác thực' });
  }
}

module.exports = auth;
