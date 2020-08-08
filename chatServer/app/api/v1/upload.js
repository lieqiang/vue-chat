const Router = require('koa-router')
const { uploadFiles } = require('@middlewares/multer')
const { parseTime } = require('@core/utils')

const router = new Router({
  prefix: '/v1/upload/'
})
router.post('uploadImg', uploadFiles.single('file'), async(ctx, next) => {
  let date = parseTime(new Date(), '{y}-{m}-{d}')
  ctx.body = {
    error_code: 0,
    data: '/uploads/' + date + '/' + ctx.file.filename
  }
})

module.exports = router
