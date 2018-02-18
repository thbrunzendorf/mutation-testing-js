var expect = require('chai').expect;
var User = require('../src/user.js');
var Money = require('../src/money.js');
var Payment = require('../src/payment.js');
var checkFor = require('../src/paymentAuthorisationChecker.js');

describe('#checkFor()', function() {
    it('should not need approval if payment by initiator with limit more than amount', function() {
        let initiator = new User("dave", new Money(200,0));
        let payment = new Payment(new Money(123,45), initiator);
        let authorisation = checkFor(payment);
        expect(authorisation.approvalNeeded).to.eql(false);
    });
    it('should need approval by supervisor if payment by initiator with limit less than amount', function() {
        let supervisor = new User("liz", new Money(200,0));
        let initiator = new User("dave", new Money(100,0), supervisor);
        let payment = new Payment(new Money(123,45), initiator);
        let authorisation = checkFor(payment);
        expect(authorisation.approvalNeeded).to.eql(true);
        console.log(authorisation.primaryApprover.name);
    });
    it('should need approval by supervisor of supervisor if payment by initiator and supervisor with limit less than amount', function() {
        let supervisorOfSupervisor = new User("mary", new Money(200,0));
        let supervisor = new User("liz", new Money(100,0), supervisorOfSupervisor);
        let initiator = new User("dave", new Money(50,0), supervisor);
        let payment = new Payment(new Money(123,45), initiator);
        let authorisation = checkFor(payment);
        expect(authorisation.approvalNeeded).to.eql(true);
        console.log(authorisation.primaryApprover.name);
    });
});
