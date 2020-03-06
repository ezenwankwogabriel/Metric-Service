const uuid = require('uuid/v1');
const moment = require('moment');

class Database {
  constructor() {
      this._files = [];
  }
  
  calcMetricSum(key) {
    const logFile = this.findLog(key);
    let metricSum = 0;
    if (!logFile) throw new Error('Key provided is of invalid type or does not exist');
    const pastHour = moment().subtract(1, 'hour');
    const metricLength = logFile.metrics.length;

    for (let i = 0; i < metricLength; i++) {
      let current = logFile.metrics[i];
      if (current.valid && pastHour.isBefore(current.time)) {
        metricSum += current.value;
      }
      current.valid = false;
    }
    return metricSum;
  }

  findLog(key) {
    const log = this._files.find(file => file.key === key);
    return log;
  }

  createLog({key, value}) {
    const nValue = Number(value);
    const log = this.findLog(key);
    if (!log) {
      let data = { id: uuid(), key, metrics: [this.newLog(nValue)] };
      this._files.push(data);
      return true;
    }
    log.metrics.push(this.newLog(nValue))
    return true;
  }
  
  metricCount() {
    return this._files.length;
  }

  clearDb() {
    return this._files.length = 0;
  }

  newLog(value) {
    return { time: new Date(), value, valid: true };
  }

  removeLog(log) {
    const logFile = this._files.find(x => x.key === log.key);
    if (!logFile) throw new Error('Log does not exist');
    const index = this._files[logFile];
    this._files.splice(index, 1)
    return true;
  }
}

module.exports = () => new Database();
