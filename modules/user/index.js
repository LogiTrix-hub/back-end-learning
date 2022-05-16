class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  showUser() {
    console.log(this)
  }
}

exports.User = User;
exports.name = 'John';


