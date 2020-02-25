const {
  LinValidator,
  Rule
} = require('../../core/lin-validator-v2');

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '需要是正整数', {
        min: 1
      }),
    ];
  }
}


/*
* 用于校验用户的注册信息
* 用户传递如下数据
* 1. email
* 2. nickName
* 3. password
* 4. passwordAgain
* */
class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [
      new Rule('isEmail', '符合 email 格式')
    ];
    this.password = [
      // 用户指定范围 123456 $^
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ];
    this.passwordAgain = this.password;
    this.nickName = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      }),
    ];
  }

  validatePassword(value) {
    const password = value.body.password;
    const passwordAgain = value.body.passwordAgain;

    // question: 为什么直接抛出错误就可以了?
    if (password !== passwordAgain) {
      throw new Error('两次输入不一致');
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
};