/* eslint-disable */
const [node, dojs, action, ...others] = process.argv;
switch (action) {
  case 'const':
    const constant = require('./constant');
    constant();
    break;
  default:
    console.error('参数错误, 没有具体的操作类型[ page ]');
}
