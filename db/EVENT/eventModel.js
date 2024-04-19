//userModel.js
const sqlite3 = require('sqlite3').verbose();

class UserModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath);
    this.init();
  }
  init(callback) {
    console.info('createUserTableQuery()');
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS TBL_USER_MAIN (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        USER_ID TEXT NOT NULL,
        USER_PWD TEXT,
        USER_NAME TEXT DEFAULT '',
        USER_PIC TEXT DEFAULT '/images/person/CH_000000.png',
        UUID INTEGER NOT NULL,
        TMP_USER TEXT DEFAULT 'Y',
        LANG_TYPE TEXT DEFAULT 'KR',
        LAST_LOGIN TEXT DEFAULT 'W',
        POINT INTEGER DEFAULT 0,
        REG_DT DATE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT uuid_unique UNIQUE (UUID)
      )
    `;
    const createUserPointTableQuery = `
      CREATE TABLE IF NOT EXISTS TBL_USER_POINT (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        UUID INTEGER NOT NULL,
        POINT_FLAG TEXT NOT NULL,
        POINT_TEXT TEXT NOT NULL,
        POINT INTEGER DEFAULT 0,
        CONSTRAINT uuid_unique UNIQUE (UUID)
      )
    `;
    this.db.run(createUserTableQuery, function(err) {
      if (err) {
        console.error('Error creating user table:', err.message);
        if (callback) {
          callback(err);
        }
      } else {
        console.log('User table created successfully. ■□□□□');
        if (callback) {
          callback(null);
        }
      }
    });
    this.db.run(createUserPointTableQuery, function(err) {
      if (err) {
        console.error('Error creating user table:', err.message);
        if (callback) {
          callback(err);
        }
      } else {
        console.log('User table created successfully. ■■□□□');
        if (callback) {
          callback(null);
        }
      }
    });
  }
  /** @회원가입 */
  //UUID 유효성 검사
  validUUID(uuid, callback) {
    console.info(uuid, callback)
    const selectQuery = `SELECT USER_ID FROM TBL_USER_MAIN WHERE UUID = ?`;
    this.db.get(selectQuery, [uuid], (err, row) => {
      callback(err, row);
    });
  }

  /** @로그인 */
  //사용자 ID존재 여부를 체크한다.
  checkUserID(userId, callback) {
    const selectQuery = `SELECT * FROM TBL_USER_MAIN WHERE USER_ID = ?`;
    this.db.get(selectQuery, [userId], function(err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
  //ID와 PWD로 로그인 시도
  loginUser(userId, userPwd, callback) {
    const selectQuery = `SELECT * FROM TBL_USER_MAIN WHERE USER_ID = ? AND USER_PWD = ?`;
    this.db.get(selectQuery, [userId, userPwd], callback);
  }
  getDailyRewards(userId, callback) {
    const selectQuery = `SELECT * FROM TBL_USER_MAIN WHERE USER_ID = ?`;
    this.db.get(selectQuery, [userId], (err, row) => {
      if(row) {
        const selectQuery = `SELECT * FROM TBL_USER_MAIN WHERE USER_ID = ?`;
        
      }

    });
  }


  //임시 사용자 여부
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
  


}

module.exports = UserModel;
