import * as _ from 'lodash';
import { isNullorEmpty } from '../../utils/tools';

const mResolve = () => Promise.resolve();

const mReject = (message = '') => Promise.reject(new Error(message));

const _isNullorEmpty = {
  name: '是否为空',
  props: {},
  validator: ({ value, message = '输入内容不能为空' }) => {
    if (
      typeof value === 'undefined'
      || value === null
      || value === ''
      || value === '-1'
      || value === '[]'
    ) {
      return mReject(message);
    }
    return mResolve();
  },
};

const _limitMaxLength = {
  name: '限制最大长度',
  props: {
    max: {
      name: '最大值',
      defaultValue: 8,
    },
  },
  validator: ({ value, message = '输入的字符不符合规定的长度', params = 8 }) => {
    if (isNullorEmpty(value)) {
      return mResolve();
    }
    const len = value.replace(/[\u0391-\uFFE5]/g, 'aa').length;
    if (len > params) {
      return mReject(message);
    }
    return mResolve();
  },
};
const _limitMinLength = {
  name: '限制最小长度',
  props: {
    min: {
      name: '最小值',
      defaultValue: 0,
    },
  },
  validator: ({ value, message = '输入的字符不符合规定的长度', params = 0 }) => {
    if (isNullorEmpty(value)) {
      return mResolve();
    }
    const len = value.replace(/[\u0391-\uFFE5]/g, 'aa').length;
    if (len < params) {
      return mReject(message);
    }
    return mResolve();
  },
};

const _checkEmail = {
  name: '邮箱校验',
  props: {},
  validator: ({ value, message = '邮箱格式错误' }) => {
    if (isNullorEmpty(value)) {
      return mResolve();
    }
    const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_\-.]+$/;
    if (!pattern.test(value)) {
      return mReject(message);
    }
    return mResolve();
  },
};

const _checkPhone = {
  name: '手机校验',
  props: {},
  validator: ({ value, message = '手机格式错误' }) => {
    if (isNullorEmpty(value)) {
      return mResolve();
    }
    console.log('value:', value);
    const pattern = /^((13[0-9])|(14[5,6,7,9])|(15[^4\\d])|(16[5,6])|(17[0-9])|(18[0-9])|(19[1,8,9]))[0-9]{8}$/;
    if (!pattern.test(value)) {
      return mReject(message);
    }
    return mResolve();
  },
};

const _checkUrl = {
  name: '网址校验',
  props: {},
  validator: ({ value, message = '输入网址不符合规范' }) => {
    if (isNullorEmpty(value)) {
      return mResolve();
    }
    const pattern = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
    if (!pattern.test(value)) {
      return mReject(message);
    }
    return mResolve();
  },
};

const _checkPersonId = {
  name: '身份证号码校验',
  props: {},
  validator: ({ value, message = '身份证格式错误' }) => {
    if (isNullorEmpty(value)) {
      return mResolve();
    }
    const city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 ',
    };
    if (
      !value
      || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(value)
    ) {
      return mReject(message);
    }
    if (!city[value.substring(0, 2)]) {
      return mReject(message);
    }
    // 18位身份证需要验证最后一位校验位
    if (value.length === 18) {
      const code = value.split('');
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i += 1) {
        ai = value[i];
        wi = factor[i];
        sum += ai * wi;
      }
      if (String(parity[sum % 11]) !== String(code[17].toUpperCase())) {
        return mReject(message);
      }
    }

    return mResolve();
  },
};

const _checkUppercase = {
  name: '仅限输入大写英文字母',
  props: {},
  validator: ({ value, message = '仅限大写英文字母' }) => {
    if (isNullorEmpty(value)) {
      return mResolve();
    }
    const pattern = /^[A-Z]+$/;
    if (!pattern.test(value)) {
      return mReject(message);
    }
    return mResolve();
  },
};

const _checkNumber = {
  name: '仅限输入数字',
  props: {},
  validator: ({ value, message = '仅限输入数字' }) => {
    if (isNullorEmpty(value)) {
      return mResolve();
    }
    const pattern = /^[0-9]*$/;
    if (!pattern.test(value)) {
      return mReject(message);
    }
    return mResolve();
  },
};

