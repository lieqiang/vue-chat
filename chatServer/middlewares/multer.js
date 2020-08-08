const fs = require('fs')
const util = require('util')
const multer = require('@koa/multer')
const { parseTime } = require('@core/utils')
const mkdir = util.promisify(fs.mkdir)
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const date = parseTime(new Date(), '{y}-{m}-{d}')
    const path = `${process.cwd()}\\public\\uploads`
    const datePah = `${process.cwd()}\\public\\uploads\\${date}`
    const stat = fs.existsSync(path)
    if (!stat) {
      await mkdir(path, { recursive: true })
    }
    const statDate = fs.existsSync(datePah)
    if (!statDate) {
      await mkdir(datePah, { recursive: true })
    }
    cb(null, datePah)
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})
const uploadFiles = multer({
  storage: storage
})

module.exports = {
  uploadFiles
}
