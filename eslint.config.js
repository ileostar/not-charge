const uni = require('@uni-helper/eslint-config')
const unocss = require('@unocss/eslint-plugin')

module.exports = uni(
  {
    ignore: ['backend'],
  },
  unocss.configs.flat,
)
