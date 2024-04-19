//user/userController.js
const express = require('express');
const router = express.Router();
const UserModel = require('./eventModel');

const dbFilePath = './db/logh.db'; // 데이터베이스 파일 경로

const userModel = new UserModel(dbFilePath);

//uuid를 검사하고 유효성을 체크
router.post('/getUuid', (req, res) => {
  const { uuid } = req.body;
  if(!uuid) {
    return res.status(200).json({ 'result' : false });
  }
  userModel.validUUID(uuid, (err, row) => {
    res.status(200).json(row);
  });
});
router.post('/login', (req, res) => {
  const { userId, userPwd } = req.body;
  userModel.checkUserID(userId, (err, result) => {
    if(!result) {
      res.status(200).json({ message: 'Invalid credentials!! : ID' });
    } else {
      userModel.loginUser(userId, userPwd, (err, user) => {
        if (err) {
          res.status(500).json({ error: 'Failed to log in' });
        } else {
          if (user) {
            // 로그인 성공
            user.IS_LOGIN = true;
            delete user.USER_PWD;
            res.status(200).json({ message: 'Login successful', user });
          } else {
            // 로그인 실패
            res.status(200).json({ message: 'Invalid credentials!! : PWD' });
          }
        }
      });
    }
  })
});

router.post('/getDailyRewards', (req, res) => {
  const { isLogin, userId,  tmpUser} = req.body;
  let result = [{
    code : '',
    message : '',
  }]
  if(!isLogin || !userId || tmpUser === 'Y') {
    result[0].message = '올바르지 않은 파라미터';
    return res.status(200).json({ result });  
  }
  userModel.getDailyRewards(userId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to log in' });
    } else {
      if (result) {
        return res.status(200).json({ result });  
      }
    }
  });
  return res.status(200).json({ result });
});
////////////////////////////


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



router.post('/update', (req, res) => {
  const { userId, userPwd } = req.body;
  console.info(userId, userPwd)
  // userModel.login(userId, userPwd, (err, user) => {
  //   if (err) {
  //     console.error('Error logging in:', err);
  //     res.status(500).json({ error: 'Failed to log in' });
  //   } else {
  //     if (user) {
  //       // 로그인 성공
  //       res.status(200).json({ message: 'Login successful', user });
  //     } else {
  //       // 로그인 실패
  //       res.status(401).json({ error: 'Invalid credentials!!' });
  //     }
  //   }
  // });
});


module.exports = router;
