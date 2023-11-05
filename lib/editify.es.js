import { openBlock, createElementBlock, createElementVNode, normalizeClass, normalizeStyle, createCommentVNode } from "vue";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj2, key, value) => key in obj2 ? __defProp(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __publicField = (obj2, key, value) => {
  __defNormalProp(obj2, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const number$1 = {
  /**
   * 数字格式化
   * @param {Number} num
   */
  formatNumber(num) {
    if (this.isNumber(num)) {
      return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    } else {
      return num;
    }
  },
  /**
   * 判断是否数字
   * @param {Object} num
   */
  isNumber(num) {
    if (typeof num == "number" && !isNaN(num)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 多个数的加法运算
   */
  add(...values) {
    return values.reduce((num, value) => {
      let r1 = 0;
      let r2 = 0;
      let m = 0;
      try {
        r1 = num.toString().split(".")[1].length;
      } catch (e) {
      }
      try {
        r2 = value.toString().split(".")[1].length;
      } catch (e) {
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (num * m + value * m) / m;
    });
  },
  /**
   * 多个数的减法运算
   */
  subtract(...values) {
    return values.reduce((num, value) => {
      let r1 = 0;
      let r2 = 0;
      let m = 0;
      try {
        r1 = num.toString().split(".")[1].length;
      } catch (e) {
      }
      try {
        r2 = value.toString().split(".")[1].length;
      } catch (e) {
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (num * m - value * m) / m;
    });
  },
  /**
   * 多个数的乘法运算
   */
  mutiply(...values) {
    return values.reduce((num, value) => {
      let m = 0;
      let s1 = num.toString();
      let s2 = value.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {
      }
      try {
        m += s2.split(".")[1].length;
      } catch (e) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    });
  },
  /**
   * 多个数的除法运算
   */
  divide(...values) {
    return values.reduce((num, value) => {
      let t1 = 0;
      let t2 = 0;
      let s1 = num.toString();
      let s2 = value.toString();
      try {
        t1 = s1.split(".")[1].length;
      } catch (e) {
      }
      try {
        t2 = s2.split(".")[1].length;
      } catch (e) {
      }
      s1 = Number(s1.replace(".", ""));
      s2 = Number(s2.replace(".", ""));
      return s1 / s2 * Math.pow(10, t2 - t1);
    });
  }
};
const string$1 = {
  /**
   * 向指定位置插入字符串
   * @param {Object} original 原始字符串
   * @param {Object} str 插入的字符串
   * @param {Object} index 插入的位置
   */
  insert(original, str, index) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (typeof str != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!number$1.isNumber(index)) {
      throw new TypeError("The third argument must be a number");
    }
    if (index < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    return original.substring(0, index) + str + original.substring(index, original.length);
  },
  /**
   * 删除指定位置的字符串
   * @param {Object} original 原始字符串
   * @param {Object} index 删除的位置序列
   * @param {Object} num 删除的字符串长度
   */
  delete(original, index, num) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!number$1.isNumber(index)) {
      throw new TypeError("The second argument must be a number");
    }
    if (index < 0) {
      throw new Error("The second argument cannot be less than 0");
    }
    if (!number$1.isNumber(num)) {
      throw new TypeError("The third argument must be a number");
    }
    if (num < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    return original.substring(0, index) + original.substring(index + num, original.length);
  },
  /**
   * 替换指定位置的字符串
   * @param {Object} original 原始字符串
   * @param {Object} start 开始位置
   * @param {Object} end 结束位置
   * @param {Object} str 替换的字符串
   */
  replace(original, start, end, str) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!number$1.isNumber(start)) {
      throw new TypeError("The second argument must be a number");
    }
    if (start < 0) {
      throw new Error("The second argument cannot be less than 0");
    }
    if (!number$1.isNumber(end)) {
      throw new TypeError("The third argument must be a number");
    }
    if (end < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    if (typeof str != "string") {
      throw new TypeError("The fourth argument must be a string");
    }
    return original.substring(0, start) + str + original.substring(end, original.length);
  },
  /**
   * 去除字符串空格
   * @param {Object} str
   * @param {Object} global 为true时去除所有空格，否则只去除两边空格
   */
  trim(str, global) {
    if (typeof str != "string") {
      throw new TypeError("The first argument must be a string");
    }
    let result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (global) {
      result = result.replace(/\s/g, "");
    }
    return result;
  }
};
const element$1 = {
  /**
   * 判断是否是Window对象
   * @param {Object} data 入参
   */
  isWindow(data2) {
    return data2 && data2 instanceof Window;
  },
  /**
   * 获取元素距离指定祖先元素左侧/顶部/底部/右侧的距离
   * @param {Object} el 元素
   * @param {Object} root 父元素或者祖先元素，未指定则为document.body
   */
  getElementPoint(el, root) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(root)) {
      root = document.body;
    }
    if (!this.isContains(root, el)) {
      throw new Error("The second argument and the first argument have no hierarchical relationship");
    }
    let obj2 = el;
    let offsetTop = 0;
    let offsetLeft = 0;
    while (this.isElement(el) && this.isContains(root, el) && root !== el) {
      offsetTop += el.offsetTop;
      offsetLeft += el.offsetLeft;
      el = el.offsetParent;
    }
    let offsetRight = root.offsetWidth - offsetLeft - obj2.offsetWidth;
    let offsetBottom = root.offsetHeight - offsetTop - obj2.offsetHeight;
    return {
      top: offsetTop,
      left: offsetLeft,
      right: offsetRight,
      bottom: offsetBottom
    };
  },
  /**
   * 判断某个节点是否包含指定节点，包含相等关系和父子关系
   * @param {Object} parentNode 父节点或祖先节点
   * @param {Object} childNode 子节点
   */
  isContains(parentNode, childNode) {
    if (!this.isElement(parentNode)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(childNode, true)) {
      throw new TypeError("The second argument must be an element");
    }
    if (parentNode === childNode) {
      return true;
    }
    if (parentNode.contains) {
      return parentNode.contains(childNode);
    }
    if (parentNode.compareDocumentPosition) {
      return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
  },
  /**
   * 判断某个节点是否是指定节点的父节点
   * @param {Object} parentNode 父节点
   * @param {Object} childNode 子节点
   */
  isParentNode(parentNode, childNode) {
    if (!this.isElement(parentNode)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(childNode, true)) {
      throw new TypeError("The second argument must be an element");
    }
    if (parentNode === childNode) {
      return false;
    }
    return childNode.parentNode === parentNode;
  },
  /**
   * 查找某个节点下指定选择器的子元素
   * @param {Object} el 元素节点
   * @param {Object} selector 支持多选择器，等同于querySelectorAll的参数
   */
  children(el, selector) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (selector && typeof selector != "string") {
      throw new TypeError("The second argument must be a string");
    }
    const res = el.querySelectorAll(selector || "*");
    return [...res].filter((ele) => {
      return ele.parentNode === el;
    });
  },
  /**
   * 查找某个节点下指定选择器的兄弟节点
   * @param {Object} el 元素节点
   * @param {Object} selector 取值等同于queryselectorAll的参数，支持多选择器
   */
  siblings(el, selector) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (selector && typeof selector != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!el.parentNode) {
      return [];
    }
    const res = el.parentNode.querySelectorAll(selector || "*");
    return [...res].filter((ele) => {
      return ele.parentNode === el.parentNode && ele != el;
    });
  },
  /**
   * rem与px单位转换
   * @param {Object} num rem数值
   */
  rem2px(num) {
    if (!number$1.isNumber(num)) {
      throw new TypeError("The argument must be a number");
    }
    let fs = this.getCssStyle(document.documentElement, "font-size");
    return number$1.mutiply(num, parseFloat(fs));
  },
  /**
   * rem与px单位转换
   * @param {Object} num px数值
   */
  px2rem(num) {
    if (!number$1.isNumber(num)) {
      throw new TypeError("The argument must be a number");
    }
    let fs = this.getCssStyle(document.documentElement, "font-size");
    return number$1.divide(num, parseFloat(fs));
  },
  /**
   * 获取元素的内容宽度，内容宽度不包括border和padding
   * @param {Object} el 支持css选择器字符串，未指定则表示document.body
   */
  width(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let clientWidth = el.clientWidth;
    let paddingLeft_width = parseFloat(this.getCssStyle(el, "padding-left"));
    let paddingRight_width = parseFloat(this.getCssStyle(el, "padding-right"));
    return number$1.subtract(clientWidth, paddingLeft_width, paddingRight_width);
  },
  /**
   * 获取元素的内容高度，内容高度不包括border和padding
   * @param {Object} el 支持css选择器字符串 未指定则表示document.body
   */
  height(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let clientHeight = el.clientHeight;
    let paddingTop_height = parseFloat(this.getCssStyle(el, "padding-top"));
    let paddingBottom_height = parseFloat(this.getCssStyle(el, "padding-bottom"));
    return number$1.subtract(clientHeight, paddingTop_height, paddingBottom_height);
  },
  /**
   * 移除class
   * @param {Object} el 元素节点
   * @param {Object} className 支持多类,以空格划分
   */
  removeClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string$1.trim(className).split(/\s+/);
    classArray.forEach((item, index) => {
      classList.remove(item);
    });
  },
  /**
   * 添加class
   * @param {Object} el 元素节点
   * @param {Object} className 支持多类,以空格划分
   */
  addClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string$1.trim(className).split(/\s+/);
    classArray.forEach((item, index) => {
      classList.add(item);
    });
  },
  /**
   * 判断指定元素是否含有指定类名
   * @param {Object} el 元素节点
   * @param {Object} className 支持多类,以空格划分
   */
  hasClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string$1.trim(className).split(/\s+/);
    return classArray.every((item, index) => {
      return classList.contains(item);
    });
  },
  /**
   * 监听元素滚动到顶部或者底部
   * @param {Object} el 支持css选择器字符串 未指定则为窗口滚动
   * @param {Object} callback 回调函数
   */
  scrollTopBottomTrigger(el, callback) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollEle = window;
    if (this.isElement(el) && el != document.body && el != document.documentElement) {
      scrollEle = el;
    }
    if (typeof el == "function") {
      callback = el;
    }
    let flag = true;
    scrollEle.addEventListener("scroll", (e) => {
      if (this.getScrollTop(scrollEle) <= 0) {
        let options = {
          state: "top",
          target: scrollEle
        };
        if (!flag) {
          return;
        }
        if (typeof callback == "function") {
          flag = false;
          callback(options);
        }
      } else {
        let options = {
          state: "bottom",
          target: scrollEle
        };
        let height = 0;
        if (scrollEle == window) {
          height = window.innerHeight;
        } else {
          height = scrollEle.clientHeight;
        }
        if (number$1.add(this.getScrollTop(scrollEle), height) + 1 >= this.getScrollHeight(scrollEle) && height != this.getScrollHeight(scrollEle)) {
          if (!flag) {
            return;
          }
          if (typeof callback == "function") {
            flag = false;
            callback(options);
          }
        } else {
          flag = true;
        }
      }
    });
  },
  /**
   * 获取文档或元素的总宽度
   * @param {Object} el 支持css选择器字符串 未指定则表示整个页面文档
   */
  getScrollWidth(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollWidth = 0;
    if (this.isElement(el) && el != document.documentElement && el != document.body) {
      scrollWidth = el.scrollWidth;
    } else {
      if (document.documentElement.scrollWidth == 0 || document.body.scrollWidth == 0) {
        scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
      } else {
        scrollWidth = document.documentElement.scrollWidth > document.body.scrollWidth ? document.documentElement.scrollWidth : document.body.scrollWidth;
      }
    }
    return scrollWidth;
  },
  /**
   * 获取文档或者元素的总高度
   * @param {Object} el 支持css选择器字符串 未指定则表示整个页面文档
   */
  getScrollHeight(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollHeight = 0;
    if (this.isElement(el) && el != document.documentElement && el != document.body) {
      scrollHeight = el.scrollHeight;
    } else {
      if (document.documentElement.scrollHeight == 0 || document.body.scrollHeight == 0) {
        scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      } else {
        scrollHeight = document.documentElement.scrollHeight > document.body.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
      }
    }
    return scrollHeight;
  },
  /**
   * 设置滚动条在Y轴上的距离
   * @param {Object} options {el,number,time} el支持css选择器字符串 未指定则为窗口滚动
   */
  setScrollTop(options) {
    let isWindow = false;
    let el = options.el;
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let number$1$1 = options.number || 0;
    let time = options.time || 0;
    if (!this.isElement(el) || el == document.body || el == document.documentElement || el == window) {
      isWindow = true;
    }
    return new Promise((resolve, reject) => {
      if (time <= 0) {
        if (isWindow) {
          document.documentElement.scrollTop = document.body.scrollTop = number$1$1;
        } else {
          el.scrollTop = number$1$1;
        }
        resolve();
      } else {
        let spacingTime = 10;
        let spacingIndex = number$1.divide(time, spacingTime);
        let nowTop = this.getScrollTop(el);
        let everTop = number$1.divide(number$1.subtract(number$1$1, nowTop), spacingIndex);
        let scrollTimer = setInterval(() => {
          if (spacingIndex > 0) {
            spacingIndex--;
            if (isWindow) {
              document.documentElement.scrollTop = document.body.scrollTop = nowTop = number$1.add(nowTop, everTop);
            } else {
              el.scrollTop = nowTop = number$1.add(nowTop, everTop);
            }
          } else {
            clearInterval(scrollTimer);
            resolve();
          }
        }, spacingTime);
      }
    });
  },
  /**
   * 获取滚动条在Y轴上滚动的距离
   * @param {Object} el 支持css选择器字符串 未指定则为窗口滚动
   */
  getScrollTop(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollTop = 0;
    if (this.isElement(el) && el != document.body && el != document.documentElement && el != window) {
      scrollTop = el.scrollTop;
    } else {
      if (document.documentElement.scrollTop == 0 || document.body.scrollTop == 0) {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      } else {
        scrollTop = document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
      }
    }
    return scrollTop;
  },
  /**
   * 获取滚动条在X轴上滚动的距离
   * @param {Object} el 支持css选择器字符串 未指定则为窗口滚动
   */
  getScrollLeft(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollLeft = 0;
    if (this.isElement(el) && el != document.body && el != document.documentElement && el != window) {
      scrollLeft = el.scrollLeft;
    } else {
      if (document.documentElement.scrollLeft == 0 || document.body.scrollLeft == 0) {
        scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      } else {
        scrollLeft = document.documentElement.scrollLeft > document.body.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
      }
    }
    return scrollLeft;
  },
  /**
   * 设置滚动条在X轴上的距离
   * @param {Object} options {el,number,time} el支持css选择器字符串 未指定则为窗口滚动
   */
  setScrollLeft(options) {
    let isWindow = false;
    let el = options.el;
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let number$1$1 = options.number || 0;
    let time = options.time || 0;
    if (!this.isElement(el) || el == document.body || el == document.documentElement || el == window) {
      isWindow = true;
    }
    return new Promise((resolve, reject) => {
      if (time <= 0) {
        if (isWindow) {
          document.documentElement.scrollLeft = document.body.scrollLeft = number$1$1;
        } else {
          el.scrollLeft = number$1$1;
        }
        resolve();
      } else {
        let spacingTime = 10;
        let spacingIndex = number$1.divide(time, spacingTime);
        let nowLeft = this.getScrollLeft(el);
        let everLeft = number$1.divide(number$1.subtract(number$1$1, nowLeft), spacingIndex);
        let scrollTimer = setInterval(() => {
          if (spacingIndex > 0) {
            spacingIndex--;
            if (isWindow) {
              document.documentElement.scrollLeft = document.body.scrollLeft = nowLeft = number$1.add(nowLeft, everLeft);
            } else {
              el.scrollLeft = nowLeft = number$1.add(nowLeft, everLeft);
            }
          } else {
            clearInterval(scrollTimer);
            resolve();
          }
        }, spacingTime);
      }
    });
  },
  /**
   * 获取元素指定样式
   * @param {Object} el 元素
   * @param {Object} cssName 样式名称
   */
  getCssStyle(el, cssName) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!cssName || typeof cssName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let cssText = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
      cssText = document.defaultView.getComputedStyle(el)[cssName];
    } else {
      cssText = el.currentStyle[cssName];
    }
    return cssText;
  },
  /**
   * 判断字符串属于哪种选择器
   * @param {Object} selector
   */
  getCssSelector(selector) {
    if (!selector || typeof selector != "string") {
      throw new TypeError("The argument must be a selector string");
    }
    if (/^#{1}/.test(selector)) {
      return {
        type: "id",
        value: selector.substr(1)
      };
    }
    if (/^\./.test(selector)) {
      return {
        type: "class",
        value: selector.substr(1)
      };
    }
    if (/^\[(.+)\]$/.test(selector)) {
      let type = "attribute";
      let value = "";
      let attribute = string$1.trim(selector, true).substring(1, string$1.trim(selector, true).length - 1);
      let arry = attribute.split("=");
      if (arry.length == 1) {
        value = arry[0];
      }
      if (arry.length == 2) {
        value = {
          attributeName: arry[0],
          attributeValue: arry[1].replace(/\'/g, "").replace(/\"/g, "")
          //去除属性值的单引号或者双引号
        };
      }
      return {
        type,
        value
      };
    }
    return {
      type: "tag",
      value: selector
    };
  },
  /**
   * 获取元素距离可视窗口的位置
   * @param {Object} el 支持css选择器字符串 未指定则为document.body
   */
  getElementBounding(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let point = el.getBoundingClientRect();
    let top = point.top;
    let bottom = number$1.subtract(document.documentElement.clientHeight || window.innerHeight, point.bottom);
    let left = point.left;
    let right = number$1.subtract(document.documentElement.clientWidth || window.innerWidth, point.right);
    return {
      top,
      bottom,
      left,
      right
    };
  },
  /**
   * 判断是否是元素节点
   * @param {Object} el
   */
  isElement(el) {
    return el && el instanceof Node && el.nodeType === 1;
  },
  /**
   * 字符串转dom
   * @param {Object} str
   */
  string2dom(str, parentTag = "div") {
    if (!str || typeof str != "string") {
      throw new TypeError("The argument must be an HTML string");
    }
    let parentEle = document.createElement(parentTag);
    parentEle.innerHTML = str;
    if (parentEle.children.length == 1) {
      return parentEle.children[0];
    } else {
      return parentEle.children;
    }
  }
};
const dataName$1 = "_dap-datas";
const data$1 = {
  /**
   * 移除指定数据
   * @param {Object} el
   * @param {Object} key
   */
  remove(el, key) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let data2 = el[dataName$1] || {};
    if (key === void 0 || key === null || key === "") {
      el[dataName$1] = {};
    } else {
      delete data2[key];
      el[dataName$1] = data2;
    }
  },
  /**
   * 判断是否含有指定数据
   * @param {Object} el
   * @param {Object} key
   */
  has(el, key) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (key === void 0 || key === null || key === "") {
      throw new TypeError("The second parameter must be a unique key");
    }
    let data2 = el[dataName$1] || {};
    return data2.hasOwnProperty(key);
  },
  /**
   * 获取元素指定数据
   * @param {Object} el
   * @param {Object} key
   */
  get(el, key) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let data2 = el[dataName$1] || {};
    if (key === void 0 || key === null || key === "") {
      return data2;
    } else {
      return data2[key];
    }
  },
  /**
   * 获取元素指定数据
   * @param {Object} el
   * @param {Object} key
   * @param {Object} value
   */
  set(el, key, value) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (key === void 0 || key === null || key === "") {
      throw new TypeError("The second parameter must be a unique key");
    }
    let data2 = el[dataName$1] || {};
    data2[key] = value;
    el[dataName$1] = data2;
  }
};
const common$1 = {
  /**
   * 常用判断
   * @param {Object} text 要判断的字符串
   * @param {Object} params 判断的类型字符串
   */
  matchingText(text, params) {
    if (!text || typeof text != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!params || typeof params != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let reg = null;
    if (params == "Chinese") {
      reg = /^[\u4e00-\u9fa5]+$/;
    }
    if (params == "chinese") {
      reg = /[\u4e00-\u9fa5]/;
    }
    if (params == "email") {
      reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    }
    if (params == "userName") {
      reg = /^[a-zA-Z0-9_]{4,16}$/;
    }
    if (params == "int+") {
      reg = /^\d+$/;
    }
    if (params == "int-") {
      reg = /^-\d+$/;
    }
    if (params == "int") {
      reg = /^-?\d+$/;
    }
    if (params == "pos") {
      reg = /^\d*\.?\d+$/;
    }
    if (params == "neg") {
      reg = /^-\d*\.?\d+$/;
    }
    if (params == "number") {
      reg = /^-?\d*\.?\d+$/;
    }
    if (params == "phone") {
      reg = /^1[0-9]\d{9}$/;
    }
    if (params == "idCard") {
      reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    }
    if (params == "url") {
      reg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    }
    if (params == "IPv4") {
      reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    }
    if (params == "hex") {
      reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    }
    if (params == "date") {
      let reg1 = /^((\d{4})(-)(\d{2})(-)(\d{2}))$/;
      let reg2 = /^(\d{4})(\/)(\d{2})(\/)(\d{2})$/;
      let reg3 = /^(\d{4})(\.)(\d{2})(\.)(\d{2})$/;
      let reg4 = /^(\d{4})(年)(\d{2})(月)(\d{2})(日)$/;
      return reg1.test(text) || reg2.test(text) || reg3.test(text) || reg4.test(text);
    }
    if (params == "time") {
      reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    }
    if (params == "QQ") {
      reg = /^[1-9][0-9]{4,10}$/;
    }
    if (params == "weixin") {
      reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    }
    if (params == "plate") {
      reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    }
    if (!reg) {
      throw new Error("The second parameter is out of scope");
    }
    return reg.test(text);
  },
  /**
   * 根据参数名获取地址栏参数值
   * @param {Object} name
   */
  getUrlParams(name) {
    if (!name || typeof name != "string") {
      throw new TypeError("The argument must be a string");
    }
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let search = window.location.search.substr(1);
    if (!search) {
      let arr = window.location.hash.split("?");
      if (arr.length == 2) {
        search = arr[1];
      }
    }
    let r = search.match(reg);
    if (r) {
      return decodeURIComponent(r[2]);
    }
    return null;
  },
  /**
   * 判断是否空对象
   * @param {Object} obj
   */
  isEmptyObject(obj2) {
    if (this.isObject(obj2)) {
      if (Object.keys(obj2).length == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  /**
   * 判断两个参数是否相等
   * @param {Object} a
   * @param {Object} b
   */
  equal(a, b) {
    if (typeof a !== typeof b) {
      return false;
    }
    if (this.isObject(a) && this.isObject(b)) {
      a = Object.assign({}, a);
      b = Object.assign({}, b);
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      let length = aProps.length;
      for (let i = 0; i < length; i++) {
        let propName = aProps[i];
        let propA = a[propName];
        let propB = b[propName];
        if (this.isObject(propA)) {
          if (this.equal(propA, propB)) {
            return true;
          } else {
            return false;
          }
        } else if (propA !== propB) {
          return false;
        }
      }
      return true;
    } else {
      return a === b;
    }
  },
  /**
   * 是否对象
   * @param {Object} val
   */
  isObject(val) {
    if (typeof val === "object" && val) {
      return true;
    }
    return false;
  },
  /**
   * 文本复制
   * @param {Object} text
   */
  copyText(text) {
    if (!text || typeof text != "string") {
      throw new TypeError("No text to copy is defined");
    }
    let el = element$1.string2dom('<input type="text" />');
    document.body.appendChild(el);
    el.value = text;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
};
const parseEventName$1 = (eventName) => {
  let eventNames = eventName.split(/[\s]+/g);
  let result = [];
  eventNames.forEach((name) => {
    let arr = name.split(".");
    let obj2 = {
      eventName: arr[0]
    };
    if (arr.length > 1) {
      obj2.guid = arr[1];
    }
    result.push(obj2);
  });
  return result;
};
const updateEvents$1 = (events) => {
  let obj2 = {};
  let keys = Object.keys(events);
  keys.forEach((key) => {
    if (events[key]) {
      obj2[key] = events[key];
    }
  });
  return obj2;
};
const bindSingleListener$1 = (el, eventName, guid, fn, options) => {
  let events = data$1.get(el, "dap-defined-events") || {};
  if (!guid) {
    guid = data$1.get(el, "dap-event-guid") || 0;
    data$1.set(el, "dap-event-guid", guid + 1);
  }
  guid = eventName + "." + guid;
  if (events[guid] && events[guid].type == eventName) {
    el.removeEventListener(eventName, events[guid].fn, events[guid].options);
  }
  el.addEventListener(eventName, fn, options);
  events[guid] = {
    type: eventName,
    fn,
    options
  };
  data$1.set(el, "dap-defined-events", events);
};
const unbindSingleListener$1 = (el, eventName, guid) => {
  let events = data$1.get(el, "dap-defined-events") || {};
  let keys = Object.keys(events);
  let length = keys.length;
  for (let i = 0; i < length; i++) {
    let key = keys[i];
    if (events[key].type == eventName) {
      if (guid) {
        if (key == eventName + "." + guid) {
          el.removeEventListener(events[key].type, events[key].fn, events[key].options);
          events[key] = void 0;
        }
      } else {
        el.removeEventListener(events[key].type, events[key].fn, events[key].options);
        events[key] = void 0;
      }
    }
  }
  events = updateEvents$1(events);
  data$1.set(el, "dap-defined-events", events);
};
const event$1 = {
  /**
   * 绑定事件
   * @param {Object} el 元素节点
   * @param {Object} eventName 事件名称
   * @param {Object} fn 函数
   * @param {Object} options 参数
   */
  on(el, eventName, fn, options) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (!eventName || typeof eventName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!fn || typeof fn != "function") {
      throw new TypeError("The third argument must be a function");
    }
    if (!common$1.isObject(options)) {
      options = {};
    }
    const result = parseEventName$1(eventName);
    result.forEach((res) => {
      bindSingleListener$1(el, res.eventName, res.guid, fn.bind(el), options);
    });
  },
  /**
   * 事件解绑
   * @param {Object} el 元素节点
   * @param {Object} eventName 事件名称
   */
  off(el, eventName) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let events = data$1.get(el, "dap-defined-events");
    if (!events) {
      return;
    }
    if (!eventName) {
      let keys = Object.keys(events);
      let length = keys.length;
      for (let i = 0; i < length; i++) {
        let key = keys[i];
        el.removeEventListener(events[key].type, events[key].fn, events[key].options);
      }
      data$1.remove(el, "dap-defined-events");
      data$1.remove(el, "dap-event-guid");
      return;
    }
    const result = parseEventName$1(eventName);
    result.forEach((res) => {
      unbindSingleListener$1(el, res.eventName, res.guid);
    });
  },
  /**
   * 获取绑定的所有事件
   * @param {*} el
   */
  get(el) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let events = data$1.get(el, "dap-defined-events");
    if (!events) {
      return;
    }
    return events;
  }
};
const date = {
  /**
   * 获取前N个月的日期，包含本月
   * @param {Object} date 指定日期，默认为今日
   * @param {Object} num 指定个数，默认为1
   */
  getPrevMonths(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number$1.isNumber(num)) {
      num = 1;
    }
    let dateArray = [date2];
    for (let i = 0; i < num - 1; i++) {
      let y = date2.getFullYear();
      let m = date2.getMonth();
      if (m == 0) {
        m = 12;
        y--;
      }
      let d = /* @__PURE__ */ new Date();
      d.setMonth(m - 1);
      d.setFullYear(y);
      dateArray.push(d);
      date2 = d;
    }
    return dateArray;
  },
  /**
   * 获取后N个月的日期，包含本月
   * @param {Object} date 指定日期，默认为今日
   * @param {Object} num 指定个数，默认为1
   */
  getNextMonths(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number$1.isNumber(num)) {
      num = 1;
    }
    let dateArray = [date2];
    for (let i = 0; i < num - 1; i++) {
      let y = date2.getFullYear();
      let m = date2.getMonth();
      if (m == 11) {
        m = -1;
        y++;
      }
      let d = /* @__PURE__ */ new Date();
      d.setMonth(m + 1);
      d.setFullYear(y);
      dateArray.push(d);
      date2 = d;
    }
    return dateArray;
  },
  /**
   * 获取指定天数后的日期
   * @param {Object} date 指定日期，默认为今日
   * @param {Object} num 指定天数，默认为1
   */
  getDateAfter(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number$1.isNumber(num)) {
      num = 1;
    }
    return new Date(date2.getTime() + num * 24 * 60 * 60 * 1e3);
  },
  /**
   * 获取指定天数前的日期
   * @param {Object} date 指定日期，默认为今日
   * @param {Object} num 指定天数，默认为1
   */
  getDateBefore(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number$1.isNumber(num)) {
      num = 1;
    }
    return new Date(date2.getTime() - num * 24 * 60 * 60 * 1e3);
  },
  /**
   * 获取某个月的天数
   * @param {Object} years
   * @param {Object} month
   */
  getDays(year, month) {
    if (!number$1.isNumber(year)) {
      throw new TypeError("The first parameter must be a number representing the year");
    }
    if (!number$1.isNumber(month)) {
      throw new TypeError("The second argument must be a number representing the month");
    }
    year = parseInt(year);
    month = parseInt(month);
    let d = new Date(year, month, 0);
    return d.getDate();
  }
};
const color$1 = {
  /**
   * rgb转hsv值
   * @param {Object} rgb rgb值，数组
   */
  rgb2hsv(rgb) {
    if (!Array.isArray(rgb) || rgb.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let h = 0;
    let s = 0;
    let v = 0;
    let r = rgb[0] >= 255 ? 255 : rgb[0];
    let g = rgb[1] >= 255 ? 255 : rgb[1];
    let b = rgb[2] >= 255 ? 255 : rgb[2];
    r = r <= 0 ? 0 : r;
    g = g <= 0 ? 0 : g;
    b = b <= 0 ? 0 : b;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    v = max / 255;
    if (max === 0) {
      s = 0;
    } else {
      s = 1 - min / max;
    }
    if (max === min) {
      h = 0;
    } else if (max === r && g >= b) {
      h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
      h = 60 * ((g - b) / (max - min)) + 360;
    } else if (max === g) {
      h = 60 * ((b - r) / (max - min)) + 120;
    } else if (max === b) {
      h = 60 * ((r - g) / (max - min)) + 240;
    }
    h = parseInt(h);
    s = parseInt(s * 100);
    v = parseInt(v * 100);
    return [h, s, v];
  },
  /**
   * hsv格式值转rgb值
   * @param {Object} hsv hsv值，数组
   */
  hsv2rgb(hsv) {
    if (!Array.isArray(hsv) || hsv.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let h = hsv[0] >= 360 || hsv[0] <= 0 ? 0 : hsv[0];
    let s = hsv[1] >= 100 ? 100 : hsv[1];
    s = s <= 0 ? 0 : s;
    let v = hsv[2] >= 100 ? 100 : hsv[2];
    v = v <= 0 ? 0 : v;
    s = s / 100;
    v = v / 100;
    let r = 0;
    let g = 0;
    let b = 0;
    let i = parseInt(h / 60 % 6);
    let f = h / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    r = parseInt(r * 255);
    g = parseInt(g * 255);
    b = parseInt(b * 255);
    return [r, g, b];
  },
  /**
   * rgb值转十六进制
   * @param {Array} rgb rgb值，数组
   */
  rgb2hex(rgb) {
    if (!Array.isArray(rgb) || rgb.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
  },
  /**
   * 十六进制颜色转rgb
   * @param {String} hex 十六进制颜色值
   */
  hex2rgb(hex) {
    if (!hex || typeof hex != "string") {
      throw new TypeError("The argument must be a string");
    }
    let color2 = hex.toLowerCase();
    if (!common$1.matchingText(color2, "hex")) {
      throw new TypeError("The argument must be a hexadecimal color value");
    }
    if (color2.length === 4) {
      let colorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        colorNew += color2.slice(i, i + 1).concat(color2.slice(i, i + 1));
      }
      color2 = colorNew;
    }
    let colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color2.slice(i, i + 2)));
    }
    return colorChange;
  }
};
const file$1 = {
  /**
   * 根据文件获取可预览的图片路径
   * @param {Object} file
   */
  getImageUrl(file2) {
    if (!file2 || !(file2 instanceof File)) {
      throw new TypeError("The argument must be a File object");
    }
    return window.URL.createObjectURL(file2);
  },
  /**
   * 将JS的file对象转为BASE64位字符串，通过then方法回调,参数为base64字符串
   * @param {Object} file
   */
  dataFileToBase64(file2) {
    return new Promise((resolve, reject) => {
      if (!file2 || !(file2 instanceof File)) {
        reject(new TypeError("The argument must be a File object"));
      }
      let reader = new FileReader();
      reader.readAsDataURL(file2);
      reader.onloadend = () => {
        let dataURL = reader.result;
        resolve(dataURL);
      };
    });
  },
  /**
   * 将base64位格式文件转换为file对象
   * @param {Object} base64String base64位格式字符串
   * @param {Object} fileName 转换后的文件名字，包含后缀
   */
  dataBase64toFile(base64String, fileName) {
    if (!base64String || typeof base64String != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!fileName || typeof fileName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let arr = base64String.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {
      type: mime
    });
  }
};
const platform$1 = {
  //设备语言类型
  language() {
    return window.navigator.browserLanguage || window.navigator.language;
  },
  /**
   * 获取设备类型
   */
  device() {
    const userAgent = window.navigator.userAgent;
    return {
      PC: !userAgent.match(/AppleWebKit.*Mobile.*/),
      //是否移动终端
      Mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/),
      //是否iPhone
      iPhone: userAgent.includes("iPhone"),
      //是否手机
      Phone: userAgent.includes("Android") && /(?:Mobile)/.test(userAgent) || userAgent.includes("iPhone") || /(?:Windows Phone)/.test(userAgent),
      //是否iPad
      iPad: userAgent.includes("iPad"),
      //是否平板电脑
      Tablet: userAgent.includes("iPad") || userAgent.includes("Android") && !/(?:Mobile)/.test(userAgent) || userAgent.includes("Firefox") && /(?:Tablet)/.test(userAgent),
      //windows手机
      WindowsPhone: /(?:Windows Phone)/.test(userAgent)
    };
  },
  /**
   * 获取浏览器类型
   */
  browser() {
    const userAgent = window.navigator.userAgent;
    return {
      //是否edge浏览器
      Edge: !!userAgent.match(/Edg\/([\d.]+)/),
      //是否微信内置浏览器
      weixin: userAgent.includes("MicroMessenger"),
      //是否QQ内置浏览器
      QQ: userAgent.includes("QQ"),
      //是否QQ浏览器
      QQBrowser: userAgent.includes("MQQBrowser"),
      //是否UC浏览器
      UC: userAgent.includes("UCBrowser"),
      //是否谷歌浏览器
      Chrome: userAgent.includes("Chrome"),
      //是否火狐浏览器
      Firefox: userAgent.includes("Firefox"),
      //是否搜狗浏览器
      sougou: userAgent.toLocaleLowerCase().includes("se 2.x") || userAgent.toLocaleLowerCase().includes("metasr") || userAgent.toLocaleLowerCase().includes("sogou"),
      //是否safari浏览器
      Safari: userAgent.includes("Safari") && !userAgent.includes("Chrome")
    };
  },
  /**
   * 获取浏览器内核
   */
  browserKernel() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Presto")) {
      return "opera";
    } else if (userAgent.includes("AppleWebKit")) {
      return "webkit";
    } else if (userAgent.includes("Gecko") && !userAgent.includes("KHTML")) {
      return "gecko";
    }
    return "";
  },
  /**
   * 获取操作系统数据
   */
  os() {
    const userAgent = window.navigator.userAgent;
    return {
      //是否Windows系统
      Windows: userAgent.includes("Windows"),
      //x64/x32
      Windows_CPU: function() {
        if (userAgent.toLocaleLowerCase().includes("win64") || userAgent.toLocaleLowerCase().includes("wow64")) {
          return "x64";
        } else if (userAgent.toLocaleLowerCase().includes("win32") || userAgent.toLocaleLowerCase().includes("wow32")) {
          return "x32";
        }
        return "";
      }(),
      //Windows版本
      Windows_Version: function() {
        if (userAgent.includes("Windows NT 6.1") || userAgent.includes("Windows 7")) {
          return "Win7";
        } else if (userAgent.includes("Windows NT 6.3") || userAgent.includes("Windows NT 6.2") || userAgent.includes("Windows NT 8")) {
          return "Win8";
        } else if (userAgent.includes("Windows NT 10") || userAgent.includes("Windows NT 6.4")) {
          return "Win10";
        }
        return "";
      }(),
      //是否Mac
      Mac: userAgent.includes("Macintosh"),
      //Mac版本
      Mac_Version: function() {
        if (userAgent.includes("Macintosh")) {
          const matches = userAgent.match(/Mac OS X ([^\s]+)\)/);
          if (matches && matches[1]) {
            return matches[1].split(/_|\./).join(".");
          }
        }
        return "";
      }(),
      //是否ios系统
      ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      //ios系统版本
      ios_Version: function() {
        if (!!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          const matches = userAgent.match(/CPU.+OS ([^\s]+) like Mac OS X/);
          if (matches && matches[1]) {
            return matches[1].split(/_|\./).join(".");
          }
        }
        return "";
      }(),
      //是否Android系统
      Android: userAgent.includes("Android"),
      //Android系统版本
      Android_Version: function() {
        const matches = userAgent.match(/Android ([^\s]+);/);
        if (matches && matches[1]) {
          return matches[1].split(/_|\./).join(".");
        }
        return "";
      }(),
      //是否Linux系统
      Linux: userAgent.includes("Linux"),
      //是否鸿蒙系统
      HarmonyOS: userAgent.includes("HarmonyOS"),
      //是否Ubuntu系统
      Ubuntu: userAgent.includes("Ubuntu")
    };
  }
};
const speech$1 = {
  /**
   * 将文字加入语音播报队列
   * @param {Object} text
   */
  start(text, params) {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    let defaultParams = {
      //话语的音调(0-2，值越大越尖锐,越低越低沉)
      pitch: 0.8,
      //说话的速度(0-10，值越大语速越快,越小语速越慢)
      rate: 1,
      //说话的音量：0-1
      volume: 1,
      //播放开始事件
      start: function() {
      },
      //播放结束事件
      end: function() {
      },
      //播放暂停事件
      pause: function() {
      },
      //播放恢复事件
      resume: function() {
      },
      //播放出错事件
      error: function() {
      }
    };
    if (!common$1.isObject(params)) {
      params = {};
    }
    if (number$1.isNumber(params.pitch)) {
      defaultParams.pitch = params.pitch;
    }
    if (number$1.isNumber(params.rate)) {
      defaultParams.rate = params.rate;
    }
    if (number$1.isNumber(params.volume)) {
      defaultParams.volume = params.volume;
    }
    if (typeof params.start == "function") {
      defaultParams.start = params.start;
    }
    if (typeof params.end == "function") {
      defaultParams.end = params.end;
    }
    if (typeof params.pause == "function") {
      defaultParams.pause = params.pause;
    }
    if (typeof params.resume == "function") {
      defaultParams.resume = params.resume;
    }
    if (typeof params.error == "function") {
      defaultParams.error = params.error;
    }
    const speech2 = new SpeechSynthesisUtterance();
    speech2.text = text;
    speech2.pitch = defaultParams.pitch;
    speech2.rate = defaultParams.rate;
    speech2.volume = defaultParams.volume;
    speech2.lang = "zh-CN";
    speech2.onstart = (event2) => {
      defaultParams.start.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onend = (event2) => {
      defaultParams.end.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onpause = (event2) => {
      defaultParams.pause.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onresume = (event2) => {
      defaultParams.resume.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onerror = (event2) => {
      defaultParams.error.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    window.speechSynthesis.speak(speech2);
  },
  /**
   * 停止播报，停止所有播报队列里面的语音
   */
  stop() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.cancel();
  },
  /**
   * 暂停播报
   */
  pause() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.pause();
  },
  /**
   * 恢复暂停的播报
   */
  resume() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.resume();
  }
};
const obj$1 = { number: number$1, data: data$1, element: element$1, event: event$1, common: common$1, date, color: color$1, file: file$1, string: string$1, platform: platform$1, speech: speech$1 };
const Util = {
  //获取属性集合
  getAttributes(el) {
    let o = {};
    const length = el.attributes.length;
    for (let i = 0; i < length; i++) {
      const attribute = el.attributes[i];
      if (!/(^on)|(^style$)|(^contenteditable$)/g.test(attribute.nodeName)) {
        o[attribute.nodeName] = attribute.nodeValue;
      }
    }
    return o;
  },
  //获取样式集合
  getStyles(el) {
    let o = {};
    if (el.getAttribute("style")) {
      const styles = el.getAttribute("style");
      let i = 0;
      let start = 0;
      let splitStyles = [];
      while (i < styles.length) {
        if (styles[i] == ";" && styles.substring(i + 1, i + 8) != "base64,") {
          splitStyles.push(styles.substring(start, i));
          start = i + 1;
        }
        if (i == styles.length - 1 && start < i) {
          splitStyles.push(styles.substring(start, i));
        }
        i++;
      }
      splitStyles.forEach((style) => {
        const index = style.indexOf(":");
        const property = style.substring(0, index).trim();
        const value = style.substring(index + 1).trim();
        o[property] = value;
      });
    }
    return o;
  },
  //生成唯一key
  createUniqueKey() {
    let key = obj$1.data.get(window, "data-alex-editor-key") || 0;
    key++;
    obj$1.data.set(window, "data-alex-editor-key", key);
    return key;
  },
  //是否零宽度无断空白字符
  isSpaceText(val) {
    return /^[\uFEFF]+$/g.test(val);
  },
  //深拷贝
  clone(data2) {
    if (obj$1.common.isObject(data2) || Array.isArray(data2)) {
      return JSON.parse(JSON.stringify(data2));
    }
    return data2;
  },
  //是否包含
  isContains(parent, target) {
    if (target.nodeType == 3) {
      return obj$1.element.isContains(parent, target.parentNode);
    }
    return obj$1.element.isContains(parent, target);
  },
  //blob转base64字符串
  blobToBase64(blob) {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(e.target.result);
      };
      fileReader.readAsDataURL(blob);
    });
  },
  //生成唯一值
  createGuid() {
    let key = obj$1.data.get(window, "data-alex-editor-guid") || 0;
    key++;
    obj$1.data.set(window, "data-alex-editor-guid", key);
    return key;
  }
};
const _AlexElement = class {
  constructor(type, parsedom, marks, styles, textContent) {
    this.key = Util.createUniqueKey();
    this.type = type;
    this.parsedom = parsedom;
    this.marks = marks;
    this.styles = styles;
    this.textContent = textContent;
    this.children = null;
    this.parent = null;
    this.behavior = "default";
    this._elm = null;
  }
  //是否根级块元素
  isBlock() {
    return this.type == "block";
  }
  //是否内部块元素
  isInblock() {
    return this.type == "inblock";
  }
  //是否行内元素
  isInline() {
    return this.type == "inline";
  }
  //是否闭合
  isClosed() {
    return this.type == "closed";
  }
  //是否文本
  isText() {
    return this.type == "text";
  }
  //是否换行符
  isBreak() {
    return this.isClosed() && this.parsedom == "br";
  }
  //是否空元素
  isEmpty() {
    if (this.isText()) {
      return !this.textContent;
    }
    if (this.isBlock() || this.isInblock() || this.isInline()) {
      if (!this.hasChildren()) {
        return true;
      }
      const allEmpty = this.children.every((el) => {
        return !el || el.isEmpty();
      });
      return allEmpty;
    }
    return false;
  }
  //是否零宽度无断空白元素
  isSpaceText() {
    return this.isText() && !this.isEmpty() && Util.isSpaceText(this.textContent);
  }
  //判断两个Element是否相等
  isEqual(element2) {
    if (!_AlexElement.isElement(element2)) {
      return false;
    }
    return this.key == element2.key;
  }
  //是否包含指定元素
  isContains(element2) {
    if (this.isEqual(element2)) {
      return true;
    }
    if (element2.isBlock()) {
      return false;
    }
    return this.isContains(element2.parent);
  }
  //判断是否只包含换行符
  isOnlyHasBreak() {
    if (this.hasChildren()) {
      return this.children.every((item) => {
        return item.isBreak() || item.isEmpty();
      });
    }
    return false;
  }
  //判断元素是否在拥有代码块样式的块内
  isPreStyle() {
    const block2 = this.getBlock();
    const inblock2 = this.getInblock();
    if (inblock2) {
      if (inblock2.parsedom == "pre") {
        return true;
      }
      if (inblock2.hasStyles() && (inblock2.styles["white-space"] == "pre" || inblock2.styles["white-space"] == "pre-wrap")) {
        return true;
      }
      return inblock2.parent.isPreStyle();
    } else {
      if (block2.parsedom == "pre") {
        return true;
      }
      if (block2.hasStyles() && (block2.styles["white-space"] == "pre" || block2.styles["white-space"] == "pre-wrap")) {
        return true;
      }
      return false;
    }
  }
  //是否含有标记
  hasMarks() {
    if (!this.marks) {
      return false;
    }
    if (obj$1.common.isObject) {
      return !obj$1.common.isEmptyObject(this.marks);
    }
    return false;
  }
  //是否含有样式
  hasStyles() {
    if (!this.styles) {
      return false;
    }
    if (obj$1.common.isObject(this.styles)) {
      return !obj$1.common.isEmptyObject(this.styles);
    }
    return false;
  }
  //是否有子元素
  hasChildren() {
    if (this.isClosed() || this.isText()) {
      return false;
    }
    if (Array.isArray(this.children)) {
      return !!this.children.length;
    }
    return false;
  }
  //是否包含嵌套关系
  hasContains(element2) {
    return this.isContains(element2) || element2.isContains(this);
  }
  //克隆当前元素,deep为true表示深度克隆
  clone(deep = true) {
    if (typeof deep != "boolean") {
      throw new Error("The parameter must be a Boolean");
    }
    let el = new _AlexElement(this.type, this.parsedom, Util.clone(this.marks), Util.clone(this.styles), this.textContent);
    el.behavior = this.behavior;
    if (deep && this.hasChildren()) {
      this.children.forEach((child) => {
        let clonedChild = child.clone(deep);
        if (el.hasChildren()) {
          el.children.push(clonedChild);
        } else {
          el.children = [clonedChild];
        }
        clonedChild.parent = el;
      });
    }
    return el;
  }
  //转换成根级块元素
  convertToBlock() {
    if (this.isBlock()) {
      throw new Error('This element is already of type "block"');
    }
    let element2 = this.clone();
    this.type = "block";
    this.parsedom = _AlexElement.BLOCK_NODE;
    this.marks = null;
    this.styles = null;
    this.textContent = null;
    this.children = [element2];
    element2.parent = this;
  }
  //设置为空元素
  toEmpty() {
    if (this.isEmpty()) {
      return;
    }
    if (this.isText()) {
      this.marks = null;
      this.styles = null;
      this.textContent = null;
      this._elm = null;
    } else if (this.isClosed()) {
      this.type = "text";
      this.parsedom = null;
      this.marks = null;
      this.styles = null;
      this.textContent = null;
      this._elm = null;
    } else if (this.hasChildren()) {
      this.children.forEach((el) => {
        el.toEmpty();
      });
    }
  }
  //获取所在根级块元素
  getBlock() {
    if (this.isBlock()) {
      return this;
    }
    return this.parent.getBlock();
  }
  //获取所在内部块元素
  getInblock() {
    if (this.isInblock()) {
      return this;
    }
    if (this.isBlock()) {
      return null;
    }
    return this.parent.getInblock();
  }
  //获取所在行内元素
  getInline() {
    if (this.isInline()) {
      return this;
    }
    if (this.isBlock()) {
      return null;
    }
    return this.parent.getInline();
  }
  //比较两个元素样式是否一致
  isEqualStyles(element2) {
    if (!this.hasStyles() && !element2.hasStyles()) {
      return true;
    }
    if (this.hasStyles() && element2.hasStyles() && obj$1.common.equal(this.styles, element2.styles)) {
      return true;
    }
    return false;
  }
  //比较两个元素属性是否一致
  isEqualMarks(element2) {
    if (!this.hasMarks() && !element2.hasMarks()) {
      return true;
    }
    if (this.hasMarks() && element2.hasMarks() && obj$1.common.equal(this.marks, element2.marks)) {
      return true;
    }
    return false;
  }
  //获取两个元素不一样的marks
  __getDiffMarks(element2) {
    if (this.hasMarks()) {
      if (element2.hasMarks()) {
        const selfMarkNames = Object.keys(this.marks);
        const thatMarkNames = Object.keys(element2.marks);
        return {
          more: selfMarkNames.filter((item) => {
            return (!thatMarkNames.includes(item) || element2.marks[item] != this.marks[item]) && !/(^on)|(^style$)|(^contenteditable$)/g.test(item);
          }),
          less: thatMarkNames.filter((item) => {
            return (!selfMarkNames.includes(item) || element2.marks[item] != this.marks[item]) && !/(^on)|(^style$)|(^contenteditable$)/g.test(item);
          })
        };
      } else {
        return {
          more: Object.keys(this.marks).filter((item) => {
            return !/(^on)|(^style$)|(^contenteditable$)/g.test(item);
          }),
          less: []
        };
      }
    } else {
      if (element2.hasMarks()) {
        return {
          more: [],
          less: Object.keys(element2.marks).filter((item) => {
            return !/(^on)|(^style$)|(^contenteditable$)/g.test(item);
          })
        };
      } else {
        return {
          more: [],
          less: []
        };
      }
    }
  }
  //获取两个元素不一样的styles
  __getDiffStyles(element2) {
    if (this.hasStyles()) {
      if (element2.hasStyles()) {
        const selfStyleNames = Object.keys(this.styles);
        const thatStyleNames = Object.keys(element2.styles);
        return {
          more: selfStyleNames.filter((item) => {
            return !thatStyleNames.includes(item) || element2.styles[item] != this.styles[item];
          }),
          less: thatStyleNames.filter((item) => {
            return !selfStyleNames.includes(item) || element2.styles[item] != this.styles[item];
          })
        };
      } else {
        return {
          more: Object.keys(this.styles),
          less: []
        };
      }
    } else {
      if (element2.hasStyles()) {
        return {
          more: [],
          less: Object.keys(element2.styles)
        };
      } else {
        return {
          more: [],
          less: []
        };
      }
    }
  }
  //渲染成真实dom
  __renderElement() {
    let el = null;
    if (this.isText()) {
      el = document.createElement(_AlexElement.TEXT_NODE);
      const text = document.createTextNode(this.textContent);
      el.appendChild(text);
    } else {
      el = document.createElement(this.parsedom);
      if (this.hasChildren()) {
        this.children.forEach((child) => {
          child.__renderElement();
          el.appendChild(child._elm);
        });
      }
    }
    if (this.hasMarks()) {
      Object.keys(this.marks).forEach((key) => {
        if (!/(^on)|(^style$)|(^contenteditable$)/g.test(key)) {
          el.setAttribute(key, this.marks[key]);
        }
      });
    }
    if (this.hasStyles()) {
      Object.keys(this.styles).forEach((key) => {
        el.style.setProperty(key, this.styles[key]);
      });
    }
    obj$1.data.set(el, "data-alex-editor-key", this.key);
    this._elm = el;
  }
  //完全复制元素，包括key也复制
  __fullClone() {
    let el = new _AlexElement(this.type, this.parsedom, Util.clone(this.marks), Util.clone(this.styles), this.textContent);
    el.behavior = this.behavior;
    el.key = this.key;
    el._elm = this._elm;
    if (this.hasChildren()) {
      this.children.forEach((child) => {
        let clonedChild = child.__fullClone();
        if (el.hasChildren()) {
          el.children.push(clonedChild);
        } else {
          el.children = [clonedChild];
        }
        clonedChild.parent = el;
      });
    }
    return el;
  }
  //获取元素所在的链接元素
  __getLink() {
    if (this.parsedom == "a") {
      return this;
    }
    if (this.isBlock()) {
      return null;
    }
    return this.parent.__getLink();
  }
  //判断是否该类型数据
  static isElement(val) {
    return val instanceof _AlexElement;
  }
  //扁平化处理元素数组
  static flatElements(elements) {
    const fn = (arr) => {
      let result = [];
      let index = 0;
      const length = arr.length;
      while (index < length) {
        result.push(arr[index]);
        if (arr[index].hasChildren()) {
          result.push(...fn(arr[index].children));
        }
        index++;
      }
      return result;
    };
    return fn(elements);
  }
  //获取一个空白文本元素
  static getSpaceElement() {
    return new _AlexElement("text", null, null, null, "\uFEFF");
  }
};
let AlexElement = _AlexElement;
__publicField(AlexElement, "BLOCK_NODE", "p");
__publicField(AlexElement, "TEXT_NODE", "span");
__publicField(AlexElement, "VOID_NODES", ["colgroup", "col"]);
class AlexPoint {
  constructor(element2, offset) {
    this.element = element2;
    this.offset = offset;
    this.__init();
  }
  //初始化
  __init() {
    if (this.element.isText() || this.element.isClosed()) {
      if (AlexElement.VOID_NODES.includes(this.element.parsedom)) {
        throw new Error("Invisible element cannot be set as focal point");
      }
      return;
    }
    if (this.offset == 0) {
      this.moveToStart(this.element);
    } else {
      this.moveToEnd(this.element);
    }
  }
  //是否Point类型数据
  static isPoint(val) {
    return val instanceof AlexPoint;
  }
  //两个点是否相等
  isEqual(point) {
    if (!AlexPoint.isPoint(point)) {
      return false;
    }
    return this.element.isEqual(point.element) && this.offset == point.offset;
  }
  //移动到到指定元素最后
  moveToEnd(element2) {
    if (!AlexElement.isElement(element2)) {
      throw new Error("The argument must be an AlexElement instance");
    }
    if (element2.isEmpty()) {
      throw new Error("The argument cannot be an empty element");
    }
    if (element2.isText()) {
      this.element = element2;
      this.offset = element2.textContent.length;
    } else if (element2.isClosed()) {
      if (AlexElement.VOID_NODES.includes(element2.parsedom)) {
        throw new Error("Invisible element cannot be set as focal point");
      }
      this.element = element2;
      this.offset = 1;
    } else if (element2.hasChildren()) {
      const flatElements = AlexElement.flatElements(element2.children).filter((el) => {
        return !el.isEmpty() && !AlexElement.VOID_NODES.includes(el.parsedom);
      });
      const length = flatElements.length;
      this.moveToEnd(flatElements[length - 1]);
    }
  }
  //移动到指定元素最前
  moveToStart(element2) {
    if (!AlexElement.isElement(element2)) {
      throw new Error("The argument must be an AlexElement instance");
    }
    if (element2.isEmpty()) {
      throw new Error("The argument cannot be an empty element");
    }
    if (element2.isText()) {
      this.element = element2;
      this.offset = 0;
    } else if (element2.isClosed()) {
      if (AlexElement.VOID_NODES.includes(element2.parsedom)) {
        throw new Error("Invisible element cannot be set as focal point");
      }
      this.element = element2;
      this.offset = 0;
    } else if (element2.hasChildren()) {
      const flatElements = AlexElement.flatElements(element2.children).filter((el) => {
        return !el.isEmpty() && !AlexElement.VOID_NODES.includes(el.parsedom);
      });
      this.moveToStart(flatElements[0]);
    }
  }
}
class AlexRange {
  constructor(anchor, focus) {
    this.anchor = anchor;
    this.focus = focus;
  }
}
class AlexHistory {
  constructor() {
    this.records = [];
    this.current = -1;
  }
  //入栈
  push(stack, range) {
    if (this.current < this.records.length - 1) {
      this.records.length = this.current + 1;
    }
    const newStack = stack.map((ele) => {
      return ele.__fullClone();
    });
    const anchorElement = AlexElement.flatElements(newStack).find((ele) => {
      return ele.key == range.anchor.element.key;
    });
    const focusElement = AlexElement.flatElements(newStack).find((ele) => {
      return ele.key == range.focus.element.key;
    });
    const anchor = new AlexPoint(anchorElement, range.anchor.offset);
    const focus = new AlexPoint(focusElement, range.focus.offset);
    const newRange = new AlexRange(anchor, focus);
    this.records.push({
      stack: newStack,
      range: newRange
    });
    this.current += 1;
  }
  //撤销
  get(type) {
    if (type == -1) {
      if (this.current <= 0) {
        return null;
      }
      this.current -= 1;
    } else if (type == 1) {
      if (this.current >= this.records.length - 1) {
        return null;
      }
      this.current += 1;
    }
    const { stack, range } = this.records[this.current];
    const newStack = stack.map((ele) => {
      return ele.__fullClone();
    });
    const anchorElement = AlexElement.flatElements(newStack).find((ele) => {
      return ele.key == range.anchor.element.key;
    });
    const focusElement = AlexElement.flatElements(newStack).find((ele) => {
      return ele.key == range.focus.element.key;
    });
    const anchor = new AlexPoint(anchorElement, range.anchor.offset);
    const focus = new AlexPoint(focusElement, range.focus.offset);
    const newRange = new AlexRange(anchor, focus);
    return {
      stack: newStack,
      range: newRange
    };
  }
}
const { Mac } = obj$1.platform.os();
const Keyboard = {
  //撤销
  Undo(e) {
    if (Mac) {
      return e.keyCode == 90 && e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
    }
    return e.keyCode == 90 && e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
  },
  //重做
  Redo(e) {
    if (Mac) {
      return e.keyCode == 90 && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey;
    }
    return e.keyCode == 89 && e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
  }
};
const block = [
  {
    parsedom: "p"
  },
  {
    parsedom: "div"
  },
  {
    parsedom: "table"
  },
  {
    parsedom: "ul"
  },
  {
    parsedom: "ol"
  },
  {
    parsedom: "h1"
  },
  {
    parsedom: "h2"
  },
  {
    parsedom: "h3"
  },
  {
    parsedom: "h4"
  },
  {
    parsedom: "h5"
  },
  {
    parsedom: "h6"
  },
  {
    parsedom: "blockquote"
  },
  {
    parsedom: "pre"
  },
  {
    parsedom: "address",
    parse: true
  },
  {
    parsedom: "article",
    parse: true
  },
  {
    parsedom: "aside",
    parse: true
  },
  {
    parsedom: "nav",
    parse: true
  },
  {
    parsedom: "section",
    parse: true
  }
];
const inblock = [
  {
    parsedom: "li",
    block: true
  },
  {
    parsedom: "tfoot"
  },
  {
    parsedom: "tbody"
  },
  {
    parsedom: "thead"
  },
  {
    parsedom: "tr"
  },
  {
    parsedom: "th"
  },
  {
    parsedom: "td"
  },
  {
    parsedom: "colgroup"
  }
];
const inline = [
  {
    parsedom: "span"
  },
  {
    parsedom: "a"
  },
  {
    parsedom: "label"
  },
  {
    parsedom: "code"
  },
  {
    parsedom: "b",
    parse: {
      "font-weight": "bold"
    }
  },
  {
    parsedom: "strong",
    parse: {
      "font-weight": "bold"
    }
  },
  {
    parsedom: "sup",
    parse: {
      "vertical-align": "super"
    }
  },
  {
    parsedom: "sub",
    parse: {
      "vertical-align": "sub"
    }
  },
  {
    parsedom: "i",
    parse: {
      "font-style": "italic"
    }
  },
  {
    parsedom: "u",
    parse: {
      "text-decoration-line": "underline"
    }
  },
  {
    parsedom: "del",
    parse: {
      "text-decoration-line": "line-through"
    }
  },
  {
    parsedom: "abbr",
    parse: true
  },
  {
    parsedom: "acronym",
    parse: true
  },
  {
    parsedom: "bdo",
    parse: true
  }
];
const closed = [
  {
    parsedom: "br"
  },
  {
    parsedom: "col"
  },
  {
    parsedom: "img"
  },
  {
    parsedom: "hr"
  },
  {
    parsedom: "video"
  },
  {
    parsedom: "audio"
  }
];
const defaultConfig = {
  block,
  inblock,
  inline,
  closed
};
const canUseClipboard = () => {
  if (!window.ClipboardItem) {
    console.warn("window.ClipboardItem must be obtained in a secure environment, such as localhost, 127.0.0.1, or https, so the editor's copy, paste, and cut functions cannot be used");
    return false;
  }
  if (!navigator.clipboard) {
    console.warn("navigator.clipboard must be obtained in a secure environment, such as localhost, 127.0.0.1, or https, so the editor's copy, paste, and cut functions cannot be used");
    return false;
  }
  return true;
};
const initDom = (el) => {
  if (typeof el == "string" && el) {
    el = document.body.querySelector(el);
  }
  if (!obj$1.element.isElement(el)) {
    throw new Error("You must specify a dom container to initialize the editor");
  }
  if (obj$1.data.get(el, "data-alex-editor-init")) {
    throw new Error("The element node has been initialized to the editor");
  }
  obj$1.data.set(el, "data-alex-editor-init", true);
  return el;
};
const initOptions = (options) => {
  let opts = {
    disabled: false,
    renderRules: [],
    value: "",
    allowCopy: true,
    allowPaste: true,
    allowCut: true,
    allowPasteHtml: false,
    customTextPaste: null,
    customHtmlPaste: null,
    customImagePaste: null,
    customVideoPaste: null
  };
  if (obj$1.common.isObject(options)) {
    if (typeof options.disabled == "boolean") {
      opts.disabled = options.disabled;
    }
    if (Array.isArray(options.renderRules)) {
      opts.renderRules = options.renderRules;
    }
    if (typeof options.value == "string" && options.value) {
      opts.value = options.value;
    }
    if (typeof options.allowCopy == "boolean") {
      opts.allowCopy = options.allowCopy;
    }
    if (typeof options.allowPaste == "boolean") {
      opts.allowPaste = options.allowPaste;
    }
    if (typeof options.allowCut == "boolean") {
      opts.allowCut = options.allowCut;
    }
    if (typeof options.allowPasteHtml == "boolean") {
      opts.allowPasteHtml = options.allowPasteHtml;
    }
    if (typeof options.customTextPaste == "function") {
      opts.customTextPaste = options.customTextPaste;
    }
    if (typeof options.customHtmlPaste == "function") {
      opts.customHtmlPaste = options.customHtmlPaste;
    }
    if (typeof options.customImagePaste == "function") {
      opts.customImagePaste = options.customImagePaste;
    }
    if (typeof options.customVideoPaste == "function") {
      opts.customVideoPaste = options.customVideoPaste;
    }
  }
  return opts;
};
class AlexEditor {
  constructor(el, opts) {
    __publicField(this, "__formatUnchangeableRules", [
      //不是在stack下的根级块元素则转为行内元素或者内部块元素
      (element2) => {
        if (element2.hasChildren()) {
          const children = element2.children.filter((el2) => {
            return !el2.isEmpty();
          });
          const blocks = children.filter((el2) => {
            return el2.isBlock();
          });
          blocks.forEach((el2) => {
            el2.type = element2.type == "inline" ? "inline" : "inblock";
          });
        }
      },
      //内部块元素与其他元素不能同时存在于元素数组中
      (element2) => {
        if (element2.hasChildren()) {
          const children = element2.children.filter((el2) => {
            return !el2.isEmpty();
          });
          let allIsBlock = children.every((el2) => {
            return el2.isInblock();
          });
          if (!allIsBlock) {
            children.forEach((el2) => {
              if (el2.isInblock()) {
                el2.type = "inline";
              }
            });
          }
        }
      },
      //行内元素的子元素不能是内部块元素
      (element2) => {
        if (element2.isInline() && element2.hasChildren()) {
          const children = element2.children.filter((el2) => {
            return !el2.isEmpty();
          });
          const inblocks = children.filter((el2) => {
            return el2.isInblock();
          });
          inblocks.forEach((el2) => {
            if (el2.isInblock()) {
              el2.type = "inline";
            }
          });
        }
      },
      //换行符清除规则（虚拟光标可能更新）
      (element2) => {
        if (element2.hasChildren()) {
          const children = element2.children.filter((el2) => {
            return !el2.isEmpty();
          });
          const allIsBreak = children.every((el2) => {
            return el2.isBreak();
          });
          if (allIsBreak && children.length) {
            const breakEl = children[0];
            if (element2.isContains(this.range.anchor.element)) {
              this.range.anchor.moveToStart(breakEl);
            }
            if (element2.isContains(this.range.focus.element)) {
              this.range.focus.moveToStart(breakEl);
            }
            element2.children = [breakEl];
          } else {
            element2.children.forEach((el2) => {
              if (el2.isBreak()) {
                el2.toEmpty();
              }
            });
          }
        }
      },
      //兄弟元素合并策略（虚拟光标可能更新）
      (element2) => {
        const canMerge = (pel, nel) => {
          if (pel.isEmpty() || nel.isEmpty()) {
            return true;
          }
          if (pel.isText() && nel.isText()) {
            return pel.isEqualStyles(nel) && pel.isEqualMarks(nel);
          }
          if (pel.isInline() && nel.isInline()) {
            return pel.parsedom == nel.parsedom && pel.isEqualMarks(nel) && pel.isEqualStyles(nel);
          }
          return false;
        };
        const merge = (pel, nel) => {
          if (pel.isEmpty() || nel.isEmpty()) {
            if (nel.isEmpty()) {
              if (nel.isContains(this.range.anchor.element)) {
                if (pel.isEmpty()) {
                  this.range.anchor.element = pel;
                  this.range.anchor.offset = 0;
                } else {
                  this.range.anchor.moveToEnd(pel);
                }
              }
              if (nel.isContains(this.range.focus.element)) {
                if (pel.isEmpty()) {
                  this.range.focus.element = pel;
                  this.range.focus.offset = 0;
                } else {
                  this.range.focus.moveToEnd(pel);
                }
              }
              const index = nel.parent.children.findIndex((item) => {
                return nel.isEqual(item);
              });
              nel.parent.children.splice(index, 1);
            } else if (pel.isEmpty()) {
              if (pel.isContains(this.range.anchor.element)) {
                if (nel.isEmpty()) {
                  this.range.anchor.element = nel;
                  this.range.anchor.offset = 0;
                } else {
                  this.range.anchor.moveToStart(nel);
                }
              }
              if (pel.isContains(this.range.focus.element)) {
                if (nel.isEmpty()) {
                  this.range.focus.element = nel;
                  this.range.focus.offset = 0;
                } else {
                  this.range.focus.moveToStart(nel);
                }
              }
              const index = pel.parent.children.findIndex((item) => {
                return pel.isEqual(item);
              });
              pel.parent.children.splice(index, 1);
            }
          } else if (pel.isText()) {
            if (nel.isEqual(this.range.anchor.element)) {
              this.range.anchor.element = pel;
              this.range.anchor.offset = pel.textContent.length + this.range.anchor.offset;
            }
            if (nel.isEqual(this.range.focus.element)) {
              this.range.focus.element = pel;
              this.range.focus.offset = pel.textContent.length + this.range.focus.offset;
            }
            pel.textContent += nel.textContent;
            const index = nel.parent.children.findIndex((item) => {
              return nel.isEqual(item);
            });
            nel.parent.children.splice(index, 1);
          } else if (pel.isInline()) {
            pel.children.push(...nel.children);
            pel.children.forEach((item) => {
              item.parent = pel;
            });
            mergeElement(pel);
            const index = nel.parent.children.findIndex((item) => {
              return nel.isEqual(item);
            });
            nel.parent.children.splice(index, 1);
          }
        };
        const mergeElement = (ele) => {
          if (ele.hasChildren() && ele.children.length > 1) {
            let index = 0;
            while (index <= ele.children.length - 2) {
              if (canMerge(ele.children[index], ele.children[index + 1])) {
                merge(ele.children[index], ele.children[index + 1]);
                continue;
              }
              index++;
            }
          }
        };
        mergeElement(element2);
      },
      //子元素和父元素合并策略（虚拟光标可能更新）
      (element2) => {
        const canMerge = (parent, child) => {
          if (child.isText() && parent.isInline()) {
            return parent.parsedom == AlexElement.TEXT_NODE;
          }
          if (parent.isInline() && child.isInline() || parent.isInblock() && child.isInblock()) {
            return parent.parsedom == child.parsedom;
          }
          return false;
        };
        const merge = (parent, child) => {
          if (child.isText()) {
            parent.type = "text";
            parent.parsedom = null;
            if (child.hasMarks()) {
              if (parent.hasMarks()) {
                Object.assign(parent.marks, Util.clone(child.marks));
              } else {
                parent.marks = Util.clone(child.marks);
              }
            }
            if (child.hasStyles()) {
              if (parent.hasStyles()) {
                Object.assign(parent.styles, Util.clone(child.styles));
              } else {
                parent.styles = Util.clone(child.styles);
              }
            }
            parent.textContent = child.textContent;
            parent.children = null;
            if (child.isContains(this.range.anchor.element)) {
              this.range.anchor.element = parent;
            }
            if (child.isContains(this.range.focus.element)) {
              this.range.focus.element = parent;
            }
          } else {
            if (child.hasMarks()) {
              if (parent.hasMarks()) {
                Object.assign(parent.marks, Util.clone(child.marks));
              } else {
                parent.marks = Util.clone(child.marks);
              }
            }
            if (child.hasStyles()) {
              if (parent.hasStyles()) {
                Object.assign(parent.styles, Util.clone(child.styles));
              } else {
                parent.styles = Util.clone(child.styles);
              }
            }
            if (child.hasChildren()) {
              parent.children = [...child.children];
              parent.children.forEach((item) => {
                item.parent = parent;
              });
            }
          }
        };
        if (element2.hasChildren() && element2.children.length == 1 && canMerge(element2, element2.children[0])) {
          merge(element2, element2.children[0]);
        }
      }
    ]);
    this.$el = initDom(el);
    const options = initOptions(opts);
    this.disabled = options.disabled;
    this.value = options.value;
    this.allowCopy = options.allowCopy;
    this.allowPaste = options.allowPaste;
    this.allowCut = options.allowCut;
    this.allowPasteHtml = options.allowPasteHtml;
    this.customTextPaste = options.customTextPaste;
    this.customHtmlPaste = options.customHtmlPaste;
    this.customImagePaste = options.customImagePaste;
    this.customVideoPaste = options.customVideoPaste;
    this.range = null;
    this.useClipboard = canUseClipboard();
    this.history = new AlexHistory();
    this.stack = this.parseHtml(this.value);
    this.__renderRules = options.renderRules;
    this.__guid = Util.createGuid();
    this.__events = {};
    this.__firstRender = true;
    this.__isInputChinese = false;
    this.__innerSelectionChange = false;
    this.__chineseInputTimer = null;
    this.__initRange();
    this.disabled ? this.setDisabled() : this.setEnabled();
    obj$1.event.on(document, `selectionchange.alex_editor_${this.__guid}`, this.__handleSelectionChange.bind(this));
    obj$1.event.on(this.$el, "beforeinput.alex_editor", this.__handleBeforeInput.bind(this));
    obj$1.event.on(this.$el, "compositionstart.alex_editor compositionupdate.alex_editor compositionend.alex_editor", this.__handleChineseInput.bind(this));
    obj$1.event.on(this.$el, "keydown.alex_editor", this.__handleKeydown.bind(this));
    obj$1.event.on(this.$el, "cut.alex_editor", this.__handleCut.bind(this));
    obj$1.event.on(this.$el, "paste.alex_editor", this.__handlePaste.bind(this));
    obj$1.event.on(this.$el, "copy.alex_editor", this.__handleCopy.bind(this));
    obj$1.event.on(this.$el, "dragstart.alex_editor drop.alex_editor ", this.__handleDragDrop.bind(this));
    obj$1.event.on(this.$el, "focus.alex_editor", this.__handleFocus.bind(this));
    obj$1.event.on(this.$el, "blur.alex_editor", this.__handleBlur.bind(this));
  }
  //初始设置range
  __initRange() {
    const firstElement = this.stack[0];
    const anchor = new AlexPoint(firstElement, 0);
    const focus = new AlexPoint(firstElement, 0);
    this.range = new AlexRange(anchor, focus);
  }
  //更新焦点的元素为最近的可设置光标的元素
  __setRecentlyPoint(point) {
    const previousElement = this.getPreviousElementOfPoint(point);
    const nextElement = this.getNextElementOfPoint(point);
    const block2 = point.element.getBlock();
    const inblock2 = point.element.getInblock();
    if (previousElement && inblock2 && inblock2.isContains(previousElement)) {
      point.moveToEnd(previousElement);
    } else if (nextElement && inblock2 && inblock2.isContains(nextElement)) {
      point.moveToStart(nextElement);
    } else if (previousElement && block2.isContains(previousElement)) {
      point.moveToEnd(previousElement);
    } else if (nextElement && block2.isContains(nextElement)) {
      point.moveToStart(nextElement);
    } else if (previousElement) {
      point.moveToEnd(previousElement);
    } else if (nextElement) {
      point.moveToStart(nextElement);
    }
  }
  //清空默认行为的内部块元素
  __emptyDefaultBehaviorInblock(ele) {
    if (!ele.isInblock()) {
      return;
    }
    if (ele.behavior != "default") {
      return;
    }
    if (ele.hasChildren()) {
      ele.children.forEach((item) => {
        if (item.isInblock()) {
          this.__emptyDefaultBehaviorInblock(item);
        } else {
          item.toEmpty();
          if (item.parent.isEmpty()) {
            const breakEl = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEl, item.parent);
          }
        }
      });
    }
  }
  //判断焦点是否在可视范围内，如果不在则进行设置
  __setRangeInVisible() {
    const fn = async (root2) => {
      const scrollHeight = obj$1.element.getScrollHeight(root2);
      if (root2.clientHeight < scrollHeight) {
        const selection = window.getSelection();
        if (selection.rangeCount == 0) {
          return;
        }
        const range = selection.getRangeAt(0);
        const rects = range.getClientRects();
        let target = range;
        if (rects.length == 0) {
          target = this.range.focus.element._elm;
        }
        const childRect = target.getBoundingClientRect();
        const parentRect = root2.getBoundingClientRect();
        if (childRect.top < parentRect.top) {
          await obj$1.element.setScrollTop({
            el: root2,
            number: 0
          });
          const tempChildRect = target.getBoundingClientRect();
          const tempParentRect = root2.getBoundingClientRect();
          obj$1.element.setScrollTop({
            el: root2,
            number: tempChildRect.top - tempParentRect.top - tempChildRect.height * 2
          });
        } else if (childRect.bottom > parentRect.bottom) {
          await obj$1.element.setScrollTop({
            el: root2,
            number: 0
          });
          const tempChildRect = target.getBoundingClientRect();
          const tempParentRect = root2.getBoundingClientRect();
          obj$1.element.setScrollTop({
            el: root2,
            number: tempChildRect.bottom - tempParentRect.bottom + tempChildRect.height * 2
          });
        }
      }
    };
    let root = this.$el;
    while (obj$1.element.isElement(root) && root != document.documentElement) {
      fn(root);
      root = root.parentNode;
    }
  }
  //监听selection改变
  __handleSelectionChange() {
    if (this.__isInputChinese) {
      return;
    }
    if (this.__innerSelectionChange) {
      return;
    }
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      if (Util.isContains(this.$el, range.startContainer) && Util.isContains(this.$el, range.endContainer)) {
        let anchorNode = null;
        let focusNode = null;
        let anchorOffset = null;
        let focusOffset = null;
        if (range.startContainer.nodeType == 3) {
          anchorNode = range.startContainer.parentNode;
          anchorOffset = range.startOffset;
        } else if (range.startContainer.nodeType == 1) {
          const childNodes = Array.from(range.startContainer.childNodes);
          if (childNodes.length) {
            anchorNode = childNodes[range.startOffset] ? childNodes[range.startOffset] : childNodes[range.startOffset - 1];
            anchorOffset = childNodes[range.startOffset] ? 0 : 1;
            if (anchorNode.nodeType == 3) {
              anchorOffset = anchorOffset == 0 ? 0 : anchorNode.textContent.length;
              anchorNode = anchorNode.parentNode;
            }
          } else {
            anchorNode = range.startContainer;
            anchorOffset = 0;
          }
        }
        if (range.endContainer.nodeType == 3) {
          focusNode = range.endContainer.parentNode;
          focusOffset = range.endOffset;
        } else if (range.endContainer.nodeType == 1) {
          const childNodes = Array.from(range.endContainer.childNodes);
          if (childNodes.length) {
            focusNode = childNodes[range.endOffset] ? childNodes[range.endOffset] : childNodes[range.endOffset - 1];
            focusOffset = childNodes[range.endOffset] ? 0 : 1;
            if (focusNode.nodeType == 3) {
              focusOffset = focusOffset == 0 ? 0 : focusNode.textContent.length;
              focusNode = focusNode.parentNode;
            }
          } else {
            focusNode = range.endContainer;
            focusOffset = 1;
          }
        }
        const anchorKey = obj$1.data.get(anchorNode, "data-alex-editor-key");
        const focusKey = obj$1.data.get(focusNode, "data-alex-editor-key");
        const anchorEle = this.getElementByKey(anchorKey);
        const focusEle = this.getElementByKey(focusKey);
        const anchor = new AlexPoint(anchorEle, anchorOffset);
        const focus = new AlexPoint(focusEle, focusOffset);
        this.range = new AlexRange(anchor, focus);
        this.emit("rangeUpdate", this.range);
      }
    }
  }
  //监听beforeinput
  __handleBeforeInput(e) {
    if (this.disabled) {
      return;
    }
    if (e.inputType == "deleteByCut" || e.inputType == "insertFromPaste" || e.inputType == "deleteByDrag" || e.inputType == "insertFromDrop") {
      return;
    }
    e.preventDefault();
    if (e.inputType == "insertText" && e.data) {
      this.insertText(e.data);
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    } else if (e.inputType == "insertParagraph" || e.inputType == "insertLineBreak") {
      this.insertParagraph();
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    } else if (e.inputType == "deleteContentBackward") {
      this.delete();
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    }
  }
  //监听中文输入
  __handleChineseInput(e) {
    if (this.disabled) {
      return;
    }
    e.preventDefault();
    if (e.type == "compositionstart") {
      if (this.__chineseInputTimer) {
        clearTimeout(this.__chineseInputTimer);
        this.__chineseInputTimer = null;
      }
      this.__isInputChinese = true;
    } else if (e.type == "compositionend") {
      if (e.data) {
        this.insertText(e.data);
        this.formatElementStack();
        this.domRender();
        this.rangeRender();
      }
      this.__chineseInputTimer = setTimeout(() => {
        this.__isInputChinese = false;
      }, 0);
    }
  }
  //监听键盘按下
  __handleKeydown(e) {
    if (this.disabled) {
      return;
    }
    if (this.__isInputChinese) {
      return;
    }
    if (Keyboard.Undo(e)) {
      e.preventDefault();
      const historyRecord = this.history.get(-1);
      if (historyRecord) {
        this.stack = historyRecord.stack;
        this.range = historyRecord.range;
        this.formatElementStack();
        this.domRender(true);
        this.rangeRender();
      }
    } else if (Keyboard.Redo(e)) {
      e.preventDefault();
      const historyRecord = this.history.get(1);
      if (historyRecord) {
        this.stack = historyRecord.stack;
        this.range = historyRecord.range;
        this.formatElementStack();
        this.domRender(true);
        this.rangeRender();
      }
    }
  }
  //监听编辑器复制
  async __handleCopy(e) {
    e.preventDefault();
    await this.copy();
  }
  //监听编辑器剪切
  async __handleCut(e) {
    e.preventDefault();
    const result = await this.cut();
    if (result && !this.disabled) {
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    }
  }
  //监听编辑器粘贴
  async __handlePaste(e) {
    e.preventDefault();
    if (this.disabled) {
      return;
    }
    await this.paste();
    this.formatElementStack();
    this.domRender();
    this.rangeRender();
  }
  //监听编辑器拖拽和拖放
  __handleDragDrop(e) {
    e.preventDefault();
  }
  //监听编辑器获取焦点
  __handleFocus(e) {
    if (this.disabled) {
      return;
    }
    this.emit("focus", this.value);
  }
  //监听编辑器失去焦点
  __handleBlur(e) {
    if (this.disabled) {
      return;
    }
    this.emit("blur", this.value);
  }
  //根据光标进行粘贴操作
  async paste() {
    if (this.disabled) {
      return;
    }
    if (!this.useClipboard) {
      return;
    }
    if (!this.allowPaste) {
      return;
    }
    const clipboardItems = await navigator.clipboard.read();
    const clipboardItem = clipboardItems[0];
    const getTypeFunctions = [];
    clipboardItem.types.forEach((type) => {
      getTypeFunctions.push(clipboardItem.getType(type));
    });
    const blobs = await Promise.all(getTypeFunctions);
    const length = blobs.length;
    const hasHtml = blobs.some((blob) => {
      return blob.type == "text/html";
    });
    if (hasHtml) {
      for (let i = 0; i < length; i++) {
        const blob = blobs[i];
        if (blob.type == "text/plain" && !this.allowPasteHtml) {
          const data2 = await blob.text();
          if (data2) {
            if (typeof this.customTextPaste == "function") {
              this.customTextPaste.apply(this, [data2]);
            } else {
              this.insertText(data2);
              this.emit("pasteText", data2);
            }
          }
        } else if (blob.type == "text/html" && this.allowPasteHtml) {
          const data2 = await blob.text();
          if (data2) {
            const elements = this.parseHtml(data2).filter((el) => {
              return !el.isEmpty();
            });
            if (typeof this.customHtmlPaste == "function") {
              this.customHtmlPaste.apply(this, [data2, elements]);
            } else {
              for (let i2 = 0; i2 < elements.length; i2++) {
                this.insertElement(elements[i2], false);
              }
              this.emit("pasteHtml", data2, elements);
            }
          }
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        const blob = blobs[i];
        if (blob.type.startsWith("image/")) {
          const url = await Util.blobToBase64(blob);
          if (typeof this.customImagePaste == "function") {
            this.customImagePaste.apply(this, [url]);
          } else {
            const image = new AlexElement(
              "closed",
              "img",
              {
                src: url
              },
              null,
              null
            );
            this.insertElement(image);
            this.emit("pasteImage", url);
          }
        } else if (blob.type.startsWith("video/")) {
          const url = await Util.blobToBase64(blob);
          if (typeof this.customVideoPaste == "function") {
            this.customVideoPaste.apply(this, [url]);
          } else {
            const video = new AlexElement(
              "closed",
              "video",
              {
                src: url
              },
              null,
              null
            );
            this.insertElement(video);
            this.emit("pasteVideo", url);
          }
        } else if (blob.type == "text/plain") {
          const data2 = await blob.text();
          if (data2) {
            if (typeof this.customTextPaste == "function") {
              this.customTextPaste.apply(this, [data2]);
            } else {
              this.insertText(data2);
              this.emit("pasteText", data2);
            }
          }
        }
      }
    }
  }
  //根据光标进行剪切操作
  async cut() {
    if (!this.useClipboard) {
      return;
    }
    if (!this.allowCut) {
      return;
    }
    const result = await this.copy(true);
    if (result) {
      if (!this.disabled) {
        this.delete();
      }
      this.emit("cut", result.text, result.html);
    }
    return result;
  }
  //根据光标执行复制操作
  async copy(isCut = false) {
    if (!this.useClipboard) {
      return;
    }
    if (!this.allowCopy) {
      return;
    }
    let result = this.getElementsByRange(true, false);
    if (result.length == 0) {
      return;
    }
    let html = "";
    let text = "";
    result.forEach((item) => {
      const newEl = item.element.clone();
      if (item.offset) {
        newEl.textContent = newEl.textContent.substring(item.offset[0], item.offset[1]);
      }
      newEl.__renderElement();
      html += newEl._elm.outerHTML;
      text += newEl._elm.innerText;
    });
    const clipboardItem = new window.ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([text], { type: "text/plain" })
    });
    await navigator.clipboard.write([clipboardItem]);
    if (!isCut) {
      this.emit("copy", text, html);
    }
    return { text, html };
  }
  //根据光标进行删除操作
  delete() {
    if (this.disabled) {
      return;
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      const previousElement = this.getPreviousElementOfPoint(this.range.anchor);
      const block2 = this.range.anchor.element.getBlock();
      const inblock2 = this.range.anchor.element.getInblock();
      if (inblock2) {
        if (this.range.anchor.offset == 0) {
          if (previousElement) {
            if (inblock2.isContains(previousElement)) {
              this.range.anchor.moveToEnd(previousElement);
              this.range.focus.moveToEnd(previousElement);
              this.delete();
              return;
            } else if (inblock2.behavior == "block") {
              const previousBlock = previousElement.getBlock();
              const previousInblock = previousElement.getInblock();
              if (previousInblock) {
                if (previousInblock.behavior == "block") {
                  this.mergeBlockElement(inblock2, previousInblock);
                }
              } else {
                this.mergeBlockElement(inblock2, previousBlock);
              }
            }
          } else {
            this.emit("deleteInStart", inblock2);
          }
        } else {
          if (this.range.anchor.element.isSpaceText()) {
            this.range.anchor.element.toEmpty();
            if (inblock2.isEmpty()) {
              const breakEl = new AlexElement("closed", "br", null, null, null);
              this.addElementTo(breakEl, inblock2);
              this.range.anchor.moveToStart(breakEl);
              this.range.focus.moveToStart(breakEl);
            } else {
              this.range.anchor.offset = 0;
              this.range.focus.offset = 0;
              this.delete();
              return;
            }
          } else if (this.range.anchor.element.isText()) {
            const val = this.range.anchor.element.textContent;
            this.range.anchor.offset -= 1;
            const isSpaceText = Util.isSpaceText(val[this.range.anchor.offset]);
            this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset) + val.substring(this.range.focus.offset);
            this.range.focus.offset = this.range.anchor.offset;
            if (isSpaceText) {
              this.delete();
              return;
            }
            if (inblock2.isEmpty()) {
              const breakEl = new AlexElement("closed", "br", null, null, null);
              this.addElementTo(breakEl, inblock2);
              this.range.anchor.moveToStart(breakEl);
              this.range.focus.moveToStart(breakEl);
            }
          } else {
            const isBreak = this.range.anchor.element.isBreak();
            this.range.anchor.element.toEmpty();
            if (inblock2.isEmpty()) {
              if (!isBreak || inblock2.behavior == "default") {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, inblock2);
                this.range.anchor.moveToStart(breakEl);
                this.range.focus.moveToStart(breakEl);
              } else if (!previousElement) {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, inblock2);
                this.range.anchor.moveToStart(breakEl);
                this.range.focus.moveToStart(breakEl);
              }
            }
          }
        }
      } else {
        if (this.range.anchor.offset == 0) {
          if (previousElement) {
            if (block2.isContains(previousElement)) {
              this.range.anchor.moveToEnd(previousElement);
              this.range.focus.moveToEnd(previousElement);
              this.delete();
              return;
            } else {
              const previousInblock = previousElement.getInblock();
              const previousBlock = previousElement.getBlock();
              if (previousInblock) {
                if (previousInblock.behavior == "block") {
                  this.mergeBlockElement(block2, previousInblock);
                }
              } else {
                this.mergeBlockElement(block2, previousBlock);
              }
            }
          } else {
            this.emit("deleteInStart", block2);
          }
        } else {
          if (this.range.anchor.element.isSpaceText()) {
            this.range.anchor.element.toEmpty();
            if (block2.isEmpty()) {
              const breakEl = new AlexElement("closed", "br", null, null, null);
              this.addElementTo(breakEl, block2);
              this.range.anchor.moveToStart(breakEl);
              this.range.focus.moveToStart(breakEl);
            } else {
              this.range.anchor.offset = 0;
              this.range.focus.offset = 0;
              this.delete();
              return;
            }
          } else if (this.range.anchor.element.isText()) {
            const val = this.range.anchor.element.textContent;
            this.range.anchor.offset -= 1;
            const isSpaceText = Util.isSpaceText(val[this.range.anchor.offset]);
            this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset) + val.substring(this.range.focus.offset);
            this.range.focus.offset = this.range.anchor.offset;
            if (isSpaceText) {
              this.delete();
              return;
            }
            if (block2.isEmpty()) {
              const breakEl = new AlexElement("closed", "br", null, null, null);
              this.addElementTo(breakEl, block2);
              this.range.anchor.moveToStart(breakEl);
              this.range.focus.moveToStart(breakEl);
            }
          } else {
            const isBreak = this.range.anchor.element.isBreak();
            this.range.anchor.element.toEmpty();
            if (block2.isEmpty()) {
              if (!isBreak || !previousElement) {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, block2);
                this.range.anchor.moveToStart(breakEl);
                this.range.focus.moveToStart(breakEl);
              }
            }
          }
        }
      }
    } else {
      const result = this.getElementsByRange(true, false).filter((item) => {
        return !AlexElement.VOID_NODES.includes(item.element.parsedom);
      });
      const anchorInblock = this.range.anchor.element.getInblock();
      const focusInblock = this.range.focus.element.getInblock();
      const anchorBlock = this.range.anchor.element.getBlock();
      const focusBlock = this.range.focus.element.getBlock();
      if (anchorInblock && focusInblock && anchorInblock.isEqual(focusInblock)) {
        result.forEach((item) => {
          if (item.offset) {
            item.element.textContent = item.element.textContent.substring(0, item.offset[0]) + item.element.textContent.substring(item.offset[1]);
          } else {
            item.element.toEmpty();
          }
          if (anchorInblock.isEmpty()) {
            const breakEl = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEl, anchorInblock);
          }
        });
      } else if (anchorInblock && focusInblock) {
        result.forEach((item) => {
          if (item.offset) {
            item.element.textContent = item.element.textContent.substring(0, item.offset[0]) + item.element.textContent.substring(item.offset[1]);
          } else {
            if (item.element.isInblock() && item.element.behavior == "default") {
              this.__emptyDefaultBehaviorInblock(item.element);
            } else {
              item.element.toEmpty();
              if (item.element.parent && (item.element.parent.isInblock() || item.element.parent.isBlock()) && item.element.parent.isEmpty()) {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, item.element.parent);
              }
            }
          }
        });
        if (anchorInblock.behavior == "block" && focusInblock.behavior == "block") {
          this.mergeBlockElement(focusInblock, anchorInblock);
        }
      } else if (anchorInblock) {
        result.forEach((item) => {
          if (item.offset) {
            item.element.textContent = item.element.textContent.substring(0, item.offset[0]) + item.element.textContent.substring(item.offset[1]);
          } else {
            if (item.element.isInblock() && item.element.behavior == "default") {
              this.__emptyDefaultBehaviorInblock(item.element);
            } else {
              item.element.toEmpty();
              if (item.element.parent && (item.element.parent.isInblock() || item.element.parent.isBlock()) && item.element.parent.isEmpty()) {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, item.element.parent);
              }
            }
          }
        });
        if (anchorInblock.behavior == "block") {
          this.mergeBlockElement(focusBlock, anchorInblock);
        }
      } else if (focusInblock) {
        result.forEach((item) => {
          if (item.offset) {
            item.element.textContent = item.element.textContent.substring(0, item.offset[0]) + item.element.textContent.substring(item.offset[1]);
          } else {
            if (item.element.isInblock() && item.element.behavior == "default") {
              this.__emptyDefaultBehaviorInblock(item.element);
            } else {
              item.element.toEmpty();
              if (item.element.parent && (item.element.parent.isInblock() || item.element.parent.isBlock()) && item.element.parent.isEmpty()) {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, item.element.parent);
              }
            }
          }
        });
        if (focusInblock.behavior == "block") {
          this.mergeBlockElement(focusInblock, anchorBlock);
        }
      } else if (anchorBlock.isEqual(focusBlock)) {
        result.forEach((item) => {
          if (item.offset) {
            item.element.textContent = item.element.textContent.substring(0, item.offset[0]) + item.element.textContent.substring(item.offset[1]);
          } else {
            item.element.toEmpty();
          }
          if (anchorBlock.isEmpty()) {
            const breakEl = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEl, anchorBlock);
          }
        });
      } else {
        result.forEach((item) => {
          if (item.offset) {
            item.element.textContent = item.element.textContent.substring(0, item.offset[0]) + item.element.textContent.substring(item.offset[1]);
          } else {
            if (item.element.isInblock() && item.element.behavior == "default") {
              this.__emptyDefaultBehaviorInblock(item.element);
            } else {
              item.element.toEmpty();
              if (item.element.parent && (item.element.parent.isInblock() || item.element.parent.isBlock()) && item.element.parent.isEmpty()) {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, item.element.parent);
              }
            }
          }
        });
        this.mergeBlockElement(focusBlock, anchorBlock);
      }
    }
    if (this.range.anchor.element.isEmpty()) {
      this.__setRecentlyPoint(this.range.anchor);
    }
    this.range.focus.element = this.range.anchor.element;
    this.range.focus.offset = this.range.anchor.offset;
  }
  //根据光标位置向编辑器内插入文本
  insertText(data2) {
    if (this.disabled) {
      return;
    }
    if (!data2 || typeof data2 != "string") {
      throw new Error("The argument must be a string");
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (!this.range.anchor.element.isPreStyle()) {
        data2 = data2.replace(/\s/g, () => {
          const span = document.createElement("span");
          span.innerHTML = "&nbsp;";
          return span.innerText;
        });
      }
      if (this.range.anchor.element.isText()) {
        let val = this.range.anchor.element.textContent;
        this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset) + data2 + val.substring(this.range.anchor.offset);
        this.range.anchor.offset = this.range.anchor.offset + data2.length;
        this.range.focus.offset = this.range.anchor.offset;
      } else {
        const textEl = new AlexElement("text", null, null, null, data2);
        if (this.range.anchor.offset == 0) {
          this.addElementBefore(textEl, this.range.anchor.element);
        } else {
          this.addElementAfter(textEl, this.range.anchor.element);
        }
        this.range.anchor.moveToEnd(textEl);
        this.range.focus.moveToEnd(textEl);
      }
    } else {
      this.delete();
      this.insertText(data2);
    }
  }
  //在光标处换行
  insertParagraph() {
    if (this.disabled) {
      return;
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      const previousElement = this.getPreviousElementOfPoint(this.range.anchor);
      const nextElement = this.getNextElementOfPoint(this.range.anchor);
      const block2 = this.range.anchor.element.getBlock();
      const inblock2 = this.range.anchor.element.getInblock();
      const endOffset = this.range.anchor.element.isText() ? this.range.anchor.element.textContent.length : 1;
      if (inblock2) {
        if (this.range.anchor.element.isPreStyle()) {
          this.insertText("\n");
          const text = AlexElement.getSpaceElement();
          this.insertElement(text);
          this.range.anchor.moveToEnd(text);
          this.range.focus.moveToEnd(text);
          this.emit("insertParagraph", null, inblock2);
        } else if (inblock2.behavior == "block") {
          if (this.range.anchor.offset == 0 && !(previousElement && inblock2.isContains(previousElement))) {
            const paragraph = inblock2.clone(false);
            const breakEle = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementBefore(paragraph, inblock2);
            this.emit("insertParagraph", inblock2, paragraph);
          } else if (this.range.anchor.offset == endOffset && !(nextElement && inblock2.isContains(nextElement))) {
            const paragraph = inblock2.clone(false);
            const breakEle = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementAfter(paragraph, inblock2);
            this.range.anchor.moveToStart(breakEle);
            this.range.focus.moveToStart(breakEle);
            this.emit("insertParagraph", paragraph, inblock2);
          } else {
            const newInblock = inblock2.clone();
            this.addElementAfter(newInblock, inblock2);
            const elements = AlexElement.flatElements(inblock2.children);
            const index = elements.findIndex((item) => {
              return this.range.anchor.element.isEqual(item);
            });
            this.range.focus.moveToEnd(inblock2);
            this.delete();
            const newElements = AlexElement.flatElements(newInblock.children);
            this.range.focus.element = newElements[index];
            this.range.focus.offset = this.range.anchor.offset;
            this.range.anchor.moveToStart(newInblock);
            this.delete();
            this.emit("insertParagraph", newInblock, inblock2);
          }
        }
      } else {
        if (this.range.anchor.element.isPreStyle()) {
          this.insertText("\n");
          const text = AlexElement.getSpaceElement();
          this.insertElement(text);
          this.range.anchor.moveToEnd(text);
          this.range.focus.moveToEnd(text);
          this.emit("insertParagraph", null, block2);
        } else {
          if (this.range.anchor.offset == 0 && !(previousElement && block2.isContains(previousElement))) {
            const paragraph = block2.clone(false);
            const breakEle = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementBefore(paragraph, block2);
            this.emit("insertParagraph", block2, paragraph);
          } else if (this.range.anchor.offset == endOffset && !(nextElement && block2.isContains(nextElement))) {
            const paragraph = block2.clone(false);
            const breakEle = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementAfter(paragraph, block2);
            this.range.anchor.moveToStart(breakEle);
            this.range.focus.moveToStart(breakEle);
            this.emit("insertParagraph", paragraph, block2);
          } else {
            const newBlock = block2.clone();
            this.addElementAfter(newBlock, block2);
            const elements = AlexElement.flatElements(block2.children);
            const index = elements.findIndex((item) => {
              return this.range.anchor.element.isEqual(item);
            });
            this.range.focus.moveToEnd(block2);
            this.delete();
            const newElements = AlexElement.flatElements(newBlock.children);
            this.range.focus.element = newElements[index];
            this.range.focus.offset = this.range.anchor.offset;
            this.range.anchor.moveToStart(newBlock);
            this.delete();
            this.emit("insertParagraph", newBlock, block2);
          }
        }
      }
    } else {
      this.delete();
      this.insertParagraph();
    }
  }
  //根据光标插入元素
  insertElement(ele, cover = true) {
    if (this.disabled) {
      return;
    }
    if (!AlexElement.isElement(ele)) {
      throw new Error("The argument must be an AlexElement instance");
    }
    if (ele.isEmpty()) {
      return;
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      const previousElement = this.getPreviousElementOfPoint(this.range.anchor);
      const nextElement = this.getNextElementOfPoint(this.range.anchor);
      const block2 = this.range.anchor.element.getBlock();
      const inblock2 = this.range.anchor.element.getInblock();
      const endOffset = this.range.anchor.element.isText() ? this.range.anchor.element.textContent.length : 1;
      if (ele.isInblock() && ele.behavior == "block" && inblock2 && inblock2.behavior == "block") {
        if (inblock2.isOnlyHasBreak() && cover) {
          this.addElementBefore(ele, inblock2);
          inblock2.toEmpty();
        } else if (this.range.anchor.offset == 0 && !(previousElement && inblock2.isContains(previousElement))) {
          this.addElementBefore(ele, inblock2);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && inblock2.isContains(nextElement))) {
          this.addElementAfter(ele, inblock2);
        } else {
          const newInblock = inblock2.clone();
          this.addElementAfter(newInblock, inblock2);
          this.range.focus.moveToEnd(inblock2);
          this.delete();
          const elements = AlexElement.flatElements(inblock2.children);
          const index = elements.findIndex((item) => {
            return this.range.anchor.element.isEqual(item);
          });
          const newElements = AlexElement.flatElements(newInblock.children);
          this.range.focus.element = newElements[index];
          this.range.focus.offset = this.range.anchor.offset;
          this.range.anchor.moveToStart(newInblock);
          this.delete();
          this.addElementBefore(ele, newInblock);
        }
      } else if (ele.isInblock() && inblock2) {
        if (inblock2.isOnlyHasBreak()) {
          this.addElementTo(ele, inblock2, 0);
        } else if (this.range.anchor.offset == 0 && !(previousElement && inblock2.isContains(previousElement))) {
          this.addElementTo(ele, inblock2, 0);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && inblock2.isContains(nextElement))) {
          this.addElementTo(ele, inblock2, inblock2.children.length);
        } else {
          const newInblock = inblock2.clone();
          this.addElementAfter(newInblock, inblock2);
          this.range.focus.moveToEnd(inblock2);
          this.delete();
          const elements = AlexElement.flatElements(inblock2.children);
          const index = elements.findIndex((item) => {
            return this.range.anchor.element.isEqual(item);
          });
          const newElements = AlexElement.flatElements(newInblock.children);
          this.range.focus.element = newElements[index];
          this.range.focus.offset = this.range.anchor.offset;
          this.range.anchor.moveToStart(newInblock);
          this.delete();
          this.addElementTo(ele, newInblock);
          this.mergeBlockElement(newInblock, inblock2);
        }
      } else if (ele.isInblock()) {
        if (block2.isOnlyHasBreak()) {
          this.addElementTo(ele, block2, 0);
        } else if (this.range.anchor.offset == 0 && !(previousElement && block2.isContains(previousElement))) {
          this.addElementTo(ele, block2, 0);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && block2.isContains(nextElement))) {
          this.addElementTo(ele, block2, block2.children.length);
        } else {
          const newBlock = block2.clone();
          this.addElementAfter(newBlock, block2);
          this.range.focus.moveToEnd(block2);
          this.delete();
          const elements = AlexElement.flatElements(block2.children);
          const index = elements.findIndex((item) => {
            return this.range.anchor.element.isEqual(item);
          });
          const newElements = AlexElement.flatElements(newBlock.children);
          this.range.focus.element = newElements[index];
          this.range.focus.offset = this.range.anchor.offset;
          this.range.anchor.moveToStart(newBlock);
          this.delete();
          this.addElementTo(ele, newBlock);
          this.mergeBlockElement(newBlock, block2);
        }
      } else if (ele.isBlock()) {
        if (block2.isOnlyHasBreak() && cover) {
          this.addElementBefore(ele, block2);
          block2.toEmpty();
        } else if (this.range.anchor.offset == 0 && !(previousElement && block2.isContains(previousElement))) {
          this.addElementBefore(ele, block2);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && block2.isContains(nextElement))) {
          this.addElementAfter(ele, block2);
        } else {
          const newBlock = block2.clone();
          this.addElementAfter(newBlock, block2);
          this.range.focus.moveToEnd(block2);
          this.delete();
          const elements = AlexElement.flatElements(block2.children);
          const index = elements.findIndex((item) => {
            return this.range.anchor.element.isEqual(item);
          });
          const newElements = AlexElement.flatElements(newBlock.children);
          this.range.focus.element = newElements[index];
          this.range.focus.offset = this.range.anchor.offset;
          this.range.anchor.moveToStart(newBlock);
          this.delete();
          this.addElementBefore(ele, newBlock);
        }
      } else {
        if (this.range.anchor.element.isText()) {
          let val = this.range.anchor.element.textContent;
          let newText = this.range.anchor.element.clone();
          this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset);
          newText.textContent = val.substring(this.range.anchor.offset);
          this.addElementAfter(newText, this.range.anchor.element);
          this.addElementBefore(ele, newText);
        } else {
          if (this.range.anchor.offset == 0) {
            this.addElementBefore(ele, this.range.anchor.element);
          } else {
            this.addElementAfter(ele, this.range.anchor.element);
          }
        }
      }
      this.range.anchor.moveToEnd(ele);
      this.range.focus.moveToEnd(ele);
    } else {
      this.delete();
      this.insertElement(ele, cover);
    }
  }
  //格式化stack
  formatElementStack() {
    let renderRules = this.__renderRules.filter((fn) => {
      return typeof fn == "function";
    });
    const format = (element2) => {
      [...renderRules, ...this.__formatUnchangeableRules].forEach((fn) => {
        fn.apply(this, [element2]);
      });
      if (element2.hasChildren()) {
        let index2 = 0;
        while (index2 < element2.children.length) {
          const ele = element2.children[index2];
          if (ele.isEmpty()) {
            if (ele.isContains(this.range.anchor.element)) {
              this.__setRecentlyPoint(this.range.anchor);
            }
            if (ele.isContains(this.range.focus.element)) {
              this.__setRecentlyPoint(this.range.focus);
            }
            element2.children.splice(index2, 1);
            continue;
          }
          format(ele);
          if (ele.isEmpty()) {
            if (ele.isContains(this.range.anchor.element)) {
              this.__setRecentlyPoint(this.range.anchor);
            }
            if (ele.isContains(this.range.focus.element)) {
              this.__setRecentlyPoint(this.range.focus);
            }
            element2.children.splice(index2, 1);
            continue;
          }
          index2++;
        }
      }
    };
    let index = 0;
    while (index < this.stack.length) {
      const ele = this.stack[index];
      if (ele.isEmpty()) {
        if (ele.isContains(this.range.anchor.element)) {
          this.__setRecentlyPoint(this.range.anchor);
        }
        if (ele.isContains(this.range.focus.element)) {
          this.__setRecentlyPoint(this.range.focus);
        }
        this.stack.splice(index, 1);
        continue;
      }
      if (!ele.isBlock()) {
        ele.convertToBlock();
      }
      format(ele);
      if (ele.isEmpty()) {
        if (ele.isContains(this.range.anchor.element)) {
          this.__setRecentlyPoint(this.range.anchor);
        }
        if (ele.isContains(this.range.focus.element)) {
          this.__setRecentlyPoint(this.range.focus);
        }
        this.stack.splice(index, 1);
        continue;
      }
      index++;
    }
    if (this.stack.length == 0) {
      const ele = new AlexElement("block", AlexElement.BLOCK_NODE, null, null, null);
      const breakEle = new AlexElement("closed", "br", null, null, null);
      this.addElementTo(breakEle, ele);
      this.stack = [ele];
      this.range.anchor.moveToStart(breakEle);
      this.range.focus.moveToStart(breakEle);
    }
  }
  //渲染编辑器dom内容
  domRender(unPushHistory = false) {
    this.emit("beforeRender");
    const fragment = document.createDocumentFragment();
    this.stack.forEach((element2) => {
      element2.__renderElement();
      fragment.appendChild(element2._elm);
    });
    this.$el.innerHTML = "";
    this.$el.appendChild(fragment);
    const oldValue = this.value;
    this.value = this.$el.innerHTML;
    if (this.__firstRender || oldValue != this.value) {
      if (!this.__firstRender) {
        this.emit("change", this.value, oldValue);
      }
      if (!unPushHistory) {
        this.history.push(this.stack, this.range);
      }
    }
    if (this.__firstRender) {
      this.__firstRender = false;
    }
    this.emit("afterRender");
  }
  //根据anchor和focus来设置真实的光标
  rangeRender() {
    if (this.disabled) {
      return;
    }
    const handler = (point) => {
      let node = null;
      let offset = null;
      if (point.element.isText()) {
        node = point.element._elm.childNodes[0];
        offset = point.offset;
      } else {
        node = point.element.parent._elm;
        const index = point.element.parent.children.findIndex((item) => {
          return point.element.isEqual(item);
        });
        offset = point.offset + index;
      }
      return { node, offset };
    };
    this.__innerSelectionChange = true;
    const anchorResult = handler(this.range.anchor);
    const focusResult = handler(this.range.focus);
    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.setStart(anchorResult.node, anchorResult.offset);
    range.setEnd(focusResult.node, focusResult.offset);
    selection.addRange(range);
    setTimeout(() => {
      this.__setRangeInVisible();
      this.__innerSelectionChange = false;
      this.emit("rangeUpdate", this.range);
    }, 0);
  }
  //将html转为元素
  parseHtml(html) {
    if (!html) {
      throw new Error("You need to give an html content to convert");
    }
    const node = document.createElement("div");
    node.innerHTML = html;
    let elements = [];
    Array.from(node.childNodes).forEach((el) => {
      if (el.nodeType == 1 || el.nodeType == 3) {
        const element2 = this.parseNode(el);
        elements.push(element2);
      }
    });
    return elements;
  }
  //将dom节点转为元素
  parseNode(node) {
    if (!(node instanceof Node)) {
      throw new Error("The argument must be an node");
    }
    if (!(node.nodeType == 1 || node.nodeType == 3)) {
      throw new Error("The argument must be an element node or text node");
    }
    if (node.nodeType == 3) {
      return new AlexElement("text", null, null, null, node.textContent);
    }
    const marks = Util.getAttributes(node);
    const styles = Util.getStyles(node);
    const parsedom = node.nodeName.toLocaleLowerCase();
    const block2 = defaultConfig.block.find((item) => item.parsedom == parsedom);
    const inblock2 = defaultConfig.inblock.find((item) => item.parsedom == parsedom);
    const inline2 = defaultConfig.inline.find((item) => item.parsedom == parsedom);
    const closed2 = defaultConfig.closed.find((item) => item.parsedom == parsedom);
    let element2 = null;
    let config = {
      type: "inblock",
      parsedom,
      marks,
      styles,
      behavior: "default"
    };
    if (block2) {
      config.type = "block";
      if (block2.parse) {
        config.parsedom = AlexElement.BLOCK_NODE;
      }
    } else if (inblock2) {
      config.type = "inblock";
      if (inblock2.block) {
        config.behavior = "block";
      }
    } else if (inline2) {
      config.type = "inline";
      if (inline2.parse) {
        config.parsedom = AlexElement.TEXT_NODE;
        if (obj$1.common.isObject(inline2.parse)) {
          Object.assign(config.styles, Util.clone(inline2.parse));
        }
      }
    } else if (closed2) {
      config.type = "closed";
    } else {
      config.type = "inline";
      config.parsedom = "span";
    }
    element2 = new AlexElement(config.type, config.parsedom, config.marks, config.styles, null);
    element2.behavior = config.behavior;
    if (block2 || inblock2 || inline2) {
      Array.from(node.childNodes).forEach((childNode) => {
        if (childNode.nodeType == 1 || childNode.nodeType == 3) {
          const childEle = this.parseNode(childNode);
          childEle.parent = element2;
          if (element2.hasChildren()) {
            element2.children.push(childEle);
          } else {
            element2.children = [childEle];
          }
        }
      });
    }
    return element2;
  }
  //将指定元素与另一个元素进行合并（仅限内部块元素和根级块元素）
  mergeBlockElement(ele, previousEle) {
    if (!AlexElement.isElement(ele)) {
      throw new Error("The first argument must be an AlexElement instance");
    }
    if (!AlexElement.isElement(previousEle)) {
      throw new Error("The second argument must be an AlexElement instance");
    }
    if (!ele.isBlock() && !ele.isInblock() || !previousEle.isBlock() && !previousEle.isInblock()) {
      throw new Error('Elements that are not "block" or "inblock" cannot be merged');
    }
    previousEle.children.push(...ele.children);
    previousEle.children.forEach((item) => {
      item.parent = previousEle;
    });
    ele.children = null;
  }
  //根据key查询元素
  getElementByKey(key) {
    if (!key) {
      throw new Error("You need to specify a key to do the query");
    }
    const fn = (elements) => {
      let element2 = null;
      let i = 0;
      let length = elements.length;
      while (i < length) {
        if (elements[i].key == key) {
          element2 = elements[i];
          break;
        }
        if (elements[i].hasChildren()) {
          const el = fn(elements[i].children);
          if (el) {
            element2 = el;
            break;
          }
        }
        i++;
      }
      return element2;
    };
    return fn(this.stack);
  }
  //获取指定元素的前一个兄弟元素（会过滤空元素）
  getPreviousElement(ele) {
    if (!AlexElement.isElement(ele)) {
      throw new Error("The argument must be an AlexElement instance");
    }
    if (ele.isBlock()) {
      const index = this.stack.findIndex((item) => {
        return ele.isEqual(item);
      });
      if (index <= 0) {
        return null;
      }
      if (this.stack[index - 1].isEmpty()) {
        return this.getPreviousElement(this.stack[index - 1]);
      }
      return this.stack[index - 1];
    } else {
      const index = ele.parent.children.findIndex((item) => {
        return ele.isEqual(item);
      });
      if (index <= 0) {
        return null;
      }
      if (ele.parent.children[index - 1].isEmpty()) {
        return this.getPreviousElement(ele.parent.children[index - 1]);
      }
      return ele.parent.children[index - 1];
    }
  }
  //获取指定元素的后一个兄弟元素（会过滤空元素）
  getNextElement(ele) {
    if (!AlexElement.isElement(ele)) {
      throw new Error("The argument must be an AlexElement instance");
    }
    if (ele.isBlock()) {
      const index = this.stack.findIndex((item) => {
        return ele.isEqual(item);
      });
      if (index >= this.stack.length - 1) {
        return null;
      }
      if (this.stack[index + 1].isEmpty()) {
        return this.getNextElement(this.stack[index + 1]);
      }
      return this.stack[index + 1];
    } else {
      const index = ele.parent.children.findIndex((item) => {
        return ele.isEqual(item);
      });
      if (index >= ele.parent.children.length - 1) {
        return null;
      }
      if (ele.parent.children[index + 1].isEmpty()) {
        return this.getNextElement(ele.parent.children[index + 1]);
      }
      return ele.parent.children[index + 1];
    }
  }
  //向上查询可以设置焦点的元素（会过滤空元素）
  getPreviousElementOfPoint(point) {
    if (!AlexPoint.isPoint(point)) {
      throw new Error("The argument must be an AlexPoint instance");
    }
    const flatElements = AlexElement.flatElements(this.stack);
    const fn = (element2) => {
      const index = flatElements.findIndex((item) => {
        return element2.isEqual(item);
      });
      if (index <= 0) {
        return null;
      }
      let ele = flatElements[index - 1];
      if ((ele.isText() || ele.isClosed()) && !ele.isEmpty()) {
        return ele;
      }
      return fn(ele);
    };
    return fn(point.element);
  }
  //向下查找可以设置焦点的元素（会过滤空元素）
  getNextElementOfPoint(point) {
    if (!AlexPoint.isPoint(point)) {
      throw new Error("The argument must be an AlexPoint instance");
    }
    const flatElements = AlexElement.flatElements(this.stack);
    const fn = (element2) => {
      const index = flatElements.findIndex((item) => {
        return element2.isEqual(item);
      });
      if (index == flatElements.length - 1) {
        return null;
      }
      let ele = flatElements[index + 1];
      if ((ele.isText() || ele.isClosed()) && !ele.isEmpty()) {
        return ele;
      }
      return fn(ele);
    };
    return fn(point.element);
  }
  //获取选区之间的元素
  getElementsByRange(includes = false, flat = false) {
    if (this.range.anchor.isEqual(this.range.focus)) {
      return [];
    }
    if (this.range.anchor.element.isEqual(this.range.focus.element)) {
      if (includes) {
        const isCover = this.range.anchor.offset == 0 && this.range.focus.offset == (this.range.anchor.element.isText() ? this.range.anchor.element.textContent.length : 1);
        return [
          {
            element: this.range.anchor.element,
            offset: isCover ? false : [this.range.anchor.offset, this.range.focus.offset]
          }
        ];
      }
      return [];
    }
    let result = [];
    if (includes) {
      if (this.range.anchor.offset == 0) {
        result.push({
          element: this.range.anchor.element,
          offset: false
        });
      } else if (this.range.anchor.offset < (this.range.anchor.element.isText() ? this.range.anchor.element.textContent.length : 1)) {
        result.push({
          element: this.range.anchor.element,
          offset: [this.range.anchor.offset, this.range.anchor.element.isText() ? this.range.anchor.element.textContent.length : 1]
        });
      }
    }
    const elements = AlexElement.flatElements(this.stack);
    const anchorIndex = elements.findIndex((el) => el.isEqual(this.range.anchor.element));
    const focusIndex = elements.findIndex((el) => el.isEqual(this.range.focus.element));
    for (let i = anchorIndex + 1; i < focusIndex; i++) {
      result.push({
        element: elements[i],
        offset: false
      });
    }
    if (includes) {
      if (this.range.focus.offset == (this.range.focus.element.isText() ? this.range.focus.element.textContent.length : 1)) {
        result.push({
          element: this.range.focus.element,
          offset: false
        });
      } else if (this.range.focus.offset > 0) {
        result.push({
          element: this.range.focus.element,
          offset: [0, this.range.focus.offset]
        });
      }
    }
    const resLength = result.length;
    let newResult = [];
    for (let i = resLength - 1; i >= 0; i--) {
      if (result[i].element.hasChildren()) {
        let allIn = result[i].element.children.every((child) => {
          return newResult.some((item) => {
            return item.element.isEqual(child) && !item.offset;
          });
        });
        if (allIn) {
          newResult.unshift(result[i]);
        }
      } else {
        newResult.unshift(result[i]);
      }
    }
    if (flat) {
      return newResult;
    }
    let notFlatResult = [];
    const length = newResult.length;
    for (let i = 0; i < length; i++) {
      if (newResult[i].element.isBlock()) {
        notFlatResult.push(newResult[i]);
      } else {
        const isIn = newResult.some((item) => item.element.isEqual(newResult[i].element.parent));
        if (!isIn) {
          notFlatResult.push(newResult[i]);
        }
      }
    }
    return notFlatResult;
  }
  //分割选区选中的元素，会更新光标位置
  splitElementsByRange(includes = false, flat = false) {
    const result = this.getElementsByRange(includes, flat);
    let elements = [];
    result.forEach((item, index) => {
      if (item.offset) {
        let selectEl = null;
        if (item.offset[0] == 0) {
          const el = item.element.clone();
          item.element.textContent = item.element.textContent.substring(0, item.offset[1]);
          el.textContent = el.textContent.substring(item.offset[1]);
          this.addElementAfter(el, item.element);
          selectEl = item.element;
        } else if (item.offset[1] == item.element.textContent.length) {
          const el = item.element.clone();
          item.element.textContent = item.element.textContent.substring(0, item.offset[0]);
          el.textContent = el.textContent.substring(item.offset[0]);
          this.addElementAfter(el, item.element);
          selectEl = el;
        } else {
          const el = item.element.clone();
          const el2 = item.element.clone();
          item.element.textContent = item.element.textContent.substring(0, item.offset[0]);
          el.textContent = el.textContent.substring(item.offset[0], item.offset[1]);
          el2.textContent = el2.textContent.substring(item.offset[1]);
          this.addElementAfter(el, item.element);
          this.addElementAfter(el2, el);
          selectEl = el;
        }
        if (index == 0) {
          this.range.anchor.moveToStart(selectEl);
        }
        if (index == result.length - 1) {
          this.range.focus.moveToEnd(selectEl);
        }
        elements.push(selectEl);
      } else {
        elements.push(item.element);
      }
    });
    return elements;
  }
  //将指定元素添加到父元素的子元素数组中
  addElementTo(childEle, parentEle, index = 0) {
    if (!AlexElement.isElement(childEle)) {
      throw new Error("The first argument must be an AlexElement instance");
    }
    if (!AlexElement.isElement(parentEle)) {
      throw new Error("The second argument must be an AlexElement instance");
    }
    if (typeof index != "number" || isNaN(index) || index < 0) {
      throw new Error("The third argument must be an integer not less than 0");
    }
    if (parentEle.hasChildren()) {
      if (index >= parentEle.children.length) {
        parentEle.children.push(childEle);
      } else {
        parentEle.children.splice(index, 0, childEle);
      }
    } else {
      parentEle.children = [childEle];
    }
    childEle.parent = parentEle;
  }
  //将指定元素添加到另一个元素前面
  addElementBefore(newEle, targetEle) {
    if (!AlexElement.isElement(newEle)) {
      throw new Error("The first argument must be an AlexElement instance");
    }
    if (!AlexElement.isElement(targetEle)) {
      throw new Error("The second argument must be an AlexElement instance");
    }
    if (targetEle.isBlock()) {
      const index = this.stack.findIndex((item) => {
        return targetEle.isEqual(item);
      });
      this.stack.splice(index, 0, newEle);
      newEle.parent = null;
    } else {
      const index = targetEle.parent.children.findIndex((item) => {
        return targetEle.isEqual(item);
      });
      this.addElementTo(newEle, targetEle.parent, index);
    }
  }
  //将指定元素添加到另一个元素后面
  addElementAfter(newEle, targetEle) {
    if (!AlexElement.isElement(newEle)) {
      throw new Error("The first argument must be an AlexElement instance");
    }
    if (!AlexElement.isElement(targetEle)) {
      throw new Error("The second argument must be an AlexElement instance");
    }
    if (targetEle.isBlock()) {
      const index = this.stack.findIndex((item) => {
        return targetEle.isEqual(item);
      });
      if (index >= this.stack.length - 1) {
        this.stack.push(newEle);
      } else {
        this.stack.splice(index + 1, 0, newEle);
      }
      newEle.parent = null;
    } else {
      const index = targetEle.parent.children.findIndex((item) => {
        return targetEle.isEqual(item);
      });
      this.addElementTo(newEle, targetEle.parent, index + 1);
    }
  }
  //将虚拟光标设置到指定元素开始处
  collapseToStart(element2) {
    if (this.disabled) {
      return;
    }
    if (AlexElement.isElement(element2)) {
      this.range.anchor.moveToStart(element2);
      this.range.focus.moveToStart(element2);
    } else {
      const flatElements = AlexElement.flatElements(this.stack);
      this.range.anchor.moveToStart(flatElements[0]);
      this.range.focus.moveToStart(flatElements[0]);
    }
  }
  //将虚拟光标设置到指定元素最后
  collapseToEnd(element2) {
    if (this.disabled) {
      return;
    }
    if (AlexElement.isElement(element2)) {
      this.range.anchor.moveToEnd(element2);
      this.range.focus.moveToEnd(element2);
    } else {
      const flatElements = AlexElement.flatElements(this.stack);
      const length = flatElements.length;
      this.range.anchor.moveToEnd(flatElements[length - 1]);
      this.range.focus.moveToEnd(flatElements[length - 1]);
    }
  }
  //禁用编辑器
  setDisabled() {
    this.disabled = true;
    this.$el.removeAttribute("contenteditable");
  }
  //启用编辑器
  setEnabled() {
    this.disabled = false;
    this.$el.setAttribute("contenteditable", true);
  }
  //设置文本元素的样式
  setTextStyle(styles) {
    if (this.disabled) {
      return;
    }
    if (!obj$1.common.isObject(styles)) {
      throw new Error("The argument must be an object");
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isSpaceText()) {
        if (this.range.anchor.element.hasStyles()) {
          Object.assign(this.range.anchor.element.styles, Util.clone(styles));
        } else {
          this.range.anchor.element.styles = Util.clone(styles);
        }
      } else if (this.range.anchor.element.isText()) {
        const el = AlexElement.getSpaceElement();
        el.styles = Util.clone(this.range.anchor.element.styles);
        el.marks = Util.clone(this.range.anchor.element.marks);
        if (el.hasStyles()) {
          Object.assign(el.styles, Util.clone(styles));
        } else {
          el.styles = Util.clone(styles);
        }
        this.insertElement(el);
      } else {
        const el = AlexElement.getSpaceElement();
        el.styles = Util.clone(styles);
        this.insertElement(el);
      }
    } else {
      const elements = this.splitElementsByRange(true, true);
      elements.forEach((ele) => {
        if (ele.isText()) {
          if (ele.hasStyles()) {
            Object.assign(ele.styles, Util.clone(styles));
          } else {
            ele.styles = Util.clone(styles);
          }
        }
      });
    }
  }
  //移除文本元素的样式
  removeTextStyle(styleNames) {
    if (this.disabled) {
      return;
    }
    const removeFn = (el) => {
      if (Array.isArray(styleNames)) {
        if (el.hasStyles()) {
          let styles = {};
          Object.keys(el.styles).forEach((key) => {
            if (!styleNames.includes(key)) {
              styles[key] = el.styles[key];
            }
          });
          el.styles = styles;
        }
      } else {
        el.styles = null;
      }
    };
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isSpaceText()) {
        removeFn(this.range.anchor.element);
      } else if (this.range.anchor.element.isText()) {
        const el = AlexElement.getSpaceElement();
        el.styles = Util.clone(this.range.anchor.element.styles);
        el.marks = Util.clone(this.range.anchor.element.marks);
        removeFn(el);
        this.insertElement(el);
      }
    } else {
      const elements = this.splitElementsByRange(true, true);
      elements.forEach((ele) => {
        if (ele.isText()) {
          removeFn(ele);
        }
      });
    }
  }
  //查询虚拟光标包含的文本元素是否具有某个样式
  queryTextStyle(name, value) {
    if (!name) {
      throw new Error("The first argument cannot be null");
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isText() && this.range.anchor.element.hasStyles()) {
        if (value == null || value == void 0) {
          return this.range.anchor.element.styles.hasOwnProperty(name);
        }
        return this.range.anchor.element.styles[name] == value;
      }
      return false;
    }
    const result = this.getElementsByRange(true, true).filter((item) => {
      return item.element.isText();
    });
    if (result.length == 0) {
      return false;
    }
    let flag = result.every((item) => {
      if (item.element.hasStyles()) {
        if (value == null || value == void 0) {
          return item.element.styles.hasOwnProperty(name);
        }
        return item.element.styles[name] == value;
      }
      return false;
    });
    return flag;
  }
  //设置文本元素的标记
  setTextMark(marks) {
    if (this.disabled) {
      return;
    }
    if (!obj$1.common.isObject(marks)) {
      throw new Error("The argument must be an object");
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isSpaceText()) {
        if (this.range.anchor.element.hasMarks()) {
          Object.assign(this.range.anchor.element.marks, Util.clone(marks));
        } else {
          this.range.anchor.element.marks = Util.clone(marks);
        }
      } else if (this.range.anchor.element.isText()) {
        const el = AlexElement.getSpaceElement();
        el.styles = Util.clone(this.range.anchor.element.styles);
        el.marks = Util.clone(this.range.anchor.element.marks);
        if (el.hasMarks()) {
          Object.assign(el.marks, Util.clone(marks));
        } else {
          el.marks = Util.clone(marks);
        }
        this.insertElement(el);
      } else {
        const el = AlexElement.getSpaceElement();
        el.marks = Util.clone(marks);
        this.insertElement(el);
      }
    } else {
      const elements = this.splitElementsByRange(true, true);
      elements.forEach((ele) => {
        if (ele.isText()) {
          if (ele.hasMarks()) {
            Object.assign(ele.marks, Util.clone(marks));
          } else {
            ele.marks = Util.clone(marks);
          }
        }
      });
    }
  }
  //移除文本元素的标记
  removeTextMark(markNames) {
    if (this.disabled) {
      return;
    }
    const removeFn = (el) => {
      if (Array.isArray(markNames)) {
        if (el.hasMarks()) {
          let marks = {};
          Object.keys(el.marks).forEach((key) => {
            if (!markNames.includes(key)) {
              marks[key] = el.marks[key];
            }
          });
          el.marks = marks;
        }
      } else {
        el.marks = null;
      }
    };
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isSpaceText()) {
        removeFn(this.range.anchor.element);
      } else if (this.range.anchor.element.isText()) {
        const el = AlexElement.getSpaceElement();
        el.styles = Util.clone(this.range.anchor.element.styles);
        el.marks = Util.clone(this.range.anchor.element.marks);
        removeFn(el);
        this.insertElement(el);
      }
    } else {
      const elements = this.splitElementsByRange(true, true);
      elements.forEach((ele) => {
        if (ele.isText()) {
          removeFn(ele);
        }
      });
    }
  }
  //查询选区内的文本元素是否具有某个标记
  queryTextMark(name, value) {
    if (!name) {
      throw new Error("The first argument cannot be null");
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isText() && this.range.anchor.element.hasMarks()) {
        if (value == null || value == void 0) {
          return this.range.anchor.element.marks.hasOwnProperty(name);
        }
        return this.range.anchor.element.marks[name] == value;
      }
      return false;
    }
    const result = this.getElementsByRange(true, true).filter((item) => {
      return item.element.isText();
    });
    if (result.length == 0) {
      return false;
    }
    let flag = result.every((item) => {
      if (item.element.hasMarks()) {
        if (value == null || value == void 0) {
          return item.element.marks.hasOwnProperty(name);
        }
        return item.element.marks[name] == value;
      }
      return false;
    });
    return flag;
  }
  //触发自定义事件
  emit(eventName, ...value) {
    if (Array.isArray(this.__events[eventName])) {
      this.__events[eventName].forEach((fn) => {
        fn.apply(this, [...value]);
      });
      return true;
    }
    return false;
  }
  //监听自定义事件
  on(eventName, eventHandle) {
    if (!this.__events[eventName]) {
      this.__events[eventName] = [];
    }
    this.__events[eventName].push(eventHandle);
  }
  //销毁编辑器的方法
  destroy() {
    this.setDisabled();
    obj$1.event.off(document, `selectionchange.alex_editor_${this.__guid}`);
    obj$1.event.off(this.$el, "beforeinput.alex_editor compositionstart.alex_editor compositionupdate.alex_editor compositionend.alex_editor keydown.alex_editor cut.alex_editor paste.alex_editor copy.alex_editor dragstart.alex_editor drop.alex_editor focus.alex_editor blur.alex_editor");
  }
}
const number = {
  /**
   * 数字格式化
   * @param {Number} num
   */
  formatNumber(num) {
    if (this.isNumber(num)) {
      return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    } else {
      return num;
    }
  },
  /**
   * 判断是否数字
   * @param {Object} num
   */
  isNumber(num) {
    if (typeof num == "number" && !isNaN(num)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 多个数的加法运算
   */
  add(...values) {
    return values.reduce((num, value) => {
      let r1 = 0;
      let r2 = 0;
      let m = 0;
      try {
        r1 = num.toString().split(".")[1].length;
      } catch (e) {
      }
      try {
        r2 = value.toString().split(".")[1].length;
      } catch (e) {
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (num * m + value * m) / m;
    });
  },
  /**
   * 多个数的减法运算
   */
  subtract(...values) {
    return values.reduce((num, value) => {
      let r1 = 0;
      let r2 = 0;
      let m = 0;
      try {
        r1 = num.toString().split(".")[1].length;
      } catch (e) {
      }
      try {
        r2 = value.toString().split(".")[1].length;
      } catch (e) {
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (num * m - value * m) / m;
    });
  },
  /**
   * 多个数的乘法运算
   */
  mutiply(...values) {
    return values.reduce((num, value) => {
      let m = 0;
      let s1 = num.toString();
      let s2 = value.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {
      }
      try {
        m += s2.split(".")[1].length;
      } catch (e) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    });
  },
  /**
   * 多个数的除法运算
   */
  divide(...values) {
    return values.reduce((num, value) => {
      let t1 = 0;
      let t2 = 0;
      let s1 = num.toString();
      let s2 = value.toString();
      try {
        t1 = s1.split(".")[1].length;
      } catch (e) {
      }
      try {
        t2 = s2.split(".")[1].length;
      } catch (e) {
      }
      s1 = Number(s1.replace(".", ""));
      s2 = Number(s2.replace(".", ""));
      return s1 / s2 * Math.pow(10, t2 - t1);
    });
  }
};
const string = {
  /**
   * 向指定位置插入字符串
   * @param {Object} original 原始字符串
   * @param {Object} str 插入的字符串
   * @param {Object} index 插入的位置
   */
  insert(original, str, index) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (typeof str != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!number.isNumber(index)) {
      throw new TypeError("The third argument must be a number");
    }
    if (index < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    return original.substring(0, index) + str + original.substring(index, original.length);
  },
  /**
   * 删除指定位置的字符串
   * @param {Object} original 原始字符串
   * @param {Object} index 删除的位置序列
   * @param {Object} num 删除的字符串长度
   */
  delete(original, index, num) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!number.isNumber(index)) {
      throw new TypeError("The second argument must be a number");
    }
    if (index < 0) {
      throw new Error("The second argument cannot be less than 0");
    }
    if (!number.isNumber(num)) {
      throw new TypeError("The third argument must be a number");
    }
    if (num < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    return original.substring(0, index) + original.substring(index + num, original.length);
  },
  /**
   * 替换指定位置的字符串
   * @param {Object} original 原始字符串
   * @param {Object} start 开始位置
   * @param {Object} end 结束位置
   * @param {Object} str 替换的字符串
   */
  replace(original, start, end, str) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!number.isNumber(start)) {
      throw new TypeError("The second argument must be a number");
    }
    if (start < 0) {
      throw new Error("The second argument cannot be less than 0");
    }
    if (!number.isNumber(end)) {
      throw new TypeError("The third argument must be a number");
    }
    if (end < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    if (typeof str != "string") {
      throw new TypeError("The fourth argument must be a string");
    }
    return original.substring(0, start) + str + original.substring(end, original.length);
  },
  /**
   * 去除字符串空格
   * @param {Object} str
   * @param {Object} global 为true时去除所有空格，否则只去除两边空格
   */
  trim(str, global) {
    if (typeof str != "string") {
      throw new TypeError("The first argument must be a string");
    }
    let result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (global) {
      result = result.replace(/\s/g, "");
    }
    return result;
  }
};
const element = {
  /**
   * 判断是否是Window对象
   * @param {Object} data 入参
   */
  isWindow(data2) {
    return data2 && data2 instanceof Window;
  },
  /**
   * 获取元素距离指定祖先元素左侧/顶部/底部/右侧的距离
   * @param {Object} el 元素
   * @param {Object} root 父元素或者祖先元素，未指定则为document.body
   */
  getElementPoint(el, root) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(root)) {
      root = document.body;
    }
    if (!this.isContains(root, el)) {
      throw new Error("The second argument and the first argument have no hierarchical relationship");
    }
    let obj2 = el;
    let offsetTop = 0;
    let offsetLeft = 0;
    while (this.isElement(el) && this.isContains(root, el) && root !== el) {
      offsetTop += el.offsetTop;
      offsetLeft += el.offsetLeft;
      el = el.offsetParent;
    }
    let offsetRight = root.offsetWidth - offsetLeft - obj2.offsetWidth;
    let offsetBottom = root.offsetHeight - offsetTop - obj2.offsetHeight;
    return {
      top: offsetTop,
      left: offsetLeft,
      right: offsetRight,
      bottom: offsetBottom
    };
  },
  /**
   * 判断某个节点是否包含指定节点，包含相等关系和父子关系
   * @param {Object} parentNode 父节点或祖先节点
   * @param {Object} childNode 子节点
   */
  isContains(parentNode, childNode) {
    if (!this.isElement(parentNode)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(childNode)) {
      throw new TypeError("The second argument must be an element");
    }
    if (parentNode === childNode) {
      return true;
    }
    if (parentNode.contains) {
      return parentNode.contains(childNode);
    }
    if (parentNode.compareDocumentPosition) {
      return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
  },
  /**
   * 判断某个节点是否是指定节点的父节点
   * @param {Object} parentNode 父节点
   * @param {Object} childNode 子节点
   */
  isParentNode(parentNode, childNode) {
    if (!this.isElement(parentNode)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(childNode)) {
      throw new TypeError("The second argument must be an element");
    }
    if (parentNode === childNode) {
      return false;
    }
    return childNode.parentNode === parentNode;
  },
  /**
   * 查找某个节点下指定选择器的子元素
   * @param {Object} el 元素节点
   * @param {Object} selector 支持多选择器，等同于querySelectorAll的参数
   */
  children(el, selector) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (selector && typeof selector != "string") {
      throw new TypeError("The second argument must be a string");
    }
    const res = el.querySelectorAll(selector || "*");
    return [...res].filter((ele) => {
      return ele.parentNode === el;
    });
  },
  /**
   * 查找某个节点下指定选择器的兄弟节点
   * @param {Object} el 元素节点
   * @param {Object} selector 取值等同于queryselectorAll的参数，支持多选择器
   */
  siblings(el, selector) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (selector && typeof selector != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!el.parentNode) {
      return [];
    }
    const res = el.parentNode.querySelectorAll(selector || "*");
    return [...res].filter((ele) => {
      return ele.parentNode === el.parentNode && ele != el;
    });
  },
  /**
   * rem与px单位转换
   * @param {Object} num rem数值
   */
  rem2px(num) {
    if (!number.isNumber(num)) {
      throw new TypeError("The argument must be a number");
    }
    let fs = this.getCssStyle(document.documentElement, "font-size");
    return number.mutiply(num, parseFloat(fs));
  },
  /**
   * rem与px单位转换
   * @param {Object} num px数值
   */
  px2rem(num) {
    if (!number.isNumber(num)) {
      throw new TypeError("The argument must be a number");
    }
    let fs = this.getCssStyle(document.documentElement, "font-size");
    return number.divide(num, parseFloat(fs));
  },
  /**
   * 获取元素的内容宽度，内容宽度不包括border和padding
   * @param {Object} el 支持css选择器字符串，未指定则表示document.body
   */
  width(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let clientWidth = el.clientWidth;
    let paddingLeft_width = parseFloat(this.getCssStyle(el, "padding-left"));
    let paddingRight_width = parseFloat(this.getCssStyle(el, "padding-right"));
    return number.subtract(clientWidth, paddingLeft_width, paddingRight_width);
  },
  /**
   * 获取元素的内容高度，内容高度不包括border和padding
   * @param {Object} el 支持css选择器字符串 未指定则表示document.body
   */
  height(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let clientHeight = el.clientHeight;
    let paddingTop_height = parseFloat(this.getCssStyle(el, "padding-top"));
    let paddingBottom_height = parseFloat(this.getCssStyle(el, "padding-bottom"));
    return number.subtract(clientHeight, paddingTop_height, paddingBottom_height);
  },
  /**
   * 移除class
   * @param {Object} el 元素节点
   * @param {Object} className 支持多类,以空格划分
   */
  removeClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string.trim(className).split(/\s+/);
    classArray.forEach((item) => {
      classList.remove(item);
    });
  },
  /**
   * 添加class
   * @param {Object} el 元素节点
   * @param {Object} className 支持多类,以空格划分
   */
  addClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string.trim(className).split(/\s+/);
    classArray.forEach((item) => {
      classList.add(item);
    });
  },
  /**
   * 判断指定元素是否含有指定类名
   * @param {Object} el 元素节点
   * @param {Object} className 支持多类,以空格划分
   */
  hasClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string.trim(className).split(/\s+/);
    return classArray.every((item) => {
      return classList.contains(item);
    });
  },
  /**
   * 监听元素滚动到顶部或者底部
   * @param {Object} el 支持css选择器字符串 未指定则为窗口滚动
   * @param {Object} callback 回调函数
   */
  scrollTopBottomTrigger(el, callback) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollEle = window;
    if (this.isElement(el) && el != document.body && el != document.documentElement) {
      scrollEle = el;
    }
    if (typeof el == "function") {
      callback = el;
    }
    let flag = true;
    scrollEle.addEventListener("scroll", (e) => {
      if (this.getScrollTop(scrollEle) <= 0) {
        let options = {
          state: "top",
          target: scrollEle
        };
        if (!flag) {
          return;
        }
        if (typeof callback == "function") {
          flag = false;
          callback(options);
        }
      } else {
        let options = {
          state: "bottom",
          target: scrollEle
        };
        let height = 0;
        if (scrollEle == window) {
          height = window.innerHeight;
        } else {
          height = scrollEle.clientHeight;
        }
        if (number.add(this.getScrollTop(scrollEle), height) + 1 >= this.getScrollHeight(scrollEle) && height != this.getScrollHeight(scrollEle)) {
          if (!flag) {
            return;
          }
          if (typeof callback == "function") {
            flag = false;
            callback(options);
          }
        } else {
          flag = true;
        }
      }
    });
  },
  /**
   * 获取文档或元素的总宽度
   * @param {Object} el 支持css选择器字符串 未指定则表示整个页面文档
   */
  getScrollWidth(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollWidth = 0;
    if (this.isElement(el) && el != document.documentElement && el != document.body) {
      scrollWidth = el.scrollWidth;
    } else {
      if (document.documentElement.scrollWidth == 0 || document.body.scrollWidth == 0) {
        scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
      } else {
        scrollWidth = document.documentElement.scrollWidth > document.body.scrollWidth ? document.documentElement.scrollWidth : document.body.scrollWidth;
      }
    }
    return scrollWidth;
  },
  /**
   * 获取文档或者元素的总高度
   * @param {Object} el 支持css选择器字符串 未指定则表示整个页面文档
   */
  getScrollHeight(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollHeight = 0;
    if (this.isElement(el) && el != document.documentElement && el != document.body) {
      scrollHeight = el.scrollHeight;
    } else {
      if (document.documentElement.scrollHeight == 0 || document.body.scrollHeight == 0) {
        scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      } else {
        scrollHeight = document.documentElement.scrollHeight > document.body.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
      }
    }
    return scrollHeight;
  },
  /**
   * 设置滚动条在Y轴上的距离
   * @param {Object} options {el,number,time} el支持css选择器字符串 未指定则为窗口滚动
   */
  setScrollTop(options) {
    let isWindow = false;
    let el = options.el;
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let number$12 = options.number || 0;
    let time = options.time || 0;
    if (!this.isElement(el) || el == document.body || el == document.documentElement || el == window) {
      isWindow = true;
    }
    return new Promise((resolve, reject) => {
      if (time <= 0) {
        if (isWindow) {
          document.documentElement.scrollTop = document.body.scrollTop = number$12;
        } else {
          el.scrollTop = number$12;
        }
        resolve();
      } else {
        let spacingTime = 10;
        let spacingIndex = number.divide(time, spacingTime);
        let nowTop = this.getScrollTop(el);
        let everTop = number.divide(number.subtract(number$12, nowTop), spacingIndex);
        let scrollTimer = setInterval(() => {
          if (spacingIndex > 0) {
            spacingIndex--;
            if (isWindow) {
              document.documentElement.scrollTop = document.body.scrollTop = nowTop = number.add(nowTop, everTop);
            } else {
              el.scrollTop = nowTop = number.add(nowTop, everTop);
            }
          } else {
            clearInterval(scrollTimer);
            resolve();
          }
        }, spacingTime);
      }
    });
  },
  /**
   * 获取滚动条在Y轴上滚动的距离
   * @param {Object} el 支持css选择器字符串 未指定则为窗口滚动
   */
  getScrollTop(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollTop = 0;
    if (this.isElement(el) && el != document.body && el != document.documentElement && el != window) {
      scrollTop = el.scrollTop;
    } else {
      if (document.documentElement.scrollTop == 0 || document.body.scrollTop == 0) {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      } else {
        scrollTop = document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
      }
    }
    return scrollTop;
  },
  /**
   * 获取滚动条在X轴上滚动的距离
   * @param {Object} el 支持css选择器字符串 未指定则为窗口滚动
   */
  getScrollLeft(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollLeft = 0;
    if (this.isElement(el) && el != document.body && el != document.documentElement && el != window) {
      scrollLeft = el.scrollLeft;
    } else {
      if (document.documentElement.scrollLeft == 0 || document.body.scrollLeft == 0) {
        scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      } else {
        scrollLeft = document.documentElement.scrollLeft > document.body.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
      }
    }
    return scrollLeft;
  },
  /**
   * 设置滚动条在X轴上的距离
   * @param {Object} options {el,number,time} el支持css选择器字符串 未指定则为窗口滚动
   */
  setScrollLeft(options) {
    let isWindow = false;
    let el = options.el;
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let number$12 = options.number || 0;
    let time = options.time || 0;
    if (!this.isElement(el) || el == document.body || el == document.documentElement || el == window) {
      isWindow = true;
    }
    return new Promise((resolve, reject) => {
      if (time <= 0) {
        if (isWindow) {
          document.documentElement.scrollLeft = document.body.scrollLeft = number$12;
        } else {
          el.scrollLeft = number$12;
        }
        resolve();
      } else {
        let spacingTime = 10;
        let spacingIndex = number.divide(time, spacingTime);
        let nowLeft = this.getScrollLeft(el);
        let everLeft = number.divide(number.subtract(number$12, nowLeft), spacingIndex);
        let scrollTimer = setInterval(() => {
          if (spacingIndex > 0) {
            spacingIndex--;
            if (isWindow) {
              document.documentElement.scrollLeft = document.body.scrollLeft = nowLeft = number.add(nowLeft, everLeft);
            } else {
              el.scrollLeft = nowLeft = number.add(nowLeft, everLeft);
            }
          } else {
            clearInterval(scrollTimer);
            resolve();
          }
        }, spacingTime);
      }
    });
  },
  /**
   * 获取元素指定样式
   * @param {Object} el 元素
   * @param {Object} cssName 样式名称
   */
  getCssStyle(el, cssName) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!cssName || typeof cssName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let cssText = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
      cssText = document.defaultView.getComputedStyle(el)[cssName];
    } else {
      cssText = el.currentStyle[cssName];
    }
    return cssText;
  },
  /**
   * 判断字符串属于哪种选择器
   * @param {Object} selector
   */
  getCssSelector(selector) {
    if (!selector || typeof selector != "string") {
      throw new TypeError("The argument must be a selector string");
    }
    if (/^#{1}/.test(selector)) {
      return {
        type: "id",
        value: selector.substr(1)
      };
    }
    if (/^\./.test(selector)) {
      return {
        type: "class",
        value: selector.substr(1)
      };
    }
    if (/^\[(.+)\]$/.test(selector)) {
      let type = "attribute";
      let value = "";
      let attribute = string.trim(selector, true).substring(1, string.trim(selector, true).length - 1);
      let arry = attribute.split("=");
      if (arry.length == 1) {
        value = arry[0];
      }
      if (arry.length == 2) {
        value = {
          attributeName: arry[0],
          attributeValue: arry[1].replace(/\'/g, "").replace(/\"/g, "")
          //去除属性值的单引号或者双引号
        };
      }
      return {
        type,
        value
      };
    }
    return {
      type: "tag",
      value: selector
    };
  },
  /**
   * 获取元素距离可视窗口的位置
   * @param {Object} el 支持css选择器字符串 未指定则为document.body
   */
  getElementBounding(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let point = el.getBoundingClientRect();
    let top = point.top;
    let bottom = number.subtract(document.documentElement.clientHeight || window.innerHeight, point.bottom);
    let left = point.left;
    let right = number.subtract(document.documentElement.clientWidth || window.innerWidth, point.right);
    return {
      top,
      bottom,
      left,
      right
    };
  },
  /**
   * 判断是否是元素节点
   * @param {Object} el
   */
  isElement(el) {
    return el && el instanceof Node && el.nodeType === 1;
  },
  /**
   * 字符串转dom
   * @param {Object} str
   */
  string2dom(str, parentTag = "div") {
    if (!str || typeof str != "string") {
      throw new TypeError("The argument must be an HTML string");
    }
    let parentEle = document.createElement(parentTag);
    parentEle.innerHTML = str;
    if (parentEle.children.length == 1) {
      return parentEle.children[0];
    } else {
      return parentEle.children;
    }
  }
};
const dataName = "_dap-datas";
const data = {
  /**
   * 移除指定数据
   * @param {Object} el
   * @param {Object} key
   */
  remove(el, key) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let data2 = el[dataName] || {};
    if (key === void 0 || key === null || key === "") {
      el[dataName] = {};
    } else {
      delete data2[key];
      el[dataName] = data2;
    }
  },
  /**
   * 判断是否含有指定数据
   * @param {Object} el
   * @param {Object} key
   */
  has(el, key) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (key === void 0 || key === null || key === "") {
      throw new TypeError("The second parameter must be a unique key");
    }
    let data2 = el[dataName] || {};
    return data2.hasOwnProperty(key);
  },
  /**
   * 获取元素指定数据
   * @param {Object} el
   * @param {Object} key
   */
  get(el, key) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let data2 = el[dataName] || {};
    if (key === void 0 || key === null || key === "") {
      return data2;
    } else {
      return data2[key];
    }
  },
  /**
   * 获取元素指定数据
   * @param {Object} el
   * @param {Object} key
   * @param {Object} value
   */
  set(el, key, value) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (key === void 0 || key === null || key === "") {
      throw new TypeError("The second parameter must be a unique key");
    }
    let data2 = el[dataName] || {};
    data2[key] = value;
    el[dataName] = data2;
  }
};
const common = {
  /**
   * 常用判断
   * @param {Object} text 要判断的字符串
   * @param {Object} params 判断的类型字符串
   */
  matchingText(text, params) {
    if (!text || typeof text != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!params || typeof params != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let reg = null;
    if (params == "Chinese") {
      reg = /^[\u4e00-\u9fa5]+$/;
    }
    if (params == "chinese") {
      reg = /[\u4e00-\u9fa5]/;
    }
    if (params == "email") {
      reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    }
    if (params == "username") {
      reg = /^[a-zA-Z0-9_]{4,16}$/;
    }
    if (params == "int+") {
      reg = /^\d+$/;
    }
    if (params == "int-") {
      reg = /^-\d+$/;
    }
    if (params == "int") {
      reg = /^-?\d+$/;
    }
    if (params == "pos") {
      reg = /^\d*\.?\d+$/;
    }
    if (params == "neg") {
      reg = /^-\d*\.?\d+$/;
    }
    if (params == "number") {
      reg = /^-?\d*\.?\d+$/;
    }
    if (params == "phone") {
      reg = /^1[0-9]\d{9}$/;
    }
    if (params == "idCard") {
      reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    }
    if (params == "url") {
      reg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    }
    if (params == "IPv4") {
      reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    }
    if (params == "hex") {
      reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    }
    if (params == "QQ") {
      reg = /^[1-9][0-9]{4,10}$/;
    }
    if (params == "weixin") {
      reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    }
    if (params == "plate") {
      reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    }
    if (!reg) {
      throw new Error("The second parameter is out of scope");
    }
    return reg.test(text);
  },
  /**
   * 根据参数名获取地址栏参数值
   * @param {Object} name
   */
  getUrlParams(name) {
    if (!name || typeof name != "string") {
      throw new TypeError("The argument must be a string");
    }
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let search = window.location.search.substr(1);
    if (!search) {
      let arr = window.location.hash.split("?");
      if (arr.length == 2) {
        search = arr[1];
      }
    }
    let r = search.match(reg);
    if (r) {
      return decodeURIComponent(r[2]);
    }
    return null;
  },
  /**
   * 判断是否空对象
   * @param {Object} obj
   */
  isEmptyObject(obj2) {
    if (this.isObject(obj2)) {
      if (Object.keys(obj2).length == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  /**
   * 判断两个参数是否相等
   * @param {Object} a
   * @param {Object} b
   */
  equal(a, b) {
    if (typeof a !== typeof b) {
      return false;
    }
    if (this.isObject(a) && this.isObject(b)) {
      a = Object.assign({}, a);
      b = Object.assign({}, b);
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      let length = aProps.length;
      for (let i = 0; i < length; i++) {
        let propName = aProps[i];
        let propA = a[propName];
        let propB = b[propName];
        if (this.isObject(propA)) {
          if (this.equal(propA, propB)) {
            return true;
          } else {
            return false;
          }
        } else if (propA !== propB) {
          return false;
        }
      }
      return true;
    } else {
      return a === b;
    }
  },
  /**
   * 是否对象
   * @param {Object} val
   */
  isObject(val) {
    if (typeof val === "object" && val) {
      return true;
    }
    return false;
  },
  /**
   * 文本复制
   * @param {Object} text
   */
  copyText(text) {
    if (!text || typeof text != "string") {
      throw new TypeError("No text to copy is defined");
    }
    if (!navigator.clipboard) {
      throw new Error("navigator.clipboard must be obtained in a secure environment, such as localhost, 127.0.0.1, or https, so the editor's copy, paste, and cut functions cannot be used");
    }
    return navigator.clipboard.writeText(text);
  }
};
const parseEventName = (eventName) => {
  let eventNames = eventName.split(/[\s]+/g);
  let result = [];
  eventNames.forEach((name) => {
    let arr = name.split(".");
    let obj2 = {
      eventName: arr[0]
    };
    if (arr.length > 1) {
      obj2.guid = arr[1];
    }
    result.push(obj2);
  });
  return result;
};
const updateEvents = (events) => {
  let obj2 = {};
  let keys = Object.keys(events);
  keys.forEach((key) => {
    if (events[key]) {
      obj2[key] = events[key];
    }
  });
  return obj2;
};
const bindSingleListener = (el, eventName, guid, fn, options) => {
  let events = data.get(el, "dap-defined-events") || {};
  if (!guid) {
    guid = data.get(el, "dap-event-guid") || 0;
    data.set(el, "dap-event-guid", guid + 1);
  }
  guid = eventName + "." + guid;
  if (events[guid] && events[guid].type == eventName) {
    el.removeEventListener(eventName, events[guid].fn, events[guid].options);
  }
  el.addEventListener(eventName, fn, options);
  events[guid] = {
    type: eventName,
    fn,
    options
  };
  data.set(el, "dap-defined-events", events);
};
const unbindSingleListener = (el, eventName, guid) => {
  let events = data.get(el, "dap-defined-events") || {};
  let keys = Object.keys(events);
  let length = keys.length;
  for (let i = 0; i < length; i++) {
    let key = keys[i];
    if (events[key].type == eventName) {
      if (guid) {
        if (key == eventName + "." + guid) {
          el.removeEventListener(events[key].type, events[key].fn, events[key].options);
          events[key] = void 0;
        }
      } else {
        el.removeEventListener(events[key].type, events[key].fn, events[key].options);
        events[key] = void 0;
      }
    }
  }
  events = updateEvents(events);
  data.set(el, "dap-defined-events", events);
};
const event = {
  /**
   * 绑定事件
   * @param {Object} el 元素节点
   * @param {Object} eventName 事件名称
   * @param {Object} fn 函数
   * @param {Object} options 参数
   */
  on(el, eventName, fn, options) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (!eventName || typeof eventName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!fn || typeof fn != "function") {
      throw new TypeError("The third argument must be a function");
    }
    if (!common.isObject(options)) {
      options = {};
    }
    const result = parseEventName(eventName);
    result.forEach((res) => {
      bindSingleListener(el, res.eventName, res.guid, fn.bind(el), options);
    });
  },
  /**
   * 事件解绑
   * @param {Object} el 元素节点
   * @param {Object} eventName 事件名称
   */
  off(el, eventName) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let events = data.get(el, "dap-defined-events");
    if (!events) {
      return;
    }
    if (!eventName) {
      let keys = Object.keys(events);
      let length = keys.length;
      for (let i = 0; i < length; i++) {
        let key = keys[i];
        el.removeEventListener(events[key].type, events[key].fn, events[key].options);
      }
      data.remove(el, "dap-defined-events");
      data.remove(el, "dap-event-guid");
      return;
    }
    const result = parseEventName(eventName);
    result.forEach((res) => {
      unbindSingleListener(el, res.eventName, res.guid);
    });
  },
  /**
   * 获取绑定的所有事件
   * @param {*} el
   */
  get(el) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let events = data.get(el, "dap-defined-events");
    if (!events) {
      return;
    }
    return events;
  }
};
const color = {
  /**
   * rgb转hsv值
   * @param {Object} rgb rgb值，数组
   */
  rgb2hsv(rgb) {
    if (!Array.isArray(rgb) || rgb.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let h = 0;
    let s = 0;
    let v = 0;
    let r = rgb[0] >= 255 ? 255 : rgb[0];
    let g = rgb[1] >= 255 ? 255 : rgb[1];
    let b = rgb[2] >= 255 ? 255 : rgb[2];
    r = r <= 0 ? 0 : r;
    g = g <= 0 ? 0 : g;
    b = b <= 0 ? 0 : b;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    v = max / 255;
    if (max === 0) {
      s = 0;
    } else {
      s = 1 - min / max;
    }
    if (max === min) {
      h = 0;
    } else if (max === r && g >= b) {
      h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
      h = 60 * ((g - b) / (max - min)) + 360;
    } else if (max === g) {
      h = 60 * ((b - r) / (max - min)) + 120;
    } else if (max === b) {
      h = 60 * ((r - g) / (max - min)) + 240;
    }
    return [h, s * 100, v * 100];
  },
  /**
   * hsv格式值转rgb值
   * @param {Object} hsv hsv值，数组
   */
  hsv2rgb(hsv) {
    if (!Array.isArray(hsv) || hsv.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let h = hsv[0] >= 360 || hsv[0] <= 0 ? 0 : hsv[0];
    let s = hsv[1] >= 100 ? 100 : hsv[1];
    s = s <= 0 ? 0 : s;
    let v = hsv[2] >= 100 ? 100 : hsv[2];
    v = v <= 0 ? 0 : v;
    s = s / 100;
    v = v / 100;
    let r = 0;
    let g = 0;
    let b = 0;
    let i = parseInt(h / 60 % 6);
    let f = h / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    r = parseInt(r * 255);
    g = parseInt(g * 255);
    b = parseInt(b * 255);
    return [r, g, b];
  },
  /**
   * rgb值转十六进制
   * @param {Array} rgb rgb值，数组
   */
  rgb2hex(rgb) {
    if (!Array.isArray(rgb) || rgb.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
  },
  /**
   * 十六进制颜色转rgb
   * @param {String} hex 十六进制颜色值
   */
  hex2rgb(hex) {
    if (!hex || typeof hex != "string") {
      throw new TypeError("The argument must be a string");
    }
    let color2 = hex.toLowerCase();
    if (!common.matchingText(color2, "hex")) {
      throw new TypeError("The argument must be a hexadecimal color value");
    }
    if (color2.length === 4) {
      let colorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        colorNew += color2.slice(i, i + 1).concat(color2.slice(i, i + 1));
      }
      color2 = colorNew;
    }
    let colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color2.slice(i, i + 2)));
    }
    return colorChange;
  }
};
const file = {
  /**
   * 根据文件获取可预览的图片路径
   * @param {Object} file
   */
  getImageUrl(file2) {
    if (!file2 || !(file2 instanceof File)) {
      throw new TypeError("The argument must be a File object");
    }
    return window.URL.createObjectURL(file2);
  },
  /**
   * 将JS的file对象转为BASE64位字符串，通过then方法回调,参数为base64字符串
   * @param {Object} file
   */
  dataFileToBase64(file2) {
    return new Promise((resolve, reject) => {
      if (!file2 || !(file2 instanceof File)) {
        reject(new TypeError("The argument must be a File object"));
      }
      let reader = new FileReader();
      reader.readAsDataURL(file2);
      reader.onloadend = () => {
        let dataURL = reader.result;
        resolve(dataURL);
      };
    });
  },
  /**
   * 将base64位格式文件转换为file对象
   * @param {Object} base64String base64位格式字符串
   * @param {Object} fileName 转换后的文件名字，包含后缀
   */
  dataBase64toFile(base64String, fileName) {
    if (!base64String || typeof base64String != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!fileName || typeof fileName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let arr = base64String.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {
      type: mime
    });
  }
};
const platform = {
  //设备语言类型
  language() {
    return window.navigator.browserLanguage || window.navigator.language;
  },
  /**
   * 获取设备类型
   */
  device() {
    const userAgent = window.navigator.userAgent;
    return {
      PC: !userAgent.match(/AppleWebKit.*Mobile.*/),
      //是否移动终端
      Mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/),
      //是否iPhone
      iPhone: userAgent.includes("iPhone"),
      //是否手机
      Phone: userAgent.includes("Android") && /(?:Mobile)/.test(userAgent) || userAgent.includes("iPhone") || /(?:Windows Phone)/.test(userAgent),
      //是否iPad
      iPad: userAgent.includes("iPad"),
      //是否平板电脑
      Tablet: userAgent.includes("iPad") || userAgent.includes("Android") && !/(?:Mobile)/.test(userAgent) || userAgent.includes("Firefox") && /(?:Tablet)/.test(userAgent),
      //windows手机
      WindowsPhone: /(?:Windows Phone)/.test(userAgent)
    };
  },
  /**
   * 获取浏览器类型
   */
  browser() {
    const userAgent = window.navigator.userAgent;
    return {
      //是否edge浏览器
      Edge: !!userAgent.match(/Edg\/([\d.]+)/),
      //是否微信内置浏览器
      weixin: userAgent.includes("MicroMessenger"),
      //是否QQ内置浏览器
      QQ: userAgent.includes("QQ"),
      //是否QQ浏览器
      QQBrowser: userAgent.includes("MQQBrowser"),
      //是否UC浏览器
      UC: userAgent.includes("UCBrowser"),
      //是否谷歌浏览器
      Chrome: userAgent.includes("Chrome"),
      //是否火狐浏览器
      Firefox: userAgent.includes("Firefox"),
      //是否搜狗浏览器
      sougou: userAgent.toLocaleLowerCase().includes("se 2.x") || userAgent.toLocaleLowerCase().includes("metasr") || userAgent.toLocaleLowerCase().includes("sogou"),
      //是否safari浏览器
      Safari: userAgent.includes("Safari") && !userAgent.includes("Chrome")
    };
  },
  /**
   * 获取浏览器内核
   */
  browserKernel() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Presto")) {
      return "opera";
    } else if (userAgent.includes("AppleWebKit")) {
      return "webkit";
    } else if (userAgent.includes("Gecko") && !userAgent.includes("KHTML")) {
      return "gecko";
    }
    return "";
  },
  /**
   * 获取操作系统数据
   */
  os() {
    const userAgent = window.navigator.userAgent;
    return {
      //是否Windows系统
      Windows: userAgent.includes("Windows"),
      //x64/x32
      Windows_CPU: function() {
        if (userAgent.toLocaleLowerCase().includes("win64") || userAgent.toLocaleLowerCase().includes("wow64")) {
          return "x64";
        } else if (userAgent.toLocaleLowerCase().includes("win32") || userAgent.toLocaleLowerCase().includes("wow32")) {
          return "x32";
        }
        return "";
      }(),
      //Windows版本
      Windows_Version: function() {
        if (userAgent.includes("Windows NT 6.1") || userAgent.includes("Windows 7")) {
          return "Win7";
        } else if (userAgent.includes("Windows NT 6.3") || userAgent.includes("Windows NT 6.2") || userAgent.includes("Windows NT 8")) {
          return "Win8";
        } else if (userAgent.includes("Windows NT 10") || userAgent.includes("Windows NT 6.4")) {
          return "Win10";
        }
        return "";
      }(),
      //是否Mac
      Mac: userAgent.includes("Macintosh"),
      //Mac版本
      Mac_Version: function() {
        if (userAgent.includes("Macintosh")) {
          const matches = userAgent.match(/Mac OS X ([^\s]+)\)/);
          if (matches && matches[1]) {
            return matches[1].split(/_|\./).join(".");
          }
        }
        return "";
      }(),
      //是否ios系统
      ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      //ios系统版本
      ios_Version: function() {
        if (!!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          const matches = userAgent.match(/CPU.+OS ([^\s]+) like Mac OS X/);
          if (matches && matches[1]) {
            return matches[1].split(/_|\./).join(".");
          }
        }
        return "";
      }(),
      //是否Android系统
      Android: userAgent.includes("Android"),
      //Android系统版本
      Android_Version: function() {
        const matches = userAgent.match(/Android ([^\s]+);/);
        if (matches && matches[1]) {
          return matches[1].split(/_|\./).join(".");
        }
        return "";
      }(),
      //是否Linux系统
      Linux: userAgent.includes("Linux"),
      //是否鸿蒙系统
      HarmonyOS: userAgent.includes("HarmonyOS"),
      //是否Ubuntu系统
      Ubuntu: userAgent.includes("Ubuntu")
    };
  }
};
const speech = {
  /**
   * 将文字加入语音播报队列
   * @param {Object} text
   */
  start(text, params) {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    let defaultParams = {
      //话语的音调(0-2，值越大越尖锐,越低越低沉)
      pitch: 0.8,
      //说话的速度(0-10，值越大语速越快,越小语速越慢)
      rate: 1,
      //说话的音量：0-1
      volume: 1,
      //播放开始事件
      start: function() {
      },
      //播放结束事件
      end: function() {
      },
      //播放暂停事件
      pause: function() {
      },
      //播放恢复事件
      resume: function() {
      },
      //播放出错事件
      error: function() {
      }
    };
    if (!common.isObject(params)) {
      params = {};
    }
    if (number.isNumber(params.pitch)) {
      defaultParams.pitch = params.pitch;
    }
    if (number.isNumber(params.rate)) {
      defaultParams.rate = params.rate;
    }
    if (number.isNumber(params.volume)) {
      defaultParams.volume = params.volume;
    }
    if (typeof params.start == "function") {
      defaultParams.start = params.start;
    }
    if (typeof params.end == "function") {
      defaultParams.end = params.end;
    }
    if (typeof params.pause == "function") {
      defaultParams.pause = params.pause;
    }
    if (typeof params.resume == "function") {
      defaultParams.resume = params.resume;
    }
    if (typeof params.error == "function") {
      defaultParams.error = params.error;
    }
    const speech2 = new SpeechSynthesisUtterance();
    speech2.text = text;
    speech2.pitch = defaultParams.pitch;
    speech2.rate = defaultParams.rate;
    speech2.volume = defaultParams.volume;
    speech2.lang = "zh-CN";
    speech2.onstart = (event2) => {
      defaultParams.start.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onend = (event2) => {
      defaultParams.end.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onpause = (event2) => {
      defaultParams.pause.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onresume = (event2) => {
      defaultParams.resume.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onerror = (event2) => {
      defaultParams.error.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    window.speechSynthesis.speak(speech2);
  },
  /**
   * 停止播报，停止所有播报队列里面的语音
   */
  stop() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.cancel();
  },
  /**
   * 暂停播报
   */
  pause() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.pause();
  },
  /**
   * 恢复暂停的播报
   */
  resume() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.resume();
  }
};
const obj = { number, data, element, event, common, color, file, string, platform, speech };
const props = {
  //编辑器内容
  modelValue: {
    type: String,
    default: "<p><br></p>"
  },
  //占位符
  placeholder: {
    type: String,
    default: ""
  },
  //是否自动获取焦点
  autofocus: {
    type: Boolean,
    default: false
  },
  //是否禁用编辑器
  disabled: {
    type: Boolean,
    default: false
  },
  //是否允许复制
  allowCopy: {
    type: Boolean,
    default: true
  },
  //是否允许粘贴
  allowPaste: {
    type: Boolean,
    default: true
  },
  //是否允许剪切
  allowCut: {
    type: Boolean,
    default: true
  },
  //是否允许粘贴html
  allowPasteHtml: {
    type: Boolean,
    default: false
  },
  //编辑内容高度
  height: {
    type: String,
    default: "600px"
  },
  //是否自适应高度
  autoheight: {
    type: Boolean,
    default: false
  },
  //是否显示边框
  border: {
    type: Boolean,
    default: false
  },
  //主题色
  color: {
    type: String,
    default: "#25caae"
  }
};
const isList = (element2, ordered = false) => {
  return element2.type == "block" && element2.parsedom == "div" && element2.hasMarks() && element2.marks["data-editify-list"] == (ordered ? "ol" : "ul");
};
const blockToParagraph = (element2) => {
  if (isList(element2, true) || isList(element2, false)) {
    let marks = {};
    for (let key in element2.marks) {
      if (key != "data-editify-list" && key != "data-editify-value") {
        marks[key] = element2.marks[key];
      }
    }
    element2.marks = marks;
  }
  element2.parsedom = AlexElement.BLOCK_NODE;
};
const parseList = function(element2) {
  if (element2.parsedom == "ol" || element2.parsedom == "ul") {
    if (element2.hasChildren()) {
      element2.children.forEach((el, index) => {
        const newEl = el.clone();
        newEl.parsedom = "div";
        newEl.type = "block";
        if (!newEl.hasMarks()) {
          newEl.marks = {};
        }
        newEl.marks["data-editify-list"] = element2.parsedom;
        if (element2.parsedom == "ol") {
          newEl.marks["data-editify-value"] = index + 1;
        }
        this.addElementAfter(newEl, element2);
      });
    }
    element2.toEmpty();
  }
  if (element2.type == "block" && element2.hasMarks() && element2.marks["data-editify-list"] == "ol") {
    const previousElement = this.getPreviousElement(element2);
    if (previousElement && previousElement.hasMarks() && previousElement.marks["data-editify-list"] == "ol") {
      const previousValue = Number(previousElement.marks["data-editify-value"]);
      element2.marks["data-editify-value"] = previousValue + 1;
    } else {
      element2.marks["data-editify-value"] = 1;
    }
  }
};
const Editify_vue_vue_type_style_index_0_scoped_d7e08d52_lang = "";
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  name: "editify",
  props: { ...props },
  emits: ["update:modelValue", "focus", "blur", "change", "keydown", "insertparagraph", "rangeupdate", "copy", "cut", "paste-text", "paste-html", "paste-image", "paste-video", "before-render", "after-render"],
  data() {
    return {
      //编辑器对象
      editor: null,
      //是否编辑器内部修改值
      isModelChange: false,
      //是否代码视图
      isSourceView: false,
      //是否正在输入中文
      isInputChinese: false,
      //记录的内部属性
      innerMarks: ["data-editify-list", "data-editify-value", "data-editify-code-style", "src", "autoplay", "loop", "muted", "href", "target", "alt", "controls", "name", "disabled"],
      //记录的内部样式
      innerStyles: ["text-indent", "text-align"]
    };
  },
  computed: {
    //编辑器的值
    value: {
      set(val) {
        this.$emit("update:modelValue", val);
      },
      get() {
        return this.modelValue || "<p><br></p>";
      }
    },
    //是否显示占位符
    showPlaceholder() {
      console.log(this.value, this.value == "<p><br></p>");
      return this.value == "<p><br></p>" && !this.isInputChinese;
    },
    //编辑器样式设置
    wrapStyle() {
      return this.autoheight ? { minHeight: this.height } : { height: this.height };
    }
  },
  inject: ["$editTrans"],
  watch: {
    //监听编辑的值变更
    value(newVal) {
      if (this.isSourceView) {
        return;
      }
      if (this.isModelChange) {
        return;
      }
      this.editor.stack = this.editor.parseHtml(newVal);
      this.editor.formatElementStack();
      this.editor.range.anchor.moveToStart(this.editor.stack[0]);
      this.editor.range.focus.moveToStart(this.editor.stack[0]);
      this.editor.domRender();
    }
  },
  mounted() {
    this.createEditor();
  },
  methods: {
    //编辑器内部修改值的方法
    internalModify(val) {
      this.isModelChange = true;
      this.value = val;
      this.$nextTick(() => {
        this.isModelChange = false;
      });
    },
    //初始创建编辑器
    createEditor() {
      this.editor = new AlexEditor(this.$refs.wrap, {
        value: this.value,
        disabled: this.disabled,
        renderRules: [parseList],
        allowCopy: this.allowCopy,
        allowPaste: this.allowPaste,
        allowCut: this.allowCut,
        allowPasteHtml: this.allowPasteHtml,
        allowPasteHtml: this.allowPasteHtml
      });
      this.internalModify(this.editor.value);
      this.editor.on("change", this.handleEditorChange);
      this.editor.on("focus", this.handleEditorFocus);
      this.editor.on("blur", this.handleEditorBlur);
      this.editor.on("insertParagraph", this.handleInsertParagraph);
      this.editor.on("rangeUpdate", this.handleRangeUpdate);
      this.editor.on("copy", this.handleCopy);
      this.editor.on("cut", this.handleCut);
      this.editor.on("pasteText", this.handlePasteText);
      this.editor.on("pasteHtml", this.handlePasteHtml);
      this.editor.on("pasteImage", this.handlePasteImage);
      this.editor.on("pasteVideo", this.handlePasteVideo);
      this.editor.on("deleteInStart", this.handleDelete);
      this.editor.on("beforeRender", this.handleBeforeRender);
      this.editor.on("afterRender", this.handleAfterRender);
      this.editor.formatElementStack();
      this.editor.domRender();
      if (this.autofocus && !this.isSourceView && !this.disabled) {
        this.collapseToEnd();
      }
    },
    //编辑器的值更新
    handleEditorChange(newVal, oldVal) {
      if (this.disabled) {
        return;
      }
      this.internalModify(newVal);
      this.$emit("change", newVal, oldVal);
    },
    //编辑器失去焦点
    handleEditorBlur(val) {
      if (this.disabled) {
        return;
      }
      if (this.border && this.color && this.$refs.wrap) {
        this.$refs.wrap.style.borderColor = "";
        this.$refs.wrap.style.boxShadow = "";
      }
      this.$emit("blur", val);
    },
    //编辑器获取焦点
    handleEditorFocus(val) {
      if (this.disabled) {
        return;
      }
      if (this.border && this.color && this.$refs.wrap) {
        this.$refs.wrap.style.borderColor = this.color;
        const rgb = obj.color.hex2rgb(this.color);
        this.$refs.wrap.style.boxShadow = `0 0 8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      this.$emit("focus", val);
    },
    //编辑区域键盘按下
    handleEditorKeydown(e) {
      if (this.disabled || this.isSourceView) {
        return;
      }
      if (e.keyCode == 9 && !e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
      } else if (e.keyCode == 9 && !e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
      }
      this.$emit("keydown", e);
    },
    //点击编辑器
    handleEditorClick(e) {
      if (this.disabled || this.isSourceView) {
        return;
      }
      const node = e.target;
      e.preventDefault();
      if (node.nodeName.toLocaleLowerCase() == "img" || node.nodeName.toLocaleLowerCase() == "video") {
        const key = node.getAttribute("mvi-editor-element-key");
        if (key) {
          const element2 = this.editor.getElementByKey(key);
          this.editor.range.anchor.moveToStart(element2);
          this.editor.range.focus.moveToEnd(element2);
          this.editor.rangeRender();
        }
      }
    },
    //编辑器换行
    handleInsertParagraph(element2, previousElement) {
      if (previousElement.isOnlyHasBreak() && element2.isOnlyHasBreak()) {
        if (!previousElement.isBlock()) {
          previousElement.convertToBlock();
        }
        if (previousElement.parsedom != AlexElement.BLOCK_NODE) {
          blockToParagraph(previousElement);
          this.editor.range.anchor.moveToStart(previousElement);
          this.editor.range.focus.moveToStart(previousElement);
          element2.toEmpty();
        }
      }
      this.$emit("insertparagraph", this.value);
    },
    //编辑器焦点更新
    handleRangeUpdate() {
      if (this.disabled) {
        return;
      }
      this.$emit("rangeupdate", this.value);
    },
    //编辑器复制
    handleCopy(text, html) {
      this.$emit("copy", text, html);
    },
    //编辑器剪切
    handleCut(text, html) {
      this.$emit("cut", text, html);
    },
    //编辑器粘贴纯文本
    handlePasteText(data2) {
      if (this.disabled || this.isSourceView) {
        return;
      }
      this.$emit("paste-text", data2);
    },
    //编辑器粘贴html
    handlePasteHtml(data2, elements) {
      AlexElement.flatElements(elements).forEach((el) => {
        if (el.hasMarks()) {
          let marks = {};
          for (let key in el.marks) {
            if (this.innerMarks.includes(key)) {
              marks[key] = el.marks[key];
            }
          }
          el.marks = marks;
        }
        if (el.isBlock() || el.isInblock()) {
          if (el.hasStyles()) {
            let styles = {};
            for (let key in el.styles) {
              if (this.innerStyles.includes(key)) {
                styles[key] = el.styles[key];
              }
            }
            el.styles = styles;
          }
        } else if (el.isInline() || el.isClosed()) {
          el.styles = null;
        }
      });
      this.$emit("paste-html", elements);
    },
    //编辑器粘贴图片
    handlePasteImage(url) {
      this.$emit("paste-image", url);
    },
    //编辑器粘贴视频
    handlePasteVideo(url) {
      this.$emit("paste-video", url);
    },
    //编辑器部分删除情景
    handleDelete(element2) {
      if (element2.isBlock()) {
        blockToParagraph(element2);
      }
    },
    //编辑器dom渲染之前
    handleBeforeRender() {
      this.$emit("before-render");
    },
    //编辑器dom渲染
    handleAfterRender() {
      this.$emit("after-render");
    },
    //api：光标设置到文档底部
    collapseToEnd() {
      if (this.disabled) {
        return;
      }
      this.editor.collapseToEnd();
      this.editor.rangeRender();
      obj.element.setScrollTop({
        el: this.$refs.wrap,
        number: 1e6,
        time: 0
      });
    },
    //api：光标设置到文档头部
    collapseToStart() {
      if (this.disabled) {
        return;
      }
      this.editor.collapseToStart();
      this.editor.rangeRender();
      this.$nextTick(() => {
        obj.element.setScrollTop({
          el: this.$refs.wrap,
          number: 0,
          time: 0
        });
      });
    }
  }
};
const _hoisted_1 = { class: "editify" };
const _hoisted_2 = ["data-editify-placeholder"];
const _hoisted_3 = ["value"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", {
      ref: "wrap",
      class: normalizeClass(["editify-wrap", { border: _ctx.border, placeholder: $options.showPlaceholder }]),
      style: normalizeStyle($options.wrapStyle),
      onKeydown: _cache[0] || (_cache[0] = (...args) => $options.handleEditorKeydown && $options.handleEditorKeydown(...args)),
      onClick: _cache[1] || (_cache[1] = (...args) => $options.handleEditorClick && $options.handleEditorClick(...args)),
      onCompositionstart: _cache[2] || (_cache[2] = ($event) => $data.isInputChinese = true),
      onCompositionend: _cache[3] || (_cache[3] = ($event) => $data.isInputChinese = false),
      "data-editify-placeholder": _ctx.placeholder
    }, null, 46, _hoisted_2),
    $data.isSourceView ? (openBlock(), createElementBlock("textarea", {
      key: 0,
      value: $options.value,
      readonly: "",
      class: "editify-source"
    }, null, 8, _hoisted_3)) : createCommentVNode("", true)
  ]);
}
const Editify = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d7e08d52"]]);
const en_US = {
  hello: "Hello"
};
const zh_CN = {
  hello: "你好"
};
const translations = {
  zh_CN,
  en_US
};
const i18n = (locale) => {
  return (key) => {
    return translations[locale][key];
  };
};
const version = "0.0.1";
const install = (app, props2) => {
  const locale = (props2 ? props2.locale : "zh_CN") || "zh_CN";
  app.provide("$editTrans", i18n(locale));
  app.component(Editify.name, Editify);
};
const stdin_default = {
  install,
  version
};
export {
  stdin_default as default,
  install,
  version
};
