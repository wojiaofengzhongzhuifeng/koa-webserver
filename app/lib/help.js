const {SuccessException} = require('../../core/httpException');

const throwSuccess = (obj) => {
  throw new SuccessException(obj);
};

module.exports = {throwSuccess};