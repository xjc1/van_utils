import { TIME_FORMAT_MODE } from '@/utils/commonConstant';
import moment from 'moment'

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

/***
 * 空函数
 * @param
 * @returns {*}
 * @constructor
 */
export function EmptyFn() {  }

/***
 * 空函数 return v
 * @param value
 * @returns {*}
 * @constructor
 */
export function DoNothingFn(v) { return v }

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

/***
 * 时间格式化
 * @param time
 * @param formatMode
 * @returns {string|*}
 */
export const timeFormat = (time, formatMode = TIME_FORMAT_MODE.DATE) => {
  if (!time) {
    return time;
  }
  return moment(time).format(formatMode);
};
