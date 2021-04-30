const request = require('supertest');
const app = require('../index')

describe('Endpoints test', () => {


  it('should Get Endpoints /api/groceries', async () => {
    const res = await request(app).get('/api/groceries')
    expect(res.statusCode).toEqual(200);
  });

  it('should POST Endpoints /api/groceries', async () => {
    const res = await request(app)
      .post('/api/groceries')
      .send({
        item: 'apple',
        quantity: 1,
        category: 'fruit',
      });
    expect(res.statusCode).toEqual(201);
  });



  it('should PUT Endpoints /api/groceries', async () => {
    const res = await request(app)
      .put('/api/groceries')
      .send({
        id: 1,
        item: 'apple',
        quantity: 1,
        category: 'updated fruit',
      });

    expect(res.statusCode).toEqual(201);
  });


  it('should DELETE Endpoints /api/groceries', async () => {
    const res = await request(app)
    .delete('/api/groceries')
    .send({
        id: 1,
        item: 'apple'
      });
    expect(res.statusCode).toEqual(200);
  });

});