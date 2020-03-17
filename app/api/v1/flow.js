const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/flow'
});
const {Unauthorized, NoExist} = require('../../../core/httpException');
const {ClassicValidator, ClassicGetValidator} = require('../../../app/validators/validator');
const {Auth, auth} = require('../../../middleWare/auth');
const {CLASSIC_TYPE} = require('../../lib/enum');
const {Unhandle} = require('../../../core/httpException');
const {Movie, Music, Sentence} = require('../../model/classic');
const {throwSuccess} = require('../../lib/help');

router.get('/', new Auth().method, async (ctx, next) => {
  ctx.body = {
    data: 'success get data'
  };
});


module.exports = router;