
const jwt = require('jsonwebtoken');
 const Verify_Token_On_Client = async (req, res, next) => {
    try {
      const secretKey = 'btt';
      const token = req.headers['token'];
  
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          // return res.status(401).json({message:'Client Token is invalid'})
          next()
        } else {
          next();
         
        }
      });
    
    } catch (error) {
      next();
      // return res.status(400).json({message:error})

      
    }
  }




module.exports = {
    Verify_Token_On_Client
    
};


