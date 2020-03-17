const throwSuccess = (obj) => {
  throw new global.httpException.SuccessException(obj);
};

module.exports = {throwSuccess};