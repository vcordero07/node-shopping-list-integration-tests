const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('recipes', function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should list items on GET', function() {

  });

  it('should add an item on POST', function() {

  });

  it('should update items on PUT', function() {

  });

  it('should delete items on DELETE', function() {
    return chai.request(app)

    .get('/recipes')
    .then(function(res) {
      return chai.request(app)
      .delete(`/recipes/${res.body[0].id}`);
    })
    .then(function(res){
      res.should.have.status(204);
    });
  });
});
