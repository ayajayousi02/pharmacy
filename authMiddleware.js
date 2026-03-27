const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // لازم يكون التوكن موجود ويبدأ بـ Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // التحقق من التوكن باستخدام الـ secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // هون صار عندك كل المعلومات: id, name, email, role
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
