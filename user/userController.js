//user/userController.js
const express = require('express');
const router = express.Router();
const UserModel = require('./userModel');

const dbFilePath = './db/logh.db'; // 데이터베이스 파일 경로

const userModel = new UserModel(dbFilePath);
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

router.post('/createUser', (req, res) => {
  const { uuid } = req.body;
  userModel.createUser(uuid, (err, user) => {
    if (err) {
      console.error('Error createUser:', err);
      res.status(500).json({ error: 'Failed to createUser' });
    } else {
      
    }
  });
});

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
        res.status(401).json({ error: 'Invalid credentials!!' });
      }
    }
  });
});


module.exports = router;
