var Money = require('../src/money.js');
var User = require('../src/user.js');
function Payment(amount, initiator) {
    this.amount = amount;
    this.initiator = initiator;
    return Object.freeze(this);
}
module.exports = Payment;