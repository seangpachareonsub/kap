const mongoose = require('mongoose')
const Read = require('./models/read')
const Cook = require('./models/cook')
const Watch = require('./models/watch')
const Play = require('./models/play')
const User = require('./models/user')
const dbURI = 'mongodb://localhost/activity-db'
const seedFunction = require('./lib/seedFunction')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error, db) => {
    if (error) {
      return console.log(error)
    }
    console.log('Ready to seed database!')
    db.dropDatabase()
      .then(() => {
        return User.create(
          [
            {
              username: 'patrick',
              email: 'patrick@patrick.com',
              password: 'patrick',
              passwordConfirmation: 'patrick',
              firstname: 'Patrick',
              uploads: [],
              savedItems: [],
              following: []
            },
            {
              username: 'annie',
              email: 'annie@annie.com',
              password: 'annie',
              passwordConfirmation: 'annie',
              firstname: 'Annie',
              uploads: [],
              savedItems: [],
              following: []
            },
            {
              username: 'kenn',
              email: 'kenn@kenn.com',
              password: 'ken',
              passwordConfirmation: 'ken',
              firstname: 'Ken',
              uploads: [],
              savedItems: [],
              following: []
            }
          ])
      })
      .then((users) => {
        seedFunction.createBooks(users)
        seedFunction.createRecipes(users)
        seedFunction.createWatch(users)
        seedFunction.createPlay(users)
          .then(() => console.log('Successfully seeded database'))
          .catch(error => console.log(error))
          .finally(() => mongoose.connection.close())
      })
  })
