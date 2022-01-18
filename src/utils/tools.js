/***
 *
 * @param value 手机号校验
 * @returns {boolean}
 */
export const phoneValidator = (value) =>
  /^((13[0-9])|(14[5,6,7,9])|(15[^4\\d])|(16[5,6])|(17[0-9])|(18[0-9])|(19[1,8,9]))[0-9]{8}$/.test(
    value
  );
/***
 *
 * @param value 身份证校验
 * @returns {boolean}
 */
export const cardIdValidator = (value) => {
  const city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 ",
  };
  if (
    !value ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(
      value
    )
  ) {
    return false;
  }
  if (!city[value.substring(0, 2)]) {
    return false;
  }
  // 18位身份证需要验证最后一位校验位
  if (value.length === 18) {
    const code = value.split("");
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验位
    const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    let ai = 0;
    let wi = 0;
    for (let i = 0; i < 17; i += 1) {
      ai = value[i];
      wi = factor[i];
      sum += ai * wi;
    }
    if (String(parity[sum % 11]) !== String(code[17]).toUpperCase()) {
      return false;
    }
  }

  return true;
};

/***
 *
 * @param url 文件下载
 * @param fileName
 * @param cb
 */
export const fileDownLoad = (url, fileName, cb = () => {}) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true); // 也可以使用POST方式，根据接口
  xhr.responseType = "blob"; // 返回类型blob
  // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
  xhr.onload = function () {
    // eslint-disable-next-line no-use-before-define
    const oldFileName = fileNameFromHeader(
      xhr.getResponseHeader("Content-Disposition")
    );
    // 请求完成
    if (this.status === 200) {
      // 返回200
      const blob = this.response;
      const reader = new FileReader();
      reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
      reader.onload = function (e) {
        // 转换完成，创建一个a标签用于下载
        const a = document.createElement("a");
        a.download = fileName || oldFileName;
        a.href = e.target.result;
        const body = document.createElement("body");
        body.appendChild(a); // 修复firefox中无法触发click
        a.click();
        body.removeChild(a);
        cb();
      };
    }
  };
  // 发送ajax请求
  xhr.send();
};

export function EmptyFn() {}

/***
 *
 * @param value 判断是否为空
 * @returns {boolean}
 */
export const isNullOrEmpty = (value) => {
  // eslint-disable-next-line
  if (
    typeof value === "undefined" ||
    value == null ||
    value == "" ||
    JSON.stringify(value) == "{}" ||
    JSON.stringify(value) == "[]"
  ) {
    return true;
  }
  return false;
};
