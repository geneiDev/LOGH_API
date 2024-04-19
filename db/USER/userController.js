//user/userController.js
const express = require('express');
const router = express.Router();
const userSource = require('./userModel');
const dbFilePath = './db/logh.db'; // 데이터베이스 파일 경로
const userModel = new userSource(dbFilePath);

router.post('/login', (req, res) => {
  const { userId, userPwd } = req.body;
  userModel.loginUser(userId, userPwd, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Failed to log in' });
    } else {
      res.status(200).json({ message: 'Login successful', user });
    }
  });
});






//uuid로 회원 가입 여부 체크
router.post('/isRegisted', (req, res) => {
  const { uuid } = req.body;
  userModel.isRegisted(uuid, (err, user) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Failed to log in' });
    } else {
      const result = 'Y';
      res.status(200).json({ result, user });
    }
  });
});


module.exports = router;