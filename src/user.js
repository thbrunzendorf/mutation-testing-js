var Money = require('../src/money.js');
function User(name, limit, supervisor) {
    this.name = name;
    this.limit = limit;
    this.supervisor = supervisor;
    return Object.freeze(this);
}
module.exports = User;