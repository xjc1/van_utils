module.exports = {
  namespace: 'common',
  yesNo: [
    ['yes', 1, '是'],
    ['no', 0, '否'],
  ],
  status: [
    ['VALID', 1, '有效'],
    ['INVALID', 0, '无效'],
  ],
  sex: [
    ['male', '1', '男'],
    ['female', '0', '女'],
  ],
  absence: [
    ['yes', true, '是'],
    ['no', false, '否'],
  ],
  marriageStatus: [
    ['yes', 'IA:结婚', '结婚'],
    ['no', 'INR:匹配不成功', '匹配不成功'],
  ],
  authStatus: [
    ['ing', '0', '待认证'],
    ['success', '1', '认证成功'],
    ['fail', '2', '认证失败'],
  ],
  faceUse: [['use', '1', '使用']],
  uploadTypes: [
    ['photograph', '1', '拍照'],
    ['selectFromPhone', '2', '从手机选择'],
  ],
};