const _checkCodeAndNumber = {
  name: '仅限输入数字和英文字母',
  props: {},
  validator: ({ value, message = '仅限输入数字和英文字母' }) => {
    if (isNullorEmpty(value)) {
      return mResolve();
    }
    const pattern = /^[A-Za-z\d]+$/;
    if (!pattern.test(value)) {
      return mReject(message);
    }
    return mResolve();
  },
};

const _checkFileSize = {
  name: '限制文件大小',
  props: {
    limitSize: {
      name: '限制大小（KB）',
      defaultValue: 0,
    },
  },
  validator: ({ value, message = '文件大小最大限制', params = 1000 }) => {
    const fileSize = value.size / 1024;
    if (fileSize > params) {
      return mReject(`${message}（文件上限${params}KB）`);
    }
    return mResolve();
  },
};

const _checkFileType = {
  name: '限制文件类型',
  props: {
    limitFileTypes: {
      name: '文件类型',
      defaultValue: 'zip|txt',
    },
  },
  validator: ({ value, message = '文件类型错误', params = '' }) => {
    if (!params) {
      return mResolve();
    }
    const limitFileTypesArr = params.split(',');
    const fileType = value.name.replace(/^.*?\.([a-z\d]+)$/, '$1');
    if (limitFileTypesArr.length > 0 && !limitFileTypesArr.some(item => item.includes(fileType))) {
      return mReject(`${message}（支持${params}文件格式）`);
    }
    return mResolve();
  },
};

const _checkSocialCreditCode = {
  name: '校验统一社会信用代码',
  props: {},
  validator: ({ value, message = '输入内容不是有效的统一社会信用代码' }) => {
    if (isNullorEmpty(value)) {
      return mResolve();
    }
    const pattern = /^[0-9A-Z]+$/;
    const len = value.length;
    if (len !== 18 || !pattern.test(value)) {
      return mReject(message);
    }
    let AnCode; // 统一社会信用代码的每一个值
    let AnCodeValue; // 统一社会信用代码每一个值的权重
    let total = 0;
    // eslint-disable-next-line max-len
    const weightedFactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]; // 加权因子
    const str = '0123456789ABCDEFGHJKLMNPQRTUWXY'; // 不用I、O、S、V、Z
    for (let i = 0; i < len - 1; i += 1) {
      AnCode = value.substring(i, i + 1);
      AnCodeValue = str.indexOf(AnCode);
      // 权重和加权因子相乘之和
      total += AnCodeValue * weightedFactors[i];
    }
    let logicCheckCode = 31 - (total % 31);
    if (logicCheckCode === 31) {
      logicCheckCode = 0;
    }
    const arrayStr = str.split('');
    logicCheckCode = arrayStr[logicCheckCode];
    const checkCode = value.substring(17, 18);
    if (logicCheckCode !== checkCode) {
      return mReject(message);
    }
    return mResolve();
  },
};

const _checkReg = {
  name: '正则校验',
  props: {
    reg: {
      name: '正则规则',
      defaultValue: '/.*?/',
    },
  },
  validator: ({ value, message = '输入内容不符合规则', params = '/.*?/' }) => {
    const pattern = new RegExp(params);
    if (!pattern.test(value)) {
      return mReject(message);
    }
    return mResolve();
  },
};

export const validateList = {
  _checkPersonId,
  _checkReg,
  _checkUppercase,
  _checkUrl,
  _checkSocialCreditCode,
  _checkFileType,
  _checkFileSize,
  _checkCodeAndNumber,
  _checkPhone,
  _checkNumber,
  _checkEmail,
  _isNullorEmpty,
  _limitMaxLength,
  _limitMinLength,
};

// eslint-disable-next-line import/prefer-default-export,consistent-return
export const addValidate = (rule = []) => _.map(rule, ({ fn, param }) => {
  if (validateList[fn]) {
    return {
      validator:
      // eslint-disable-next-line no-shadow,no-return-await
        async (rule, val) => await validateList[fn].validator({ value: val, params: param }),
      trigger: 'change',
      required: fn === '_isNullorEmpty',
    };
  }
}).filter(Boolean);
