const {
  LinValidator,
  Rule
} = require('../../core/lin-validator-v2');
const {User} = require('../model/user');
const {LOGIN_TYPE, checkTypeIsLegal, CLASSIC_TYPE} = require('../lib/enum');

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

  // 插入数据前, 需要判断邮箱是否重复
  async validateEmail(value) {
    const registerEmail = value.body.email;
    const findResponse = await User.findAll({
      where: {
        email: registerEmail,
      }
    });
    if (findResponse.length !== 0) {
      throw new Error('邮箱已存在');
    }
  }
}

// 用于校验用户的登录数据
class TokenValidator extends LinValidator {
  constructor() {
    super();
    // 校验账号
    this.email = [
      new Rule('isLength', '长度不符合要求', {
        min: 4,
        max: 32,
      })
    ];

    /*
    * 下面代码的意思是: 密码可传可不传, 如果传了, 必须符合大于 6 位小于 128 位的要求
    * */
    this.password = [
      new Rule('isOptional'),
      new Rule('isLength', '长度不符合要求', {
        min: 6,
        max: 128,

      })
    ];
  }

  validateTokenExist(value) {
    if (!value.body.type) {
      throw new Error('type 不能为空');
    }
  }

  // 验证参数的 type 数据是否合法
  validateTypeLegal(value) {
    const type = value.body.type;
    if (!(checkTypeIsLegal(LOGIN_TYPE, type))) {
      throw new Error('type 不合法');
    }
  }
}

class VerifyTokenValidator extends LinValidator {
  constructor() {
    super();
    this.token = [
      new Rule('isLength', 'token 必填', {min: 0})
    ];
  }
}

class ClassicValidator extends LinValidator {
  constructor() {
    super();
  }

  validateData(value) {
    if (!value.body.data) {
      throw new Error('data必传');
    }
  }
}

class ClassicGetValidator extends LinValidator {
  constructor() {
    super();
    this.type = [
      new Rule('isNumeric', '必须是数字')
    ];
    this.id = [
      new Rule('isNumeric', '必须是数字')
    ];
  }

  validateType(value) {
    const type = value.path.type;

    if (!(checkTypeIsLegal(CLASSIC_TYPE, type))) {
      throw new Error('type 不合法');
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  VerifyTokenValidator,
  ClassicValidator,
  ClassicGetValidator
};