const express = require('express');
const router = express.Router();
const authorizeRoles = require('../middlewares/roleMiddleware');
const verifyToken = require('../middlewares/authMiddleware');

//Only admin can access this route
router.get('/admin', verifyToken, authorizeRoles("admin"), (req, res) => {
  res.send({message: "Admin access granted"});
});


//Both admin and manager can access this route
router.get('/manager', verifyToken,  authorizeRoles("admin", "manager"), (req, res) => {
  res.send({message: "Manager access granted"});
});

//All users can access this route
router.get('/user', verifyToken, authorizeRoles("admin", "manager", "user"),(req, res) => {
  res.send({message: "User access granted"});
});

module.exports = router;