const uni = require('@uni-helper/eslint-config')
const unocss = require('@unocss/eslint-plugin')

module.exports = uni(
  {
    ignorePatterns: ['src/components/qiun-data-charts/*'],
  },
  unocss.configs.flat,
)
