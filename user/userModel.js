const sqlite3 = require('sqlite3').verbose();

class UserModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath);
    this.init();
  }

  init() {
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS TBL_USER_MAIN (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        UUID INTEGER PRIMARY KEY NOT NULL,
        USER_ID TEXT NOT NULL,
        USER_PWD TEXT NOT NULL
      )
    `;
    this.db.run(createUserTableQuery);
  }

  createUser(username, password, callback) {
    const insertQuery = `INSERT INTO TBL_USER_MAIN (USER_ID, USER_PWD) VALUES (?, ?)`;
    this.db.run(insertQuery, [username, password], callback);
  }

  login(userId, userPwd, callback) {
    const selectQuery = `SELECT * FROM TBL_USER_MAIN WHERE USER_ID = ? AND USER_PWD = ?`;
    this.db.get(selectQuery, [userId, userPwd], callback);
  }

  // 다른 CRUD 메서드들도 추가할 수 있습니다.
}

module.exports = UserModel;
