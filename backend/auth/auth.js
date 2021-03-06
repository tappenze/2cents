/**
 * @fileoverview This file provides a middleware function for verifying jwtse
 * @author Chris Koehne <cdkoehne@gmail.com>
 */

module.exports = {
  authenticateJWT: function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token);
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
          res.sendStatus(401);
        }
        next();
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
