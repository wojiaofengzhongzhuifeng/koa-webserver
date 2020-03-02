// 指定登录的类型
const LOGIN_TYPE = {'havePassword': 100, 'miniProgram': 101};

function checkTypeIsLegal(obj, number) {
  let valueArray = [];
  Object.keys(obj).forEach((key) => {
    valueArray.push(obj[key]);
  });
  return valueArray.indexOf(Number(number)) !== -1;
}

module.exports = {
  LOGIN_TYPE,
  checkTypeIsLegal
};