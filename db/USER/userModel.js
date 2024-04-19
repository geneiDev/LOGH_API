//userModel.js
const sqlite3 = require('sqlite3').verbose();
const createUserTables = require('./createUserTables');

class UserModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath);
    this.init();
  }
  // init 함수에서 createUserTables를 사용합니다.
  init(callback) {
    createUserTables(this.db, callback);
  }



  loginUser(userId, userPwd, callback) {
    const selectQuery = `SELECT * FROM TBL_USER_MAIN WHERE USER_ID = ? AND USER_PWD = ?`;
    this.db.get(selectQuery, [userId, userPwd], callback);
  }

  isRegisted(uuid, callback) {
    console.info('isRegisted : ', uuid)
    const selectQuery = `SELECT * FROM TBL_USER_MAIN WHERE UUID = ?`;
    this.db.get(selectQuery, [uuid], (err, row) => {
      if (err) {
        console.error('Error checking user:', err);
        callback(err, null);
      } else {
        if (!row) {
          const userId = uuid.substring(0, 8);
          const userPwd = uuid;
          this.createUser(userId, userPwd, uuid, (err) => {
            if (err) {
              callback(err, null);
            } else {
              this.loginUser(userId, userPwd, (err, user) => {
                if (err) {
                  console.error('Error logging in user:', err);
                  callback(err, null);
                } else {
                  console.log('User registered and logged in successfully:', user);
                  callback(null, user);
                }
              });
            }
          });
        } else {
          // 사용자가 이미 존재하는 경우 조회 결과를 반환합니다.
          console.info('exist user:', row);
          callback(null, row);
        }
      }
    });
  }

  createUser(userId, userPwd, uuid, callback) {
    const insertQuery = `INSERT INTO TBL_USER_MAIN (USER_ID, USER_PWD, UUID) VALUES (?, ?, ?)`;
    this.db.run(insertQuery, [userId, userPwd, uuid], function(err) {
      if (err) {
        console.error('Error inserting user:', err.message);
        callback(err);
      } else {
        console.log(`User inserted successfully. ${this.lastID}th user`);
        callback(null, this.lastID);
      }
    });
  }
  
  

  // 다른 CRUD 메서드들도 추가할 수 있습니다.
}

module.exports = UserModel;
