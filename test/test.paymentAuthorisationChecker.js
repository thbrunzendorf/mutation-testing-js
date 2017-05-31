var expect = require('chai').expect;
var User = require('../src/user.js');
var Money = require('../src/money.js');
var Payment = require('../src/payment.js');
var checkFor = require('../src/paymentAuthorisationChecker.js');

describe('#checkFor()', function() {
    it('should not need approval if payment by initiator with limit more than amount', function() {
        initiator = new User("dave", new Money(200,0));
        payment = new Payment(new Money(123,45), initiator);
        authorisation = checkFor(payment);
        expect(authorisation.approvalNeeded).to.eql(false);
    });
    it('should need approval by supervisor if payment by initiator with limit less than amount', function() {
        supervisor = new User("liz", new Money(200,0));
        initiator = new User("dave", new Money(100,0), supervisor);
        payment = new Payment(new Money(123,45), initiator);
        authorisation = checkFor(payment);
        expect(authorisation.approvalNeeded).to.eql(true);
        console.log(authorisation.primaryApprover.name);
    });
    it('should need approval by supervisor of supervisor if payment by initiator and supervisor with limit less than amount', function() {
        supervisorOfSupervisor = new User("mary", new Money(200,0));
        supervisor = new User("liz", new Money(100,0), supervisorOfSupervisor);
        initiator = new User("dave", new Money(50,0), supervisor);
        payment = new Payment(new Money(123,45), initiator);
        authorisation = checkFor(payment);
        expect(authorisation.approvalNeeded).to.eql(true);
        console.log(authorisation.primaryApprover.name);
    });
});
