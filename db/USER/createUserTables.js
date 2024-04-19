// createUserTables.js
function createUserTables(db, callback) {
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
    db.run(createUserTableQuery, function(err) {
      if (err) {
        console.error('Error creating user table:', err.message);
        if (callback) {
          callback(err);
        }
      } else {
        if (callback) {
          callback(null);
        }
      }
    });
    db.run(createUserPointTableQuery, function(err) {
      if (err) {
        console.error('Error creating user table:', err.message);
        if (callback) {
          callback(err);
        }
      } else {
        if (callback) {
          callback(null);
        }
      }
    });
}

module.exports = createUserTables;
