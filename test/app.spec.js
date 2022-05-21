process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/app')

const should = chai.should();
chai.use(chaiHttp);

describe('Index', () => {
  it('Should welcome user', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('Welcome to Esusu Confam.')
        done();
      });
  });
});

describe('Register', () => {
  it('Should return validation errors', (done) => {
    chai.request(server)
      .post('/api/v1/auth/register')
      .send({
        "firstname": "",
        "lastname": "",
        "telephone": "+234",
        "email": "james.doe",
        "password": "James"
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.message.should.equal('Invalid fields')
        done();
      });
  });
});

describe('Create Group', () => {
  it('Should return authorization error', (done) => {
    chai.request(server)
      .post('/api/v1/groups')
      .send({
        "name": "Two Esusu",
        "description": "The Two Esusu collective",
        "periodicAmount": 1000,
        "maxCapacity": 5,
        "isSearchable": true
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.message.should.contain('Unauthorized')
        done();
      });
  });
});

describe('Get Group Members', () => {
  it('Should return authorization error', (done) => {
    chai.request(server)
      .get('/api/v1/groups/62891a56a21f796d8d0f55be/members')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.message.should.contain('Unauthorized')
        done();
      });
  });
});

describe('Get Groups', () => {
  it('Should return authorization error', (done) => {
    chai.request(server)
      .get('/api/v1/groups')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.message.should.contain('Unauthorized')
        done();
      });
  });
});

describe('Contribute to group', () => {
  it('Should return authorization error', (done) => {
    chai.request(server)
      .post('/api/v1/contributions')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.message.should.contain('Unauthorized')
        done();
      });
  });
});