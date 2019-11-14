const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/shoutbox.db');
const bodyParser = require('body-parser')
const path  = require('path')
const fs = require('fs')
const request = require('supertest')

let app

describe('index.js', () => {
  beforeAll(() => {
    app = require('./../index.js')
  })

  afterAll(() => {
    app.close()
  })

  it('sqlite3 and body-parser should be installed', async () => {
    expect(sqlite3).not.toBeUndefined()
    expect(bodyParser).not.toBeUndefined()
  });

  it('Should iterate over results', (done) => {
    fs.readFile(path.resolve('views/pages/index.ejs'), 'utf8', function (err, text) {
      expect(text.indexOf('forEach') > -1).toBeTruthy()
      done()
    });
  });

  it('Should create an GET index \'/\' route', async () => {
    await expect(request(app).get('/')).resolves.toHaveProperty('status', 200);
  });

  it('Should create an GET \'/add-entry\' route', async () => {
    await expect(request(app).get('/add-entry')).resolves.toHaveProperty('status', 200);
  });

  it('Should store stuff in the Database when calling POST \'/add-entry\' route', async (done) => {
    await expect(request(app)
        .post('/add-entry')
        .send({username: 'TESTING SCRIPT', message: 'TESTING DATA'})
    ).resolves.not.toHaveProperty('status', 404);
    

    db.get('SELECT * FROM shouts WHERE username=?', ['TESTING SCRIPT'],(err, row) => {
      expect(row.username).toEqual('TESTING SCRIPT');
      expect(row.message).toEqual('TESTING DATA');

      db.run('DELETE FROM shouts WHERE username=?', 'TESTING SCRIPT', (err) => {
        done()
      });
    });
  });
});
