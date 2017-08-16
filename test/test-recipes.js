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
    const newItem = {name: 'mangu', ingredients: 'platano\' verde'};
    return chai.request(app)
    .post('/recipes')
    .send(newItem)
    .then(function(res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.include.keys('id', 'name', 'ingredients');
      res.body.id.should.not.be.null;

      res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
    });
  });

  it('should update items on PUT', function() {
    const updateData = {
      name: 'morir-soñando',
      ingredients: ['evaporated milk', 'oranges', 'brown-sugar', 'vanilla']
    };

    return chai.request(app)
    .get('/recipes')
    .then(function(res){
      updateData.id = res.body[0].id;

      return chai.request(app)
      .put(`/recipes/${updateData.id}`)
      .send(updateData);
    })
    .then(function(res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.deep.equal(updateData);
    });

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