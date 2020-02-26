const {SuccessException} = require('../../core/httpException');

const throwSuccess = () => {
  throw new SuccessException();
};

module.exports = {throwSuccess};