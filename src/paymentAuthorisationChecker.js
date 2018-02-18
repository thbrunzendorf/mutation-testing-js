var Payment = require('../src/payment.js');
var PaymentAuthorisation = require('../src/paymentAuthorisation.js');
function checkFor(payment) {
    let paymentAuthorisation = new PaymentAuthorisation();
    let initiator = payment.initiator;
    let amount = payment.amount;
    let limit = initiator.limit;
    if (amount.compareTo(limit) <= 0) {
        paymentAuthorisation.approvalNeeded = false;
    }
    if (amount.compareTo(limit) > 0) {
        paymentAuthorisation.approvalNeeded = true;
        let approver = getPrimaryApprover(initiator, amount);
        paymentAuthorisation.primaryApprover = approver;
    }
    return paymentAuthorisation;
}
function getPrimaryApprover(initiator, amount) {
    let supervisor = initiator.supervisor;
    let limit = supervisor.limit;
    const maxIterations = 10; // preventing infinite loops
    for (let i = 0; i < maxIterations; i++) {
        if (amount.compareTo(limit) > 0) {
            supervisor = supervisor.supervisor;
            limit = supervisor.limit;
        }
    }
    return supervisor;
}
module.exports = checkFor;