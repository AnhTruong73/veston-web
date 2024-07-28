export default function CheckSessionToken(token) {
  try {
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.SECRET_KET;
    if (token) {
      const tokenInfor = jwt.decode(token, JWT_SECRET);
      if (tokenInfor.exp * 1000 <= Date.now()) {
        return false;
      }
      return tokenInfor.id;
    } else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}
