const request = require('supertest');

let server;

// post to /metric/{key}
  // should add the value passed on for a key to the storage json
// get on /metric/{key}
  // should fetch all instances currently available for the past hour on a key
// logger service
  // should remove instances more than an hour

describe('logger', () => {
  beforeEach(async () => {
    server = require('./app');
  });
  afterEach(async () => {
    // await User.collection.drop();
    await server.close();
  });

  describe('Post /metric/{key}', () => {
    const data = { value: 30 };
    const key = '1234';
    test('returns error if value is not set', async () => {
      data.value = null;
      const res = await request(server).post('/metric/123').send(data);
      expect(res.status).toBe(400);
    })
    test('returns 200 on successful creation', async () => {
      data.value = 500;
      const res = await request(server).post(`/metric/${key}`).send(data);
      expect(res.status).toBe(200);
    });
  });
  
  describe('Get /metric/{key}', () => {
    test('should return 200', async () => {
      const data = { value: 70 };
      const key = '700'
      await request(server).post(`/metric/${key}`).send(data);
      await request(server).post(`/metric/${key}`).send(data);
      await request(server).post(`/metric/${key}`).send(data);
      const res = await request(server).get(`/metric/${key}/sum`).send(data);
      expect(res.status).toBe(200);
      expect(res.body.value).toBe(210);
    })
  })

})



