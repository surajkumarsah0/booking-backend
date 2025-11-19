const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

function requireAdmin(req, res, next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({error:'No token'});
  const token = auth.replace(/^Bearer\s+/i,'');
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.admin = payload;
    next();
  }catch(e){
    res.status(401).json({error:'Invalid token'});
  }
}

module.exports = { requireAdmin };
