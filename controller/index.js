const db = require('../model')();

module.exports = {
  async createLog(req, res) {
    try {
      const { value } = req.body;
      const { key } = req.params;
      if (!value) return res.status(400).send('No value set for metric logging');
      const created = db.createLog({ key, value: Math.round(value) });
      if (created) return res.send({})
      return res.status(400).send('Error creating log');
    } catch (ex) {
      return res.status(400).send(ex.message)
    }
  },
  
  async calcMetricSum(req, res) {
    try {
      const { key } = req.params;
      const value = db.calcMetricSum(key);
      return res.send({value})
    } catch (ex) {
      return res.status(400).send(ex.message)
    }
  }
}