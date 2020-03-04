const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const app = express();

const logger = require('./controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.set('port', process.env.PORT || 4000);

app.get('/', (req, res) => {
  res.send(200)
});

app.post('/metric/:key', logger.createLog);
app.get('/metric/:key/sum', logger.calcMetricSum);

const server = app.listen(app.get('port'), () => {
  console.log(`${chalk.green('✓')} application started on port ${app.get('port')}`)
})

module.exports = server;