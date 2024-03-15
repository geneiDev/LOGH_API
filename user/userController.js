const express = require('express');
const router = express.Router();
const UserModel = require('./UserModel');

const dbFilePath = './db/logh.db'; // 데이터베이스 파일 경로

const userModel = new UserModel(dbFilePath);

// 사용자 로그인 엔드포인트
router.post('/login', (req, res) => {
  const { userId, userPwd } = req.body;
  userModel.login(userId, userPwd, (err, user) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Failed to log in' });
    } else {
      if (user) {
        // 로그인 성공
        res.status(200).json({ message: 'Login successful', user });
      } else {
        // 로그인 실패
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});


module.exports = router;
