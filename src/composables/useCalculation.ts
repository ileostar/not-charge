export function accAdd(arg1: number, arg2: number) {
  let r1, r2, m, c
  try {
    r1 = arg1.toString().split('.')[1].length
  }
  catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  }
  catch (e) {
    r2 = 0
  }
  // eslint-disable-next-line prefer-const
  c = Math.abs(r1 - r2)
  // eslint-disable-next-line prefer-const
  m = 10 ** Math.max(r1, r2)
  if (c > 0) {
    const cm = 10 ** c
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    }
    else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  }
  else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

export function accSub(arg1: number, arg2: number) {
  let r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  }
  catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  }
  catch (e) {
    r2 = 0
  }
  // eslint-disable-next-line prefer-const
  m = 10 ** Math.max(r1, r2) // last modify by deeka //动态控制精度长度
  // eslint-disable-next-line prefer-const
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}
