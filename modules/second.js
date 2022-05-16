const {User} = require('./user');
const db = require('../db');
db.connect();

const vasya = new User('Vasya', 23);
vasya.showUser();

db.getPhrase('Hello');
db.getPhrase('Hi');