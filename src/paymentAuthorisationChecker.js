var Payment = require('../src/payment.js');
var PaymentAuthorisation = require('../src/paymentAuthorisation.js');
function checkFor(payment) {
    paymentAuthorisation = new PaymentAuthorisation();
    initiator = payment.initiator;
    amount = payment.amount;
    limit = initiator.limit;
    if (amount.compareTo(limit) <= 0) {
        paymentAuthorisation.approvalNeeded = false;
    }
    if (amount.compareTo(limit) > 0) {
        paymentAuthorisation.approvalNeeded = true;
        approver = getPrimaryApprover(initiator, amount);
        paymentAuthorisation.primaryApprover = approver;
    }
    return paymentAuthorisation;
}
function getPrimaryApprover(initiator, amount) {
    supervisor = initiator.supervisor;
    limit = supervisor.limit;
    maxIterations = 10; // preventing infinite loops
    for (i = 0; i < maxIterations; i++) {
        if (amount.compareTo(limit) > 0) {
            supervisor = supervisor.supervisor;
            limit = supervisor.limit;
        }
    }
    return supervisor;
}
module.exports = checkFor;