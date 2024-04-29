import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, createElementVNode, getCurrentInstance, ref, onMounted, onBeforeUnmount, createBlock, Transition, withCtx, createCommentVNode, normalizeClass, renderSlot, nextTick, createVNode, toDisplayString, Fragment, renderList, inject, unref, withDirectives, vModelText, createTextVNode, watch, pushScopeId, popScopeId, h, provide } from "vue";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
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
    }
    return false;
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
      return Number(s1.replace(".", "")) / Number(s2.replace(".", "")) * Math.pow(10, t2 - t1);
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
   * @param {Object} str 原始字符串
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
   * 获取元素距离某个定位祖先元素左侧/顶部/底部/右侧的距离
   * @param {Object} el 元素
   * @param {Object} root 定位父元素或者祖先元素，未指定则为document.body
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
   * 判断某个元素是否包含指定元素，包含相等关系和父子关系
   * @param {Object} parentNode 父元素或祖先元素
   * @param {Object} childNode 子元素
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
    return false;
  },
  /**
   * 判断某个元素是否是指定元素的父元素
   * @param {Object} parentNode 父元素
   * @param {Object} childNode 子元素
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
   * 查找某个元素下指定选择器的子元素
   * @param {Object} el 元素
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
   * 查找某个元素下指定选择器的兄弟元素
   * @param {Object} el 元素
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
   * @param {Object} el 元素
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
    classArray.forEach((item) => {
      classList.remove(item);
    });
  },
  /**
   * 添加class
   * @param {Object} el 元素
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
    classArray.forEach((item) => {
      classList.add(item);
    });
  },
  /**
   * 判断指定元素是否含有指定类名
   * @param {Object} el 元素
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
    scrollEle.addEventListener("scroll", () => {
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
    return new Promise((resolve) => {
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
    return new Promise((resolve) => {
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
   * 判断是否是元素
   * @param {Object} el
   */
  isElement(el) {
    return el && el instanceof Node && el.nodeType === 1;
  },
  /**
   * 字符串转dom
   * @param {Object} str
   */
  string2dom(str, parentTag) {
    if (!str || typeof str != "string") {
      throw new TypeError("The argument must be an HTML string");
    }
    let parentEle = document.createElement(parentTag || "div");
    parentEle.innerHTML = str;
    if (parentEle.children.length == 1) {
      return parentEle.children[0];
    } else {
      return Array.from(parentEle.children);
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
   * 设置元素指定数据
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
   * @param {Object} param 判断的类型字符串
   */
  matchingText(text, param) {
    if (!text || typeof text != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!param || typeof param != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let reg = null;
    if (param == "Chinese") {
      reg = /^[\u4e00-\u9fa5]+$/;
    }
    if (param == "chinese") {
      reg = /[\u4e00-\u9fa5]/;
    }
    if (param == "email") {
      reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    }
    if (param == "username") {
      reg = /^[a-zA-Z0-9_]{4,16}$/;
    }
    if (param == "int+") {
      reg = /^\d+$/;
    }
    if (param == "int-") {
      reg = /^-\d+$/;
    }
    if (param == "int") {
      reg = /^-?\d+$/;
    }
    if (param == "pos") {
      reg = /^\d*\.?\d+$/;
    }
    if (param == "neg") {
      reg = /^-\d*\.?\d+$/;
    }
    if (param == "number") {
      reg = /^-?\d*\.?\d+$/;
    }
    if (param == "phone") {
      reg = /^1[0-9]\d{9}$/;
    }
    if (param == "idCard") {
      reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    }
    if (param == "url") {
      reg = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/;
    }
    if (param == "IPv4") {
      reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    }
    if (param == "hex") {
      reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    }
    if (param == "rgb") {
      reg = /^rgb\((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\)$/;
    }
    if (param == "rgba") {
      reg = /^rgba\((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(0?\.\d|1(\.0)?|0)\)$/;
    }
    if (param == "QQ") {
      reg = /^[1-9][0-9]{4,10}$/;
    }
    if (param == "weixin") {
      reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    }
    if (param == "plate") {
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
    let r2 = search.match(reg);
    if (r2) {
      return decodeURIComponent(r2[2]);
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
      }
      return false;
    }
    return false;
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
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      let length = aProps.length;
      let isEqual = true;
      for (let i = 0; i < length; i++) {
        let propName = aProps[i];
        let propA = a[propName];
        let propB = b[propName];
        if (!this.equal(propA, propB)) {
          isEqual = false;
          break;
        }
      }
      return isEqual;
    }
    return a === b;
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
      throw new Error("navigator.clipboard must be obtained in a secure environment, such as localhost, 127.0.0.1, or https, so the method won't work");
    }
    return navigator.clipboard.writeText(text);
  },
  /**
   * 深度克隆
   * @param {Object} data
   */
  clone(data2) {
    if (this.isObject(data2)) {
      if (Array.isArray(data2)) {
        return data2.map((item) => {
          return this.clone(item);
        });
      }
      let newData = {};
      for (let key in data2) {
        newData[key] = this.clone(data2[key]);
      }
      return newData;
    }
    return data2;
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
  },
  /**
   * 图片压缩方法
   * @param {*} file 需要压缩的图片File文件
   * @param {*} opts 压缩参数
   */
  compressImage(file2, opts) {
    const options = {
      //压缩图片的宽，单位px，如果不设置默认为原图宽
      width: void 0,
      //压缩图片质量，默认为原图的0.8
      quality: 0.8,
      //图片类型，jpeg或者webp，默认为jpeg
      mimeType: "jpeg",
      //压缩后的最大值，单位kb，默认为0表示不设置此值
      maxSize: 0,
      //小于该大小的图片不进行压缩，单位kb，默认为0表示任何图片都要压缩
      minSize: 0
    };
    if (common$1.isObject(opts)) {
      if (number$1.isNumber(opts.width)) {
        options.width = opts.width;
      }
      if (number$1.isNumber(opts.quality) && opts.quality >= 0 && opts.quality <= 1) {
        options.quality = opts.quality;
      }
      if (opts.mimeType == "jpeg" || opts.mimeType == "webp") {
        options.mimeType = opts.mimeType;
      }
      if (number$1.isNumber(opts.maxSize)) {
        options.maxSize = opts.maxSize;
      }
      if (number$1.isNumber(opts.minSize)) {
        options.minSize = opts.minSize;
      }
    }
    const createFile = (canvas, fileName, quality) => {
      let url = canvas.toDataURL("image/" + options.mimeType, quality);
      let file22 = this.dataBase64toFile(url, fileName);
      if (options.maxSize > 0 && file22.size > options.maxSize * 1024) {
        quality = quality <= 0 ? 0 : Number((quality - 0.01).toFixed(2));
        const res = createFile(canvas, fileName, quality);
        url = res.url;
        file22 = res.file;
        quality = res.quality;
      }
      return {
        file: file22,
        url,
        quality
      };
    };
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file2);
      reader.onload = () => {
        let url = reader.result;
        let img = new Image();
        img.src = url;
        img.onload = () => {
          if (options.minSize > 0 && file2.size <= options.minSize * 1024) {
            resolve({
              file: file2,
              url,
              quality: 1,
              width: img.width,
              height: img.height
            });
            return;
          }
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          canvas.width = options.width || img.width;
          canvas.height = options.width ? options.width / (img.width / img.height) : img.height;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          let index = file2.name.lastIndexOf(".");
          const fileName = file2.name.substring(0, index) + "." + options.mimeType;
          let res = createFile(canvas, fileName, options.quality);
          resolve({
            ...res,
            width: canvas.width,
            height: canvas.height
          });
        };
        img.onerror = () => {
          reject(new Error("Failed to load image file"));
        };
      };
      reader.onerror = () => {
        reject(new Error("Failed to load image file"));
      };
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
        }
        if (userAgent.includes("Windows NT 6.3") || userAgent.includes("Windows NT 6.2") || userAgent.includes("Windows NT 8")) {
          return "Win8";
        }
        if (userAgent.includes("Windows NT 10") || userAgent.includes("Windows NT 6.4")) {
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
const getAttributes = function(node) {
  let o = {};
  const length = node.attributes.length;
  for (let i = 0; i < length; i++) {
    const attribute = node.attributes[i];
    if (!/(^on)|(^style$)|(^face$)/g.test(attribute.nodeName)) {
      o[attribute.nodeName] = attribute.nodeValue;
    }
  }
  return o;
};
const getStyles = function(node) {
  let o = {};
  const styles = node.getAttribute("style");
  if (styles) {
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
};
const createUniqueKey = function() {
  let key = data$1.get(window, "data-alex-editor-key") || 0;
  key++;
  data$1.set(window, "data-alex-editor-key", key);
  return key;
};
const createGuid = function() {
  let key = data$1.get(window, "data-alex-editor-guid") || 0;
  key++;
  data$1.set(window, "data-alex-editor-guid", key);
  return key;
};
const isSpaceText = function(val) {
  return /^[\uFEFF]+$/g.test(val);
};
const cloneData$1 = function(data2) {
  if (common$1.isObject(data2) || Array.isArray(data2)) {
    return JSON.parse(JSON.stringify(data2));
  }
  return data2;
};
const isContains = function(parentNode, childNode) {
  if (childNode.nodeType == 3) {
    return element$1.isContains(parentNode, childNode.parentNode);
  }
  return element$1.isContains(parentNode, childNode);
};
const initEditorNode = function(node) {
  if (typeof node == "string" && node) {
    node = document.body.querySelector(node);
  }
  if (!element$1.isElement(node)) {
    throw new Error("You must specify a dom container to initialize the editor");
  }
  if (data$1.get(node, "data-alex-editor-init")) {
    throw new Error("The element node has been initialized to the editor");
  }
  data$1.set(node, "data-alex-editor-init", true);
  return node;
};
const initEditorOptions = function(options) {
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
    customVideoPaste: null,
    customFilePaste: null,
    customMerge: null,
    customParseNode: null
  };
  if (common$1.isObject(options)) {
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
    if (typeof options.customFilePaste == "function") {
      opts.customFilePaste = options.customFilePaste;
    }
    if (typeof options.customMerge == "function") {
      opts.customMerge = options.customMerge;
    }
    if (typeof options.customParseNode == "function") {
      opts.customParseNode = options.customParseNode;
    }
  }
  return opts;
};
const getHighestByFirst = function(point) {
  let temp = point.element;
  while (temp.parent) {
    const isFirst = point.element.isFirst(temp.parent);
    if (!isFirst) {
      break;
    }
    temp = temp.parent;
  }
  return temp;
};
const _AlexElement = class _AlexElement2 {
  constructor(type, parsedom, marks, styles, textContent) {
    __publicField(this, "key", createUniqueKey());
    __publicField(this, "type");
    __publicField(this, "parsedom");
    __publicField(this, "marks");
    __publicField(this, "styles");
    __publicField(this, "textContent");
    __publicField(this, "children", null);
    __publicField(this, "parent", null);
    __publicField(this, "behavior", "default");
    __publicField(this, "elm", null);
    this.type = type;
    this.parsedom = parsedom;
    this.marks = marks;
    this.styles = styles;
    this.textContent = textContent;
  }
  /**
   * 是否根级块元素
   */
  isBlock() {
    return this.type == "block";
  }
  /**
   * 是否内部块元素
   */
  isInblock() {
    return this.type == "inblock";
  }
  /**
   * 是否行内元素
   */
  isInline() {
    return this.type == "inline";
  }
  /**
   * 是否自闭合元素
   */
  isClosed() {
    return this.type == "closed";
  }
  /**
   * 是否文本元素
   */
  isText() {
    return this.type == "text";
  }
  /**
   * 是否换行符
   */
  isBreak() {
    return this.isClosed() && this.parsedom == "br";
  }
  /**
   * 是否空元素
   */
  isEmpty() {
    if (this.isText()) {
      return !this.textContent;
    }
    if (this.isBlock() || this.isInblock() || this.isInline()) {
      if (!this.hasChildren()) {
        return true;
      }
      const allEmpty = this.children.every((el) => {
        return el.isEmpty();
      });
      return allEmpty;
    }
    return false;
  }
  /**
   * 是否零宽度无断空白元素
   */
  isSpaceText() {
    return this.isText() && !this.isEmpty() && isSpaceText(this.textContent);
  }
  /**
   * 获取设置不可编辑的元素，如果是null，说明元素是可编辑的
   */
  getUneditableElement() {
    if (this.hasMarks() && this.marks["contenteditable"] == "false") {
      return this;
    }
    if (this.isBlock()) {
      return null;
    }
    return this.parent.getUneditableElement();
  }
  /**
   * 比较当前元素和另一个元素是否相等
   */
  isEqual(element2) {
    if (!_AlexElement2.isElement(element2)) {
      return false;
    }
    return this.key == element2.key;
  }
  /**
   * 判断当前元素是否包含另一个元素
   */
  isContains(element2) {
    if (this.isEqual(element2)) {
      return true;
    }
    if (element2.isBlock()) {
      return false;
    }
    return this.isContains(element2.parent);
  }
  /**
   * 判断当前元素的子元素数组是否只包含换行符
   */
  isOnlyHasBreak() {
    if (this.hasChildren()) {
      const hasBreak = this.children.some((item) => {
        return item.isBreak();
      });
      const isAll = this.children.every((item) => {
        return item.isBreak() || item.isEmpty();
      });
      return hasBreak && isAll;
    }
    return false;
  }
  /**
   * 判断当前元素是否在拥有代码块样式的块内（包括自身）
   */
  isPreStyle() {
    const block = this.getBlock();
    const inblock = this.getInblock();
    if (inblock) {
      if (inblock.parsedom == "pre") {
        return true;
      }
      if (inblock.hasStyles() && (inblock.styles["white-space"] == "pre" || inblock.styles["white-space"] == "pre-wrap")) {
        return true;
      }
      return inblock.parent.isPreStyle();
    } else {
      if (block.parsedom == "pre") {
        return true;
      }
      if (block.hasStyles() && (block.styles["white-space"] == "pre" || block.styles["white-space"] == "pre-wrap")) {
        return true;
      }
      return false;
    }
  }
  /**
   * 是否含有标记
   */
  hasMarks() {
    if (!this.marks) {
      return false;
    }
    if (common$1.isObject(this.marks)) {
      return !common$1.isEmptyObject(this.marks);
    }
    return false;
  }
  /**
   * 是否含有样式
   */
  hasStyles() {
    if (!this.styles) {
      return false;
    }
    if (common$1.isObject(this.styles)) {
      return !common$1.isEmptyObject(this.styles);
    }
    return false;
  }
  /**
   * 是否有子元素
   */
  hasChildren() {
    if (this.isClosed() || this.isText()) {
      return false;
    }
    if (Array.isArray(this.children)) {
      return !!this.children.length;
    }
    return false;
  }
  /**
   * 判断当前元素与另一个元素是否有包含关系
   */
  hasContains(element2) {
    return this.isContains(element2) || element2.isContains(this);
  }
  /**
   * 克隆当前元素
   * deep为true表示深度克隆，即克隆子元素，否则只会克隆自身
   */
  clone(deep = true) {
    if (typeof deep != "boolean") {
      throw new Error("The parameter must be a Boolean");
    }
    let el = new _AlexElement2(this.type, this.parsedom, cloneData$1(this.marks), cloneData$1(this.styles), this.textContent);
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
  /**
   * 将当前元素转换成根级块元素
   */
  convertToBlock() {
    if (this.isBlock()) {
      return;
    }
    let element2 = this.clone();
    this.type = "block";
    this.parsedom = _AlexElement2.BLOCK_NODE;
    this.marks = null;
    this.styles = null;
    this.textContent = null;
    this.children = [element2];
    element2.parent = this;
  }
  /**
   * 设置为空元素
   */
  toEmpty() {
    if (this.isEmpty()) {
      return;
    }
    if (this.isText()) {
      this.marks = null;
      this.styles = null;
      this.textContent = null;
      this.elm = null;
      return;
    }
    if (this.isClosed()) {
      this.type = "text";
      this.parsedom = null;
      this.marks = null;
      this.styles = null;
      this.textContent = null;
      this.elm = null;
      return;
    }
    if (this.hasChildren()) {
      this.children.forEach((el) => {
        el.toEmpty();
      });
    }
  }
  /**
   * 获取所在根级块元素
   */
  getBlock() {
    if (this.isBlock()) {
      return this;
    }
    return this.parent.getBlock();
  }
  /**
   * 获取所在内部块元素
   */
  getInblock() {
    if (this.isInblock()) {
      return this;
    }
    if (this.isBlock()) {
      return null;
    }
    return this.parent.getInblock();
  }
  /**
   * 获取所在行内元素
   */
  getInline() {
    if (this.isInline()) {
      return this;
    }
    if (this.isBlock()) {
      return null;
    }
    return this.parent.getInline();
  }
  /**
   * 比较当前元素和另一个元素的styles是否一致
   */
  isEqualStyles(element2) {
    if (!this.hasStyles() && !element2.hasStyles()) {
      return true;
    }
    if (this.hasStyles() && element2.hasStyles() && common$1.equal(this.styles, element2.styles)) {
      return true;
    }
    return false;
  }
  /**
   * 比较当前元素和另一个元素的marks是否一致
   */
  isEqualMarks(element2) {
    if (!this.hasMarks() && !element2.hasMarks()) {
      return true;
    }
    if (this.hasMarks() && element2.hasMarks() && common$1.equal(this.marks, element2.marks)) {
      return true;
    }
    return false;
  }
  /**
   * 如果当前元素是文本元素或者自闭合元素，判断它是不是指定元素的后代所有文本元素和自闭合元素中的第一个
   */
  isFirst(element2) {
    if (!this.isText() && !this.isClosed()) {
      return false;
    }
    if (element2.isEqual(this)) {
      return false;
    }
    if (element2.isContains(this)) {
      const elements = _AlexElement2.flatElements(element2.children).filter((el) => {
        return el.isText() || el.isClosed();
      });
      return this.isEqual(elements[0]);
    }
    return false;
  }
  /**
   * 如果当前元素是文本元素或者自闭合元素，判断它是不是指定元素的后代所有文本元素和自闭合元素中的最后一个
   */
  isLast(element2) {
    if (!this.isText() && !this.isClosed()) {
      return false;
    }
    if (element2.isEqual(this)) {
      return false;
    }
    if (element2.isContains(this)) {
      const elements = _AlexElement2.flatElements(element2.children).filter((el) => {
        return el.isText() || el.isClosed();
      });
      const length = elements.length;
      return this.isEqual(elements[length - 1]);
    }
    return false;
  }
  /**
   * 将元素渲染成真实的node并挂载在元素的elm属性上
   */
  __render() {
    let el = null;
    if (this.isText()) {
      el = document.createElement(_AlexElement2.TEXT_NODE);
      const text = document.createTextNode(this.textContent);
      el.appendChild(text);
    } else {
      el = document.createElement(this.parsedom);
      if (this.hasChildren()) {
        this.children.forEach((child) => {
          child.__render();
          el.appendChild(child.elm);
        });
      }
    }
    if (this.hasMarks()) {
      Object.keys(this.marks).forEach((key) => {
        if (!/(^on)|(^style$)|(^face$)/g.test(key)) {
          el.setAttribute(key, this.marks[key]);
        }
      });
    }
    if (this.hasStyles()) {
      Object.keys(this.styles).forEach((key) => {
        el.style.setProperty(key, this.styles[key]);
      });
    }
    data$1.set(el, "data-alex-editor-key", this.key);
    this.elm = el;
  }
  /**
   * 完全复制元素，包括key也复制
   */
  __fullClone() {
    let el = new _AlexElement2(this.type, this.parsedom, cloneData$1(this.marks), cloneData$1(this.styles), this.textContent);
    el.behavior = this.behavior;
    el.key = this.key;
    el.elm = this.elm;
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
  /**
   * 判断参数是否为AlexElement元素
   */
  static isElement(val) {
    return val instanceof _AlexElement2;
  }
  /**
   * 扁平化处理元素数组
   */
  static flatElements(elements) {
    const fn = (arr) => {
      let result = [];
      const length = arr.length;
      for (let i = 0; i < length; i++) {
        if (arr[i]) {
          result.push(arr[i]);
          if (arr[i].hasChildren()) {
            const childResult = fn(arr[i].children);
            result.push(...childResult);
          }
        }
      }
      return result;
    };
    return fn(elements);
  }
  /**
   * 创建一个空白文本元素并返回
   */
  static getSpaceElement() {
    return new _AlexElement2("text", null, null, null, "\uFEFF");
  }
};
__publicField(_AlexElement, "BLOCK_NODE", "p");
__publicField(_AlexElement, "TEXT_NODE", "span");
__publicField(_AlexElement, "VOID_NODES", ["colgroup", "col"]);
let AlexElement = _AlexElement;
class AlexRange {
  constructor(anchor, focus) {
    __publicField(this, "anchor");
    __publicField(this, "focus");
    this.anchor = anchor;
    this.focus = focus;
  }
}
class AlexPoint {
  constructor(element2, offset) {
    __publicField(this, "element");
    __publicField(this, "offset");
    this.element = element2;
    this.offset = offset;
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
  /**
   * 是否Point类型数据
   */
  static isPoint(val) {
    return val instanceof AlexPoint;
  }
  /**
   * 两个点是否相等
   */
  isEqual(point) {
    if (!AlexPoint.isPoint(point)) {
      return false;
    }
    return this.element.isEqual(point.element) && this.offset == point.offset;
  }
  /**
   * 移动到到指定元素最后
   */
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
      if (length == 0) {
        throw new Error("There is no element to set the focus");
      }
      this.moveToEnd(flatElements[length - 1]);
    }
  }
  /**
   * 移动到指定元素最前
   */
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
      if (flatElements.length == 0) {
        throw new Error("There is no element to set the focus");
      }
      this.moveToStart(flatElements[0]);
    }
  }
}
class AlexHistory {
  constructor() {
    __publicField(this, "records", []);
    __publicField(this, "current", -1);
  }
  /**
   * 入栈
   */
  push(stack, range) {
    if (this.current < this.records.length - 1) {
      this.records.length = this.current + 1;
    }
    const newStack = stack.map((ele) => {
      return ele.__fullClone();
    });
    const newRange = this.__cloneRange(newStack, range);
    this.records.push({
      stack: newStack,
      range: newRange
    });
    this.current += 1;
  }
  /**
   * 获取
   */
  get(type) {
    let current = this.current;
    if (type == -1) {
      if (current <= 0) {
        return null;
      }
      current -= 1;
    } else if (type == 1) {
      if (current >= this.records.length - 1) {
        return null;
      }
      current += 1;
    }
    const { stack, range } = this.records[current];
    const newStack = stack.map((ele) => {
      return ele.__fullClone();
    });
    const newRange = this.__cloneRange(newStack, range);
    return {
      current,
      stack: newStack,
      range: newRange
    };
  }
  /**
   * 更新当前历史记录的range
   */
  updateCurrentRange(range) {
    const records = this.records[this.current];
    const newRange = this.__cloneRange(records.stack, range);
    this.records[this.current].range = newRange;
  }
  /**
   * 克隆range
   */
  __cloneRange(newStack, range) {
    if (range) {
      const anchorElement = AlexElement.flatElements(newStack).find((ele) => {
        return ele.key == range.anchor.element.key;
      });
      const focusElement = AlexElement.flatElements(newStack).find((ele) => {
        return ele.key == range.focus.element.key;
      });
      if (anchorElement && focusElement) {
        const anchor = new AlexPoint(anchorElement, range.anchor.offset);
        const focus = new AlexPoint(focusElement, range.focus.offset);
        return new AlexRange(anchor, focus);
      }
    }
    return null;
  }
}
const blockParse = [
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
const closedParse = [
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
  },
  {
    parsedom: "svg"
  },
  {
    parsedom: "canvas"
  }
];
const inblockParse = [
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
const inlineParse = [
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
  },
  {
    parsedom: "font",
    parse: {
      "font-family": (node) => {
        return node.getAttribute("face") || "";
      }
    }
  }
];
const handleNotStackBlock = function(element2) {
  if (element2.hasChildren()) {
    const blocks = element2.children.filter((el) => {
      return !el.isEmpty() && el.isBlock();
    });
    blocks.forEach((el) => {
      el.type = element2.type == "inline" ? "inline" : "inblock";
      if (el.type == "inblock") {
        el.behavior = "block";
      }
    });
  }
};
const handleInblockWithOther = function(element2) {
  if (element2.hasChildren()) {
    const children = element2.children.filter((el) => {
      return !el.isEmpty();
    });
    const inblocks = children.filter((el) => {
      return el.isInblock();
    });
    if (inblocks.length && inblocks.length != children.length) {
      inblocks.forEach((el) => {
        el.type = "inline";
      });
    }
  }
};
const handleInlineChildrenNotInblock = function(element2) {
  if (element2.isInline() && element2.hasChildren()) {
    const inblocks = element2.children.filter((el) => {
      return !el.isEmpty() && el.isInblock();
    });
    inblocks.forEach((el) => {
      el.type = "inline";
    });
  }
};
const breakFormat = function(element2) {
  if (element2.hasChildren()) {
    const children = element2.children.filter((el) => {
      return !el.isEmpty();
    });
    const breaks = children.filter((el) => {
      return el.isBreak();
    });
    if (breaks.length && breaks.length == children.length) {
      if (this.range && element2.isContains(this.range.anchor.element)) {
        this.range.anchor.moveToStart(breaks[0]);
      }
      if (this.range && element2.isContains(this.range.focus.element)) {
        this.range.focus.moveToStart(breaks[0]);
      }
      element2.children = [breaks[0]];
    } else if (breaks.length) {
      breaks.forEach((el) => {
        el.toEmpty();
      });
    }
  }
};
const mergeWithBrotherElement = function(element2) {
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
        if (this.range && nel.isContains(this.range.anchor.element)) {
          if (pel.isEmpty()) {
            this.range.anchor.element = pel;
            this.range.anchor.offset = 0;
          } else {
            this.range.anchor.moveToEnd(pel);
          }
        }
        if (this.range && nel.isContains(this.range.focus.element)) {
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
        if (this.range && pel.isContains(this.range.anchor.element)) {
          if (nel.isEmpty()) {
            this.range.anchor.element = nel;
            this.range.anchor.offset = 0;
          } else {
            this.range.anchor.moveToStart(nel);
          }
        }
        if (this.range && pel.isContains(this.range.focus.element)) {
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
      if (this.range && nel.isEqual(this.range.anchor.element)) {
        this.range.anchor.element = pel;
        this.range.anchor.offset = pel.textContent.length + this.range.anchor.offset;
      }
      if (this.range && nel.isEqual(this.range.focus.element)) {
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
};
const mergeWithParentElement = function(element2) {
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
          Object.assign(parent.marks, cloneData$1(child.marks));
        } else {
          parent.marks = cloneData$1(child.marks);
        }
      }
      if (child.hasStyles()) {
        if (parent.hasStyles()) {
          Object.assign(parent.styles, cloneData$1(child.styles));
        } else {
          parent.styles = cloneData$1(child.styles);
        }
      }
      parent.textContent = child.textContent;
      parent.children = null;
      if (this.range && child.isContains(this.range.anchor.element)) {
        this.range.anchor.element = parent;
      }
      if (this.range && child.isContains(this.range.focus.element)) {
        this.range.focus.element = parent;
      }
    } else {
      if (child.hasMarks()) {
        if (parent.hasMarks()) {
          Object.assign(parent.marks, cloneData$1(child.marks));
        } else {
          parent.marks = cloneData$1(child.marks);
        }
      }
      if (child.hasStyles()) {
        if (parent.hasStyles()) {
          Object.assign(parent.styles, cloneData$1(child.styles));
        } else {
          parent.styles = cloneData$1(child.styles);
        }
      }
      if (child.hasChildren()) {
        parent.children = [...child.children];
        parent.children.forEach((item) => {
          item.parent = parent;
        });
      }
      mergeElement(parent);
    }
  };
  const mergeElement = (ele) => {
    if (ele.hasChildren() && ele.children.length == 1 && ele.children[0] && canMerge(ele, ele.children[0])) {
      merge(ele, ele.children[0]);
    }
  };
  mergeElement(element2);
};
const mergeWithSpaceTextElement = function(element2) {
  if (element2.isText()) {
    let val = element2.textContent;
    let i = 0;
    while (i < val.length) {
      const chart = val.charAt(i);
      if (isSpaceText(chart) && i > 0 && isSpaceText(val.charAt(i - 1))) {
        if (this.range && this.range.anchor.element.isEqual(element2) && this.range.anchor.offset >= i + 1) {
          this.range.anchor.offset -= 1;
        }
        if (this.range && this.range.focus.element.isEqual(element2) && this.range.focus.offset >= i + 1) {
          this.range.focus.offset -= 1;
        }
        val = string$1.delete(val, i, 1);
      } else {
        i++;
      }
    }
    element2.textContent = val;
  }
};
const { Mac } = platform.os();
const isUndo = function(e) {
  if (Mac) {
    return e.key == "z" && e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
  }
  return e.key == "z" && e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
};
const isRedo = function(e) {
  if (Mac) {
    return e.key == "z" && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey;
  }
  return e.key == "z" && e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
};
const setClipboardData = function(data2, result) {
  let html = "";
  let text = "";
  result.forEach((item) => {
    const newEl = item.element.clone();
    if (item.offset) {
      newEl.textContent = newEl.textContent.substring(item.offset[0], item.offset[1]);
    }
    newEl.__render();
    html += newEl.elm.outerHTML;
    text += newEl.elm.innerText;
  });
  data2.setData("text/plain", text);
  data2.setData("text/html", html);
  return { html, text };
};
const doPaste = async function(html, text, files) {
  if (html) {
    if (this.allowPasteHtml) {
      const elements = this.parseHtml(html).filter((el) => {
        return !el.isEmpty();
      });
      if (typeof this.customHtmlPaste == "function") {
        await this.customHtmlPaste.apply(this, [elements, html]);
      } else {
        for (let i = 0; i < elements.length; i++) {
          this.insertElement(elements[i], false);
        }
        this.emit("pasteHtml", elements, html);
      }
    } else if (text) {
      if (typeof this.customTextPaste == "function") {
        await this.customTextPaste.apply(this, [text]);
      } else {
        this.insertText(text);
        this.emit("pasteText", text);
      }
    }
  } else {
    if (text) {
      if (typeof this.customTextPaste == "function") {
        await this.customTextPaste.apply(this, [text]);
      } else {
        this.insertText(text);
        this.emit("pasteText", text);
      }
    } else {
      let length = files.length;
      for (let i = 0; i < length; i++) {
        if (files[i].type.startsWith("image/")) {
          if (typeof this.customImagePaste == "function") {
            await this.customImagePaste.apply(this, [files[i]]);
          } else {
            const url = await file$1.dataFileToBase64(files[i]);
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
        } else if (files[i].type.startsWith("video/")) {
          if (typeof this.customVideoPaste == "function") {
            await this.customVideoPaste.apply(this, [files[i]]);
          } else {
            const url = await file$1.dataFileToBase64(files[i]);
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
        } else {
          if (typeof this.customFilePaste == "function") {
            await this.customFilePaste.apply(this, [files[i]]);
          }
        }
      }
    }
  }
};
const checkStack = function() {
  const elements = AlexElement.flatElements(this.stack).filter((el) => {
    return !el.isEmpty() && !AlexElement.VOID_NODES.includes(el.parsedom);
  });
  if (elements.length == 0) {
    const ele = new AlexElement("block", AlexElement.BLOCK_NODE, null, null, null);
    const breakEle = new AlexElement("closed", "br", null, null, null);
    this.addElementTo(breakEle, ele);
    this.stack = [ele];
  }
};
const setRecentlyPoint = function(point) {
  const previousElement = this.getPreviousElementOfPoint(point);
  const nextElement = this.getNextElementOfPoint(point);
  const block = point.element.getBlock();
  const inblock = point.element.getInblock();
  if (previousElement && !AlexElement.VOID_NODES.includes(previousElement.parsedom) && inblock && inblock.isContains(previousElement)) {
    point.moveToEnd(previousElement);
  } else if (nextElement && !AlexElement.VOID_NODES.includes(nextElement.parsedom) && inblock && inblock.isContains(nextElement)) {
    point.moveToStart(nextElement);
  } else if (previousElement && !AlexElement.VOID_NODES.includes(previousElement.parsedom) && block.isContains(previousElement)) {
    point.moveToEnd(previousElement);
  } else if (nextElement && !AlexElement.VOID_NODES.includes(nextElement.parsedom) && block.isContains(nextElement)) {
    point.moveToStart(nextElement);
  } else if (previousElement && !AlexElement.VOID_NODES.includes(previousElement.parsedom)) {
    point.moveToEnd(previousElement);
  } else if (nextElement && !AlexElement.VOID_NODES.includes(nextElement.parsedom)) {
    point.moveToStart(nextElement);
  }
};
const emptyDefaultBehaviorInblock = function(element2) {
  if (!element2.isInblock()) {
    return;
  }
  if (element2.behavior != "default") {
    return;
  }
  if (element2.hasChildren()) {
    element2.children.forEach((item) => {
      if (item.isInblock()) {
        emptyDefaultBehaviorInblock.apply(this, [item]);
      } else {
        item.toEmpty();
        if (item.parent.isEmpty()) {
          const breakEl = new AlexElement("closed", "br", null, null, null);
          this.addElementTo(breakEl, item.parent);
        }
      }
    });
  }
};
const setRangeInVisible = function() {
  const fn = async (root) => {
    const scrollHeight = element$1.getScrollHeight(root);
    const scrollWidth = element$1.getScrollWidth(root);
    if (root.clientHeight < scrollHeight || root.clientWidth < scrollWidth) {
      const selection = window.getSelection();
      if (selection.rangeCount == 0) {
        return;
      }
      const range = selection.getRangeAt(0);
      const rects = range.getClientRects();
      let target = range;
      if (rects.length == 0) {
        target = this.range.focus.element.elm;
      }
      const childRect = target.getBoundingClientRect();
      const parentRect = root.getBoundingClientRect();
      if (root.clientHeight < scrollHeight) {
        if (childRect.top < parentRect.top) {
          await element$1.setScrollTop({
            el: root,
            number: 0
          });
          const tempChildRect = target.getBoundingClientRect();
          const tempParentRect = root.getBoundingClientRect();
          element$1.setScrollTop({
            el: root,
            number: tempChildRect.top - tempParentRect.top
          });
        } else if (childRect.bottom > parentRect.bottom) {
          await element$1.setScrollTop({
            el: root,
            number: 0
          });
          const tempChildRect = target.getBoundingClientRect();
          const tempParentRect = root.getBoundingClientRect();
          element$1.setScrollTop({
            el: root,
            number: tempChildRect.bottom - tempParentRect.bottom
          });
        }
      }
      if (root.clientWidth < scrollWidth) {
        if (childRect.left < parentRect.left) {
          await element$1.setScrollLeft({
            el: root,
            number: 0
          });
          const tempChildRect = target.getBoundingClientRect();
          const tempParentRect = root.getBoundingClientRect();
          element$1.setScrollLeft({
            el: root,
            number: tempChildRect.left - tempParentRect.left + 20
          });
        } else if (childRect.right > parentRect.right) {
          await element$1.setScrollLeft({
            el: root,
            number: 0
          });
          const tempChildRect = target.getBoundingClientRect();
          const tempParentRect = root.getBoundingClientRect();
          element$1.setScrollLeft({
            el: root,
            number: tempChildRect.right - tempParentRect.right + 20
          });
        }
      }
    }
  };
  if (this.range && this.range.focus.element.elm) {
    let root = this.range.focus.element.elm;
    while (element$1.isElement(root) && root != document.documentElement) {
      fn(root);
      root = root.parentNode;
    }
  }
};
const handleStackEmpty = function() {
  const elements = AlexElement.flatElements(this.stack).filter((el) => {
    return !el.isEmpty() && !AlexElement.VOID_NODES.includes(el.parsedom);
  });
  if (elements.length == 0) {
    const ele = new AlexElement("block", AlexElement.BLOCK_NODE, null, null, null);
    const breakEle = new AlexElement("closed", "br", null, null, null);
    this.addElementTo(breakEle, ele);
    this.stack = [ele];
    if (this.range) {
      this.range.anchor.moveToStart(breakEle);
      this.range.focus.moveToStart(breakEle);
    }
  }
};
const handleSelectionChange = function() {
  if (this.__isInputChinese) {
    return;
  }
  if (this.__innerSelectionChange) {
    return;
  }
  const selection = window.getSelection();
  if (selection && selection.rangeCount) {
    const range = selection.getRangeAt(0);
    if (isContains(this.$el, range.startContainer) && isContains(this.$el, range.endContainer)) {
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
      const anchorKey = data$1.get(anchorNode, "data-alex-editor-key");
      const focusKey = data$1.get(focusNode, "data-alex-editor-key");
      const anchorEle = this.getElementByKey(anchorKey);
      const focusEle = this.getElementByKey(focusKey);
      const anchor = new AlexPoint(anchorEle, anchorOffset);
      const focus = new AlexPoint(focusEle, focusOffset);
      if (this.range) {
        this.range.anchor = anchor;
        this.range.focus = focus;
      } else {
        this.range = new AlexRange(anchor, focus);
      }
      this.history.updateCurrentRange(this.range);
      this.emit("rangeUpdate", this.range);
    }
  }
};
const handleBeforeInput = function(e) {
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
};
const handleChineseInput = function(e) {
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
};
const handleKeyboard = function(e) {
  if (this.disabled) {
    return;
  }
  if (this.__isInputChinese) {
    return;
  }
  if (e.type == "keydown") {
    if (isUndo(e)) {
      e.preventDefault();
      const historyRecord = this.history.get(-1);
      if (historyRecord) {
        this.history.current = historyRecord.current;
        this.stack = historyRecord.stack;
        this.range = historyRecord.range;
        this.formatElementStack();
        this.domRender(true);
        this.rangeRender();
      }
    } else if (isRedo(e)) {
      e.preventDefault();
      const historyRecord = this.history.get(1);
      if (historyRecord) {
        this.history.current = historyRecord.current;
        this.stack = historyRecord.stack;
        this.range = historyRecord.range;
        this.formatElementStack();
        this.domRender(true);
        this.rangeRender();
      }
    }
    this.emit("keydown", this.value, e);
  } else if (e.type == "keyup") {
    this.emit("keyup", this.value, e);
  }
};
const handleCopy = async function(e) {
  e.preventDefault();
  if (!this.range) {
    return;
  }
  if (!this.allowCopy) {
    return;
  }
  const event2 = e;
  const result = this.getElementsByRange().list;
  if (event2.clipboardData && result.length) {
    const { text, html } = setClipboardData.apply(this, [event2.clipboardData, result]);
    this.emit("copy", text, html);
  }
};
const handleCut = async function(e) {
  e.preventDefault();
  if (!this.range) {
    return;
  }
  if (!this.allowCut) {
    return;
  }
  const event2 = e;
  const result = this.getElementsByRange().list;
  if (event2.clipboardData && result.length) {
    const { text, html } = setClipboardData.apply(this, [event2.clipboardData, result]);
    if (!this.disabled) {
      this.delete();
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    }
    this.emit("cut", text, html);
  }
};
const handlePaste = async function(e) {
  e.preventDefault();
  if (this.disabled) {
    return;
  }
  if (!this.range) {
    return;
  }
  if (!this.allowPaste) {
    return;
  }
  const event2 = e;
  if (event2.clipboardData) {
    const html = event2.clipboardData.getData("text/html");
    const text = event2.clipboardData.getData("text/plain");
    const files = event2.clipboardData.files;
    await doPaste.apply(this, [html, text, files]);
    this.formatElementStack();
    this.domRender();
    this.rangeRender();
  }
};
const handleDragDrop = async function(e) {
  e.preventDefault();
  if (e.type == "drop") {
    if (this.disabled) {
      return;
    }
    if (!this.range) {
      return;
    }
    if (!this.allowPaste) {
      return;
    }
    const event2 = e;
    if (event2.dataTransfer) {
      const html = event2.dataTransfer.getData("text/html");
      const text = event2.dataTransfer.getData("text/plain");
      const files = event2.dataTransfer.files;
      await doPaste.apply(this, [html, text, files]);
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    }
  }
};
const handleFocus = function(e) {
  if (this.disabled) {
    return;
  }
  this.emit("focus", this.value, e);
};
const handleBlur = function(e) {
  if (this.disabled) {
    return;
  }
  this.emit("blur", this.value, e);
};
class AlexEditor {
  constructor(node, opts) {
    __publicField(this, "$el");
    __publicField(this, "disabled");
    __publicField(this, "value");
    __publicField(this, "renderRules");
    __publicField(this, "allowCopy");
    __publicField(this, "allowPaste");
    __publicField(this, "allowCut");
    __publicField(this, "allowPasteHtml");
    __publicField(this, "customTextPaste");
    __publicField(this, "customHtmlPaste");
    __publicField(this, "customImagePaste");
    __publicField(this, "customVideoPaste");
    __publicField(this, "customFilePaste");
    __publicField(this, "customMerge");
    __publicField(this, "customParseNode");
    __publicField(this, "history", new AlexHistory());
    __publicField(this, "stack");
    __publicField(this, "range", null);
    __publicField(this, "__guid", createGuid());
    __publicField(this, "__events", {});
    __publicField(this, "__firstRender", true);
    __publicField(this, "__isInputChinese", false);
    __publicField(this, "__innerSelectionChange", false);
    __publicField(this, "__chineseInputTimer", null);
    this.$el = initEditorNode(node);
    const options = initEditorOptions(opts);
    this.disabled = options.disabled;
    this.value = options.value;
    this.renderRules = options.renderRules;
    this.allowCopy = options.allowCopy;
    this.allowPaste = options.allowPaste;
    this.allowCut = options.allowCut;
    this.allowPasteHtml = options.allowPasteHtml;
    this.customTextPaste = options.customTextPaste;
    this.customHtmlPaste = options.customHtmlPaste;
    this.customImagePaste = options.customImagePaste;
    this.customVideoPaste = options.customVideoPaste;
    this.customFilePaste = options.customFilePaste;
    this.customMerge = options.customMerge;
    this.customParseNode = options.customParseNode;
    this.stack = this.parseHtml(this.value);
    checkStack.apply(this);
    this.disabled ? this.setDisabled() : this.setEnabled();
    event$1.on(document, `selectionchange.alex_editor_${this.__guid}`, handleSelectionChange.bind(this));
    event$1.on(this.$el, "beforeinput.alex_editor", handleBeforeInput.bind(this));
    event$1.on(this.$el, "compositionstart.alex_editor compositionupdate.alex_editor compositionend.alex_editor", handleChineseInput.bind(this));
    event$1.on(this.$el, "keydown.alex_editor keyup.alex_editor", handleKeyboard.bind(this));
    event$1.on(this.$el, "cut.alex_editor", handleCut.bind(this));
    event$1.on(this.$el, "paste.alex_editor", handlePaste.bind(this));
    event$1.on(this.$el, "copy.alex_editor", handleCopy.bind(this));
    event$1.on(this.$el, "dragstart.alex_editor drop.alex_editor", handleDragDrop.bind(this));
    event$1.on(this.$el, "focus.alex_editor", handleFocus.bind(this));
    event$1.on(this.$el, "blur.alex_editor", handleBlur.bind(this));
  }
  /**
   * 初始化range
   */
  initRange() {
    const elements = AlexElement.flatElements(this.stack).filter((el) => {
      return !el.isEmpty() && !AlexElement.VOID_NODES.includes(el.parsedom);
    });
    const firstElement = elements[0];
    const anchor = new AlexPoint(firstElement, 0);
    const focus = new AlexPoint(firstElement, 0);
    this.range = new AlexRange(anchor, focus);
  }
  /**
   * 根据光标进行删除操作
   */
  delete() {
    if (this.disabled) {
      return;
    }
    if (!this.range) {
      return;
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      const previousElement = this.getPreviousElementOfPoint(this.range.anchor);
      const block = this.range.anchor.element.getBlock();
      const inblock = this.range.anchor.element.getInblock();
      if (inblock) {
        if (this.range.anchor.offset == 0) {
          if (previousElement) {
            if (inblock.isContains(previousElement)) {
              this.range.anchor.moveToEnd(previousElement);
              this.range.focus.moveToEnd(previousElement);
              this.delete();
              return;
            } else if (inblock.behavior == "block") {
              const previousBlock = previousElement.getBlock();
              const previousInblock = previousElement.getInblock();
              if (previousInblock) {
                if (previousInblock.behavior == "block") {
                  this.merge(inblock, previousInblock);
                }
              } else {
                this.merge(inblock, previousBlock);
              }
            }
          } else {
            this.emit("deleteInStart", inblock);
          }
        } else {
          if (this.range.anchor.element.isSpaceText()) {
            this.range.anchor.element.toEmpty();
            if (inblock.isEmpty()) {
              const breakEl = new AlexElement("closed", "br", null, null, null);
              this.addElementTo(breakEl, inblock);
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
            const isSpace = isSpaceText(val[this.range.anchor.offset]);
            this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset) + val.substring(this.range.focus.offset);
            this.range.focus.offset = this.range.anchor.offset;
            if (isSpace) {
              this.delete();
              return;
            }
            if (inblock.isEmpty()) {
              const breakEl = new AlexElement("closed", "br", null, null, null);
              this.addElementTo(breakEl, inblock);
              this.range.anchor.moveToStart(breakEl);
              this.range.focus.moveToStart(breakEl);
            }
          } else {
            const isBreak = this.range.anchor.element.isBreak();
            this.range.anchor.element.toEmpty();
            if (inblock.isEmpty()) {
              if (!isBreak || inblock.behavior == "default") {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, inblock);
                this.range.anchor.moveToStart(breakEl);
                this.range.focus.moveToStart(breakEl);
              } else if (!previousElement) {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, inblock);
                this.range.anchor.moveToStart(breakEl);
                this.range.focus.moveToStart(breakEl);
              }
            }
          }
        }
      } else {
        if (this.range.anchor.offset == 0) {
          if (previousElement) {
            if (block.isContains(previousElement)) {
              this.range.anchor.moveToEnd(previousElement);
              this.range.focus.moveToEnd(previousElement);
              this.delete();
              return;
            } else {
              const previousInblock = previousElement.getInblock();
              const previousBlock = previousElement.getBlock();
              if (previousInblock) {
                if (previousInblock.behavior == "block") {
                  this.merge(block, previousInblock);
                }
              } else {
                this.merge(block, previousBlock);
              }
            }
          } else {
            this.emit("deleteInStart", block);
          }
        } else {
          if (this.range.anchor.element.isSpaceText()) {
            this.range.anchor.element.toEmpty();
            if (block.isEmpty()) {
              const breakEl = new AlexElement("closed", "br", null, null, null);
              this.addElementTo(breakEl, block);
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
            const isSpace = isSpaceText(val[this.range.anchor.offset]);
            this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset) + val.substring(this.range.focus.offset);
            this.range.focus.offset = this.range.anchor.offset;
            if (isSpace) {
              this.delete();
              return;
            }
            if (block.isEmpty()) {
              const breakEl = new AlexElement("closed", "br", null, null, null);
              this.addElementTo(breakEl, block);
              this.range.anchor.moveToStart(breakEl);
              this.range.focus.moveToStart(breakEl);
            }
          } else {
            const isBreak = this.range.anchor.element.isBreak();
            this.range.anchor.element.toEmpty();
            if (block.isEmpty()) {
              if (!isBreak || !previousElement) {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, block);
                this.range.anchor.moveToStart(breakEl);
                this.range.focus.moveToStart(breakEl);
              }
            }
          }
        }
      }
    } else {
      const result = this.getElementsByRange().list.filter((item) => {
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
              emptyDefaultBehaviorInblock.apply(this, [item.element]);
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
          this.merge(focusInblock, anchorInblock);
        }
      } else if (anchorInblock) {
        result.forEach((item) => {
          if (item.offset) {
            item.element.textContent = item.element.textContent.substring(0, item.offset[0]) + item.element.textContent.substring(item.offset[1]);
          } else {
            if (item.element.isInblock() && item.element.behavior == "default") {
              emptyDefaultBehaviorInblock.apply(this, [item.element]);
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
          this.merge(focusBlock, anchorInblock);
        }
      } else if (focusInblock) {
        result.forEach((item) => {
          if (item.offset) {
            item.element.textContent = item.element.textContent.substring(0, item.offset[0]) + item.element.textContent.substring(item.offset[1]);
          } else {
            if (item.element.isInblock() && item.element.behavior == "default") {
              emptyDefaultBehaviorInblock.apply(this, [item.element]);
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
          this.merge(focusInblock, anchorBlock);
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
              emptyDefaultBehaviorInblock.apply(this, [item.element]);
            } else {
              item.element.toEmpty();
              if (item.element.parent && (item.element.parent.isInblock() || item.element.parent.isBlock()) && item.element.parent.isEmpty()) {
                const breakEl = new AlexElement("closed", "br", null, null, null);
                this.addElementTo(breakEl, item.element.parent);
              }
            }
          }
        });
        this.merge(focusBlock, anchorBlock);
      }
    }
    if (this.range.anchor.element.isEmpty()) {
      setRecentlyPoint.apply(this, [this.range.anchor]);
    }
    this.range.focus.element = this.range.anchor.element;
    this.range.focus.offset = this.range.anchor.offset;
    handleStackEmpty.apply(this);
    this.emit("deleteComplete");
  }
  /**
   * 根据光标位置向编辑器内插入文本
   */
  insertText(data2) {
    if (this.disabled) {
      return;
    }
    if (!this.range) {
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
  /**
   * 在光标处换行
   */
  insertParagraph() {
    if (this.disabled) {
      return;
    }
    if (!this.range) {
      return;
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      const previousElement = this.getPreviousElementOfPoint(this.range.anchor);
      const nextElement = this.getNextElementOfPoint(this.range.anchor);
      const block = this.range.anchor.element.getBlock();
      const inblock = this.range.anchor.element.getInblock();
      const endOffset = this.range.anchor.element.isText() ? this.range.anchor.element.textContent.length : 1;
      if (inblock) {
        if (this.range.anchor.element.isPreStyle()) {
          this.insertText("\n");
          const text = AlexElement.getSpaceElement();
          this.insertElement(text);
          this.range.anchor.moveToEnd(text);
          this.range.focus.moveToEnd(text);
          this.emit("insertParagraph", inblock, inblock);
        } else if (inblock.behavior == "block") {
          if (this.range.anchor.offset == 0 && !(previousElement && inblock.isContains(previousElement))) {
            const paragraph = inblock.clone(false);
            const breakEle = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementBefore(paragraph, inblock);
            this.emit("insertParagraph", inblock, paragraph);
          } else if (this.range.anchor.offset == endOffset && !(nextElement && inblock.isContains(nextElement))) {
            const paragraph = inblock.clone(false);
            const breakEle = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementAfter(paragraph, inblock);
            this.range.anchor.moveToStart(breakEle);
            this.range.focus.moveToStart(breakEle);
            this.emit("insertParagraph", paragraph, inblock);
          } else {
            const newInblock = inblock.clone();
            this.addElementAfter(newInblock, inblock);
            const elements = AlexElement.flatElements(inblock.children);
            const index = elements.findIndex((item) => {
              return this.range.anchor.element.isEqual(item);
            });
            this.range.focus.moveToEnd(inblock);
            this.delete();
            const newElements = AlexElement.flatElements(newInblock.children);
            this.range.focus.element = newElements[index];
            this.range.focus.offset = this.range.anchor.offset;
            this.range.anchor.moveToStart(newInblock);
            this.delete();
            this.emit("insertParagraph", newInblock, inblock);
          }
        }
      } else {
        if (this.range.anchor.element.isPreStyle()) {
          this.insertText("\n");
          const text = AlexElement.getSpaceElement();
          this.insertElement(text);
          this.range.anchor.moveToEnd(text);
          this.range.focus.moveToEnd(text);
          this.emit("insertParagraph", block, block);
        } else {
          if (this.range.anchor.offset == 0 && !(previousElement && block.isContains(previousElement))) {
            const paragraph = block.clone(false);
            const breakEle = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementBefore(paragraph, block);
            this.emit("insertParagraph", block, paragraph);
          } else if (this.range.anchor.offset == endOffset && !(nextElement && block.isContains(nextElement))) {
            const paragraph = block.clone(false);
            const breakEle = new AlexElement("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementAfter(paragraph, block);
            this.range.anchor.moveToStart(breakEle);
            this.range.focus.moveToStart(breakEle);
            this.emit("insertParagraph", paragraph, block);
          } else {
            const newBlock = block.clone();
            this.addElementAfter(newBlock, block);
            const elements = AlexElement.flatElements(block.children);
            const index = elements.findIndex((item) => {
              return this.range.anchor.element.isEqual(item);
            });
            const offset = this.range.anchor.offset;
            this.range.focus.moveToEnd(block);
            this.delete();
            const newElements = AlexElement.flatElements(newBlock.children);
            this.range.focus.element = newElements[index];
            this.range.focus.offset = offset;
            this.range.anchor.moveToStart(newBlock);
            this.delete();
            this.emit("insertParagraph", newBlock, block);
          }
        }
      }
    } else {
      this.delete();
      this.insertParagraph();
    }
  }
  /**
   * 根据光标插入元素
   * cover表示所在根级块或者内部块元素只有换行符时是否覆盖此元素
   */
  insertElement(ele, cover = true) {
    if (this.disabled) {
      return;
    }
    if (!this.range) {
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
      const block = this.range.anchor.element.getBlock();
      const inblock = this.range.anchor.element.getInblock();
      const endOffset = this.range.anchor.element.isText() ? this.range.anchor.element.textContent.length : 1;
      if (ele.isInblock() && ele.behavior == "block" && inblock && inblock.behavior == "block") {
        if (inblock.isOnlyHasBreak() && cover) {
          this.addElementBefore(ele, inblock);
          inblock.toEmpty();
        } else if (this.range.anchor.offset == 0 && !(previousElement && inblock.isContains(previousElement))) {
          this.addElementBefore(ele, inblock);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && inblock.isContains(nextElement))) {
          this.addElementAfter(ele, inblock);
        } else {
          const newInblock = inblock.clone();
          this.addElementAfter(newInblock, inblock);
          this.range.focus.moveToEnd(inblock);
          this.delete();
          const elements = AlexElement.flatElements(inblock.children);
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
      } else if (ele.isInblock() && inblock) {
        if (inblock.isOnlyHasBreak()) {
          this.addElementTo(ele, inblock, 0);
        } else if (this.range.anchor.offset == 0 && !(previousElement && inblock.isContains(previousElement))) {
          this.addElementTo(ele, inblock, 0);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && inblock.isContains(nextElement))) {
          this.addElementTo(ele, inblock, inblock.children.length);
        } else {
          const newInblock = inblock.clone();
          this.addElementAfter(newInblock, inblock);
          this.range.focus.moveToEnd(inblock);
          this.delete();
          const elements = AlexElement.flatElements(inblock.children);
          const index = elements.findIndex((item) => {
            return this.range.anchor.element.isEqual(item);
          });
          const newElements = AlexElement.flatElements(newInblock.children);
          this.range.focus.element = newElements[index];
          this.range.focus.offset = this.range.anchor.offset;
          this.range.anchor.moveToStart(newInblock);
          this.delete();
          this.addElementTo(ele, newInblock);
          this.merge(newInblock, inblock);
        }
      } else if (ele.isInblock()) {
        if (block.isOnlyHasBreak()) {
          this.addElementTo(ele, block, 0);
        } else if (this.range.anchor.offset == 0 && !(previousElement && block.isContains(previousElement))) {
          this.addElementTo(ele, block, 0);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && block.isContains(nextElement))) {
          this.addElementTo(ele, block, block.children.length);
        } else {
          const newBlock = block.clone();
          this.addElementAfter(newBlock, block);
          this.range.focus.moveToEnd(block);
          this.delete();
          const elements = AlexElement.flatElements(block.children);
          const index = elements.findIndex((item) => {
            return this.range.anchor.element.isEqual(item);
          });
          const newElements = AlexElement.flatElements(newBlock.children);
          this.range.focus.element = newElements[index];
          this.range.focus.offset = this.range.anchor.offset;
          this.range.anchor.moveToStart(newBlock);
          this.delete();
          this.addElementTo(ele, newBlock);
          this.merge(newBlock, block);
        }
      } else if (ele.isBlock()) {
        if (block.isOnlyHasBreak() && cover) {
          this.addElementBefore(ele, block);
          block.toEmpty();
        } else if (this.range.anchor.offset == 0 && !(previousElement && block.isContains(previousElement))) {
          this.addElementBefore(ele, block);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && block.isContains(nextElement))) {
          this.addElementAfter(ele, block);
        } else {
          const newBlock = block.clone();
          this.addElementAfter(newBlock, block);
          this.range.focus.moveToEnd(block);
          this.delete();
          const elements = AlexElement.flatElements(block.children);
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
  /**
   * 格式化stack
   */
  formatElementStack() {
    const format = (elements, fn, isStack) => {
      if (typeof isStack != "boolean") {
        isStack = false;
      }
      let index = 0;
      while (index < elements.length) {
        if (!elements[index]) {
          elements.splice(index, 1);
          continue;
        }
        if (elements[index].isEmpty()) {
          if (this.range && elements[index].isContains(this.range.anchor.element)) {
            setRecentlyPoint.apply(this, [this.range.anchor]);
          }
          if (this.range && elements[index].isContains(this.range.focus.element)) {
            setRecentlyPoint.apply(this, [this.range.focus]);
          }
          elements.splice(index, 1);
          continue;
        }
        fn.apply(this, [elements[index]]);
        if (elements[index].isEmpty()) {
          if (this.range && elements[index].isContains(this.range.anchor.element)) {
            setRecentlyPoint.apply(this, [this.range.anchor]);
          }
          if (this.range && elements[index].isContains(this.range.focus.element)) {
            setRecentlyPoint.apply(this, [this.range.focus]);
          }
          elements.splice(index, 1);
          continue;
        }
        if (!elements[index].isBlock() && isStack) {
          elements[index].convertToBlock();
        }
        if (elements[index].hasChildren()) {
          format(elements[index].children, fn);
        }
        if (elements[index].isEmpty()) {
          if (this.range && elements[index].isContains(this.range.anchor.element)) {
            setRecentlyPoint.apply(this, [this.range.anchor]);
          }
          if (this.range && elements[index].isContains(this.range.focus.element)) {
            setRecentlyPoint.apply(this, [this.range.focus]);
          }
          elements.splice(index, 1);
          continue;
        }
        index++;
      }
    };
    let renderRules = this.renderRules.filter((fn) => {
      return typeof fn == "function";
    });
    [handleNotStackBlock, handleInblockWithOther, handleInlineChildrenNotInblock, breakFormat, mergeWithParentElement, mergeWithBrotherElement, mergeWithParentElement, mergeWithSpaceTextElement, ...renderRules].forEach((fn) => {
      format(this.stack, fn, true);
    });
    handleStackEmpty.apply(this);
  }
  /**
   * 渲染编辑器dom内容
   * unPushHistory为false表示加入历史记录
   */
  domRender(unPushHistory = false) {
    this.emit("beforeRender");
    const fragment = document.createDocumentFragment();
    this.stack.forEach((element2) => {
      element2.__render();
      fragment.appendChild(element2.elm);
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
  /**
   * 根据range来设置真实的光标
   */
  rangeRender() {
    if (this.disabled) {
      return;
    }
    if (this.range) {
      const handler = (point) => {
        let node = null;
        let offset = null;
        if (point.element.isText()) {
          node = point.element.elm.childNodes[0];
          offset = point.offset;
        } else {
          node = point.element.parent.elm;
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
      if (selection) {
        selection.removeAllRanges();
        const range = document.createRange();
        range.setStart(anchorResult.node, anchorResult.offset);
        range.setEnd(focusResult.node, focusResult.offset);
        selection.addRange(range);
      }
    } else {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }
    }
    setTimeout(() => {
      setRangeInVisible.apply(this);
      this.__innerSelectionChange = false;
      this.history.updateCurrentRange(this.range);
      this.emit("rangeUpdate", this.range);
    }, 0);
  }
  /**
   * 将html转为元素
   */
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
  /**
   * 将node转为元素
   */
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
    const marks = getAttributes(node);
    const styles = getStyles(node);
    const parsedom = node.nodeName.toLocaleLowerCase();
    if (parsedom == "style" || parsedom == "meta" || parsedom == "script" || parsedom == "link") {
      return new AlexElement("text", null, null, null, null);
    }
    const block = blockParse.find((item) => item.parsedom == parsedom);
    const inblock = inblockParse.find((item) => item.parsedom == parsedom);
    const inline = inlineParse.find((item) => item.parsedom == parsedom);
    const closed = closedParse.find((item) => item.parsedom == parsedom);
    let element2 = null;
    let config = {
      type: "inblock",
      parsedom,
      marks,
      styles,
      behavior: "default"
    };
    if (block) {
      config.type = "block";
      if (block.parse) {
        config.parsedom = AlexElement.BLOCK_NODE;
      }
    } else if (inblock) {
      config.type = "inblock";
      if (inblock.block) {
        config.behavior = "block";
      }
    } else if (inline) {
      config.type = "inline";
      if (inline.parse) {
        config.parsedom = AlexElement.TEXT_NODE;
        if (common$1.isObject(inline.parse)) {
          for (let key in inline.parse) {
            if (typeof inline.parse[key] == "function") {
              config.styles[key] = inline.parse[key].apply(this, [node]);
            } else {
              config.styles[key] = inline.parse[key];
            }
          }
        }
      }
    } else if (closed) {
      config.type = "closed";
    } else {
      config.type = "inline";
      config.parsedom = "span";
    }
    element2 = new AlexElement(config.type, config.parsedom, config.marks, config.styles, null);
    element2.behavior = config.behavior;
    if (!closed) {
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
    if (typeof this.customParseNode == "function") {
      element2 = this.customParseNode.apply(this, [element2]);
    }
    return element2;
  }
  /**
   * 将指定元素与另一个元素进行合并（仅限内部块元素和根级块元素）
   */
  merge(ele, previousEle) {
    if (!AlexElement.isElement(ele)) {
      throw new Error("The first argument must be an AlexElement instance");
    }
    if (!AlexElement.isElement(previousEle)) {
      throw new Error("The second argument must be an AlexElement instance");
    }
    if (!ele.isBlock() && !ele.isInblock() || !previousEle.isBlock() && !previousEle.isInblock()) {
      throw new Error('Elements that are not "block" or "inblock" cannot be merged');
    }
    if (typeof this.customMerge == "function") {
      this.customMerge.apply(this, [ele, previousEle]);
    } else {
      previousEle.children.push(...ele.children);
      previousEle.children.forEach((item) => {
        item.parent = previousEle;
      });
      ele.children = null;
    }
  }
  /**
   * 根据key查询元素
   */
  getElementByKey(key) {
    if (!key) {
      throw new Error("You need to specify a key to do the query");
    }
    const fn = (elements) => {
      let element2 = null;
      const length = elements.length;
      for (let i = 0; i < length; i++) {
        const item = elements[i];
        if (item && item.key === key) {
          element2 = item;
          break;
        }
        if (item && item.hasChildren()) {
          const el = fn(item.children);
          if (el) {
            element2 = el;
            break;
          }
        }
      }
      return element2;
    };
    return fn(this.stack);
  }
  /**
   * 获取指定元素的前一个兄弟元素（会跳过空元素）
   */
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
  /**
   * 获取指定元素的后一个兄弟元素（会跳过空元素）
   */
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
  /**
   * 向上查询可以设置焦点的元素（会跳过空元素）
   */
  getPreviousElementOfPoint(point) {
    if (!AlexPoint.isPoint(point)) {
      throw new Error("The argument must be an AlexPoint instance");
    }
    const fnChild = (children) => {
      let el = null;
      const length = children.length;
      for (let i = length - 1; i >= 0; i--) {
        const child = children[i];
        if (child.isEmpty()) {
          continue;
        }
        if (child.isText() || child.isClosed()) {
          el = child;
          break;
        }
        el = fnChild(child.children);
        if (el) {
          break;
        }
      }
      return el;
    };
    const fn = (element2) => {
      const previousElement = this.getPreviousElement(element2);
      if (previousElement) {
        if (previousElement.isEmpty()) {
          return fn(previousElement);
        }
        if (previousElement.isText() || previousElement.isClosed()) {
          return previousElement;
        }
        return fnChild(previousElement.children);
      }
      if (element2.parent) {
        return fn(element2.parent);
      }
      return null;
    };
    return fn(point.element);
  }
  /**
   * 向下查找可以设置焦点的元素（会跳过空元素）
   */
  getNextElementOfPoint(point) {
    if (!AlexPoint.isPoint(point)) {
      throw new Error("The argument must be an AlexPoint instance");
    }
    const fnChild = (children) => {
      let el = null;
      const length = children.length;
      for (let i = 0; i < length; i++) {
        const child = children[i];
        if (child.isEmpty()) {
          continue;
        }
        if (child.isText() || child.isClosed()) {
          el = child;
          break;
        }
        el = fnChild(child.children);
        if (el) {
          break;
        }
      }
      return el;
    };
    const fn = (element2) => {
      const nextElement = this.getNextElement(element2);
      if (nextElement) {
        if (nextElement.isEmpty()) {
          return fn(nextElement);
        }
        if (nextElement.isText() || nextElement.isClosed()) {
          return nextElement;
        }
        return fnChild(nextElement.children);
      }
      if (element2.parent) {
        return fn(element2.parent);
      }
      return null;
    };
    return fn(point.element);
  }
  /**
   * 获取选区之间的元素，flat参数表示是否返回扁平化的数据
   */
  getElementsByRange() {
    if (!this.range) {
      return {
        list: [],
        flatList: []
      };
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      return {
        list: [],
        flatList: []
      };
    }
    if (this.range.anchor.element.isEqual(this.range.focus.element)) {
      const isCover = this.range.anchor.offset == 0 && this.range.focus.offset == (this.range.anchor.element.isText() ? this.range.anchor.element.textContent.length : 1);
      return {
        list: [
          {
            element: this.range.anchor.element,
            offset: isCover ? false : [this.range.anchor.offset, this.range.focus.offset]
          }
        ],
        flatList: [
          {
            element: this.range.anchor.element,
            offset: isCover ? false : [this.range.anchor.offset, this.range.focus.offset]
          }
        ]
      };
    }
    const getFlatList = () => {
      let flatList = [];
      const anchorInStart = this.range.anchor.offset == 0;
      const focusInEnd = this.range.focus.offset == (this.range.focus.element.isText() ? this.range.focus.element.textContent.length : 1);
      const anchorBlock = this.range.anchor.element.getBlock();
      const focusBlock = this.range.focus.element.getBlock();
      const anchorBlockIndex = this.stack.findIndex((el) => anchorBlock.isEqual(el));
      const focusBlockIndex = this.stack.findIndex((el) => focusBlock.isEqual(el));
      let elements = AlexElement.flatElements(this.stack.slice(anchorBlockIndex, focusBlockIndex + 1));
      const firstElement = getHighestByFirst(this.range.anchor);
      const startIndex = elements.findIndex((el) => el.isEqual(firstElement ? firstElement : this.range.anchor.element));
      const endIndex = elements.findIndex((el) => el.isEqual(this.range.focus.element));
      if (startIndex > 0 || endIndex < elements.length - 1) {
        elements = elements.slice(startIndex, endIndex + 1);
      }
      const length = elements.length;
      for (let i = 0; i < length; i++) {
        if (this.range.anchor.element.isEqual(elements[i])) {
          if (anchorInStart) {
            flatList.push({
              element: this.range.anchor.element,
              offset: false
            });
          } else if (this.range.anchor.element.isText() && this.range.anchor.offset < this.range.anchor.element.textContent.length) {
            flatList.push({
              element: this.range.anchor.element,
              offset: [this.range.anchor.offset, this.range.anchor.element.textContent.length]
            });
          }
        } else if (elements[i].isContains(this.range.anchor.element)) {
          const isFirst = this.range.anchor.element.isFirst(elements[i]);
          const hasFocus = elements[i].isContains(this.range.focus.element);
          const isLast = this.range.focus.element.isLast(elements[i]);
          if (anchorInStart && isFirst && hasFocus && isLast && focusInEnd) {
            flatList.push({
              element: elements[i],
              offset: false
            });
          } else if (anchorInStart && isFirst && !hasFocus) {
            flatList.push({
              element: elements[i],
              offset: false
            });
          }
        } else if (this.range.focus.element.isEqual(elements[i])) {
          if (focusInEnd) {
            flatList.push({
              element: this.range.focus.element,
              offset: false
            });
          } else if (this.range.focus.offset > 0) {
            flatList.push({
              element: this.range.focus.element,
              offset: [0, this.range.focus.offset]
            });
          }
        } else if (elements[i].isContains(this.range.focus.element)) {
          const isLast = this.range.focus.element.isLast(elements[i]);
          if (isLast && focusInEnd) {
            flatList.push({
              element: elements[i],
              offset: false
            });
          }
        } else {
          flatList.push({
            element: elements[i],
            offset: false
          });
        }
      }
      return flatList;
    };
    const getList = (flatList) => {
      let list = [];
      let blockElements = [];
      let notBlockElements = [];
      const length = flatList.length;
      for (let i = 0; i < length; i++) {
        if (flatList[i].element.isBlock()) {
          list.push(flatList[i]);
          blockElements.push(flatList[i].element);
        } else {
          const block = flatList[i].element.getBlock();
          let hasBlock = false;
          const blockLength = blockElements.length;
          for (let j = blockLength - 1; j >= 0; j--) {
            if (blockElements[j].isEqual(block)) {
              hasBlock = true;
              break;
            }
          }
          if (!hasBlock) {
            const isInclude = notBlockElements.some((el) => el.isContains(flatList[i].element));
            if (!isInclude) {
              list.push(flatList[i]);
              if (flatList[i].element.isInblock() || flatList[i].element.isInline()) {
                notBlockElements.push(flatList[i].element);
              }
            }
          }
        }
      }
      return list;
    };
    const flatListArr = getFlatList();
    const listArr = getList(flatListArr);
    return {
      list: listArr,
      flatList: flatListArr
    };
  }
  /**
   * 将指定元素添加到父元素的子元素数组中
   */
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
  /**
   * 将指定元素添加到另一个元素前面
   */
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
  /**
   * 将指定元素添加到另一个元素后面
   */
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
  /**
   * 将虚拟光标设置到指定元素开始处
   */
  collapseToStart(element2) {
    if (this.disabled) {
      return;
    }
    let rangeIsNull = false;
    if (!this.range) {
      this.initRange();
      rangeIsNull = true;
    }
    if (AlexElement.isElement(element2)) {
      this.range.anchor.moveToStart(element2);
      this.range.focus.moveToStart(element2);
    } else {
      const flatElements = AlexElement.flatElements(this.stack).filter((el) => {
        return !el.isEmpty() && !AlexElement.VOID_NODES.includes(el.parsedom);
      });
      if (flatElements.length == 0) {
        throw new Error("There is no element to set the focus");
      }
      this.range.anchor.moveToStart(flatElements[0]);
      this.range.focus.moveToStart(flatElements[0]);
    }
    if (rangeIsNull) {
      this.history.updateCurrentRange(this.range);
    }
  }
  /**
   * 将虚拟光标设置到指定元素最后
   */
  collapseToEnd(element2) {
    if (this.disabled) {
      return;
    }
    let rangeIsNull = false;
    if (!this.range) {
      this.initRange();
      rangeIsNull = true;
    }
    if (AlexElement.isElement(element2)) {
      this.range.anchor.moveToEnd(element2);
      this.range.focus.moveToEnd(element2);
    } else {
      const flatElements = AlexElement.flatElements(this.stack).filter((el) => {
        return !el.isEmpty() && !AlexElement.VOID_NODES.includes(el.parsedom);
      });
      const length = flatElements.length;
      if (length == 0) {
        throw new Error("There is no element to set the focus");
      }
      this.range.anchor.moveToEnd(flatElements[length - 1]);
      this.range.focus.moveToEnd(flatElements[length - 1]);
    }
    if (rangeIsNull) {
      this.history.updateCurrentRange(this.range);
    }
  }
  /**
   * 禁用编辑器
   */
  setDisabled() {
    this.disabled = true;
    this.$el.removeAttribute("contenteditable");
  }
  /**
   * 启用编辑器
   */
  setEnabled() {
    this.disabled = false;
    this.$el.setAttribute("contenteditable", "true");
  }
  /**
   * 触发自定义事件
   */
  emit(eventName, ...value) {
    if (Array.isArray(this.__events[eventName])) {
      this.__events[eventName].forEach((fn) => {
        fn.apply(this, [...value]);
      });
      return true;
    }
    return false;
  }
  /**
   * 监听自定义事件
   */
  on(eventName, eventHandle) {
    if (!this.__events[eventName]) {
      this.__events[eventName] = [];
    }
    this.__events[eventName].push(eventHandle);
  }
  /**
   * 销毁编辑器的方法
   */
  destroy() {
    this.setDisabled();
    event$1.off(document, `selectionchange.alex_editor_${this.__guid}`);
    event$1.off(this.$el, "beforeinput.alex_editor compositionstart.alex_editor compositionupdate.alex_editor compositionend.alex_editor keydown.alex_editor cut.alex_editor paste.alex_editor copy.alex_editor dragstart.alex_editor drop.alex_editor focus.alex_editor blur.alex_editor");
  }
}
const version$2 = "1.3.33";
console.log(`%c alex-editor %c v${version$2} `, "padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;", "padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;");
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
    }
    return false;
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
      return Number(s1.replace(".", "")) / Number(s2.replace(".", "")) * Math.pow(10, t2 - t1);
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
   * @param {Object} str 原始字符串
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
   * 获取元素距离某个定位祖先元素左侧/顶部/底部/右侧的距离
   * @param {Object} el 元素
   * @param {Object} root 定位父元素或者祖先元素，未指定则为document.body
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
   * 判断某个元素是否包含指定元素，包含相等关系和父子关系
   * @param {Object} parentNode 父元素或祖先元素
   * @param {Object} childNode 子元素
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
    return false;
  },
  /**
   * 判断某个元素是否是指定元素的父元素
   * @param {Object} parentNode 父元素
   * @param {Object} childNode 子元素
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
   * 查找某个元素下指定选择器的子元素
   * @param {Object} el 元素
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
   * 查找某个元素下指定选择器的兄弟元素
   * @param {Object} el 元素
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
   * @param {Object} el 元素
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
   * @param {Object} el 元素
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
   * @param {Object} el 元素
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
    scrollEle.addEventListener("scroll", () => {
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
    return new Promise((resolve) => {
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
    return new Promise((resolve) => {
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
   * 判断是否是元素
   * @param {Object} el
   */
  isElement(el) {
    return el && el instanceof Node && el.nodeType === 1;
  },
  /**
   * 字符串转dom
   * @param {Object} str
   */
  string2dom(str, parentTag) {
    if (!str || typeof str != "string") {
      throw new TypeError("The argument must be an HTML string");
    }
    let parentEle = document.createElement(parentTag || "div");
    parentEle.innerHTML = str;
    if (parentEle.children.length == 1) {
      return parentEle.children[0];
    } else {
      return Array.from(parentEle.children);
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
   * 设置元素指定数据
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
   * @param {Object} param 判断的类型字符串
   */
  matchingText(text, param) {
    if (!text || typeof text != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!param || typeof param != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let reg = null;
    if (param == "Chinese") {
      reg = /^[\u4e00-\u9fa5]+$/;
    }
    if (param == "chinese") {
      reg = /[\u4e00-\u9fa5]/;
    }
    if (param == "email") {
      reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    }
    if (param == "username") {
      reg = /^[a-zA-Z0-9_]{4,16}$/;
    }
    if (param == "int+") {
      reg = /^\d+$/;
    }
    if (param == "int-") {
      reg = /^-\d+$/;
    }
    if (param == "int") {
      reg = /^-?\d+$/;
    }
    if (param == "pos") {
      reg = /^\d*\.?\d+$/;
    }
    if (param == "neg") {
      reg = /^-\d*\.?\d+$/;
    }
    if (param == "number") {
      reg = /^-?\d*\.?\d+$/;
    }
    if (param == "phone") {
      reg = /^1[0-9]\d{9}$/;
    }
    if (param == "idCard") {
      reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    }
    if (param == "url") {
      reg = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/;
    }
    if (param == "IPv4") {
      reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    }
    if (param == "hex") {
      reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    }
    if (param == "rgb") {
      reg = /^rgb\((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\)$/;
    }
    if (param == "rgba") {
      reg = /^rgba\((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(0?\.\d|1(\.0)?|0)\)$/;
    }
    if (param == "QQ") {
      reg = /^[1-9][0-9]{4,10}$/;
    }
    if (param == "weixin") {
      reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    }
    if (param == "plate") {
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
    let r2 = search.match(reg);
    if (r2) {
      return decodeURIComponent(r2[2]);
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
      }
      return false;
    }
    return false;
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
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      let length = aProps.length;
      let isEqual = true;
      for (let i = 0; i < length; i++) {
        let propName = aProps[i];
        let propA = a[propName];
        let propB = b[propName];
        if (!this.equal(propA, propB)) {
          isEqual = false;
          break;
        }
      }
      return isEqual;
    }
    return a === b;
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
      throw new Error("navigator.clipboard must be obtained in a secure environment, such as localhost, 127.0.0.1, or https, so the method won't work");
    }
    return navigator.clipboard.writeText(text);
  },
  /**
   * 深度克隆
   * @param {Object} data
   */
  clone(data2) {
    if (this.isObject(data2)) {
      if (Array.isArray(data2)) {
        return data2.map((item) => {
          return this.clone(item);
        });
      }
      let newData = {};
      for (let key in data2) {
        newData[key] = this.clone(data2[key]);
      }
      return newData;
    }
    return data2;
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
    let h2 = 0;
    let s = 0;
    let v = 0;
    let r2 = rgb[0] >= 255 ? 255 : rgb[0];
    let g = rgb[1] >= 255 ? 255 : rgb[1];
    let b = rgb[2] >= 255 ? 255 : rgb[2];
    r2 = r2 <= 0 ? 0 : r2;
    g = g <= 0 ? 0 : g;
    b = b <= 0 ? 0 : b;
    let max = Math.max(r2, g, b);
    let min = Math.min(r2, g, b);
    v = max / 255;
    if (max === 0) {
      s = 0;
    } else {
      s = 1 - min / max;
    }
    if (max === min) {
      h2 = 0;
    } else if (max === r2 && g >= b) {
      h2 = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r2 && g < b) {
      h2 = 60 * ((g - b) / (max - min)) + 360;
    } else if (max === g) {
      h2 = 60 * ((b - r2) / (max - min)) + 120;
    } else if (max === b) {
      h2 = 60 * ((r2 - g) / (max - min)) + 240;
    }
    return [h2, s * 100, v * 100];
  },
  /**
   * hsv格式值转rgb值
   * @param {Object} hsv hsv值，数组
   */
  hsv2rgb(hsv) {
    if (!Array.isArray(hsv) || hsv.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let h2 = hsv[0] >= 360 || hsv[0] <= 0 ? 0 : hsv[0];
    let s = hsv[1] >= 100 ? 100 : hsv[1];
    s = s <= 0 ? 0 : s;
    let v = hsv[2] >= 100 ? 100 : hsv[2];
    v = v <= 0 ? 0 : v;
    s = s / 100;
    v = v / 100;
    let r2 = 0;
    let g = 0;
    let b = 0;
    let i = parseInt(h2 / 60 % 6 + "");
    let f = h2 / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0:
        r2 = v;
        g = t;
        b = p;
        break;
      case 1:
        r2 = q;
        g = v;
        b = p;
        break;
      case 2:
        r2 = p;
        g = v;
        b = t;
        break;
      case 3:
        r2 = p;
        g = q;
        b = v;
        break;
      case 4:
        r2 = t;
        g = p;
        b = v;
        break;
      case 5:
        r2 = v;
        g = p;
        b = q;
        break;
    }
    r2 = parseInt(r2 * 255 + "");
    g = parseInt(g * 255 + "");
    b = parseInt(b * 255 + "");
    return [r2, g, b];
  },
  /**
   * rgb值转十六进制
   * @param {Array} rgb rgb值，数组
   */
  rgb2hex(rgb) {
    if (!Array.isArray(rgb) || rgb.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let r2 = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let hex = "#" + ((1 << 24) + (r2 << 16) + (g << 8) + b).toString(16).slice(1);
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
  },
  /**
   * 图片压缩方法
   * @param {*} file 需要压缩的图片File文件
   * @param {*} opts 压缩参数
   */
  compressImage(file2, opts) {
    const options = {
      //压缩图片的宽，单位px，如果不设置默认为原图宽
      width: void 0,
      //压缩图片质量，默认为原图的0.8
      quality: 0.8,
      //图片类型，jpeg或者webp，默认为jpeg
      mimeType: "jpeg",
      //压缩后的最大值，单位kb，默认为0表示不设置此值
      maxSize: 0,
      //小于该大小的图片不进行压缩，单位kb，默认为0表示任何图片都要压缩
      minSize: 0
    };
    if (common.isObject(opts)) {
      if (number.isNumber(opts.width)) {
        options.width = opts.width;
      }
      if (number.isNumber(opts.quality) && opts.quality >= 0 && opts.quality <= 1) {
        options.quality = opts.quality;
      }
      if (opts.mimeType == "jpeg" || opts.mimeType == "webp") {
        options.mimeType = opts.mimeType;
      }
      if (number.isNumber(opts.maxSize)) {
        options.maxSize = opts.maxSize;
      }
      if (number.isNumber(opts.minSize)) {
        options.minSize = opts.minSize;
      }
    }
    const createFile = (canvas, fileName, quality) => {
      let url = canvas.toDataURL("image/" + options.mimeType, quality);
      let file22 = this.dataBase64toFile(url, fileName);
      if (options.maxSize > 0 && file22.size > options.maxSize * 1024) {
        quality = quality <= 0 ? 0 : Number((quality - 0.01).toFixed(2));
        const res = createFile(canvas, fileName, quality);
        url = res.url;
        file22 = res.file;
        quality = res.quality;
      }
      return {
        file: file22,
        url,
        quality
      };
    };
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file2);
      reader.onload = () => {
        let url = reader.result;
        let img = new Image();
        img.src = url;
        img.onload = () => {
          if (options.minSize > 0 && file2.size <= options.minSize * 1024) {
            resolve({
              file: file2,
              url,
              quality: 1,
              width: img.width,
              height: img.height
            });
            return;
          }
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          canvas.width = options.width || img.width;
          canvas.height = options.width ? options.width / (img.width / img.height) : img.height;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          let index = file2.name.lastIndexOf(".");
          const fileName = file2.name.substring(0, index) + "." + options.mimeType;
          let res = createFile(canvas, fileName, options.quality);
          resolve({
            ...res,
            width: canvas.width,
            height: canvas.height
          });
        };
        img.onerror = () => {
          reject(new Error("Failed to load image file"));
        };
      };
      reader.onerror = () => {
        reject(new Error("Failed to load image file"));
      };
    });
  }
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function deepFreeze(obj) {
  if (obj instanceof Map) {
    obj.clear = obj.delete = obj.set = function() {
      throw new Error("map is read-only");
    };
  } else if (obj instanceof Set) {
    obj.add = obj.clear = obj.delete = function() {
      throw new Error("set is read-only");
    };
  }
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((name) => {
    const prop = obj[name];
    const type = typeof prop;
    if ((type === "object" || type === "function") && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });
  return obj;
}
class Response {
  /**
   * @param {CompiledMode} mode
   */
  constructor(mode) {
    if (mode.data === void 0)
      mode.data = {};
    this.data = mode.data;
    this.isMatchIgnored = false;
  }
  ignoreMatch() {
    this.isMatchIgnored = true;
  }
}
function escapeHTML(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function inherit$1(original, ...objects) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const key in original) {
    result[key] = original[key];
  }
  objects.forEach(function(obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return (
    /** @type {T} */
    result
  );
}
const SPAN_CLOSE = "</span>";
const emitsWrappingTags = (node) => {
  return !!node.scope;
};
const scopeToCSSClass = (name, { prefix }) => {
  if (name.startsWith("language:")) {
    return name.replace("language:", "language-");
  }
  if (name.includes(".")) {
    const pieces = name.split(".");
    return [
      `${prefix}${pieces.shift()}`,
      ...pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`)
    ].join(" ");
  }
  return `${prefix}${name}`;
};
class HTMLRenderer {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }
  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(text) {
    this.buffer += escapeHTML(text);
  }
  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(node) {
    if (!emitsWrappingTags(node))
      return;
    const className = scopeToCSSClass(
      node.scope,
      { prefix: this.classPrefix }
    );
    this.span(className);
  }
  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(node) {
    if (!emitsWrappingTags(node))
      return;
    this.buffer += SPAN_CLOSE;
  }
  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }
  // helpers
  /**
   * Builds a span element
   *
   * @param {string} className */
  span(className) {
    this.buffer += `<span class="${className}">`;
  }
}
const newNode = (opts = {}) => {
  const result = { children: [] };
  Object.assign(result, opts);
  return result;
};
class TokenTree {
  constructor() {
    this.rootNode = newNode();
    this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  /** @param {Node} node */
  add(node) {
    this.top.children.push(node);
  }
  /** @param {string} scope */
  openNode(scope) {
    const node = newNode({ scope });
    this.add(node);
    this.stack.push(node);
  }
  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
    return void 0;
  }
  closeAllNodes() {
    while (this.closeNode())
      ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(builder) {
    return this.constructor._walk(builder, this.rootNode);
  }
  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }
  /**
   * @param {Node} node
   */
  static _collapse(node) {
    if (typeof node === "string")
      return;
    if (!node.children)
      return;
    if (node.children.every((el) => typeof el === "string")) {
      node.children = [node.children.join("")];
    } else {
      node.children.forEach((child) => {
        TokenTree._collapse(child);
      });
    }
  }
}
class TokenTreeEmitter extends TokenTree {
  /**
   * @param {*} options
   */
  constructor(options) {
    super();
    this.options = options;
  }
  /**
   * @param {string} text
   */
  addText(text) {
    if (text === "") {
      return;
    }
    this.add(text);
  }
  /** @param {string} scope */
  startScope(scope) {
    this.openNode(scope);
  }
  endScope() {
    this.closeNode();
  }
  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  __addSublanguage(emitter, name) {
    const node = emitter.root;
    if (name)
      node.scope = `language:${name}`;
    this.add(node);
  }
  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }
  finalize() {
    this.closeAllNodes();
    return true;
  }
}
function source$1(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function lookahead$1(re) {
  return concat$1("(?=", re, ")");
}
function anyNumberOfTimes(re) {
  return concat$1("(?:", re, ")*");
}
function optional(re) {
  return concat$1("(?:", re, ")?");
}
function concat$1(...args) {
  const joined = args.map((x) => source$1(x)).join("");
  return joined;
}
function stripOptionsFromArgs$1(args) {
  const opts = args[args.length - 1];
  if (typeof opts === "object" && opts.constructor === Object) {
    args.splice(args.length - 1, 1);
    return opts;
  } else {
    return {};
  }
}
function either$1(...args) {
  const opts = stripOptionsFromArgs$1(args);
  const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source$1(x)).join("|") + ")";
  return joined;
}
function countMatchGroups(re) {
  return new RegExp(re.toString() + "|").exec("").length - 1;
}
function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
}
const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function _rewriteBackreferences(regexps, { joinWith }) {
  let numCaptures = 0;
  return regexps.map((regex) => {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source$1(regex);
    let out = "";
    while (re.length > 0) {
      const match = BACKREF_RE.exec(re);
      if (!match) {
        out += re;
        break;
      }
      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === "\\" && match[1]) {
        out += "\\" + String(Number(match[1]) + offset);
      } else {
        out += match[0];
        if (match[0] === "(") {
          numCaptures++;
        }
      }
    }
    return out;
  }).map((re) => `(${re})`).join(joinWith);
}
const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE$2 = "[a-zA-Z]\\w*";
const UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
const NUMBER_RE = "\\b\\d+(\\.\\d+)?";
const C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
const BINARY_NUMBER_RE = "\\b(0b[01]+)";
const RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
const SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;
  if (opts.binary) {
    opts.begin = concat$1(
      beginShebang,
      /.*\b/,
      opts.binary,
      /\b.*/
    );
  }
  return inherit$1({
    scope: "meta",
    begin: beginShebang,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (m, resp) => {
      if (m.index !== 0)
        resp.ignoreMatch();
    }
  }, opts);
};
const BACKSLASH_ESCAPE = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
};
const APOS_STRING_MODE = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [BACKSLASH_ESCAPE]
};
const QUOTE_STRING_MODE = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [BACKSLASH_ESCAPE]
};
const PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
const COMMENT = function(begin, end, modeOptions = {}) {
  const mode = inherit$1(
    {
      scope: "comment",
      begin,
      end,
      contains: []
    },
    modeOptions
  );
  mode.contains.push({
    scope: "doctag",
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: true,
    relevance: 0
  });
  const ENGLISH_WORD = either$1(
    // list of common 1 and 2 letter words in English
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
    // contractions - can't we'd they're let's, etc
    /[A-Za-z]+[-][a-z]+/,
    // `no-way`, etc.
    /[A-Za-z][a-z]{2,}/
    // allow capitalized words at beginning of sentences
  );
  mode.contains.push(
    {
      // TODO: how to include ", (, ) without breaking grammars that use these for
      // comment delimiters?
      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
      // ---
      // this tries to find sequences of 3 english words in a row (without any
      // "programming" type syntax) this gives us a strong signal that we've
      // TRULY found a comment - vs perhaps scanning with the wrong language.
      // It's possible to find something that LOOKS like the start of the
      // comment - but then if there is no readable text - good chance it is a
      // false match and not a comment.
      //
      // for a visual example please see:
      // https://github.com/highlightjs/highlight.js/issues/2827
      begin: concat$1(
        /[ ]+/,
        // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        "(",
        ENGLISH_WORD,
        /[.]?[:]?([.][ ]|[ ])/,
        "){3}"
      )
      // look for 3 words in a row
    }
  );
  return mode;
};
const C_LINE_COMMENT_MODE = COMMENT("//", "$");
const C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
const HASH_COMMENT_MODE = COMMENT("#", "$");
const NUMBER_MODE = {
  scope: "number",
  begin: NUMBER_RE,
  relevance: 0
};
const C_NUMBER_MODE = {
  scope: "number",
  begin: C_NUMBER_RE,
  relevance: 0
};
const BINARY_NUMBER_MODE = {
  scope: "number",
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
const REGEXP_MODE = {
  scope: "regexp",
  begin: /\/(?=[^/\n]*\/)/,
  end: /\/[gimuy]*/,
  contains: [
    BACKSLASH_ESCAPE,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [BACKSLASH_ESCAPE]
    }
  ]
};
const TITLE_MODE = {
  scope: "title",
  begin: IDENT_RE$2,
  relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
  scope: "title",
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
const METHOD_GUARD = {
  // excludes method names from keyword processing
  begin: "\\.\\s*" + UNDERSCORE_IDENT_RE,
  relevance: 0
};
const END_SAME_AS_BEGIN = function(mode) {
  return Object.assign(
    mode,
    {
      /** @type {ModeCallback} */
      "on:begin": (m, resp) => {
        resp.data._beginMatch = m[1];
      },
      /** @type {ModeCallback} */
      "on:end": (m, resp) => {
        if (resp.data._beginMatch !== m[1])
          resp.ignoreMatch();
      }
    }
  );
};
var MODES$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  APOS_STRING_MODE,
  BACKSLASH_ESCAPE,
  BINARY_NUMBER_MODE,
  BINARY_NUMBER_RE,
  COMMENT,
  C_BLOCK_COMMENT_MODE,
  C_LINE_COMMENT_MODE,
  C_NUMBER_MODE,
  C_NUMBER_RE,
  END_SAME_AS_BEGIN,
  HASH_COMMENT_MODE,
  IDENT_RE: IDENT_RE$2,
  MATCH_NOTHING_RE,
  METHOD_GUARD,
  NUMBER_MODE,
  NUMBER_RE,
  PHRASAL_WORDS_MODE,
  QUOTE_STRING_MODE,
  REGEXP_MODE,
  RE_STARTERS_RE,
  SHEBANG,
  TITLE_MODE,
  UNDERSCORE_IDENT_RE,
  UNDERSCORE_TITLE_MODE
});
function skipIfHasPrecedingDot(match, response) {
  const before = match.input[match.index - 1];
  if (before === ".") {
    response.ignoreMatch();
  }
}
function scopeClassName(mode, _parent) {
  if (mode.className !== void 0) {
    mode.scope = mode.className;
    delete mode.className;
  }
}
function beginKeywords(mode, parent) {
  if (!parent)
    return;
  if (!mode.beginKeywords)
    return;
  mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
  mode.__beforeBegin = skipIfHasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords;
  if (mode.relevance === void 0)
    mode.relevance = 0;
}
function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal))
    return;
  mode.illegal = either$1(...mode.illegal);
}
function compileMatch(mode, _parent) {
  if (!mode.match)
    return;
  if (mode.begin || mode.end)
    throw new Error("begin & end are not supported with match");
  mode.begin = mode.match;
  delete mode.match;
}
function compileRelevance(mode, _parent) {
  if (mode.relevance === void 0)
    mode.relevance = 1;
}
const beforeMatchExt = (mode, parent) => {
  if (!mode.beforeMatch)
    return;
  if (mode.starts)
    throw new Error("beforeMatch cannot be used with starts");
  const originalMode = Object.assign({}, mode);
  Object.keys(mode).forEach((key) => {
    delete mode[key];
  });
  mode.keywords = originalMode.keywords;
  mode.begin = concat$1(originalMode.beforeMatch, lookahead$1(originalMode.begin));
  mode.starts = {
    relevance: 0,
    contains: [
      Object.assign(originalMode, { endsParent: true })
    ]
  };
  mode.relevance = 0;
  delete originalMode.beforeMatch;
};
const COMMON_KEYWORDS = [
  "of",
  "and",
  "for",
  "in",
  "not",
  "or",
  "if",
  "then",
  "parent",
  // common variable name
  "list",
  // common variable name
  "value"
  // common variable name
];
const DEFAULT_KEYWORD_SCOPE = "keyword";
function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
  const compiledKeywords = /* @__PURE__ */ Object.create(null);
  if (typeof rawKeywords === "string") {
    compileList(scopeName, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(scopeName, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function(scopeName2) {
      Object.assign(
        compiledKeywords,
        compileKeywords(rawKeywords[scopeName2], caseInsensitive, scopeName2)
      );
    });
  }
  return compiledKeywords;
  function compileList(scopeName2, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map((x) => x.toLowerCase());
    }
    keywordList.forEach(function(keyword) {
      const pair = keyword.split("|");
      compiledKeywords[pair[0]] = [scopeName2, scoreForKeyword(pair[0], pair[1])];
    });
  }
}
function scoreForKeyword(keyword, providedScore) {
  if (providedScore) {
    return Number(providedScore);
  }
  return commonKeyword(keyword) ? 0 : 1;
}
function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}
const seenDeprecations = {};
const error = (message) => {
  console.error(message);
};
const warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};
const deprecated = (version2, message) => {
  if (seenDeprecations[`${version2}/${message}`])
    return;
  console.log(`Deprecated as of ${version2}. ${message}`);
  seenDeprecations[`${version2}/${message}`] = true;
};
const MultiClassError = new Error();
function remapScopeNames(mode, regexes, { key }) {
  let offset = 0;
  const scopeNames = mode[key];
  const emit = {};
  const positions = {};
  for (let i = 1; i <= regexes.length; i++) {
    positions[i + offset] = scopeNames[i];
    emit[i + offset] = true;
    offset += countMatchGroups(regexes[i - 1]);
  }
  mode[key] = positions;
  mode[key]._emit = emit;
  mode[key]._multi = true;
}
function beginMultiClass(mode) {
  if (!Array.isArray(mode.begin))
    return;
  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
    throw MultiClassError;
  }
  if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
    error("beginScope must be object");
    throw MultiClassError;
  }
  remapScopeNames(mode, mode.begin, { key: "beginScope" });
  mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
}
function endMultiClass(mode) {
  if (!Array.isArray(mode.end))
    return;
  if (mode.skip || mode.excludeEnd || mode.returnEnd) {
    error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
    throw MultiClassError;
  }
  if (typeof mode.endScope !== "object" || mode.endScope === null) {
    error("endScope must be object");
    throw MultiClassError;
  }
  remapScopeNames(mode, mode.end, { key: "endScope" });
  mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
}
function scopeSugar(mode) {
  if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
    mode.beginScope = mode.scope;
    delete mode.scope;
  }
}
function MultiClass(mode) {
  scopeSugar(mode);
  if (typeof mode.beginScope === "string") {
    mode.beginScope = { _wrap: mode.beginScope };
  }
  if (typeof mode.endScope === "string") {
    mode.endScope = { _wrap: mode.endScope };
  }
  beginMultiClass(mode);
  endMultiClass(mode);
}
function compileLanguage(language) {
  function langRe(value, global) {
    return new RegExp(
      source$1(value),
      "m" + (language.case_insensitive ? "i" : "") + (language.unicodeRegex ? "u" : "") + (global ? "g" : "")
    );
  }
  class MultiRegex {
    constructor() {
      this.matchIndexes = {};
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }
    // @ts-ignore
    addRule(re, opts) {
      opts.position = this.position++;
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }
    compile() {
      if (this.regexes.length === 0) {
        this.exec = () => null;
      }
      const terminators = this.regexes.map((el) => el[1]);
      this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: "|" }), true);
      this.lastIndex = 0;
    }
    /** @param {string} s */
    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s);
      if (!match) {
        return null;
      }
      const i = match.findIndex((el, i2) => i2 > 0 && el !== void 0);
      const matchData = this.matchIndexes[i];
      match.splice(0, i);
      return Object.assign(match, matchData);
    }
  }
  class ResumableMultiRegex {
    constructor() {
      this.rules = [];
      this.multiRegexes = [];
      this.count = 0;
      this.lastIndex = 0;
      this.regexIndex = 0;
    }
    // @ts-ignore
    getMatcher(index) {
      if (this.multiRegexes[index])
        return this.multiRegexes[index];
      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    // @ts-ignore
    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin")
        this.count++;
    }
    /** @param {string} s */
    exec(s) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s);
      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex)
          ;
        else {
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s);
        }
      }
      if (result) {
        this.regexIndex += result.position + 1;
        if (this.regexIndex === this.count) {
          this.considerAll();
        }
      }
      return result;
    }
  }
  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();
    mode.contains.forEach((term) => mm.addRule(term.begin, { rule: term, type: "begin" }));
    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, { type: "end" });
    }
    if (mode.illegal) {
      mm.addRule(mode.illegal, { type: "illegal" });
    }
    return mm;
  }
  function compileMode(mode, parent) {
    const cmode = (
      /** @type CompiledMode */
      mode
    );
    if (mode.isCompiled)
      return cmode;
    [
      scopeClassName,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      compileMatch,
      MultiClass,
      beforeMatchExt
    ].forEach((ext) => ext(mode, parent));
    language.compilerExtensions.forEach((ext) => ext(mode, parent));
    mode.__beforeBegin = null;
    [
      beginKeywords,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      compileIllegal,
      // default to 1 relevance if not specified
      compileRelevance
    ].forEach((ext) => ext(mode, parent));
    mode.isCompiled = true;
    let keywordPattern = null;
    if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
      mode.keywords = Object.assign({}, mode.keywords);
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }
    keywordPattern = keywordPattern || /\w+/;
    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }
    cmode.keywordPatternRe = langRe(keywordPattern, true);
    if (parent) {
      if (!mode.begin)
        mode.begin = /\B|\b/;
      cmode.beginRe = langRe(cmode.begin);
      if (!mode.end && !mode.endsWithParent)
        mode.end = /\B|\b/;
      if (mode.end)
        cmode.endRe = langRe(cmode.end);
      cmode.terminatorEnd = source$1(cmode.end) || "";
      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
      }
    }
    if (mode.illegal)
      cmode.illegalRe = langRe(
        /** @type {RegExp | string} */
        mode.illegal
      );
    if (!mode.contains)
      mode.contains = [];
    mode.contains = [].concat(...mode.contains.map(function(c2) {
      return expandOrCloneMode(c2 === "self" ? mode : c2);
    }));
    mode.contains.forEach(function(c2) {
      compileMode(
        /** @type Mode */
        c2,
        cmode
      );
    });
    if (mode.starts) {
      compileMode(mode.starts, parent);
    }
    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }
  if (!language.compilerExtensions)
    language.compilerExtensions = [];
  if (language.contains && language.contains.includes("self")) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  }
  language.classNameAliases = inherit$1(language.classNameAliases || {});
  return compileMode(
    /** @type Mode */
    language
  );
}
function dependencyOnParent(mode) {
  if (!mode)
    return false;
  return mode.endsWithParent || dependencyOnParent(mode.starts);
}
function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function(variant) {
      return inherit$1(mode, { variants: null }, variant);
    });
  }
  if (mode.cachedVariants) {
    return mode.cachedVariants;
  }
  if (dependencyOnParent(mode)) {
    return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
  }
  if (Object.isFrozen(mode)) {
    return inherit$1(mode);
  }
  return mode;
}
var version$1 = "11.9.0";
class HTMLInjectionError extends Error {
  constructor(reason, html) {
    super(reason);
    this.name = "HTMLInjectionError";
    this.html = html;
  }
}
const escape = escapeHTML;
const inherit = inherit$1;
const NO_MATCH = Symbol("nomatch");
const MAX_KEYWORD_HITS = 7;
const HLJS = function(hljs) {
  const languages2 = /* @__PURE__ */ Object.create(null);
  const aliases = /* @__PURE__ */ Object.create(null);
  const plugins = [];
  let SAFE_MODE = true;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: "Plain text", contains: [] };
  let options = {
    ignoreUnescapedHTML: false,
    throwUnescapedHTML: false,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }
  function blockLanguage(block) {
    let classes = block.className + " ";
    classes += block.parentNode ? block.parentNode.className : "";
    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : "no-highlight";
    }
    return classes.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }
  function highlight2(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
    let code = "";
    let languageName = "";
    if (typeof optionsOrCode === "object") {
      code = codeOrLanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
    } else {
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrLanguageName;
      code = optionsOrCode;
    }
    if (ignoreIllegals === void 0) {
      ignoreIllegals = true;
    }
    const context = {
      code,
      language: languageName
    };
    fire("before:highlight", context);
    const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
    result.code = context.code;
    fire("after:highlight", result);
    return result;
  }
  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    const keywordHits = /* @__PURE__ */ Object.create(null);
    function keywordData(mode, matchText) {
      return mode.keywords[matchText];
    }
    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }
      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";
      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
        const data2 = keywordData(top, word);
        if (data2) {
          const [kind, keywordRelevance] = data2;
          emitter.addText(buf);
          buf = "";
          keywordHits[word] = (keywordHits[word] || 0) + 1;
          if (keywordHits[word] <= MAX_KEYWORD_HITS)
            relevance += keywordRelevance;
          if (kind.startsWith("_")) {
            buf += match[0];
          } else {
            const cssClass = language.classNameAliases[kind] || kind;
            emitKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }
        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }
      buf += modeBuffer.substring(lastIndex);
      emitter.addText(buf);
    }
    function processSubLanguage() {
      if (modeBuffer === "")
        return;
      let result2 = null;
      if (typeof top.subLanguage === "string") {
        if (!languages2[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }
        result2 = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = /** @type {CompiledMode} */
        result2._top;
      } else {
        result2 = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      }
      if (top.relevance > 0) {
        relevance += result2.relevance;
      }
      emitter.__addSublanguage(result2._emitter, result2.language);
    }
    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }
      modeBuffer = "";
    }
    function emitKeyword(keyword, scope) {
      if (keyword === "")
        return;
      emitter.startScope(scope);
      emitter.addText(keyword);
      emitter.endScope();
    }
    function emitMultiClass(scope, match) {
      let i = 1;
      const max = match.length - 1;
      while (i <= max) {
        if (!scope._emit[i]) {
          i++;
          continue;
        }
        const klass = language.classNameAliases[scope[i]] || scope[i];
        const text = match[i];
        if (klass) {
          emitKeyword(text, klass);
        } else {
          modeBuffer = text;
          processKeywords();
          modeBuffer = "";
        }
        i++;
      }
    }
    function startNewMode(mode, match) {
      if (mode.scope && typeof mode.scope === "string") {
        emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
      }
      if (mode.beginScope) {
        if (mode.beginScope._wrap) {
          emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
          modeBuffer = "";
        } else if (mode.beginScope._multi) {
          emitMultiClass(mode.beginScope, match);
          modeBuffer = "";
        }
      }
      top = Object.create(mode, { parent: { value: top } });
      return top;
    }
    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);
      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored)
            matched = false;
        }
        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }
    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        modeBuffer += lexeme[0];
        return 1;
      } else {
        resumeScanAtSamePosition = true;
        return 0;
      }
    }
    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;
      const resp = new Response(newMode);
      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
      for (const cb of beforeCallbacks) {
        if (!cb)
          continue;
        cb(match, resp);
        if (resp.isMatchIgnored)
          return doIgnore(lexeme);
      }
      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }
      startNewMode(newMode, match);
      return newMode.returnBegin ? 0 : lexeme.length;
    }
    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substring(match.index);
      const endMode = endOfMode(top, match, matchPlusRemainder);
      if (!endMode) {
        return NO_MATCH;
      }
      const origin = top;
      if (top.endScope && top.endScope._wrap) {
        processBuffer();
        emitKeyword(lexeme, top.endScope._wrap);
      } else if (top.endScope && top.endScope._multi) {
        processBuffer();
        emitMultiClass(top.endScope, match);
      } else if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }
      do {
        if (top.scope) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== endMode.parent);
      if (endMode.starts) {
        startNewMode(endMode.starts, match);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }
    function processContinuations() {
      const list = [];
      for (let current = top; current !== language; current = current.parent) {
        if (current.scope) {
          list.unshift(current.scope);
        }
      }
      list.forEach((item) => emitter.openNode(item));
    }
    let lastMatch = {};
    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0];
      modeBuffer += textBeforeMatch;
      if (lexeme == null) {
        processBuffer();
        return 0;
      }
      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          const err = new Error(`0 width match regex (${languageName})`);
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }
        return 1;
      }
      lastMatch = match;
      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || "<unnamed>") + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);
        if (processed !== NO_MATCH) {
          return processed;
        }
      }
      if (match.type === "illegal" && lexeme === "") {
        return 1;
      }
      if (iterations > 1e5 && iterations > match.index * 3) {
        const err = new Error("potential infinite loop, way more iterations than matches");
        throw err;
      }
      modeBuffer += lexeme;
      return lexeme.length;
    }
    const language = getLanguage(languageName);
    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }
    const md = compileLanguage(language);
    let result = "";
    let top = continuation || md;
    const continuations = {};
    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = "";
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;
    try {
      if (!language.__emitTokens) {
        top.matcher.considerAll();
        for (; ; ) {
          iterations++;
          if (resumeScanAtSamePosition) {
            resumeScanAtSamePosition = false;
          } else {
            top.matcher.considerAll();
          }
          top.matcher.lastIndex = index;
          const match = top.matcher.exec(codeToHighlight);
          if (!match)
            break;
          const beforeMatch = codeToHighlight.substring(index, match.index);
          const processedCount = processLexeme(beforeMatch, match);
          index = match.index + processedCount;
        }
        processLexeme(codeToHighlight.substring(index));
      } else {
        language.__emitTokens(codeToHighlight, emitter);
      }
      emitter.finalize();
      result = emitter.toHTML();
      return {
        language: languageName,
        value: result,
        relevance,
        illegal: false,
        _emitter: emitter,
        _top: top
      };
    } catch (err) {
      if (err.message && err.message.includes("Illegal")) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: true,
          relevance: 0,
          _illegalBy: {
            message: err.message,
            index,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode,
            resultSoFar: result
          },
          _emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: false,
          relevance: 0,
          errorRaised: err,
          _emitter: emitter,
          _top: top
        };
      } else {
        throw err;
      }
    }
  }
  function justTextHighlightResult(code) {
    const result = {
      value: escape(code),
      illegal: false,
      relevance: 0,
      _top: PLAINTEXT_LANGUAGE,
      _emitter: new options.__emitter(options)
    };
    result._emitter.addText(code);
    return result;
  }
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages2);
    const plaintext2 = justTextHighlightResult(code);
    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(
      (name) => _highlight(name, code, false)
    );
    results.unshift(plaintext2);
    const sorted = results.sort((a, b) => {
      if (a.relevance !== b.relevance)
        return b.relevance - a.relevance;
      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }
      return 0;
    });
    const [best, secondBest] = sorted;
    const result = best;
    result.secondBest = secondBest;
    return result;
  }
  function updateClassName(element2, currentLang, resultLang) {
    const language = currentLang && aliases[currentLang] || resultLang;
    element2.classList.add("hljs");
    element2.classList.add(`language-${language}`);
  }
  function highlightElement(element2) {
    let node = null;
    const language = blockLanguage(element2);
    if (shouldNotHighlight(language))
      return;
    fire(
      "before:highlightElement",
      { el: element2, language }
    );
    if (element2.dataset.highlighted) {
      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element2);
      return;
    }
    if (element2.children.length > 0) {
      if (!options.ignoreUnescapedHTML) {
        console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
        console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
        console.warn("The element with unescaped HTML:");
        console.warn(element2);
      }
      if (options.throwUnescapedHTML) {
        const err = new HTMLInjectionError(
          "One of your code blocks includes unescaped HTML.",
          element2.innerHTML
        );
        throw err;
      }
    }
    node = element2;
    const text = node.textContent;
    const result = language ? highlight2(text, { language, ignoreIllegals: true }) : highlightAuto(text);
    element2.innerHTML = result.value;
    element2.dataset.highlighted = "yes";
    updateClassName(element2, language, result.language);
    element2.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relevance: result.relevance
    };
    if (result.secondBest) {
      element2.secondBest = {
        language: result.secondBest.language,
        relevance: result.secondBest.relevance
      };
    }
    fire("after:highlightElement", { el: element2, result, text });
  }
  function configure(userOptions) {
    options = inherit(options, userOptions);
  }
  const initHighlighting = () => {
    highlightAll();
    deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };
  function initHighlightingOnLoad() {
    highlightAll();
    deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }
  let wantsHighlight = false;
  function highlightAll() {
    if (document.readyState === "loading") {
      wantsHighlight = true;
      return;
    }
    const blocks = document.querySelectorAll(options.cssSelector);
    blocks.forEach(highlightElement);
  }
  function boot() {
    if (wantsHighlight)
      highlightAll();
  }
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("DOMContentLoaded", boot, false);
  }
  function registerLanguage(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      if (!SAFE_MODE) {
        throw error$1;
      } else {
        error(error$1);
      }
      lang = PLAINTEXT_LANGUAGE;
    }
    if (!lang.name)
      lang.name = languageName;
    languages2[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);
    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName });
    }
  }
  function unregisterLanguage(languageName) {
    delete languages2[languageName];
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }
  function listLanguages() {
    return Object.keys(languages2);
  }
  function getLanguage(name) {
    name = (name || "").toLowerCase();
    return languages2[name] || languages2[aliases[name]];
  }
  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === "string") {
      aliasList = [aliasList];
    }
    aliasList.forEach((alias) => {
      aliases[alias.toLowerCase()] = languageName;
    });
  }
  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }
  function upgradePluginAPI(plugin) {
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = (data2) => {
        plugin["before:highlightBlock"](
          Object.assign({ block: data2.el }, data2)
        );
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data2) => {
        plugin["after:highlightBlock"](
          Object.assign({ block: data2.el }, data2)
        );
      };
    }
  }
  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }
  function removePlugin(plugin) {
    const index = plugins.indexOf(plugin);
    if (index !== -1) {
      plugins.splice(index, 1);
    }
  }
  function fire(event2, args) {
    const cb = event2;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }
  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");
    return highlightElement(el);
  }
  Object.assign(hljs, {
    highlight: highlight2,
    highlightAuto,
    highlightAll,
    highlightElement,
    // TODO: Remove with v12 API
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    unregisterLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    autoDetection,
    inherit,
    addPlugin,
    removePlugin
  });
  hljs.debugMode = function() {
    SAFE_MODE = false;
  };
  hljs.safeMode = function() {
    SAFE_MODE = true;
  };
  hljs.versionString = version$1;
  hljs.regex = {
    concat: concat$1,
    lookahead: lookahead$1,
    either: either$1,
    optional,
    anyNumberOfTimes
  };
  for (const key in MODES$3) {
    if (typeof MODES$3[key] === "object") {
      deepFreeze(MODES$3[key]);
    }
  }
  Object.assign(hljs, MODES$3);
  return hljs;
};
const highlight = HLJS({});
highlight.newInstance = () => HLJS({});
var core = highlight;
highlight.HighlightJS = highlight;
highlight.default = highlight;
const HighlightJS = /* @__PURE__ */ getDefaultExportFromCjs(core);
function plaintext(hljs) {
  return {
    name: "Plain text",
    aliases: [
      "text",
      "txt"
    ],
    disableAutodetect: true
  };
}
function json(hljs) {
  const ATTRIBUTE = {
    className: "attr",
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  };
  const PUNCTUATION = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  };
  const LITERALS2 = [
    "true",
    "false",
    "null"
  ];
  const LITERALS_MODE = {
    scope: "literal",
    beginKeywords: LITERALS2.join(" ")
  };
  return {
    name: "JSON",
    keywords: {
      literal: LITERALS2
    },
    contains: [
      ATTRIBUTE,
      PUNCTUATION,
      hljs.QUOTE_STRING_MODE,
      LITERALS_MODE,
      hljs.C_NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}
const IDENT_RE$1 = "[A-Za-z$_][0-9A-Za-z$_]*";
const KEYWORDS$1 = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
];
const LITERALS$1 = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];
const TYPES$1 = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
];
const ERROR_TYPES$1 = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
const BUILT_IN_GLOBALS$1 = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];
const BUILT_IN_VARIABLES$1 = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
];
const BUILT_INS$1 = [].concat(
  BUILT_IN_GLOBALS$1,
  TYPES$1,
  ERROR_TYPES$1
);
function javascript$1(hljs) {
  const regex = hljs.regex;
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };
  const IDENT_RE$1$1 = IDENT_RE$1;
  const FRAGMENT = {
    begin: "<>",
    end: "</>"
  };
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
      ) {
        response.ignoreMatch();
        return;
      }
      if (nextChar === ">") {
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }
      let m;
      const afterMatch = match.input.substring(afterMatchIndex);
      if (m = afterMatch.match(/^\s*=/)) {
        response.ignoreMatch();
        return;
      }
      if (m = afterMatch.match(/^\s+extends\s+/)) {
        if (m.index === 0) {
          response.ignoreMatch();
          return;
        }
      }
    }
  };
  const KEYWORDS$1$1 = {
    $pattern: IDENT_RE$1,
    keyword: KEYWORDS$1,
    literal: LITERALS$1,
    built_in: BUILT_INS$1,
    "variable.language": BUILT_IN_VARIABLES$1
  };
  const decimalDigits2 = "[0-9](_?[0-9])*";
  const frac2 = `\\.(${decimalDigits2})`;
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac2})|\\.)?|(${frac2}))[eE][+-]?(${decimalDigits2})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac2})\\b|\\.)?|(${frac2})\\b` },
      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  };
  const SUBST = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: KEYWORDS$1$1,
    contains: []
    // defined later
  };
  const HTML_TEMPLATE = {
    begin: "html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "xml"
    }
  };
  const CSS_TEMPLATE = {
    begin: "css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "css"
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: "gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "graphql"
    }
  };
  const TEMPLATE_STRING = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    "\\*/",
    {
      relevance: 0,
      contains: [
        {
          begin: "(?=@[A-Za-z]+)",
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            },
            {
              className: "type",
              begin: "\\{",
              end: "\\}",
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: "variable",
              begin: IDENT_RE$1$1 + "(?=\\s*(-)|$)",
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT2 = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS$1$1,
    contains: [
      "self"
    ].concat(SUBST_INTERNALS)
  });
  const SUBST_AND_COMMENTS = [].concat(COMMENT2, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS$1$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1$1,
    contains: PARAMS_CONTAINS
  };
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1$1,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$1$1, "(", regex.concat(/\./, IDENT_RE$1$1), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1$1
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  };
  const CLASS_REFERENCE = {
    relevance: 0,
    match: regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES$1,
        ...ERROR_TYPES$1
      ]
    }
  };
  const USE_STRICT = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };
  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$1$1,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [PARAMS],
    illegal: /%/
  };
  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }
  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS$1,
        "super",
        "import"
      ]),
      IDENT_RE$1$1,
      regex.lookahead(/\(/)
    ),
    className: "title.function",
    relevance: 0
  };
  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$1$1, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$1$1,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };
  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$1$1,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };
  const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/,
      /\s+/,
      IDENT_RE$1$1,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: KEYWORDS$1$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT2,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        className: "attr",
        begin: IDENT_RE$1$1 + regex.lookahead(":"),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      {
        // "value" container
        begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          COMMENT2,
          hljs.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1$1, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + IDENT_RE$1$1,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [PARAMS]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
var decimalDigits$1 = "[0-9](_*[0-9])*";
var frac$1 = `\\.(${decimalDigits$1})`;
var hexDigits$1 = "[0-9a-fA-F](_*[0-9a-fA-F])*";
var NUMERIC$1 = {
  className: "number",
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${decimalDigits$1})((${frac$1})|\\.)?|(${frac$1}))[eE][+-]?(${decimalDigits$1})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${decimalDigits$1})((${frac$1})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${frac$1})[fFdD]?\\b` },
    { begin: `\\b(${decimalDigits$1})[fFdD]\\b` },
    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${hexDigits$1})\\.?|(${hexDigits$1})?\\.(${hexDigits$1}))[pP][+-]?(${decimalDigits$1})[fFdD]?\\b` },
    // DecimalIntegerLiteral
    { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
    // HexIntegerLiteral
    { begin: `\\b0[xX](${hexDigits$1})[lL]?\\b` },
    // OctalIntegerLiteral
    { begin: "\\b0(_*[0-7])*[lL]?\\b" },
    // BinaryIntegerLiteral
    { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
  ],
  relevance: 0
};
function recurRegex(re, substitution, depth) {
  if (depth === -1)
    return "";
  return re.replace(substitution, (_) => {
    return recurRegex(re, substitution, depth - 1);
  });
}
function java(hljs) {
  const regex = hljs.regex;
  const JAVA_IDENT_RE = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*";
  const GENERIC_IDENT_RE = JAVA_IDENT_RE + recurRegex("(?:<" + JAVA_IDENT_RE + "~~~(?:\\s*,\\s*" + JAVA_IDENT_RE + "~~~)*>)?", /~~~/g, 2);
  const MAIN_KEYWORDS = [
    "synchronized",
    "abstract",
    "private",
    "var",
    "static",
    "if",
    "const ",
    "for",
    "while",
    "strictfp",
    "finally",
    "protected",
    "import",
    "native",
    "final",
    "void",
    "enum",
    "else",
    "break",
    "transient",
    "catch",
    "instanceof",
    "volatile",
    "case",
    "assert",
    "package",
    "default",
    "public",
    "try",
    "switch",
    "continue",
    "throws",
    "protected",
    "public",
    "private",
    "module",
    "requires",
    "exports",
    "do",
    "sealed",
    "yield",
    "permits"
  ];
  const BUILT_INS2 = [
    "super",
    "this"
  ];
  const LITERALS2 = [
    "false",
    "true",
    "null"
  ];
  const TYPES2 = [
    "char",
    "boolean",
    "long",
    "float",
    "int",
    "byte",
    "short",
    "double"
  ];
  const KEYWORDS2 = {
    keyword: MAIN_KEYWORDS,
    literal: LITERALS2,
    type: TYPES2,
    built_in: BUILT_INS2
  };
  const ANNOTATION = {
    className: "meta",
    begin: "@" + JAVA_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self"]
        // allow nested () inside our annotation
      }
    ]
  };
  const PARAMS = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORDS2,
    relevance: 0,
    contains: [hljs.C_BLOCK_COMMENT_MODE],
    endsParent: true
  };
  return {
    name: "Java",
    aliases: ["jsp"],
    keywords: KEYWORDS2,
    illegal: /<\/|#/,
    contains: [
      hljs.COMMENT(
        "/\\*\\*",
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/,
              relevance: 0
            },
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            }
          ]
        }
      ),
      // relevance boost
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        begin: /"""/,
        end: /"""/,
        className: "string",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        match: [
          /\b(?:class|interface|enum|extends|implements|new)/,
          /\s+/,
          JAVA_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        // Exceptions for hyphenated keywords
        match: /non-sealed/,
        scope: "keyword"
      },
      {
        begin: [
          regex.concat(/(?!else)/, JAVA_IDENT_RE),
          /\s+/,
          JAVA_IDENT_RE,
          /\s+/,
          /=(?!=)/
        ],
        className: {
          1: "type",
          3: "variable",
          5: "operator"
        }
      },
      {
        begin: [
          /record/,
          /\s+/,
          JAVA_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        },
        contains: [
          PARAMS,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: "new throw return else",
        relevance: 0
      },
      {
        begin: [
          "(?:" + GENERIC_IDENT_RE + "\\s+)",
          hljs.UNDERSCORE_IDENT_RE,
          /\s*(?=\()/
        ],
        className: { 2: "title.function" },
        keywords: KEYWORDS2,
        contains: [
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: KEYWORDS2,
            relevance: 0,
            contains: [
              ANNOTATION,
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              NUMERIC$1,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      NUMERIC$1,
      ANNOTATION
    ]
  };
}
const IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
const KEYWORDS = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
];
const LITERALS = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];
const TYPES = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
];
const ERROR_TYPES = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
const BUILT_IN_GLOBALS = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];
const BUILT_IN_VARIABLES = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
];
const BUILT_INS = [].concat(
  BUILT_IN_GLOBALS,
  TYPES,
  ERROR_TYPES
);
function javascript(hljs) {
  const regex = hljs.regex;
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };
  const IDENT_RE$12 = IDENT_RE;
  const FRAGMENT = {
    begin: "<>",
    end: "</>"
  };
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
      ) {
        response.ignoreMatch();
        return;
      }
      if (nextChar === ">") {
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }
      let m;
      const afterMatch = match.input.substring(afterMatchIndex);
      if (m = afterMatch.match(/^\s*=/)) {
        response.ignoreMatch();
        return;
      }
      if (m = afterMatch.match(/^\s+extends\s+/)) {
        if (m.index === 0) {
          response.ignoreMatch();
          return;
        }
      }
    }
  };
  const KEYWORDS$12 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS,
    "variable.language": BUILT_IN_VARIABLES
  };
  const decimalDigits2 = "[0-9](_?[0-9])*";
  const frac2 = `\\.(${decimalDigits2})`;
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac2})|\\.)?|(${frac2}))[eE][+-]?(${decimalDigits2})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac2})\\b|\\.)?|(${frac2})\\b` },
      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  };
  const SUBST = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: KEYWORDS$12,
    contains: []
    // defined later
  };
  const HTML_TEMPLATE = {
    begin: "html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "xml"
    }
  };
  const CSS_TEMPLATE = {
    begin: "css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "css"
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: "gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "graphql"
    }
  };
  const TEMPLATE_STRING = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    "\\*/",
    {
      relevance: 0,
      contains: [
        {
          begin: "(?=@[A-Za-z]+)",
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            },
            {
              className: "type",
              begin: "\\{",
              end: "\\}",
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: "variable",
              begin: IDENT_RE$12 + "(?=\\s*(-)|$)",
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT2 = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS$12,
    contains: [
      "self"
    ].concat(SUBST_INTERNALS)
  });
  const SUBST_AND_COMMENTS = [].concat(COMMENT2, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS$12,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$12,
    contains: PARAMS_CONTAINS
  };
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$12,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$12, "(", regex.concat(/\./, IDENT_RE$12), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$12
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  };
  const CLASS_REFERENCE = {
    relevance: 0,
    match: regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES,
        ...ERROR_TYPES
      ]
    }
  };
  const USE_STRICT = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };
  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$12,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [PARAMS],
    illegal: /%/
  };
  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }
  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS,
        "super",
        "import"
      ]),
      IDENT_RE$12,
      regex.lookahead(/\(/)
    ),
    className: "title.function",
    relevance: 0
  };
  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$12, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$12,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };
  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$12,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };
  const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/,
      /\s+/,
      IDENT_RE$12,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: KEYWORDS$12,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT2,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        className: "attr",
        begin: IDENT_RE$12 + regex.lookahead(":"),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      {
        // "value" container
        begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          COMMENT2,
          hljs.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$12,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$12, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + IDENT_RE$12,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [PARAMS]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function typescript(hljs) {
  const tsLanguage = javascript(hljs);
  const IDENT_RE$12 = IDENT_RE;
  const TYPES2 = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ];
  const NAMESPACE = {
    beginKeywords: "namespace",
    end: /\{/,
    excludeEnd: true,
    contains: [tsLanguage.exports.CLASS_REFERENCE]
  };
  const INTERFACE = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: true,
    keywords: {
      keyword: "interface extends",
      built_in: TYPES2
    },
    contains: [tsLanguage.exports.CLASS_REFERENCE]
  };
  const USE_STRICT = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  };
  const TS_SPECIFIC_KEYWORDS = [
    "type",
    "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override"
  ];
  const KEYWORDS$12 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS.concat(TS_SPECIFIC_KEYWORDS),
    literal: LITERALS,
    built_in: BUILT_INS.concat(TYPES2),
    "variable.language": BUILT_IN_VARIABLES
  };
  const DECORATOR = {
    className: "meta",
    begin: "@" + IDENT_RE$12
  };
  const swapMode = (mode, label, replacement) => {
    const indx = mode.contains.findIndex((m) => m.label === label);
    if (indx === -1) {
      throw new Error("can not find mode to replace");
    }
    mode.contains.splice(indx, 1, replacement);
  };
  Object.assign(tsLanguage.keywords, KEYWORDS$12);
  tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
  tsLanguage.contains = tsLanguage.contains.concat([
    DECORATOR,
    NAMESPACE,
    INTERFACE
  ]);
  swapMode(tsLanguage, "shebang", hljs.SHEBANG());
  swapMode(tsLanguage, "use_strict", USE_STRICT);
  const functionDeclaration = tsLanguage.contains.find((m) => m.label === "func.def");
  functionDeclaration.relevance = 0;
  Object.assign(tsLanguage, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  });
  return tsLanguage;
}
function python(hljs) {
  const regex = hljs.regex;
  const IDENT_RE2 = new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*", "u");
  const RESERVED_WORDS = [
    "and",
    "as",
    "assert",
    "async",
    "await",
    "break",
    "case",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "match",
    "nonlocal|10",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield"
  ];
  const BUILT_INS2 = [
    "__import__",
    "abs",
    "all",
    "any",
    "ascii",
    "bin",
    "bool",
    "breakpoint",
    "bytearray",
    "bytes",
    "callable",
    "chr",
    "classmethod",
    "compile",
    "complex",
    "delattr",
    "dict",
    "dir",
    "divmod",
    "enumerate",
    "eval",
    "exec",
    "filter",
    "float",
    "format",
    "frozenset",
    "getattr",
    "globals",
    "hasattr",
    "hash",
    "help",
    "hex",
    "id",
    "input",
    "int",
    "isinstance",
    "issubclass",
    "iter",
    "len",
    "list",
    "locals",
    "map",
    "max",
    "memoryview",
    "min",
    "next",
    "object",
    "oct",
    "open",
    "ord",
    "pow",
    "print",
    "property",
    "range",
    "repr",
    "reversed",
    "round",
    "set",
    "setattr",
    "slice",
    "sorted",
    "staticmethod",
    "str",
    "sum",
    "super",
    "tuple",
    "type",
    "vars",
    "zip"
  ];
  const LITERALS2 = [
    "__debug__",
    "Ellipsis",
    "False",
    "None",
    "NotImplemented",
    "True"
  ];
  const TYPES2 = [
    "Any",
    "Callable",
    "Coroutine",
    "Dict",
    "List",
    "Literal",
    "Generic",
    "Optional",
    "Sequence",
    "Set",
    "Tuple",
    "Type",
    "Union"
  ];
  const KEYWORDS2 = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS2,
    literal: LITERALS2,
    type: TYPES2
  };
  const PROMPT = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  };
  const SUBST = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS2,
    illegal: /#/
  };
  const LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0
  };
  const STRING = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
  const digitpart = "[0-9](_?[0-9])*";
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  const lookahead2 = `\\b|${RESERVED_WORDS.join("|")}`;
  const NUMBER = {
    className: "number",
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?(?=${lookahead2})`
      },
      {
        begin: `(${pointfloat})[jJ]?`
      },
      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${lookahead2})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${lookahead2})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${lookahead2})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${lookahead2})`
      },
      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${digitpart})[jJ](?=${lookahead2})`
      }
    ]
  };
  const COMMENT_TYPE = {
    className: "comment",
    begin: regex.lookahead(/# type:/),
    end: /$/,
    keywords: KEYWORDS2,
    contains: [
      {
        // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: true
      }
    ]
  };
  const PARAMS = {
    className: "params",
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: true
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS2,
        contains: [
          "self",
          PROMPT,
          NUMBER,
          STRING,
          hljs.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  SUBST.contains = [
    STRING,
    NUMBER,
    PROMPT
  ];
  return {
    name: "Python",
    aliases: [
      "py",
      "gyp",
      "ipython"
    ],
    unicodeRegex: true,
    keywords: KEYWORDS2,
    illegal: /(<\/|\?)|=>/,
    contains: [
      PROMPT,
      NUMBER,
      {
        // very common convention
        begin: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      STRING,
      COMMENT_TYPE,
      hljs.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/,
          /\s+/,
          IDENT_RE2
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [PARAMS]
      },
      {
        variants: [
          {
            match: [
              /\bclass/,
              /\s+/,
              IDENT_RE2,
              /\s*/,
              /\(\s*/,
              IDENT_RE2,
              /\s*\)/
            ]
          },
          {
            match: [
              /\bclass/,
              /\s+/,
              IDENT_RE2
            ]
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited"
        }
      },
      {
        className: "meta",
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          NUMBER,
          PARAMS,
          STRING
        ]
      }
    ]
  };
}
function php(hljs) {
  const regex = hljs.regex;
  const NOT_PERL_ETC = /(?![A-Za-z0-9])(?![$])/;
  const IDENT_RE2 = regex.concat(
    /[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/,
    NOT_PERL_ETC
  );
  const PASCAL_CASE_CLASS_NAME_RE = regex.concat(
    /(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/,
    NOT_PERL_ETC
  );
  const VARIABLE = {
    scope: "variable",
    match: "\\$+" + IDENT_RE2
  };
  const PREPROCESSOR = {
    scope: "meta",
    variants: [
      { begin: /<\?php/, relevance: 10 },
      // boost for obvious PHP
      { begin: /<\?=/ },
      // less relevant per PSR-1 which says not to use short-tags
      { begin: /<\?/, relevance: 0.1 },
      { begin: /\?>/ }
      // end php tag
    ]
  };
  const SUBST = {
    scope: "subst",
    variants: [
      { begin: /\$\w+/ },
      {
        begin: /\{\$/,
        end: /\}/
      }
    ]
  };
  const SINGLE_QUOTED = hljs.inherit(hljs.APOS_STRING_MODE, { illegal: null });
  const DOUBLE_QUOTED = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST)
  });
  const HEREDOC = {
    begin: /<<<[ \t]*(?:(\w+)|"(\w+)")\n/,
    end: /[ \t]*(\w+)\b/,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
    "on:begin": (m, resp) => {
      resp.data._beginMatch = m[1] || m[2];
    },
    "on:end": (m, resp) => {
      if (resp.data._beginMatch !== m[1])
        resp.ignoreMatch();
    }
  };
  const NOWDOC = hljs.END_SAME_AS_BEGIN({
    begin: /<<<[ \t]*'(\w+)'\n/,
    end: /[ \t]*(\w+)\b/
  });
  const WHITESPACE = "[ 	\n]";
  const STRING = {
    scope: "string",
    variants: [
      DOUBLE_QUOTED,
      SINGLE_QUOTED,
      HEREDOC,
      NOWDOC
    ]
  };
  const NUMBER = {
    scope: "number",
    variants: [
      { begin: `\\b0[bB][01]+(?:_[01]+)*\\b` },
      // Binary w/ underscore support
      { begin: `\\b0[oO][0-7]+(?:_[0-7]+)*\\b` },
      // Octals w/ underscore support
      { begin: `\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b` },
      // Hex w/ underscore support
      // Decimals w/ underscore support, with optional fragments and scientific exponent (e) suffix.
      { begin: `(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?` }
    ],
    relevance: 0
  };
  const LITERALS2 = [
    "false",
    "null",
    "true"
  ];
  const KWS = [
    // Magic constants:
    // <https://www.php.net/manual/en/language.constants.predefined.php>
    "__CLASS__",
    "__DIR__",
    "__FILE__",
    "__FUNCTION__",
    "__COMPILER_HALT_OFFSET__",
    "__LINE__",
    "__METHOD__",
    "__NAMESPACE__",
    "__TRAIT__",
    // Function that look like language construct or language construct that look like function:
    // List of keywords that may not require parenthesis
    "die",
    "echo",
    "exit",
    "include",
    "include_once",
    "print",
    "require",
    "require_once",
    // These are not language construct (function) but operate on the currently-executing function and can access the current symbol table
    // 'compact extract func_get_arg func_get_args func_num_args get_called_class get_parent_class ' +
    // Other keywords:
    // <https://www.php.net/manual/en/reserved.php>
    // <https://www.php.net/manual/en/language.types.type-juggling.php>
    "array",
    "abstract",
    "and",
    "as",
    "binary",
    "bool",
    "boolean",
    "break",
    "callable",
    "case",
    "catch",
    "class",
    "clone",
    "const",
    "continue",
    "declare",
    "default",
    "do",
    "double",
    "else",
    "elseif",
    "empty",
    "enddeclare",
    "endfor",
    "endforeach",
    "endif",
    "endswitch",
    "endwhile",
    "enum",
    "eval",
    "extends",
    "final",
    "finally",
    "float",
    "for",
    "foreach",
    "from",
    "global",
    "goto",
    "if",
    "implements",
    "instanceof",
    "insteadof",
    "int",
    "integer",
    "interface",
    "isset",
    "iterable",
    "list",
    "match|0",
    "mixed",
    "new",
    "never",
    "object",
    "or",
    "private",
    "protected",
    "public",
    "readonly",
    "real",
    "return",
    "string",
    "switch",
    "throw",
    "trait",
    "try",
    "unset",
    "use",
    "var",
    "void",
    "while",
    "xor",
    "yield"
  ];
  const BUILT_INS2 = [
    // Standard PHP library:
    // <https://www.php.net/manual/en/book.spl.php>
    "Error|0",
    "AppendIterator",
    "ArgumentCountError",
    "ArithmeticError",
    "ArrayIterator",
    "ArrayObject",
    "AssertionError",
    "BadFunctionCallException",
    "BadMethodCallException",
    "CachingIterator",
    "CallbackFilterIterator",
    "CompileError",
    "Countable",
    "DirectoryIterator",
    "DivisionByZeroError",
    "DomainException",
    "EmptyIterator",
    "ErrorException",
    "Exception",
    "FilesystemIterator",
    "FilterIterator",
    "GlobIterator",
    "InfiniteIterator",
    "InvalidArgumentException",
    "IteratorIterator",
    "LengthException",
    "LimitIterator",
    "LogicException",
    "MultipleIterator",
    "NoRewindIterator",
    "OutOfBoundsException",
    "OutOfRangeException",
    "OuterIterator",
    "OverflowException",
    "ParentIterator",
    "ParseError",
    "RangeException",
    "RecursiveArrayIterator",
    "RecursiveCachingIterator",
    "RecursiveCallbackFilterIterator",
    "RecursiveDirectoryIterator",
    "RecursiveFilterIterator",
    "RecursiveIterator",
    "RecursiveIteratorIterator",
    "RecursiveRegexIterator",
    "RecursiveTreeIterator",
    "RegexIterator",
    "RuntimeException",
    "SeekableIterator",
    "SplDoublyLinkedList",
    "SplFileInfo",
    "SplFileObject",
    "SplFixedArray",
    "SplHeap",
    "SplMaxHeap",
    "SplMinHeap",
    "SplObjectStorage",
    "SplObserver",
    "SplPriorityQueue",
    "SplQueue",
    "SplStack",
    "SplSubject",
    "SplTempFileObject",
    "TypeError",
    "UnderflowException",
    "UnexpectedValueException",
    "UnhandledMatchError",
    // Reserved interfaces:
    // <https://www.php.net/manual/en/reserved.interfaces.php>
    "ArrayAccess",
    "BackedEnum",
    "Closure",
    "Fiber",
    "Generator",
    "Iterator",
    "IteratorAggregate",
    "Serializable",
    "Stringable",
    "Throwable",
    "Traversable",
    "UnitEnum",
    "WeakReference",
    "WeakMap",
    // Reserved classes:
    // <https://www.php.net/manual/en/reserved.classes.php>
    "Directory",
    "__PHP_Incomplete_Class",
    "parent",
    "php_user_filter",
    "self",
    "static",
    "stdClass"
  ];
  const dualCase = (items) => {
    const result = [];
    items.forEach((item) => {
      result.push(item);
      if (item.toLowerCase() === item) {
        result.push(item.toUpperCase());
      } else {
        result.push(item.toLowerCase());
      }
    });
    return result;
  };
  const KEYWORDS2 = {
    keyword: KWS,
    literal: dualCase(LITERALS2),
    built_in: BUILT_INS2
  };
  const normalizeKeywords = (items) => {
    return items.map((item) => {
      return item.replace(/\|\d+$/, "");
    });
  };
  const CONSTRUCTOR_CALL = { variants: [
    {
      match: [
        /new/,
        regex.concat(WHITESPACE, "+"),
        // to prevent built ins from being confused as the class constructor call
        regex.concat("(?!", normalizeKeywords(BUILT_INS2).join("\\b|"), "\\b)"),
        PASCAL_CASE_CLASS_NAME_RE
      ],
      scope: {
        1: "keyword",
        4: "title.class"
      }
    }
  ] };
  const CONSTANT_REFERENCE = regex.concat(IDENT_RE2, "\\b(?!\\()");
  const LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON = { variants: [
    {
      match: [
        regex.concat(
          /::/,
          regex.lookahead(/(?!class\b)/)
        ),
        CONSTANT_REFERENCE
      ],
      scope: { 2: "variable.constant" }
    },
    {
      match: [
        /::/,
        /class/
      ],
      scope: { 2: "variable.language" }
    },
    {
      match: [
        PASCAL_CASE_CLASS_NAME_RE,
        regex.concat(
          /::/,
          regex.lookahead(/(?!class\b)/)
        ),
        CONSTANT_REFERENCE
      ],
      scope: {
        1: "title.class",
        3: "variable.constant"
      }
    },
    {
      match: [
        PASCAL_CASE_CLASS_NAME_RE,
        regex.concat(
          "::",
          regex.lookahead(/(?!class\b)/)
        )
      ],
      scope: { 1: "title.class" }
    },
    {
      match: [
        PASCAL_CASE_CLASS_NAME_RE,
        /::/,
        /class/
      ],
      scope: {
        1: "title.class",
        3: "variable.language"
      }
    }
  ] };
  const NAMED_ARGUMENT = {
    scope: "attr",
    match: regex.concat(IDENT_RE2, regex.lookahead(":"), regex.lookahead(/(?!::)/))
  };
  const PARAMS_MODE = {
    relevance: 0,
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORDS2,
    contains: [
      NAMED_ARGUMENT,
      VARIABLE,
      LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
      hljs.C_BLOCK_COMMENT_MODE,
      STRING,
      NUMBER,
      CONSTRUCTOR_CALL
    ]
  };
  const FUNCTION_INVOKE = {
    relevance: 0,
    match: [
      /\b/,
      // to prevent keywords from being confused as the function title
      regex.concat("(?!fn\\b|function\\b|", normalizeKeywords(KWS).join("\\b|"), "|", normalizeKeywords(BUILT_INS2).join("\\b|"), "\\b)"),
      IDENT_RE2,
      regex.concat(WHITESPACE, "*"),
      regex.lookahead(/(?=\()/)
    ],
    scope: { 3: "title.function.invoke" },
    contains: [PARAMS_MODE]
  };
  PARAMS_MODE.contains.push(FUNCTION_INVOKE);
  const ATTRIBUTE_CONTAINS = [
    NAMED_ARGUMENT,
    LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
    hljs.C_BLOCK_COMMENT_MODE,
    STRING,
    NUMBER,
    CONSTRUCTOR_CALL
  ];
  const ATTRIBUTES2 = {
    begin: regex.concat(/#\[\s*/, PASCAL_CASE_CLASS_NAME_RE),
    beginScope: "meta",
    end: /]/,
    endScope: "meta",
    keywords: {
      literal: LITERALS2,
      keyword: [
        "new",
        "array"
      ]
    },
    contains: [
      {
        begin: /\[/,
        end: /]/,
        keywords: {
          literal: LITERALS2,
          keyword: [
            "new",
            "array"
          ]
        },
        contains: [
          "self",
          ...ATTRIBUTE_CONTAINS
        ]
      },
      ...ATTRIBUTE_CONTAINS,
      {
        scope: "meta",
        match: PASCAL_CASE_CLASS_NAME_RE
      }
    ]
  };
  return {
    case_insensitive: false,
    keywords: KEYWORDS2,
    contains: [
      ATTRIBUTES2,
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT("//", "$"),
      hljs.COMMENT(
        "/\\*",
        "\\*/",
        { contains: [
          {
            scope: "doctag",
            match: "@[A-Za-z]+"
          }
        ] }
      ),
      {
        match: /__halt_compiler\(\);/,
        keywords: "__halt_compiler",
        starts: {
          scope: "comment",
          end: hljs.MATCH_NOTHING_RE,
          contains: [
            {
              match: /\?>/,
              scope: "meta",
              endsParent: true
            }
          ]
        }
      },
      PREPROCESSOR,
      {
        scope: "variable.language",
        match: /\$this\b/
      },
      VARIABLE,
      FUNCTION_INVOKE,
      LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
      {
        match: [
          /const/,
          /\s/,
          IDENT_RE2
        ],
        scope: {
          1: "keyword",
          3: "variable.constant"
        }
      },
      CONSTRUCTOR_CALL,
      {
        scope: "function",
        relevance: 0,
        beginKeywords: "fn function",
        end: /[;{]/,
        excludeEnd: true,
        illegal: "[$%\\[]",
        contains: [
          { beginKeywords: "use" },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            begin: "=>",
            // No markup, just a relevance booster
            endsParent: true
          },
          {
            scope: "params",
            begin: "\\(",
            end: "\\)",
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS2,
            contains: [
              "self",
              VARIABLE,
              LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
              hljs.C_BLOCK_COMMENT_MODE,
              STRING,
              NUMBER
            ]
          }
        ]
      },
      {
        scope: "class",
        variants: [
          {
            beginKeywords: "enum",
            illegal: /[($"]/
          },
          {
            beginKeywords: "class interface trait",
            illegal: /[:($"]/
          }
        ],
        relevance: 0,
        end: /\{/,
        excludeEnd: true,
        contains: [
          { beginKeywords: "extends implements" },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      // both use and namespace still use "old style" rules (vs multi-match)
      // because the namespace name can include `\` and we still want each
      // element to be treated as its own *individual* title
      {
        beginKeywords: "namespace",
        relevance: 0,
        end: ";",
        illegal: /[.']/,
        contains: [hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, { scope: "title.class" })]
      },
      {
        beginKeywords: "use",
        relevance: 0,
        end: ";",
        contains: [
          // TODO: title.function vs title.class
          {
            match: /\b(as|const|function)\b/,
            scope: "keyword"
          },
          // TODO: could be title.class or title.function
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      STRING,
      NUMBER
    ]
  };
}
const MODES$2 = (hljs) => {
  return {
    IMPORTANT: {
      scope: "meta",
      begin: "!important"
    },
    BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: "number",
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: "selector-attr",
      begin: /\[/,
      end: /\]/,
      illegal: "$",
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
      ]
    },
    CSS_NUMBER_MODE: {
      scope: "number",
      begin: hljs.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z_][A-Za-z0-9_-]*/
    }
  };
};
const TAGS$2 = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "p",
  "q",
  "quote",
  "samp",
  "section",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
];
const MEDIA_FEATURES$2 = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
];
const PSEUDO_CLASSES$2 = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
];
const PSEUDO_ELEMENTS$2 = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
];
const ATTRIBUTES$2 = [
  "align-content",
  "align-items",
  "align-self",
  "all",
  "animation",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-timing-function",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-repeat",
  "background-size",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-decoration-break",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "direction",
  "display",
  "empty-cells",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-size",
  "font-size-adjust",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-variant",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "gap",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "inline-size",
  "isolation",
  "justify-content",
  "left",
  "letter-spacing",
  "line-break",
  "line-height",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "pointer-events",
  "position",
  "quotes",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "row-gap",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-style",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-transform",
  "text-underline-position",
  "top",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "unicode-bidi",
  "vertical-align",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "z-index"
  // reverse makes sure longer attributes `font-weight` are matched fully
  // instead of getting false positives on say `font`
].reverse();
function css(hljs) {
  const regex = hljs.regex;
  const modes = MODES$2(hljs);
  const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };
  const AT_MODIFIERS = "and or not only";
  const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/;
  const IDENT_RE2 = "[a-zA-Z-][a-zA-Z0-9_-]*";
  const STRINGS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ];
  return {
    name: "CSS",
    case_insensitive: true,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [
      modes.BLOCK_COMMENT,
      VENDOR_PREFIX,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      modes.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + IDENT_RE2,
        relevance: 0
      },
      modes.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + PSEUDO_CLASSES$2.join("|") + ")" },
          { begin: ":(:)?(" + PSEUDO_ELEMENTS$2.join("|") + ")" }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      modes.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + ATTRIBUTES$2.join("|") + ")\\b"
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          modes.BLOCK_COMMENT,
          modes.HEXCOLOR,
          modes.IMPORTANT,
          modes.CSS_NUMBER_MODE,
          ...STRINGS,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would tigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...STRINGS,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: true,
                excludeEnd: true
              }
            ]
          },
          modes.FUNCTION_DISPATCH
        ]
      },
      {
        begin: regex.lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        // break on Less variables @var: ...
        contains: [
          {
            className: "keyword",
            begin: AT_PROPERTY_RE
          },
          {
            begin: /\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: AT_MODIFIERS,
              attribute: MEDIA_FEATURES$2.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...STRINGS,
              modes.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + TAGS$2.join("|") + ")\\b"
      }
    ]
  };
}
const MODES$1 = (hljs) => {
  return {
    IMPORTANT: {
      scope: "meta",
      begin: "!important"
    },
    BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: "number",
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: "selector-attr",
      begin: /\[/,
      end: /\]/,
      illegal: "$",
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
      ]
    },
    CSS_NUMBER_MODE: {
      scope: "number",
      begin: hljs.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z_][A-Za-z0-9_-]*/
    }
  };
};
const TAGS$1 = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "p",
  "q",
  "quote",
  "samp",
  "section",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
];
const MEDIA_FEATURES$1 = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
];
const PSEUDO_CLASSES$1 = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
];
const PSEUDO_ELEMENTS$1 = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
];
const ATTRIBUTES$1 = [
  "align-content",
  "align-items",
  "align-self",
  "all",
  "animation",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-timing-function",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-repeat",
  "background-size",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-decoration-break",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "direction",
  "display",
  "empty-cells",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-size",
  "font-size-adjust",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-variant",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "gap",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "inline-size",
  "isolation",
  "justify-content",
  "left",
  "letter-spacing",
  "line-break",
  "line-height",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "pointer-events",
  "position",
  "quotes",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "row-gap",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-style",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-transform",
  "text-underline-position",
  "top",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "unicode-bidi",
  "vertical-align",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "z-index"
  // reverse makes sure longer attributes `font-weight` are matched fully
  // instead of getting false positives on say `font`
].reverse();
const PSEUDO_SELECTORS = PSEUDO_CLASSES$1.concat(PSEUDO_ELEMENTS$1);
function less(hljs) {
  const modes = MODES$1(hljs);
  const PSEUDO_SELECTORS$1 = PSEUDO_SELECTORS;
  const AT_MODIFIERS = "and or not only";
  const IDENT_RE2 = "[\\w-]+";
  const INTERP_IDENT_RE = "(" + IDENT_RE2 + "|@\\{" + IDENT_RE2 + "\\})";
  const RULES = [];
  const VALUE_MODES = [];
  const STRING_MODE = function(c2) {
    return {
      // Less strings are not multiline (also include '~' for more consistent coloring of "escaped" strings)
      className: "string",
      begin: "~?" + c2 + ".*?" + c2
    };
  };
  const IDENT_MODE = function(name, begin, relevance) {
    return {
      className: name,
      begin,
      relevance
    };
  };
  const AT_KEYWORDS = {
    $pattern: /[a-z-]+/,
    keyword: AT_MODIFIERS,
    attribute: MEDIA_FEATURES$1.join(" ")
  };
  const PARENS_MODE = {
    // used only to properly balance nested parens inside mixin call, def. arg list
    begin: "\\(",
    end: "\\)",
    contains: VALUE_MODES,
    keywords: AT_KEYWORDS,
    relevance: 0
  };
  VALUE_MODES.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    STRING_MODE("'"),
    STRING_MODE('"'),
    modes.CSS_NUMBER_MODE,
    // fixme: it does not include dot for numbers like .5em :(
    {
      begin: "(url|data-uri)\\(",
      starts: {
        className: "string",
        end: "[\\)\\n]",
        excludeEnd: true
      }
    },
    modes.HEXCOLOR,
    PARENS_MODE,
    IDENT_MODE("variable", "@@?" + IDENT_RE2, 10),
    IDENT_MODE("variable", "@\\{" + IDENT_RE2 + "\\}"),
    IDENT_MODE("built_in", "~?`[^`]*?`"),
    // inline javascript (or whatever host language) *multiline* string
    {
      // @media features (it’s here to not duplicate things in AT_RULE_MODE with extra PARENS_MODE overriding):
      className: "attribute",
      begin: IDENT_RE2 + "\\s*:",
      end: ":",
      returnBegin: true,
      excludeEnd: true
    },
    modes.IMPORTANT,
    { beginKeywords: "and not" },
    modes.FUNCTION_DISPATCH
  );
  const VALUE_WITH_RULESETS = VALUE_MODES.concat({
    begin: /\{/,
    end: /\}/,
    contains: RULES
  });
  const MIXIN_GUARD_MODE = {
    beginKeywords: "when",
    endsWithParent: true,
    contains: [{ beginKeywords: "and not" }].concat(VALUE_MODES)
    // using this form to override VALUE’s 'function' match
  };
  const RULE_MODE = {
    begin: INTERP_IDENT_RE + "\\s*:",
    returnBegin: true,
    end: /[;}]/,
    relevance: 0,
    contains: [
      { begin: /-(webkit|moz|ms|o)-/ },
      modes.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + ATTRIBUTES$1.join("|") + ")\\b",
        end: /(?=:)/,
        starts: {
          endsWithParent: true,
          illegal: "[<=$]",
          relevance: 0,
          contains: VALUE_MODES
        }
      }
    ]
  };
  const AT_RULE_MODE = {
    className: "keyword",
    begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
    starts: {
      end: "[;{}]",
      keywords: AT_KEYWORDS,
      returnEnd: true,
      contains: VALUE_MODES,
      relevance: 0
    }
  };
  const VAR_RULE_MODE = {
    className: "variable",
    variants: [
      // using more strict pattern for higher relevance to increase chances of Less detection.
      // this is *the only* Less specific statement used in most of the sources, so...
      // (we’ll still often loose to the css-parser unless there's '//' comment,
      // simply because 1 variable just can't beat 99 properties :)
      {
        begin: "@" + IDENT_RE2 + "\\s*:",
        relevance: 15
      },
      { begin: "@" + IDENT_RE2 }
    ],
    starts: {
      end: "[;}]",
      returnEnd: true,
      contains: VALUE_WITH_RULESETS
    }
  };
  const SELECTOR_MODE = {
    // first parse unambiguous selectors (i.e. those not starting with tag)
    // then fall into the scary lookahead-discriminator variant.
    // this mode also handles mixin definitions and calls
    variants: [
      {
        begin: "[\\.#:&\\[>]",
        end: "[;{}]"
        // mixin calls end with ';'
      },
      {
        begin: INTERP_IDENT_RE,
        end: /\{/
      }
    ],
    returnBegin: true,
    returnEnd: true,
    illegal: `[<='$"]`,
    relevance: 0,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      MIXIN_GUARD_MODE,
      IDENT_MODE("keyword", "all\\b"),
      IDENT_MODE("variable", "@\\{" + IDENT_RE2 + "\\}"),
      // otherwise it’s identified as tag
      {
        begin: "\\b(" + TAGS$1.join("|") + ")\\b",
        className: "selector-tag"
      },
      modes.CSS_NUMBER_MODE,
      IDENT_MODE("selector-tag", INTERP_IDENT_RE, 0),
      IDENT_MODE("selector-id", "#" + INTERP_IDENT_RE),
      IDENT_MODE("selector-class", "\\." + INTERP_IDENT_RE, 0),
      IDENT_MODE("selector-tag", "&", 0),
      modes.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        begin: ":(" + PSEUDO_CLASSES$1.join("|") + ")"
      },
      {
        className: "selector-pseudo",
        begin: ":(:)?(" + PSEUDO_ELEMENTS$1.join("|") + ")"
      },
      {
        begin: /\(/,
        end: /\)/,
        relevance: 0,
        contains: VALUE_WITH_RULESETS
      },
      // argument list of parametric mixins
      { begin: "!important" },
      // eat !important after mixin call or it will be colored as tag
      modes.FUNCTION_DISPATCH
    ]
  };
  const PSEUDO_SELECTOR_MODE = {
    begin: IDENT_RE2 + `:(:)?(${PSEUDO_SELECTORS$1.join("|")})`,
    returnBegin: true,
    contains: [SELECTOR_MODE]
  };
  RULES.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    AT_RULE_MODE,
    VAR_RULE_MODE,
    PSEUDO_SELECTOR_MODE,
    RULE_MODE,
    SELECTOR_MODE,
    MIXIN_GUARD_MODE,
    modes.FUNCTION_DISPATCH
  );
  return {
    name: "Less",
    case_insensitive: true,
    illegal: `[=>'/<($"]`,
    contains: RULES
  };
}
const MODES = (hljs) => {
  return {
    IMPORTANT: {
      scope: "meta",
      begin: "!important"
    },
    BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: "number",
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: "selector-attr",
      begin: /\[/,
      end: /\]/,
      illegal: "$",
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
      ]
    },
    CSS_NUMBER_MODE: {
      scope: "number",
      begin: hljs.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z_][A-Za-z0-9_-]*/
    }
  };
};
const TAGS = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "p",
  "q",
  "quote",
  "samp",
  "section",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
];
const MEDIA_FEATURES = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
];
const PSEUDO_CLASSES = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
];
const PSEUDO_ELEMENTS = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
];
const ATTRIBUTES = [
  "align-content",
  "align-items",
  "align-self",
  "all",
  "animation",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-timing-function",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-repeat",
  "background-size",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-decoration-break",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "direction",
  "display",
  "empty-cells",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-size",
  "font-size-adjust",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-variant",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "gap",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "inline-size",
  "isolation",
  "justify-content",
  "left",
  "letter-spacing",
  "line-break",
  "line-height",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "pointer-events",
  "position",
  "quotes",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "row-gap",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-style",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-transform",
  "text-underline-position",
  "top",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "unicode-bidi",
  "vertical-align",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "z-index"
  // reverse makes sure longer attributes `font-weight` are matched fully
  // instead of getting false positives on say `font`
].reverse();
function scss(hljs) {
  const modes = MODES(hljs);
  const PSEUDO_ELEMENTS$12 = PSEUDO_ELEMENTS;
  const PSEUDO_CLASSES$12 = PSEUDO_CLASSES;
  const AT_IDENTIFIER = "@[a-z-]+";
  const AT_MODIFIERS = "and or not only";
  const IDENT_RE2 = "[a-zA-Z-][a-zA-Z0-9_-]*";
  const VARIABLE = {
    className: "variable",
    begin: "(\\$" + IDENT_RE2 + ")\\b",
    relevance: 0
  };
  return {
    name: "SCSS",
    case_insensitive: true,
    illegal: "[=/|']",
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      modes.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: "#[A-Za-z0-9_-]+",
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\.[A-Za-z0-9_-]+",
        relevance: 0
      },
      modes.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-tag",
        begin: "\\b(" + TAGS.join("|") + ")\\b",
        // was there, before, but why?
        relevance: 0
      },
      {
        className: "selector-pseudo",
        begin: ":(" + PSEUDO_CLASSES$12.join("|") + ")"
      },
      {
        className: "selector-pseudo",
        begin: ":(:)?(" + PSEUDO_ELEMENTS$12.join("|") + ")"
      },
      VARIABLE,
      {
        // pseudo-selector params
        begin: /\(/,
        end: /\)/,
        contains: [modes.CSS_NUMBER_MODE]
      },
      modes.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + ATTRIBUTES.join("|") + ")\\b"
      },
      { begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b" },
      {
        begin: /:/,
        end: /[;}{]/,
        relevance: 0,
        contains: [
          modes.BLOCK_COMMENT,
          VARIABLE,
          modes.HEXCOLOR,
          modes.CSS_NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          modes.IMPORTANT,
          modes.FUNCTION_DISPATCH
        ]
      },
      // matching these here allows us to treat them more like regular CSS
      // rules so everything between the {} gets regular rule highlighting,
      // which is what we want for page and font-face
      {
        begin: "@(page|font-face)",
        keywords: {
          $pattern: AT_IDENTIFIER,
          keyword: "@page @font-face"
        }
      },
      {
        begin: "@",
        end: "[{;]",
        returnBegin: true,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: AT_MODIFIERS,
          attribute: MEDIA_FEATURES.join(" ")
        },
        contains: [
          {
            begin: AT_IDENTIFIER,
            className: "keyword"
          },
          {
            begin: /[a-z-]+(?=:)/,
            className: "attribute"
          },
          VARIABLE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          modes.HEXCOLOR,
          modes.CSS_NUMBER_MODE
        ]
      },
      modes.FUNCTION_DISPATCH
    ]
  };
}
function xml(hljs) {
  const regex = hljs.regex;
  const TAG_NAME_RE = regex.concat(/[\p{L}_]/u, regex.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u);
  const XML_IDENT_RE = /[\p{L}0-9._:-]+/u;
  const XML_ENTITIES = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  };
  const XML_META_KEYWORDS = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  };
  const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
    begin: /\(/,
    end: /\)/
  });
  const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: "string" });
  const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: "string" });
  const TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: true,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [XML_ENTITIES]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [XML_ENTITIES]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: true,
    unicodeRegex: true,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          XML_META_KEYWORDS,
          QUOTE_META_STRING_MODE,
          APOS_META_STRING_MODE,
          XML_META_PAR_KEYWORDS,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  XML_META_KEYWORDS,
                  XML_META_PAR_KEYWORDS,
                  QUOTE_META_STRING_MODE,
                  APOS_META_STRING_MODE
                ]
              }
            ]
          }
        ]
      },
      hljs.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      XML_ENTITIES,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              QUOTE_META_STRING_MODE
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [TAG_INTERNALS],
        starts: {
          end: /<\/style>/,
          returnEnd: true,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [TAG_INTERNALS],
        starts: {
          end: /<\/script>/,
          returnEnd: true,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: regex.concat(
          /</,
          regex.lookahead(regex.concat(
            TAG_NAME_RE,
            // <tag/>
            // <tag>
            // <tag ...
            regex.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: TAG_NAME_RE,
            relevance: 0,
            starts: TAG_INTERNALS
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: regex.concat(
          /<\//,
          regex.lookahead(regex.concat(
            TAG_NAME_RE,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: TAG_NAME_RE,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: true
          }
        ]
      }
    ]
  };
}
function markdown(hljs) {
  const regex = hljs.regex;
  const INLINE_HTML = {
    begin: /<\/?[A-Za-z_]/,
    end: ">",
    subLanguage: "xml",
    relevance: 0
  };
  const HORIZONTAL_RULE = {
    begin: "^[-\\*]{3,}",
    end: "$"
  };
  const CODE = {
    className: "code",
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      { begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*" },
      { begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*" },
      // needed to allow markdown as a sublanguage to work
      {
        begin: "```",
        end: "```+[ ]*$"
      },
      {
        begin: "~~~",
        end: "~~~+[ ]*$"
      },
      { begin: "`.+?`" },
      {
        begin: "(?=^( {4}|\\t))",
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          {
            begin: "^( {4}|\\t)",
            end: "(\\n)$"
          }
        ],
        relevance: 0
      }
    ]
  };
  const LIST = {
    className: "bullet",
    begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
    end: "\\s+",
    excludeEnd: true
  };
  const LINK_REFERENCE = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: true,
    contains: [
      {
        className: "symbol",
        begin: /\[/,
        end: /\]/,
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: "link",
        begin: /:\s*/,
        end: /$/,
        excludeBegin: true
      }
    ]
  };
  const URL_SCHEME = /[A-Za-z][A-Za-z0-9+.-]*/;
  const LINK = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      // popular internet URLs
      {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2
      },
      {
        begin: regex.concat(/\[.+?\]\(/, URL_SCHEME, /:\/\/.*?\)/),
        relevance: 2
      },
      // relative urls
      {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: /\[.*?\]\(.*?\)/,
        relevance: 0
      }
    ],
    returnBegin: true,
    contains: [
      {
        // empty strings for alt or link text
        match: /\[(?=\])/
      },
      {
        className: "string",
        relevance: 0,
        begin: "\\[",
        end: "\\]",
        excludeBegin: true,
        returnEnd: true
      },
      {
        className: "link",
        relevance: 0,
        begin: "\\]\\(",
        end: "\\)",
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: "symbol",
        relevance: 0,
        begin: "\\]\\[",
        end: "\\]",
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
  const BOLD = {
    className: "strong",
    contains: [],
    // defined later
    variants: [
      {
        begin: /_{2}(?!\s)/,
        end: /_{2}/
      },
      {
        begin: /\*{2}(?!\s)/,
        end: /\*{2}/
      }
    ]
  };
  const ITALIC = {
    className: "emphasis",
    contains: [],
    // defined later
    variants: [
      {
        begin: /\*(?![*\s])/,
        end: /\*/
      },
      {
        begin: /_(?![_\s])/,
        end: /_/,
        relevance: 0
      }
    ]
  };
  const BOLD_WITHOUT_ITALIC = hljs.inherit(BOLD, { contains: [] });
  const ITALIC_WITHOUT_BOLD = hljs.inherit(ITALIC, { contains: [] });
  BOLD.contains.push(ITALIC_WITHOUT_BOLD);
  ITALIC.contains.push(BOLD_WITHOUT_ITALIC);
  let CONTAINABLE = [
    INLINE_HTML,
    LINK
  ];
  [
    BOLD,
    ITALIC,
    BOLD_WITHOUT_ITALIC,
    ITALIC_WITHOUT_BOLD
  ].forEach((m) => {
    m.contains = m.contains.concat(CONTAINABLE);
  });
  CONTAINABLE = CONTAINABLE.concat(BOLD, ITALIC);
  const HEADER = {
    className: "section",
    variants: [
      {
        begin: "^#{1,6}",
        end: "$",
        contains: CONTAINABLE
      },
      {
        begin: "(?=^.+?\\n[=-]{2,}$)",
        contains: [
          { begin: "^[=-]*$" },
          {
            begin: "^",
            end: "\\n",
            contains: CONTAINABLE
          }
        ]
      }
    ]
  };
  const BLOCKQUOTE = {
    className: "quote",
    begin: "^>\\s+",
    contains: CONTAINABLE,
    end: "$"
  };
  return {
    name: "Markdown",
    aliases: [
      "md",
      "mkdown",
      "mkd"
    ],
    contains: [
      HEADER,
      INLINE_HTML,
      LIST,
      BOLD,
      ITALIC,
      BLOCKQUOTE,
      CODE,
      HORIZONTAL_RULE,
      LINK,
      LINK_REFERENCE
    ]
  };
}
function objectivec(hljs) {
  const API_CLASS = {
    className: "built_in",
    begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
  };
  const IDENTIFIER_RE = /[a-zA-Z@][a-zA-Z0-9_]*/;
  const TYPES2 = [
    "int",
    "float",
    "char",
    "unsigned",
    "signed",
    "short",
    "long",
    "double",
    "wchar_t",
    "unichar",
    "void",
    "bool",
    "BOOL",
    "id|0",
    "_Bool"
  ];
  const KWS = [
    "while",
    "export",
    "sizeof",
    "typedef",
    "const",
    "struct",
    "for",
    "union",
    "volatile",
    "static",
    "mutable",
    "if",
    "do",
    "return",
    "goto",
    "enum",
    "else",
    "break",
    "extern",
    "asm",
    "case",
    "default",
    "register",
    "explicit",
    "typename",
    "switch",
    "continue",
    "inline",
    "readonly",
    "assign",
    "readwrite",
    "self",
    "@synchronized",
    "id",
    "typeof",
    "nonatomic",
    "IBOutlet",
    "IBAction",
    "strong",
    "weak",
    "copy",
    "in",
    "out",
    "inout",
    "bycopy",
    "byref",
    "oneway",
    "__strong",
    "__weak",
    "__block",
    "__autoreleasing",
    "@private",
    "@protected",
    "@public",
    "@try",
    "@property",
    "@end",
    "@throw",
    "@catch",
    "@finally",
    "@autoreleasepool",
    "@synthesize",
    "@dynamic",
    "@selector",
    "@optional",
    "@required",
    "@encode",
    "@package",
    "@import",
    "@defs",
    "@compatibility_alias",
    "__bridge",
    "__bridge_transfer",
    "__bridge_retained",
    "__bridge_retain",
    "__covariant",
    "__contravariant",
    "__kindof",
    "_Nonnull",
    "_Nullable",
    "_Null_unspecified",
    "__FUNCTION__",
    "__PRETTY_FUNCTION__",
    "__attribute__",
    "getter",
    "setter",
    "retain",
    "unsafe_unretained",
    "nonnull",
    "nullable",
    "null_unspecified",
    "null_resettable",
    "class",
    "instancetype",
    "NS_DESIGNATED_INITIALIZER",
    "NS_UNAVAILABLE",
    "NS_REQUIRES_SUPER",
    "NS_RETURNS_INNER_POINTER",
    "NS_INLINE",
    "NS_AVAILABLE",
    "NS_DEPRECATED",
    "NS_ENUM",
    "NS_OPTIONS",
    "NS_SWIFT_UNAVAILABLE",
    "NS_ASSUME_NONNULL_BEGIN",
    "NS_ASSUME_NONNULL_END",
    "NS_REFINED_FOR_SWIFT",
    "NS_SWIFT_NAME",
    "NS_SWIFT_NOTHROW",
    "NS_DURING",
    "NS_HANDLER",
    "NS_ENDHANDLER",
    "NS_VALUERETURN",
    "NS_VOIDRETURN"
  ];
  const LITERALS2 = [
    "false",
    "true",
    "FALSE",
    "TRUE",
    "nil",
    "YES",
    "NO",
    "NULL"
  ];
  const BUILT_INS2 = [
    "dispatch_once_t",
    "dispatch_queue_t",
    "dispatch_sync",
    "dispatch_async",
    "dispatch_once"
  ];
  const KEYWORDS2 = {
    "variable.language": [
      "this",
      "super"
    ],
    $pattern: IDENTIFIER_RE,
    keyword: KWS,
    literal: LITERALS2,
    built_in: BUILT_INS2,
    type: TYPES2
  };
  const CLASS_KEYWORDS = {
    $pattern: IDENTIFIER_RE,
    keyword: [
      "@interface",
      "@class",
      "@protocol",
      "@implementation"
    ]
  };
  return {
    name: "Objective-C",
    aliases: [
      "mm",
      "objc",
      "obj-c",
      "obj-c++",
      "objective-c++"
    ],
    keywords: KEYWORDS2,
    illegal: "</",
    contains: [
      API_CLASS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      {
        className: "string",
        variants: [
          {
            begin: '@"',
            end: '"',
            illegal: "\\n",
            contains: [hljs.BACKSLASH_ESCAPE]
          }
        ]
      },
      {
        className: "meta",
        begin: /#\s*[a-z]+\b/,
        end: /$/,
        keywords: { keyword: "if else elif endif define undef warning error line pragma ifdef ifndef include" },
        contains: [
          {
            begin: /\\\n/,
            relevance: 0
          },
          hljs.inherit(hljs.QUOTE_STRING_MODE, { className: "string" }),
          {
            className: "string",
            begin: /<.*?>/,
            end: /$/,
            illegal: "\\n"
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        className: "class",
        begin: "(" + CLASS_KEYWORDS.keyword.join("|") + ")\\b",
        end: /(\{|$)/,
        excludeEnd: true,
        keywords: CLASS_KEYWORDS,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        begin: "\\." + hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      }
    ]
  };
}
function source(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function lookahead(re) {
  return concat("(?=", re, ")");
}
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}
function stripOptionsFromArgs(args) {
  const opts = args[args.length - 1];
  if (typeof opts === "object" && opts.constructor === Object) {
    args.splice(args.length - 1, 1);
    return opts;
  } else {
    return {};
  }
}
function either(...args) {
  const opts = stripOptionsFromArgs(args);
  const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source(x)).join("|") + ")";
  return joined;
}
const keywordWrapper = (keyword) => concat(
  /\b/,
  keyword,
  /\w$/.test(keyword) ? /\b/ : /\B/
);
const dotKeywords = [
  "Protocol",
  // contextual
  "Type"
  // contextual
].map(keywordWrapper);
const optionalDotKeywords = [
  "init",
  "self"
].map(keywordWrapper);
const keywordTypes = [
  "Any",
  "Self"
];
const keywords = [
  // strings below will be fed into the regular `keywords` engine while regex
  // will result in additional modes being created to scan for those keywords to
  // avoid conflicts with other rules
  "actor",
  "any",
  // contextual
  "associatedtype",
  "async",
  "await",
  /as\?/,
  // operator
  /as!/,
  // operator
  "as",
  // operator
  "borrowing",
  // contextual
  "break",
  "case",
  "catch",
  "class",
  "consume",
  // contextual
  "consuming",
  // contextual
  "continue",
  "convenience",
  // contextual
  "copy",
  // contextual
  "default",
  "defer",
  "deinit",
  "didSet",
  // contextual
  "distributed",
  "do",
  "dynamic",
  // contextual
  "each",
  "else",
  "enum",
  "extension",
  "fallthrough",
  /fileprivate\(set\)/,
  "fileprivate",
  "final",
  // contextual
  "for",
  "func",
  "get",
  // contextual
  "guard",
  "if",
  "import",
  "indirect",
  // contextual
  "infix",
  // contextual
  /init\?/,
  /init!/,
  "inout",
  /internal\(set\)/,
  "internal",
  "in",
  "is",
  // operator
  "isolated",
  // contextual
  "nonisolated",
  // contextual
  "lazy",
  // contextual
  "let",
  "macro",
  "mutating",
  // contextual
  "nonmutating",
  // contextual
  /open\(set\)/,
  // contextual
  "open",
  // contextual
  "operator",
  "optional",
  // contextual
  "override",
  // contextual
  "postfix",
  // contextual
  "precedencegroup",
  "prefix",
  // contextual
  /private\(set\)/,
  "private",
  "protocol",
  /public\(set\)/,
  "public",
  "repeat",
  "required",
  // contextual
  "rethrows",
  "return",
  "set",
  // contextual
  "some",
  // contextual
  "static",
  "struct",
  "subscript",
  "super",
  "switch",
  "throws",
  "throw",
  /try\?/,
  // operator
  /try!/,
  // operator
  "try",
  // operator
  "typealias",
  /unowned\(safe\)/,
  // contextual
  /unowned\(unsafe\)/,
  // contextual
  "unowned",
  // contextual
  "var",
  "weak",
  // contextual
  "where",
  "while",
  "willSet"
  // contextual
];
const literals = [
  "false",
  "nil",
  "true"
];
const precedencegroupKeywords = [
  "assignment",
  "associativity",
  "higherThan",
  "left",
  "lowerThan",
  "none",
  "right"
];
const numberSignKeywords = [
  "#colorLiteral",
  "#column",
  "#dsohandle",
  "#else",
  "#elseif",
  "#endif",
  "#error",
  "#file",
  "#fileID",
  "#fileLiteral",
  "#filePath",
  "#function",
  "#if",
  "#imageLiteral",
  "#keyPath",
  "#line",
  "#selector",
  "#sourceLocation",
  "#warning"
];
const builtIns = [
  "abs",
  "all",
  "any",
  "assert",
  "assertionFailure",
  "debugPrint",
  "dump",
  "fatalError",
  "getVaList",
  "isKnownUniquelyReferenced",
  "max",
  "min",
  "numericCast",
  "pointwiseMax",
  "pointwiseMin",
  "precondition",
  "preconditionFailure",
  "print",
  "readLine",
  "repeatElement",
  "sequence",
  "stride",
  "swap",
  "swift_unboxFromSwiftValueWithType",
  "transcode",
  "type",
  "unsafeBitCast",
  "unsafeDowncast",
  "withExtendedLifetime",
  "withUnsafeMutablePointer",
  "withUnsafePointer",
  "withVaList",
  "withoutActuallyEscaping",
  "zip"
];
const operatorHead = either(
  /[/=\-+!*%<>&|^~?]/,
  /[\u00A1-\u00A7]/,
  /[\u00A9\u00AB]/,
  /[\u00AC\u00AE]/,
  /[\u00B0\u00B1]/,
  /[\u00B6\u00BB\u00BF\u00D7\u00F7]/,
  /[\u2016-\u2017]/,
  /[\u2020-\u2027]/,
  /[\u2030-\u203E]/,
  /[\u2041-\u2053]/,
  /[\u2055-\u205E]/,
  /[\u2190-\u23FF]/,
  /[\u2500-\u2775]/,
  /[\u2794-\u2BFF]/,
  /[\u2E00-\u2E7F]/,
  /[\u3001-\u3003]/,
  /[\u3008-\u3020]/,
  /[\u3030]/
);
const operatorCharacter = either(
  operatorHead,
  /[\u0300-\u036F]/,
  /[\u1DC0-\u1DFF]/,
  /[\u20D0-\u20FF]/,
  /[\uFE00-\uFE0F]/,
  /[\uFE20-\uFE2F]/
  // TODO: The following characters are also allowed, but the regex isn't supported yet.
  // /[\u{E0100}-\u{E01EF}]/u
);
const operator = concat(operatorHead, operatorCharacter, "*");
const identifierHead = either(
  /[a-zA-Z_]/,
  /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/,
  /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/,
  /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/,
  /[\u1E00-\u1FFF]/,
  /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/,
  /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/,
  /[\u2C00-\u2DFF\u2E80-\u2FFF]/,
  /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/,
  /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/,
  /[\uFE47-\uFEFE\uFF00-\uFFFD]/
  // Should be /[\uFE47-\uFFFD]/, but we have to exclude FEFF.
  // The following characters are also allowed, but the regexes aren't supported yet.
  // /[\u{10000}-\u{1FFFD}\u{20000-\u{2FFFD}\u{30000}-\u{3FFFD}\u{40000}-\u{4FFFD}]/u,
  // /[\u{50000}-\u{5FFFD}\u{60000-\u{6FFFD}\u{70000}-\u{7FFFD}\u{80000}-\u{8FFFD}]/u,
  // /[\u{90000}-\u{9FFFD}\u{A0000-\u{AFFFD}\u{B0000}-\u{BFFFD}\u{C0000}-\u{CFFFD}]/u,
  // /[\u{D0000}-\u{DFFFD}\u{E0000-\u{EFFFD}]/u
);
const identifierCharacter = either(
  identifierHead,
  /\d/,
  /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/
);
const identifier = concat(identifierHead, identifierCharacter, "*");
const typeIdentifier = concat(/[A-Z]/, identifierCharacter, "*");
const keywordAttributes = [
  "attached",
  "autoclosure",
  concat(/convention\(/, either("swift", "block", "c"), /\)/),
  "discardableResult",
  "dynamicCallable",
  "dynamicMemberLookup",
  "escaping",
  "freestanding",
  "frozen",
  "GKInspectable",
  "IBAction",
  "IBDesignable",
  "IBInspectable",
  "IBOutlet",
  "IBSegueAction",
  "inlinable",
  "main",
  "nonobjc",
  "NSApplicationMain",
  "NSCopying",
  "NSManaged",
  concat(/objc\(/, identifier, /\)/),
  "objc",
  "objcMembers",
  "propertyWrapper",
  "requires_stored_property_inits",
  "resultBuilder",
  "Sendable",
  "testable",
  "UIApplicationMain",
  "unchecked",
  "unknown",
  "usableFromInline",
  "warn_unqualified_access"
];
const availabilityKeywords = [
  "iOS",
  "iOSApplicationExtension",
  "macOS",
  "macOSApplicationExtension",
  "macCatalyst",
  "macCatalystApplicationExtension",
  "watchOS",
  "watchOSApplicationExtension",
  "tvOS",
  "tvOSApplicationExtension",
  "swift"
];
function swift(hljs) {
  const WHITESPACE = {
    match: /\s+/,
    relevance: 0
  };
  const BLOCK_COMMENT = hljs.COMMENT(
    "/\\*",
    "\\*/",
    { contains: ["self"] }
  );
  const COMMENTS = [
    hljs.C_LINE_COMMENT_MODE,
    BLOCK_COMMENT
  ];
  const DOT_KEYWORD = {
    match: [
      /\./,
      either(...dotKeywords, ...optionalDotKeywords)
    ],
    className: { 2: "keyword" }
  };
  const KEYWORD_GUARD = {
    // Consume .keyword to prevent highlighting properties and methods as keywords.
    match: concat(/\./, either(...keywords)),
    relevance: 0
  };
  const PLAIN_KEYWORDS = keywords.filter((kw) => typeof kw === "string").concat(["_|0"]);
  const REGEX_KEYWORDS = keywords.filter((kw) => typeof kw !== "string").concat(keywordTypes).map(keywordWrapper);
  const KEYWORD = { variants: [
    {
      className: "keyword",
      match: either(...REGEX_KEYWORDS, ...optionalDotKeywords)
    }
  ] };
  const KEYWORDS2 = {
    $pattern: either(
      /\b\w+/,
      // regular keywords
      /#\w+/
      // number keywords
    ),
    keyword: PLAIN_KEYWORDS.concat(numberSignKeywords),
    literal: literals
  };
  const KEYWORD_MODES = [
    DOT_KEYWORD,
    KEYWORD_GUARD,
    KEYWORD
  ];
  const BUILT_IN_GUARD = {
    // Consume .built_in to prevent highlighting properties and methods.
    match: concat(/\./, either(...builtIns)),
    relevance: 0
  };
  const BUILT_IN = {
    className: "built_in",
    match: concat(/\b/, either(...builtIns), /(?=\()/)
  };
  const BUILT_INS2 = [
    BUILT_IN_GUARD,
    BUILT_IN
  ];
  const OPERATOR_GUARD = {
    // Prevent -> from being highlighting as an operator.
    match: /->/,
    relevance: 0
  };
  const OPERATOR = {
    className: "operator",
    relevance: 0,
    variants: [
      { match: operator },
      {
        // dot-operator: only operators that start with a dot are allowed to use dots as
        // characters (..., ...<, .*, etc). So there rule here is: a dot followed by one or more
        // characters that may also include dots.
        match: `\\.(\\.|${operatorCharacter})+`
      }
    ]
  };
  const OPERATORS = [
    OPERATOR_GUARD,
    OPERATOR
  ];
  const decimalDigits2 = "([0-9]_*)+";
  const hexDigits2 = "([0-9a-fA-F]_*)+";
  const NUMBER = {
    className: "number",
    relevance: 0,
    variants: [
      // decimal floating-point-literal (subsumes decimal-literal)
      { match: `\\b(${decimalDigits2})(\\.(${decimalDigits2}))?([eE][+-]?(${decimalDigits2}))?\\b` },
      // hexadecimal floating-point-literal (subsumes hexadecimal-literal)
      { match: `\\b0x(${hexDigits2})(\\.(${hexDigits2}))?([pP][+-]?(${decimalDigits2}))?\\b` },
      // octal-literal
      { match: /\b0o([0-7]_*)+\b/ },
      // binary-literal
      { match: /\b0b([01]_*)+\b/ }
    ]
  };
  const ESCAPED_CHARACTER = (rawDelimiter = "") => ({
    className: "subst",
    variants: [
      { match: concat(/\\/, rawDelimiter, /[0\\tnr"']/) },
      { match: concat(/\\/, rawDelimiter, /u\{[0-9a-fA-F]{1,8}\}/) }
    ]
  });
  const ESCAPED_NEWLINE = (rawDelimiter = "") => ({
    className: "subst",
    match: concat(/\\/, rawDelimiter, /[\t ]*(?:[\r\n]|\r\n)/)
  });
  const INTERPOLATION = (rawDelimiter = "") => ({
    className: "subst",
    label: "interpol",
    begin: concat(/\\/, rawDelimiter, /\(/),
    end: /\)/
  });
  const MULTILINE_STRING = (rawDelimiter = "") => ({
    begin: concat(rawDelimiter, /"""/),
    end: concat(/"""/, rawDelimiter),
    contains: [
      ESCAPED_CHARACTER(rawDelimiter),
      ESCAPED_NEWLINE(rawDelimiter),
      INTERPOLATION(rawDelimiter)
    ]
  });
  const SINGLE_LINE_STRING = (rawDelimiter = "") => ({
    begin: concat(rawDelimiter, /"/),
    end: concat(/"/, rawDelimiter),
    contains: [
      ESCAPED_CHARACTER(rawDelimiter),
      INTERPOLATION(rawDelimiter)
    ]
  });
  const STRING = {
    className: "string",
    variants: [
      MULTILINE_STRING(),
      MULTILINE_STRING("#"),
      MULTILINE_STRING("##"),
      MULTILINE_STRING("###"),
      SINGLE_LINE_STRING(),
      SINGLE_LINE_STRING("#"),
      SINGLE_LINE_STRING("##"),
      SINGLE_LINE_STRING("###")
    ]
  };
  const REGEXP_CONTENTS = [
    hljs.BACKSLASH_ESCAPE,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [hljs.BACKSLASH_ESCAPE]
    }
  ];
  const BARE_REGEXP_LITERAL = {
    begin: /\/[^\s](?=[^/\n]*\/)/,
    end: /\//,
    contains: REGEXP_CONTENTS
  };
  const EXTENDED_REGEXP_LITERAL = (rawDelimiter) => {
    const begin = concat(rawDelimiter, /\//);
    const end = concat(/\//, rawDelimiter);
    return {
      begin,
      end,
      contains: [
        ...REGEXP_CONTENTS,
        {
          scope: "comment",
          begin: `#(?!.*${end})`,
          end: /$/
        }
      ]
    };
  };
  const REGEXP = {
    scope: "regexp",
    variants: [
      EXTENDED_REGEXP_LITERAL("###"),
      EXTENDED_REGEXP_LITERAL("##"),
      EXTENDED_REGEXP_LITERAL("#"),
      BARE_REGEXP_LITERAL
    ]
  };
  const QUOTED_IDENTIFIER = { match: concat(/`/, identifier, /`/) };
  const IMPLICIT_PARAMETER = {
    className: "variable",
    match: /\$\d+/
  };
  const PROPERTY_WRAPPER_PROJECTION = {
    className: "variable",
    match: `\\$${identifierCharacter}+`
  };
  const IDENTIFIERS = [
    QUOTED_IDENTIFIER,
    IMPLICIT_PARAMETER,
    PROPERTY_WRAPPER_PROJECTION
  ];
  const AVAILABLE_ATTRIBUTE = {
    match: /(@|#(un)?)available/,
    scope: "keyword",
    starts: { contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords: availabilityKeywords,
        contains: [
          ...OPERATORS,
          NUMBER,
          STRING
        ]
      }
    ] }
  };
  const KEYWORD_ATTRIBUTE = {
    scope: "keyword",
    match: concat(/@/, either(...keywordAttributes))
  };
  const USER_DEFINED_ATTRIBUTE = {
    scope: "meta",
    match: concat(/@/, identifier)
  };
  const ATTRIBUTES2 = [
    AVAILABLE_ATTRIBUTE,
    KEYWORD_ATTRIBUTE,
    USER_DEFINED_ATTRIBUTE
  ];
  const TYPE = {
    match: lookahead(/\b[A-Z]/),
    relevance: 0,
    contains: [
      {
        // Common Apple frameworks, for relevance boost
        className: "type",
        match: concat(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, identifierCharacter, "+")
      },
      {
        // Type identifier
        className: "type",
        match: typeIdentifier,
        relevance: 0
      },
      {
        // Optional type
        match: /[?!]+/,
        relevance: 0
      },
      {
        // Variadic parameter
        match: /\.\.\./,
        relevance: 0
      },
      {
        // Protocol composition
        match: concat(/\s+&\s+/, lookahead(typeIdentifier)),
        relevance: 0
      }
    ]
  };
  const GENERIC_ARGUMENTS = {
    begin: /</,
    end: />/,
    keywords: KEYWORDS2,
    contains: [
      ...COMMENTS,
      ...KEYWORD_MODES,
      ...ATTRIBUTES2,
      OPERATOR_GUARD,
      TYPE
    ]
  };
  TYPE.contains.push(GENERIC_ARGUMENTS);
  const TUPLE_ELEMENT_NAME = {
    match: concat(identifier, /\s*:/),
    keywords: "_|0",
    relevance: 0
  };
  const TUPLE = {
    begin: /\(/,
    end: /\)/,
    relevance: 0,
    keywords: KEYWORDS2,
    contains: [
      "self",
      TUPLE_ELEMENT_NAME,
      ...COMMENTS,
      REGEXP,
      ...KEYWORD_MODES,
      ...BUILT_INS2,
      ...OPERATORS,
      NUMBER,
      STRING,
      ...IDENTIFIERS,
      ...ATTRIBUTES2,
      TYPE
    ]
  };
  const GENERIC_PARAMETERS = {
    begin: /</,
    end: />/,
    keywords: "repeat each",
    contains: [
      ...COMMENTS,
      TYPE
    ]
  };
  const FUNCTION_PARAMETER_NAME = {
    begin: either(
      lookahead(concat(identifier, /\s*:/)),
      lookahead(concat(identifier, /\s+/, identifier, /\s*:/))
    ),
    end: /:/,
    relevance: 0,
    contains: [
      {
        className: "keyword",
        match: /\b_\b/
      },
      {
        className: "params",
        match: identifier
      }
    ]
  };
  const FUNCTION_PARAMETERS = {
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORDS2,
    contains: [
      FUNCTION_PARAMETER_NAME,
      ...COMMENTS,
      ...KEYWORD_MODES,
      ...OPERATORS,
      NUMBER,
      STRING,
      ...ATTRIBUTES2,
      TYPE,
      TUPLE
    ],
    endsParent: true,
    illegal: /["']/
  };
  const FUNCTION_OR_MACRO = {
    match: [
      /(func|macro)/,
      /\s+/,
      either(QUOTED_IDENTIFIER.match, identifier, operator)
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      GENERIC_PARAMETERS,
      FUNCTION_PARAMETERS,
      WHITESPACE
    ],
    illegal: [
      /\[/,
      /%/
    ]
  };
  const INIT_SUBSCRIPT = {
    match: [
      /\b(?:subscript|init[?!]?)/,
      /\s*(?=[<(])/
    ],
    className: { 1: "keyword" },
    contains: [
      GENERIC_PARAMETERS,
      FUNCTION_PARAMETERS,
      WHITESPACE
    ],
    illegal: /\[|%/
  };
  const OPERATOR_DECLARATION = {
    match: [
      /operator/,
      /\s+/,
      operator
    ],
    className: {
      1: "keyword",
      3: "title"
    }
  };
  const PRECEDENCEGROUP = {
    begin: [
      /precedencegroup/,
      /\s+/,
      typeIdentifier
    ],
    className: {
      1: "keyword",
      3: "title"
    },
    contains: [TYPE],
    keywords: [
      ...precedencegroupKeywords,
      ...literals
    ],
    end: /}/
  };
  for (const variant of STRING.variants) {
    const interpolation = variant.contains.find((mode) => mode.label === "interpol");
    interpolation.keywords = KEYWORDS2;
    const submodes = [
      ...KEYWORD_MODES,
      ...BUILT_INS2,
      ...OPERATORS,
      NUMBER,
      STRING,
      ...IDENTIFIERS
    ];
    interpolation.contains = [
      ...submodes,
      {
        begin: /\(/,
        end: /\)/,
        contains: [
          "self",
          ...submodes
        ]
      }
    ];
  }
  return {
    name: "Swift",
    keywords: KEYWORDS2,
    contains: [
      ...COMMENTS,
      FUNCTION_OR_MACRO,
      INIT_SUBSCRIPT,
      {
        beginKeywords: "struct protocol class extension enum actor",
        end: "\\{",
        excludeEnd: true,
        keywords: KEYWORDS2,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            className: "title.class",
            begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
          }),
          ...KEYWORD_MODES
        ]
      },
      OPERATOR_DECLARATION,
      PRECEDENCEGROUP,
      {
        beginKeywords: "import",
        end: /$/,
        contains: [...COMMENTS],
        relevance: 0
      },
      REGEXP,
      ...KEYWORD_MODES,
      ...BUILT_INS2,
      ...OPERATORS,
      NUMBER,
      STRING,
      ...IDENTIFIERS,
      ...ATTRIBUTES2,
      TYPE,
      TUPLE
    ]
  };
}
function dart(hljs) {
  const SUBST = {
    className: "subst",
    variants: [{ begin: "\\$[A-Za-z0-9_]+" }]
  };
  const BRACED_SUBST = {
    className: "subst",
    variants: [
      {
        begin: /\$\{/,
        end: /\}/
      }
    ],
    keywords: "true false null this is new super"
  };
  const STRING = {
    className: "string",
    variants: [
      {
        begin: "r'''",
        end: "'''"
      },
      {
        begin: 'r"""',
        end: '"""'
      },
      {
        begin: "r'",
        end: "'",
        illegal: "\\n"
      },
      {
        begin: 'r"',
        end: '"',
        illegal: "\\n"
      },
      {
        begin: "'''",
        end: "'''",
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST,
          BRACED_SUBST
        ]
      },
      {
        begin: '"""',
        end: '"""',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST,
          BRACED_SUBST
        ]
      },
      {
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST,
          BRACED_SUBST
        ]
      },
      {
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST,
          BRACED_SUBST
        ]
      }
    ]
  };
  BRACED_SUBST.contains = [
    hljs.C_NUMBER_MODE,
    STRING
  ];
  const BUILT_IN_TYPES = [
    // dart:core
    "Comparable",
    "DateTime",
    "Duration",
    "Function",
    "Iterable",
    "Iterator",
    "List",
    "Map",
    "Match",
    "Object",
    "Pattern",
    "RegExp",
    "Set",
    "Stopwatch",
    "String",
    "StringBuffer",
    "StringSink",
    "Symbol",
    "Type",
    "Uri",
    "bool",
    "double",
    "int",
    "num",
    // dart:html
    "Element",
    "ElementList"
  ];
  const NULLABLE_BUILT_IN_TYPES = BUILT_IN_TYPES.map((e) => `${e}?`);
  const BASIC_KEYWORDS = [
    "abstract",
    "as",
    "assert",
    "async",
    "await",
    "base",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "covariant",
    "default",
    "deferred",
    "do",
    "dynamic",
    "else",
    "enum",
    "export",
    "extends",
    "extension",
    "external",
    "factory",
    "false",
    "final",
    "finally",
    "for",
    "Function",
    "get",
    "hide",
    "if",
    "implements",
    "import",
    "in",
    "interface",
    "is",
    "late",
    "library",
    "mixin",
    "new",
    "null",
    "on",
    "operator",
    "part",
    "required",
    "rethrow",
    "return",
    "sealed",
    "set",
    "show",
    "static",
    "super",
    "switch",
    "sync",
    "this",
    "throw",
    "true",
    "try",
    "typedef",
    "var",
    "void",
    "when",
    "while",
    "with",
    "yield"
  ];
  const KEYWORDS2 = {
    keyword: BASIC_KEYWORDS,
    built_in: BUILT_IN_TYPES.concat(NULLABLE_BUILT_IN_TYPES).concat([
      // dart:core
      "Never",
      "Null",
      "dynamic",
      "print",
      // dart:html
      "document",
      "querySelector",
      "querySelectorAll",
      "window"
    ]),
    $pattern: /[A-Za-z][A-Za-z0-9_]*\??/
  };
  return {
    name: "Dart",
    keywords: KEYWORDS2,
    contains: [
      STRING,
      hljs.COMMENT(
        /\/\*\*(?!\/)/,
        /\*\//,
        {
          subLanguage: "markdown",
          relevance: 0
        }
      ),
      hljs.COMMENT(
        /\/{3,} ?/,
        /$/,
        { contains: [
          {
            subLanguage: "markdown",
            begin: ".",
            end: "$",
            relevance: 0
          }
        ] }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "class",
        beginKeywords: "class interface",
        end: /\{/,
        excludeEnd: true,
        contains: [
          { beginKeywords: "extends implements" },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      hljs.C_NUMBER_MODE,
      {
        className: "meta",
        begin: "@[A-Za-z]+"
      },
      {
        begin: "=>"
        // No markup, just a relevance booster
      }
    ]
  };
}
function nginx(hljs) {
  const regex = hljs.regex;
  const VAR = {
    className: "variable",
    variants: [
      { begin: /\$\d+/ },
      { begin: /\$\{\w+\}/ },
      { begin: regex.concat(/[$@]/, hljs.UNDERSCORE_IDENT_RE) }
    ]
  };
  const LITERALS2 = [
    "on",
    "off",
    "yes",
    "no",
    "true",
    "false",
    "none",
    "blocked",
    "debug",
    "info",
    "notice",
    "warn",
    "error",
    "crit",
    "select",
    "break",
    "last",
    "permanent",
    "redirect",
    "kqueue",
    "rtsig",
    "epoll",
    "poll",
    "/dev/poll"
  ];
  const DEFAULT = {
    endsWithParent: true,
    keywords: {
      $pattern: /[a-z_]{2,}|\/dev\/poll/,
      literal: LITERALS2
    },
    relevance: 0,
    illegal: "=>",
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        className: "string",
        contains: [
          hljs.BACKSLASH_ESCAPE,
          VAR
        ],
        variants: [
          {
            begin: /"/,
            end: /"/
          },
          {
            begin: /'/,
            end: /'/
          }
        ]
      },
      // this swallows entire URLs to avoid detecting numbers within
      {
        begin: "([a-z]+):/",
        end: "\\s",
        endsWithParent: true,
        excludeEnd: true,
        contains: [VAR]
      },
      {
        className: "regexp",
        contains: [
          hljs.BACKSLASH_ESCAPE,
          VAR
        ],
        variants: [
          {
            begin: "\\s\\^",
            end: "\\s|\\{|;",
            returnEnd: true
          },
          // regexp locations (~, ~*)
          {
            begin: "~\\*?\\s+",
            end: "\\s|\\{|;",
            returnEnd: true
          },
          // *.example.com
          { begin: "\\*(\\.[a-z\\-]+)+" },
          // sub.example.*
          { begin: "([a-z\\-]+\\.)+\\*" }
        ]
      },
      // IP
      {
        className: "number",
        begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
      },
      // units
      {
        className: "number",
        begin: "\\b\\d+[kKmMgGdshdwy]?\\b",
        relevance: 0
      },
      VAR
    ]
  };
  return {
    name: "Nginx config",
    aliases: ["nginxconf"],
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        beginKeywords: "upstream location",
        end: /;|\{/,
        contains: DEFAULT.contains,
        keywords: { section: "upstream location" }
      },
      {
        className: "section",
        begin: regex.concat(hljs.UNDERSCORE_IDENT_RE + regex.lookahead(/\s+\{/)),
        relevance: 0
      },
      {
        begin: regex.lookahead(hljs.UNDERSCORE_IDENT_RE + "\\s"),
        end: ";|\\{",
        contains: [
          {
            className: "attribute",
            begin: hljs.UNDERSCORE_IDENT_RE,
            starts: DEFAULT
          }
        ],
        relevance: 0
      }
    ],
    illegal: "[^\\s\\}\\{]"
  };
}
function go(hljs) {
  const LITERALS2 = [
    "true",
    "false",
    "iota",
    "nil"
  ];
  const BUILT_INS2 = [
    "append",
    "cap",
    "close",
    "complex",
    "copy",
    "imag",
    "len",
    "make",
    "new",
    "panic",
    "print",
    "println",
    "real",
    "recover",
    "delete"
  ];
  const TYPES2 = [
    "bool",
    "byte",
    "complex64",
    "complex128",
    "error",
    "float32",
    "float64",
    "int8",
    "int16",
    "int32",
    "int64",
    "string",
    "uint8",
    "uint16",
    "uint32",
    "uint64",
    "int",
    "uint",
    "uintptr",
    "rune"
  ];
  const KWS = [
    "break",
    "case",
    "chan",
    "const",
    "continue",
    "default",
    "defer",
    "else",
    "fallthrough",
    "for",
    "func",
    "go",
    "goto",
    "if",
    "import",
    "interface",
    "map",
    "package",
    "range",
    "return",
    "select",
    "struct",
    "switch",
    "type",
    "var"
  ];
  const KEYWORDS2 = {
    keyword: KWS,
    type: TYPES2,
    literal: LITERALS2,
    built_in: BUILT_INS2
  };
  return {
    name: "Go",
    aliases: ["golang"],
    keywords: KEYWORDS2,
    illegal: "</",
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "string",
        variants: [
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {
            begin: "`",
            end: "`"
          }
        ]
      },
      {
        className: "number",
        variants: [
          {
            begin: hljs.C_NUMBER_RE + "[i]",
            relevance: 1
          },
          hljs.C_NUMBER_MODE
        ]
      },
      {
        begin: /:=/
        // relevance booster
      },
      {
        className: "function",
        beginKeywords: "func",
        end: "\\s*(\\{|$)",
        excludeEnd: true,
        contains: [
          hljs.TITLE_MODE,
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: KEYWORDS2,
            illegal: /["']/
          }
        ]
      }
    ]
  };
}
function http(hljs) {
  const regex = hljs.regex;
  const VERSION = "HTTP/([32]|1\\.[01])";
  const HEADER_NAME = /[A-Za-z][A-Za-z0-9-]*/;
  const HEADER = {
    className: "attribute",
    begin: regex.concat("^", HEADER_NAME, "(?=\\:\\s)"),
    starts: { contains: [
      {
        className: "punctuation",
        begin: /: /,
        relevance: 0,
        starts: {
          end: "$",
          relevance: 0
        }
      }
    ] }
  };
  const HEADERS_AND_BODY = [
    HEADER,
    {
      begin: "\\n\\n",
      starts: {
        subLanguage: [],
        endsWithParent: true
      }
    }
  ];
  return {
    name: "HTTP",
    aliases: ["https"],
    illegal: /\S/,
    contains: [
      // response
      {
        begin: "^(?=" + VERSION + " \\d{3})",
        end: /$/,
        contains: [
          {
            className: "meta",
            begin: VERSION
          },
          {
            className: "number",
            begin: "\\b\\d{3}\\b"
          }
        ],
        starts: {
          end: /\b\B/,
          illegal: /\S/,
          contains: HEADERS_AND_BODY
        }
      },
      // request
      {
        begin: "(?=^[A-Z]+ (.*?) " + VERSION + "$)",
        end: /$/,
        contains: [
          {
            className: "string",
            begin: " ",
            end: " ",
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "meta",
            begin: VERSION
          },
          {
            className: "keyword",
            begin: "[A-Z]+"
          }
        ],
        starts: {
          end: /\b\B/,
          illegal: /\S/,
          contains: HEADERS_AND_BODY
        }
      },
      // to allow headers to work even without a preamble
      hljs.inherit(HEADER, { relevance: 0 })
    ]
  };
}
function ruby(hljs) {
  const regex = hljs.regex;
  const RUBY_METHOD_RE = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)";
  const CLASS_NAME_RE = regex.either(
    /\b([A-Z]+[a-z0-9]+)+/,
    // ends in caps
    /\b([A-Z]+[a-z0-9]+)+[A-Z]+/
  );
  const CLASS_NAME_WITH_NAMESPACE_RE = regex.concat(CLASS_NAME_RE, /(::\w+)*/);
  const PSEUDO_KWS = [
    "include",
    "extend",
    "prepend",
    "public",
    "private",
    "protected",
    "raise",
    "throw"
  ];
  const RUBY_KEYWORDS = {
    "variable.constant": [
      "__FILE__",
      "__LINE__",
      "__ENCODING__"
    ],
    "variable.language": [
      "self",
      "super"
    ],
    keyword: [
      "alias",
      "and",
      "begin",
      "BEGIN",
      "break",
      "case",
      "class",
      "defined",
      "do",
      "else",
      "elsif",
      "end",
      "END",
      "ensure",
      "for",
      "if",
      "in",
      "module",
      "next",
      "not",
      "or",
      "redo",
      "require",
      "rescue",
      "retry",
      "return",
      "then",
      "undef",
      "unless",
      "until",
      "when",
      "while",
      "yield",
      ...PSEUDO_KWS
    ],
    built_in: [
      "proc",
      "lambda",
      "attr_accessor",
      "attr_reader",
      "attr_writer",
      "define_method",
      "private_constant",
      "module_function"
    ],
    literal: [
      "true",
      "false",
      "nil"
    ]
  };
  const YARDOCTAG = {
    className: "doctag",
    begin: "@[A-Za-z]+"
  };
  const IRB_OBJECT = {
    begin: "#<",
    end: ">"
  };
  const COMMENT_MODES = [
    hljs.COMMENT(
      "#",
      "$",
      { contains: [YARDOCTAG] }
    ),
    hljs.COMMENT(
      "^=begin",
      "^=end",
      {
        contains: [YARDOCTAG],
        relevance: 10
      }
    ),
    hljs.COMMENT("^__END__", hljs.MATCH_NOTHING_RE)
  ];
  const SUBST = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: RUBY_KEYWORDS
  };
  const STRING = {
    className: "string",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ],
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      },
      {
        begin: /`/,
        end: /`/
      },
      {
        begin: /%[qQwWx]?\(/,
        end: /\)/
      },
      {
        begin: /%[qQwWx]?\[/,
        end: /\]/
      },
      {
        begin: /%[qQwWx]?\{/,
        end: /\}/
      },
      {
        begin: /%[qQwWx]?</,
        end: />/
      },
      {
        begin: /%[qQwWx]?\//,
        end: /\//
      },
      {
        begin: /%[qQwWx]?%/,
        end: /%/
      },
      {
        begin: /%[qQwWx]?-/,
        end: /-/
      },
      {
        begin: /%[qQwWx]?\|/,
        end: /\|/
      },
      // in the following expressions, \B in the beginning suppresses recognition of ?-sequences
      // where ? is the last character of a preceding identifier, as in: `func?4`
      { begin: /\B\?(\\\d{1,3})/ },
      { begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/ },
      { begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/ },
      { begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/ },
      { begin: /\B\?\\(c|C-)[\x20-\x7e]/ },
      { begin: /\B\?\\?\S/ },
      // heredocs
      {
        // this guard makes sure that we have an entire heredoc and not a false
        // positive (auto-detect, etc.)
        begin: regex.concat(
          /<<[-~]?'?/,
          regex.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)
        ),
        contains: [
          hljs.END_SAME_AS_BEGIN({
            begin: /(\w+)/,
            end: /(\w+)/,
            contains: [
              hljs.BACKSLASH_ESCAPE,
              SUBST
            ]
          })
        ]
      }
    ]
  };
  const decimal = "[1-9](_?[0-9])*|0";
  const digits = "[0-9](_?[0-9])*";
  const NUMBER = {
    className: "number",
    relevance: 0,
    variants: [
      // decimal integer/float, optionally exponential or rational, optionally imaginary
      { begin: `\\b(${decimal})(\\.(${digits}))?([eE][+-]?(${digits})|r)?i?\\b` },
      // explicit decimal/binary/octal/hexadecimal integer,
      // optionally rational and/or imaginary
      { begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b" },
      // 0-prefixed implicit octal integer, optionally rational and/or imaginary
      { begin: "\\b0(_?[0-7])+r?i?\\b" }
    ]
  };
  const PARAMS = {
    variants: [
      {
        match: /\(\)/
      },
      {
        className: "params",
        begin: /\(/,
        end: /(?=\))/,
        excludeBegin: true,
        endsParent: true,
        keywords: RUBY_KEYWORDS
      }
    ]
  };
  const INCLUDE_EXTEND = {
    match: [
      /(include|extend)\s+/,
      CLASS_NAME_WITH_NAMESPACE_RE
    ],
    scope: {
      2: "title.class"
    },
    keywords: RUBY_KEYWORDS
  };
  const CLASS_DEFINITION = {
    variants: [
      {
        match: [
          /class\s+/,
          CLASS_NAME_WITH_NAMESPACE_RE,
          /\s+<\s+/,
          CLASS_NAME_WITH_NAMESPACE_RE
        ]
      },
      {
        match: [
          /\b(class|module)\s+/,
          CLASS_NAME_WITH_NAMESPACE_RE
        ]
      }
    ],
    scope: {
      2: "title.class",
      4: "title.class.inherited"
    },
    keywords: RUBY_KEYWORDS
  };
  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  const METHOD_DEFINITION = {
    match: [
      /def/,
      /\s+/,
      RUBY_METHOD_RE
    ],
    scope: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };
  const OBJECT_CREATION = {
    relevance: 0,
    match: [
      CLASS_NAME_WITH_NAMESPACE_RE,
      /\.new[. (]/
    ],
    scope: {
      1: "title.class"
    }
  };
  const CLASS_REFERENCE = {
    relevance: 0,
    match: CLASS_NAME_RE,
    scope: "title.class"
  };
  const RUBY_DEFAULT_CONTAINS = [
    STRING,
    CLASS_DEFINITION,
    INCLUDE_EXTEND,
    OBJECT_CREATION,
    UPPER_CASE_CONSTANT,
    CLASS_REFERENCE,
    METHOD_DEFINITION,
    {
      // swallow namespace qualifiers before symbols
      begin: hljs.IDENT_RE + "::"
    },
    {
      className: "symbol",
      begin: hljs.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
      relevance: 0
    },
    {
      className: "symbol",
      begin: ":(?!\\s)",
      contains: [
        STRING,
        { begin: RUBY_METHOD_RE }
      ],
      relevance: 0
    },
    NUMBER,
    {
      // negative-look forward attempts to prevent false matches like:
      // @ident@ or $ident$ that might indicate this is not ruby at all
      className: "variable",
      begin: `(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])`
    },
    {
      className: "params",
      begin: /\|/,
      end: /\|/,
      excludeBegin: true,
      excludeEnd: true,
      relevance: 0,
      // this could be a lot of things (in other languages) other than params
      keywords: RUBY_KEYWORDS
    },
    {
      // regexp container
      begin: "(" + hljs.RE_STARTERS_RE + "|unless)\\s*",
      keywords: "unless",
      contains: [
        {
          className: "regexp",
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ],
          illegal: /\n/,
          variants: [
            {
              begin: "/",
              end: "/[a-z]*"
            },
            {
              begin: /%r\{/,
              end: /\}[a-z]*/
            },
            {
              begin: "%r\\(",
              end: "\\)[a-z]*"
            },
            {
              begin: "%r!",
              end: "![a-z]*"
            },
            {
              begin: "%r\\[",
              end: "\\][a-z]*"
            }
          ]
        }
      ].concat(IRB_OBJECT, COMMENT_MODES),
      relevance: 0
    }
  ].concat(IRB_OBJECT, COMMENT_MODES);
  SUBST.contains = RUBY_DEFAULT_CONTAINS;
  PARAMS.contains = RUBY_DEFAULT_CONTAINS;
  const SIMPLE_PROMPT = "[>?]>";
  const DEFAULT_PROMPT = "[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]";
  const RVM_PROMPT = "(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>";
  const IRB_DEFAULT = [
    {
      begin: /^\s*=>/,
      starts: {
        end: "$",
        contains: RUBY_DEFAULT_CONTAINS
      }
    },
    {
      className: "meta.prompt",
      begin: "^(" + SIMPLE_PROMPT + "|" + DEFAULT_PROMPT + "|" + RVM_PROMPT + ")(?=[ ])",
      starts: {
        end: "$",
        keywords: RUBY_KEYWORDS,
        contains: RUBY_DEFAULT_CONTAINS
      }
    }
  ];
  COMMENT_MODES.unshift(IRB_OBJECT);
  return {
    name: "Ruby",
    aliases: [
      "rb",
      "gemspec",
      "podspec",
      "thor",
      "irb"
    ],
    keywords: RUBY_KEYWORDS,
    illegal: /\/\*/,
    contains: [hljs.SHEBANG({ binary: "ruby" })].concat(IRB_DEFAULT).concat(COMMENT_MODES).concat(RUBY_DEFAULT_CONTAINS)
  };
}
function c(hljs) {
  const regex = hljs.regex;
  const C_LINE_COMMENT_MODE2 = hljs.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] });
  const DECLTYPE_AUTO_RE = "decltype\\(auto\\)";
  const NAMESPACE_RE = "[a-zA-Z_]\\w*::";
  const TEMPLATE_ARGUMENT_RE = "<[^<>]+>";
  const FUNCTION_TYPE_RE = "(" + DECLTYPE_AUTO_RE + "|" + regex.optional(NAMESPACE_RE) + "[a-zA-Z_]\\w*" + regex.optional(TEMPLATE_ARGUMENT_RE) + ")";
  const TYPES2 = {
    className: "type",
    variants: [
      { begin: "\\b[a-z\\d_]*_t\\b" },
      { match: /\batomic_[a-z]{3,6}\b/ }
    ]
  };
  const CHARACTER_ESCAPES = "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)";
  const STRINGS = {
    className: "string",
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: "(u8?|U|L)?'(" + CHARACTER_ESCAPES + "|.)",
        end: "'",
        illegal: "."
      },
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  };
  const NUMBERS = {
    className: "number",
    variants: [
      { begin: "\\b(0b[01']+)" },
      { begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)" },
      { begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }
    ],
    relevance: 0
  };
  const PREPROCESSOR = {
    className: "meta",
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      hljs.inherit(STRINGS, { className: "string" }),
      {
        className: "string",
        begin: /<.*?>/
      },
      C_LINE_COMMENT_MODE2,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };
  const TITLE_MODE2 = {
    className: "title",
    begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0
  };
  const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + "\\s*\\(";
  const C_KEYWORDS = [
    "asm",
    "auto",
    "break",
    "case",
    "continue",
    "default",
    "do",
    "else",
    "enum",
    "extern",
    "for",
    "fortran",
    "goto",
    "if",
    "inline",
    "register",
    "restrict",
    "return",
    "sizeof",
    "struct",
    "switch",
    "typedef",
    "union",
    "volatile",
    "while",
    "_Alignas",
    "_Alignof",
    "_Atomic",
    "_Generic",
    "_Noreturn",
    "_Static_assert",
    "_Thread_local",
    // aliases
    "alignas",
    "alignof",
    "noreturn",
    "static_assert",
    "thread_local",
    // not a C keyword but is, for all intents and purposes, treated exactly like one.
    "_Pragma"
  ];
  const C_TYPES = [
    "float",
    "double",
    "signed",
    "unsigned",
    "int",
    "short",
    "long",
    "char",
    "void",
    "_Bool",
    "_Complex",
    "_Imaginary",
    "_Decimal32",
    "_Decimal64",
    "_Decimal128",
    // modifiers
    "const",
    "static",
    // aliases
    "complex",
    "bool",
    "imaginary"
  ];
  const KEYWORDS2 = {
    keyword: C_KEYWORDS,
    type: C_TYPES,
    literal: "true false NULL",
    // TODO: apply hinting work similar to what was done in cpp.js
    built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
  };
  const EXPRESSION_CONTAINS = [
    PREPROCESSOR,
    TYPES2,
    C_LINE_COMMENT_MODE2,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBERS,
    STRINGS
  ];
  const EXPRESSION_CONTEXT = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: "new throw return else",
        end: /;/
      }
    ],
    keywords: KEYWORDS2,
    contains: EXPRESSION_CONTAINS.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS2,
        contains: EXPRESSION_CONTAINS.concat(["self"]),
        relevance: 0
      }
    ]),
    relevance: 0
  };
  const FUNCTION_DECLARATION = {
    begin: "(" + FUNCTION_TYPE_RE + "[\\*&\\s]+)+" + FUNCTION_TITLE,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: KEYWORDS2,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      {
        // to prevent it from being confused as the function title
        begin: DECLTYPE_AUTO_RE,
        keywords: KEYWORDS2,
        relevance: 0
      },
      {
        begin: FUNCTION_TITLE,
        returnBegin: true,
        contains: [hljs.inherit(TITLE_MODE2, { className: "title.function" })],
        relevance: 0
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS2,
        relevance: 0,
        contains: [
          C_LINE_COMMENT_MODE2,
          hljs.C_BLOCK_COMMENT_MODE,
          STRINGS,
          NUMBERS,
          TYPES2,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: KEYWORDS2,
            relevance: 0,
            contains: [
              "self",
              C_LINE_COMMENT_MODE2,
              hljs.C_BLOCK_COMMENT_MODE,
              STRINGS,
              NUMBERS,
              TYPES2
            ]
          }
        ]
      },
      TYPES2,
      C_LINE_COMMENT_MODE2,
      hljs.C_BLOCK_COMMENT_MODE,
      PREPROCESSOR
    ]
  };
  return {
    name: "C",
    aliases: ["h"],
    keywords: KEYWORDS2,
    // Until differentiations are added between `c` and `cpp`, `c` will
    // not be auto-detected to avoid auto-detect conflicts between C and C++
    disableAutodetect: true,
    illegal: "</",
    contains: [].concat(
      EXPRESSION_CONTEXT,
      FUNCTION_DECLARATION,
      EXPRESSION_CONTAINS,
      [
        PREPROCESSOR,
        {
          begin: hljs.IDENT_RE + "::",
          keywords: KEYWORDS2
        },
        {
          className: "class",
          beginKeywords: "enum class struct union",
          end: /[{;:<>=]/,
          contains: [
            { beginKeywords: "final class struct" },
            hljs.TITLE_MODE
          ]
        }
      ]
    ),
    exports: {
      preprocessor: PREPROCESSOR,
      strings: STRINGS,
      keywords: KEYWORDS2
    }
  };
}
function cpp(hljs) {
  const regex = hljs.regex;
  const C_LINE_COMMENT_MODE2 = hljs.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] });
  const DECLTYPE_AUTO_RE = "decltype\\(auto\\)";
  const NAMESPACE_RE = "[a-zA-Z_]\\w*::";
  const TEMPLATE_ARGUMENT_RE = "<[^<>]+>";
  const FUNCTION_TYPE_RE = "(?!struct)(" + DECLTYPE_AUTO_RE + "|" + regex.optional(NAMESPACE_RE) + "[a-zA-Z_]\\w*" + regex.optional(TEMPLATE_ARGUMENT_RE) + ")";
  const CPP_PRIMITIVE_TYPES = {
    className: "type",
    begin: "\\b[a-z\\d_]*_t\\b"
  };
  const CHARACTER_ESCAPES = "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)";
  const STRINGS = {
    className: "string",
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: "\\n",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: "(u8?|U|L)?'(" + CHARACTER_ESCAPES + "|.)",
        end: "'",
        illegal: "."
      },
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  };
  const NUMBERS = {
    className: "number",
    variants: [
      { begin: "\\b(0b[01']+)" },
      { begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)" },
      { begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }
    ],
    relevance: 0
  };
  const PREPROCESSOR = {
    className: "meta",
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      hljs.inherit(STRINGS, { className: "string" }),
      {
        className: "string",
        begin: /<.*?>/
      },
      C_LINE_COMMENT_MODE2,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };
  const TITLE_MODE2 = {
    className: "title",
    begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0
  };
  const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + "\\s*\\(";
  const RESERVED_KEYWORDS = [
    "alignas",
    "alignof",
    "and",
    "and_eq",
    "asm",
    "atomic_cancel",
    "atomic_commit",
    "atomic_noexcept",
    "auto",
    "bitand",
    "bitor",
    "break",
    "case",
    "catch",
    "class",
    "co_await",
    "co_return",
    "co_yield",
    "compl",
    "concept",
    "const_cast|10",
    "consteval",
    "constexpr",
    "constinit",
    "continue",
    "decltype",
    "default",
    "delete",
    "do",
    "dynamic_cast|10",
    "else",
    "enum",
    "explicit",
    "export",
    "extern",
    "false",
    "final",
    "for",
    "friend",
    "goto",
    "if",
    "import",
    "inline",
    "module",
    "mutable",
    "namespace",
    "new",
    "noexcept",
    "not",
    "not_eq",
    "nullptr",
    "operator",
    "or",
    "or_eq",
    "override",
    "private",
    "protected",
    "public",
    "reflexpr",
    "register",
    "reinterpret_cast|10",
    "requires",
    "return",
    "sizeof",
    "static_assert",
    "static_cast|10",
    "struct",
    "switch",
    "synchronized",
    "template",
    "this",
    "thread_local",
    "throw",
    "transaction_safe",
    "transaction_safe_dynamic",
    "true",
    "try",
    "typedef",
    "typeid",
    "typename",
    "union",
    "using",
    "virtual",
    "volatile",
    "while",
    "xor",
    "xor_eq"
  ];
  const RESERVED_TYPES = [
    "bool",
    "char",
    "char16_t",
    "char32_t",
    "char8_t",
    "double",
    "float",
    "int",
    "long",
    "short",
    "void",
    "wchar_t",
    "unsigned",
    "signed",
    "const",
    "static"
  ];
  const TYPE_HINTS = [
    "any",
    "auto_ptr",
    "barrier",
    "binary_semaphore",
    "bitset",
    "complex",
    "condition_variable",
    "condition_variable_any",
    "counting_semaphore",
    "deque",
    "false_type",
    "future",
    "imaginary",
    "initializer_list",
    "istringstream",
    "jthread",
    "latch",
    "lock_guard",
    "multimap",
    "multiset",
    "mutex",
    "optional",
    "ostringstream",
    "packaged_task",
    "pair",
    "promise",
    "priority_queue",
    "queue",
    "recursive_mutex",
    "recursive_timed_mutex",
    "scoped_lock",
    "set",
    "shared_future",
    "shared_lock",
    "shared_mutex",
    "shared_timed_mutex",
    "shared_ptr",
    "stack",
    "string_view",
    "stringstream",
    "timed_mutex",
    "thread",
    "true_type",
    "tuple",
    "unique_lock",
    "unique_ptr",
    "unordered_map",
    "unordered_multimap",
    "unordered_multiset",
    "unordered_set",
    "variant",
    "vector",
    "weak_ptr",
    "wstring",
    "wstring_view"
  ];
  const FUNCTION_HINTS = [
    "abort",
    "abs",
    "acos",
    "apply",
    "as_const",
    "asin",
    "atan",
    "atan2",
    "calloc",
    "ceil",
    "cerr",
    "cin",
    "clog",
    "cos",
    "cosh",
    "cout",
    "declval",
    "endl",
    "exchange",
    "exit",
    "exp",
    "fabs",
    "floor",
    "fmod",
    "forward",
    "fprintf",
    "fputs",
    "free",
    "frexp",
    "fscanf",
    "future",
    "invoke",
    "isalnum",
    "isalpha",
    "iscntrl",
    "isdigit",
    "isgraph",
    "islower",
    "isprint",
    "ispunct",
    "isspace",
    "isupper",
    "isxdigit",
    "labs",
    "launder",
    "ldexp",
    "log",
    "log10",
    "make_pair",
    "make_shared",
    "make_shared_for_overwrite",
    "make_tuple",
    "make_unique",
    "malloc",
    "memchr",
    "memcmp",
    "memcpy",
    "memset",
    "modf",
    "move",
    "pow",
    "printf",
    "putchar",
    "puts",
    "realloc",
    "scanf",
    "sin",
    "sinh",
    "snprintf",
    "sprintf",
    "sqrt",
    "sscanf",
    "std",
    "stderr",
    "stdin",
    "stdout",
    "strcat",
    "strchr",
    "strcmp",
    "strcpy",
    "strcspn",
    "strlen",
    "strncat",
    "strncmp",
    "strncpy",
    "strpbrk",
    "strrchr",
    "strspn",
    "strstr",
    "swap",
    "tan",
    "tanh",
    "terminate",
    "to_underlying",
    "tolower",
    "toupper",
    "vfprintf",
    "visit",
    "vprintf",
    "vsprintf"
  ];
  const LITERALS2 = [
    "NULL",
    "false",
    "nullopt",
    "nullptr",
    "true"
  ];
  const BUILT_IN = ["_Pragma"];
  const CPP_KEYWORDS = {
    type: RESERVED_TYPES,
    keyword: RESERVED_KEYWORDS,
    literal: LITERALS2,
    built_in: BUILT_IN,
    _type_hints: TYPE_HINTS
  };
  const FUNCTION_DISPATCH = {
    className: "function.dispatch",
    relevance: 0,
    keywords: {
      // Only for relevance, not highlighting.
      _hint: FUNCTION_HINTS
    },
    begin: regex.concat(
      /\b/,
      /(?!decltype)/,
      /(?!if)/,
      /(?!for)/,
      /(?!switch)/,
      /(?!while)/,
      hljs.IDENT_RE,
      regex.lookahead(/(<[^<>]+>|)\s*\(/)
    )
  };
  const EXPRESSION_CONTAINS = [
    FUNCTION_DISPATCH,
    PREPROCESSOR,
    CPP_PRIMITIVE_TYPES,
    C_LINE_COMMENT_MODE2,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBERS,
    STRINGS
  ];
  const EXPRESSION_CONTEXT = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: "new throw return else",
        end: /;/
      }
    ],
    keywords: CPP_KEYWORDS,
    contains: EXPRESSION_CONTAINS.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: CPP_KEYWORDS,
        contains: EXPRESSION_CONTAINS.concat(["self"]),
        relevance: 0
      }
    ]),
    relevance: 0
  };
  const FUNCTION_DECLARATION = {
    className: "function",
    begin: "(" + FUNCTION_TYPE_RE + "[\\*&\\s]+)+" + FUNCTION_TITLE,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: CPP_KEYWORDS,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      {
        // to prevent it from being confused as the function title
        begin: DECLTYPE_AUTO_RE,
        keywords: CPP_KEYWORDS,
        relevance: 0
      },
      {
        begin: FUNCTION_TITLE,
        returnBegin: true,
        contains: [TITLE_MODE2],
        relevance: 0
      },
      // needed because we do not have look-behind on the below rule
      // to prevent it from grabbing the final : in a :: pair
      {
        begin: /::/,
        relevance: 0
      },
      // initializers
      {
        begin: /:/,
        endsWithParent: true,
        contains: [
          STRINGS,
          NUMBERS
        ]
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: CPP_KEYWORDS,
        relevance: 0,
        contains: [
          C_LINE_COMMENT_MODE2,
          hljs.C_BLOCK_COMMENT_MODE,
          STRINGS,
          NUMBERS,
          CPP_PRIMITIVE_TYPES,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: CPP_KEYWORDS,
            relevance: 0,
            contains: [
              "self",
              C_LINE_COMMENT_MODE2,
              hljs.C_BLOCK_COMMENT_MODE,
              STRINGS,
              NUMBERS,
              CPP_PRIMITIVE_TYPES
            ]
          }
        ]
      },
      CPP_PRIMITIVE_TYPES,
      C_LINE_COMMENT_MODE2,
      hljs.C_BLOCK_COMMENT_MODE,
      PREPROCESSOR
    ]
  };
  return {
    name: "C++",
    aliases: [
      "cc",
      "c++",
      "h++",
      "hpp",
      "hh",
      "hxx",
      "cxx"
    ],
    keywords: CPP_KEYWORDS,
    illegal: "</",
    classNameAliases: { "function.dispatch": "built_in" },
    contains: [].concat(
      EXPRESSION_CONTEXT,
      FUNCTION_DECLARATION,
      FUNCTION_DISPATCH,
      EXPRESSION_CONTAINS,
      [
        PREPROCESSOR,
        {
          // containers: ie, `vector <int> rooms (9);`
          begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function)\\s*<(?!<)",
          end: ">",
          keywords: CPP_KEYWORDS,
          contains: [
            "self",
            CPP_PRIMITIVE_TYPES
          ]
        },
        {
          begin: hljs.IDENT_RE + "::",
          keywords: CPP_KEYWORDS
        },
        {
          match: [
            // extra complexity to deal with `enum class` and `enum struct`
            /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
            /\s+/,
            /\w+/
          ],
          className: {
            1: "keyword",
            3: "title.class"
          }
        }
      ]
    )
  };
}
function csharp(hljs) {
  const BUILT_IN_KEYWORDS = [
    "bool",
    "byte",
    "char",
    "decimal",
    "delegate",
    "double",
    "dynamic",
    "enum",
    "float",
    "int",
    "long",
    "nint",
    "nuint",
    "object",
    "sbyte",
    "short",
    "string",
    "ulong",
    "uint",
    "ushort"
  ];
  const FUNCTION_MODIFIERS = [
    "public",
    "private",
    "protected",
    "static",
    "internal",
    "protected",
    "abstract",
    "async",
    "extern",
    "override",
    "unsafe",
    "virtual",
    "new",
    "sealed",
    "partial"
  ];
  const LITERAL_KEYWORDS = [
    "default",
    "false",
    "null",
    "true"
  ];
  const NORMAL_KEYWORDS = [
    "abstract",
    "as",
    "base",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "do",
    "else",
    "event",
    "explicit",
    "extern",
    "finally",
    "fixed",
    "for",
    "foreach",
    "goto",
    "if",
    "implicit",
    "in",
    "interface",
    "internal",
    "is",
    "lock",
    "namespace",
    "new",
    "operator",
    "out",
    "override",
    "params",
    "private",
    "protected",
    "public",
    "readonly",
    "record",
    "ref",
    "return",
    "scoped",
    "sealed",
    "sizeof",
    "stackalloc",
    "static",
    "struct",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "unchecked",
    "unsafe",
    "using",
    "virtual",
    "void",
    "volatile",
    "while"
  ];
  const CONTEXTUAL_KEYWORDS = [
    "add",
    "alias",
    "and",
    "ascending",
    "async",
    "await",
    "by",
    "descending",
    "equals",
    "from",
    "get",
    "global",
    "group",
    "init",
    "into",
    "join",
    "let",
    "nameof",
    "not",
    "notnull",
    "on",
    "or",
    "orderby",
    "partial",
    "remove",
    "select",
    "set",
    "unmanaged",
    "value|0",
    "var",
    "when",
    "where",
    "with",
    "yield"
  ];
  const KEYWORDS2 = {
    keyword: NORMAL_KEYWORDS.concat(CONTEXTUAL_KEYWORDS),
    built_in: BUILT_IN_KEYWORDS,
    literal: LITERAL_KEYWORDS
  };
  const TITLE_MODE2 = hljs.inherit(hljs.TITLE_MODE, { begin: "[a-zA-Z](\\.?\\w)*" });
  const NUMBERS = {
    className: "number",
    variants: [
      { begin: "\\b(0b[01']+)" },
      { begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)" },
      { begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }
    ],
    relevance: 0
  };
  const VERBATIM_STRING = {
    className: "string",
    begin: '@"',
    end: '"',
    contains: [{ begin: '""' }]
  };
  const VERBATIM_STRING_NO_LF = hljs.inherit(VERBATIM_STRING, { illegal: /\n/ });
  const SUBST = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS2
  };
  const SUBST_NO_LF = hljs.inherit(SUBST, { illegal: /\n/ });
  const INTERPOLATED_STRING = {
    className: "string",
    begin: /\$"/,
    end: '"',
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      hljs.BACKSLASH_ESCAPE,
      SUBST_NO_LF
    ]
  };
  const INTERPOLATED_VERBATIM_STRING = {
    className: "string",
    begin: /\$@"/,
    end: '"',
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      SUBST
    ]
  };
  const INTERPOLATED_VERBATIM_STRING_NO_LF = hljs.inherit(INTERPOLATED_VERBATIM_STRING, {
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      SUBST_NO_LF
    ]
  });
  SUBST.contains = [
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.C_BLOCK_COMMENT_MODE
  ];
  SUBST_NO_LF.contains = [
    INTERPOLATED_VERBATIM_STRING_NO_LF,
    INTERPOLATED_STRING,
    VERBATIM_STRING_NO_LF,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.inherit(hljs.C_BLOCK_COMMENT_MODE, { illegal: /\n/ })
  ];
  const STRING = { variants: [
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ] };
  const GENERIC_MODIFIER = {
    begin: "<",
    end: ">",
    contains: [
      { beginKeywords: "in out" },
      TITLE_MODE2
    ]
  };
  const TYPE_IDENT_RE = hljs.IDENT_RE + "(<" + hljs.IDENT_RE + "(\\s*,\\s*" + hljs.IDENT_RE + ")*>)?(\\[\\])?";
  const AT_IDENTIFIER = {
    // prevents expressions like `@class` from incorrect flagging
    // `class` as a keyword
    begin: "@" + hljs.IDENT_RE,
    relevance: 0
  };
  return {
    name: "C#",
    aliases: [
      "cs",
      "c#"
    ],
    keywords: KEYWORDS2,
    illegal: /::/,
    contains: [
      hljs.COMMENT(
        "///",
        "$",
        {
          returnBegin: true,
          contains: [
            {
              className: "doctag",
              variants: [
                {
                  begin: "///",
                  relevance: 0
                },
                { begin: "<!--|-->" },
                {
                  begin: "</?",
                  end: ">"
                }
              ]
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "meta",
        begin: "#",
        end: "$",
        keywords: { keyword: "if else elif endif define undef warning error line region endregion pragma checksum" }
      },
      STRING,
      NUMBERS,
      {
        beginKeywords: "class interface",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [
          { beginKeywords: "where class" },
          TITLE_MODE2,
          GENERIC_MODIFIER,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: "namespace",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          TITLE_MODE2,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: "record",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          TITLE_MODE2,
          GENERIC_MODIFIER,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // [Attributes("")]
        className: "meta",
        begin: "^\\s*\\[(?=[\\w])",
        excludeBegin: true,
        end: "\\]",
        excludeEnd: true,
        contains: [
          {
            className: "string",
            begin: /"/,
            end: /"/
          }
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: "new return throw await else",
        relevance: 0
      },
      {
        className: "function",
        begin: "(" + TYPE_IDENT_RE + "\\s+)+" + hljs.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
        returnBegin: true,
        end: /\s*[{;=]/,
        excludeEnd: true,
        keywords: KEYWORDS2,
        contains: [
          // prevents these from being highlighted `title`
          {
            beginKeywords: FUNCTION_MODIFIERS.join(" "),
            relevance: 0
          },
          {
            begin: hljs.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
            returnBegin: true,
            contains: [
              hljs.TITLE_MODE,
              GENERIC_MODIFIER
            ],
            relevance: 0
          },
          { match: /\(\)/ },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS2,
            relevance: 0,
            contains: [
              STRING,
              NUMBERS,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      AT_IDENTIFIER
    ]
  };
}
function sql(hljs) {
  const regex = hljs.regex;
  const COMMENT_MODE = hljs.COMMENT("--", "$");
  const STRING = {
    className: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [{ begin: /''/ }]
      }
    ]
  };
  const QUOTED_IDENTIFIER = {
    begin: /"/,
    end: /"/,
    contains: [{ begin: /""/ }]
  };
  const LITERALS2 = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ];
  const MULTI_WORD_TYPES = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ];
  const TYPES2 = [
    "bigint",
    "binary",
    "blob",
    "boolean",
    "char",
    "character",
    "clob",
    "date",
    "dec",
    "decfloat",
    "decimal",
    "float",
    "int",
    "integer",
    "interval",
    "nchar",
    "nclob",
    "national",
    "numeric",
    "real",
    "row",
    "smallint",
    "time",
    "timestamp",
    "varchar",
    "varying",
    // modifier (character varying)
    "varbinary"
  ];
  const NON_RESERVED_WORDS = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ];
  const RESERVED_WORDS = [
    "abs",
    "acos",
    "all",
    "allocate",
    "alter",
    "and",
    "any",
    "are",
    "array",
    "array_agg",
    "array_max_cardinality",
    "as",
    "asensitive",
    "asin",
    "asymmetric",
    "at",
    "atan",
    "atomic",
    "authorization",
    "avg",
    "begin",
    "begin_frame",
    "begin_partition",
    "between",
    "bigint",
    "binary",
    "blob",
    "boolean",
    "both",
    "by",
    "call",
    "called",
    "cardinality",
    "cascaded",
    "case",
    "cast",
    "ceil",
    "ceiling",
    "char",
    "char_length",
    "character",
    "character_length",
    "check",
    "classifier",
    "clob",
    "close",
    "coalesce",
    "collate",
    "collect",
    "column",
    "commit",
    "condition",
    "connect",
    "constraint",
    "contains",
    "convert",
    "copy",
    "corr",
    "corresponding",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "create",
    "cross",
    "cube",
    "cume_dist",
    "current",
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_row",
    "current_schema",
    "current_time",
    "current_timestamp",
    "current_path",
    "current_role",
    "current_transform_group_for_type",
    "current_user",
    "cursor",
    "cycle",
    "date",
    "day",
    "deallocate",
    "dec",
    "decimal",
    "decfloat",
    "declare",
    "default",
    "define",
    "delete",
    "dense_rank",
    "deref",
    "describe",
    "deterministic",
    "disconnect",
    "distinct",
    "double",
    "drop",
    "dynamic",
    "each",
    "element",
    "else",
    "empty",
    "end",
    "end_frame",
    "end_partition",
    "end-exec",
    "equals",
    "escape",
    "every",
    "except",
    "exec",
    "execute",
    "exists",
    "exp",
    "external",
    "extract",
    "false",
    "fetch",
    "filter",
    "first_value",
    "float",
    "floor",
    "for",
    "foreign",
    "frame_row",
    "free",
    "from",
    "full",
    "function",
    "fusion",
    "get",
    "global",
    "grant",
    "group",
    "grouping",
    "groups",
    "having",
    "hold",
    "hour",
    "identity",
    "in",
    "indicator",
    "initial",
    "inner",
    "inout",
    "insensitive",
    "insert",
    "int",
    "integer",
    "intersect",
    "intersection",
    "interval",
    "into",
    "is",
    "join",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "language",
    "large",
    "last_value",
    "lateral",
    "lead",
    "leading",
    "left",
    "like",
    "like_regex",
    "listagg",
    "ln",
    "local",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "match",
    "match_number",
    "match_recognize",
    "matches",
    "max",
    "member",
    "merge",
    "method",
    "min",
    "minute",
    "mod",
    "modifies",
    "module",
    "month",
    "multiset",
    "national",
    "natural",
    "nchar",
    "nclob",
    "new",
    "no",
    "none",
    "normalize",
    "not",
    "nth_value",
    "ntile",
    "null",
    "nullif",
    "numeric",
    "octet_length",
    "occurrences_regex",
    "of",
    "offset",
    "old",
    "omit",
    "on",
    "one",
    "only",
    "open",
    "or",
    "order",
    "out",
    "outer",
    "over",
    "overlaps",
    "overlay",
    "parameter",
    "partition",
    "pattern",
    "per",
    "percent",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "period",
    "portion",
    "position",
    "position_regex",
    "power",
    "precedes",
    "precision",
    "prepare",
    "primary",
    "procedure",
    "ptf",
    "range",
    "rank",
    "reads",
    "real",
    "recursive",
    "ref",
    "references",
    "referencing",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "release",
    "result",
    "return",
    "returns",
    "revoke",
    "right",
    "rollback",
    "rollup",
    "row",
    "row_number",
    "rows",
    "running",
    "savepoint",
    "scope",
    "scroll",
    "search",
    "second",
    "seek",
    "select",
    "sensitive",
    "session_user",
    "set",
    "show",
    "similar",
    "sin",
    "sinh",
    "skip",
    "smallint",
    "some",
    "specific",
    "specifictype",
    "sql",
    "sqlexception",
    "sqlstate",
    "sqlwarning",
    "sqrt",
    "start",
    "static",
    "stddev_pop",
    "stddev_samp",
    "submultiset",
    "subset",
    "substring",
    "substring_regex",
    "succeeds",
    "sum",
    "symmetric",
    "system",
    "system_time",
    "system_user",
    "table",
    "tablesample",
    "tan",
    "tanh",
    "then",
    "time",
    "timestamp",
    "timezone_hour",
    "timezone_minute",
    "to",
    "trailing",
    "translate",
    "translate_regex",
    "translation",
    "treat",
    "trigger",
    "trim",
    "trim_array",
    "true",
    "truncate",
    "uescape",
    "union",
    "unique",
    "unknown",
    "unnest",
    "update",
    "upper",
    "user",
    "using",
    "value",
    "values",
    "value_of",
    "var_pop",
    "var_samp",
    "varbinary",
    "varchar",
    "varying",
    "versioning",
    "when",
    "whenever",
    "where",
    "width_bucket",
    "window",
    "with",
    "within",
    "without",
    "year"
  ];
  const RESERVED_FUNCTIONS = [
    "abs",
    "acos",
    "array_agg",
    "asin",
    "atan",
    "avg",
    "cast",
    "ceil",
    "ceiling",
    "coalesce",
    "corr",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "dense_rank",
    "deref",
    "element",
    "exp",
    "extract",
    "first_value",
    "floor",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "last_value",
    "lead",
    "listagg",
    "ln",
    "log",
    "log10",
    "lower",
    "max",
    "min",
    "mod",
    "nth_value",
    "ntile",
    "nullif",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "position",
    "position_regex",
    "power",
    "rank",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "row_number",
    "sin",
    "sinh",
    "sqrt",
    "stddev_pop",
    "stddev_samp",
    "substring",
    "substring_regex",
    "sum",
    "tan",
    "tanh",
    "translate",
    "translate_regex",
    "treat",
    "trim",
    "trim_array",
    "unnest",
    "upper",
    "value_of",
    "var_pop",
    "var_samp",
    "width_bucket"
  ];
  const POSSIBLE_WITHOUT_PARENS = [
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_schema",
    "current_transform_group_for_type",
    "current_user",
    "session_user",
    "system_time",
    "system_user",
    "current_time",
    "localtime",
    "current_timestamp",
    "localtimestamp"
  ];
  const COMBOS = [
    "create table",
    "insert into",
    "primary key",
    "foreign key",
    "not null",
    "alter table",
    "add constraint",
    "grouping sets",
    "on overflow",
    "character set",
    "respect nulls",
    "ignore nulls",
    "nulls first",
    "nulls last",
    "depth first",
    "breadth first"
  ];
  const FUNCTIONS = RESERVED_FUNCTIONS;
  const KEYWORDS2 = [
    ...RESERVED_WORDS,
    ...NON_RESERVED_WORDS
  ].filter((keyword) => {
    return !RESERVED_FUNCTIONS.includes(keyword);
  });
  const VARIABLE = {
    className: "variable",
    begin: /@[a-z0-9][a-z0-9_]*/
  };
  const OPERATOR = {
    className: "operator",
    begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  };
  const FUNCTION_CALL = {
    begin: regex.concat(/\b/, regex.either(...FUNCTIONS), /\s*\(/),
    relevance: 0,
    keywords: { built_in: FUNCTIONS }
  };
  function reduceRelevancy(list, {
    exceptions,
    when
  } = {}) {
    const qualifyFn = when;
    exceptions = exceptions || [];
    return list.map((item) => {
      if (item.match(/\|\d+$/) || exceptions.includes(item)) {
        return item;
      } else if (qualifyFn(item)) {
        return `${item}|0`;
      } else {
        return item;
      }
    });
  }
  return {
    name: "SQL",
    case_insensitive: true,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: reduceRelevancy(KEYWORDS2, { when: (x) => x.length < 3 }),
      literal: LITERALS2,
      type: TYPES2,
      built_in: POSSIBLE_WITHOUT_PARENS
    },
    contains: [
      {
        begin: regex.either(...COMBOS),
        relevance: 0,
        keywords: {
          $pattern: /[\w\.]+/,
          keyword: KEYWORDS2.concat(COMBOS),
          literal: LITERALS2,
          type: TYPES2
        }
      },
      {
        className: "type",
        begin: regex.either(...MULTI_WORD_TYPES)
      },
      FUNCTION_CALL,
      VARIABLE,
      STRING,
      QUOTED_IDENTIFIER,
      hljs.C_NUMBER_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE,
      OPERATOR
    ]
  };
}
function shell(hljs) {
  return {
    name: "Shell Session",
    aliases: [
      "console",
      "shellsession"
    ],
    contains: [
      {
        className: "meta.prompt",
        // We cannot add \s (spaces) in the regular expression otherwise it will be too broad and produce unexpected result.
        // For instance, in the following example, it would match "echo /path/to/home >" as a prompt:
        // echo /path/to/home > t.exe
        begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
        starts: {
          end: /[^\\](?=\s*$)/,
          subLanguage: "bash"
        }
      }
    ]
  };
}
function r(hljs) {
  const regex = hljs.regex;
  const IDENT_RE2 = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/;
  const NUMBER_TYPES_RE = regex.either(
    // Special case: only hexadecimal binary powers can contain fractions
    /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/,
    // Hexadecimal numbers without fraction and optional binary power
    /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/,
    // Decimal numbers
    /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/
  );
  const OPERATORS_RE = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/;
  const PUNCTUATION_RE = regex.either(
    /[()]/,
    /[{}]/,
    /\[\[/,
    /[[\]]/,
    /\\/,
    /,/
  );
  return {
    name: "R",
    keywords: {
      $pattern: IDENT_RE2,
      keyword: "function if in break next repeat else for while",
      literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
      built_in: (
        // Builtin constants
        "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
      )
    },
    contains: [
      // Roxygen comments
      hljs.COMMENT(
        /#'/,
        /$/,
        { contains: [
          {
            // Handle `@examples` separately to cause all subsequent code
            // until the next `@`-tag on its own line to be kept as-is,
            // preventing highlighting. This code is example R code, so nested
            // doctags shouldn’t be treated as such. See
            // `test/markup/r/roxygen.txt` for an example.
            scope: "doctag",
            match: /@examples/,
            starts: {
              end: regex.lookahead(regex.either(
                // end if another doc comment
                /\n^#'\s*(?=@[a-zA-Z]+)/,
                // or a line with no comment
                /\n^(?!#')/
              )),
              endsParent: true
            }
          },
          {
            // Handle `@param` to highlight the parameter name following
            // after.
            scope: "doctag",
            begin: "@param",
            end: /$/,
            contains: [
              {
                scope: "variable",
                variants: [
                  { match: IDENT_RE2 },
                  { match: /`(?:\\.|[^`\\])+`/ }
                ],
                endsParent: true
              }
            ]
          },
          {
            scope: "doctag",
            match: /@[a-zA-Z]+/
          },
          {
            scope: "keyword",
            match: /\\[a-zA-Z]+/
          }
        ] }
      ),
      hljs.HASH_COMMENT_MODE,
      {
        scope: "string",
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\(/,
            end: /\)(-*)"/
          }),
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\{/,
            end: /\}(-*)"/
          }),
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\[/,
            end: /\](-*)"/
          }),
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\(/,
            end: /\)(-*)'/
          }),
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\{/,
            end: /\}(-*)'/
          }),
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\[/,
            end: /\](-*)'/
          }),
          {
            begin: '"',
            end: '"',
            relevance: 0
          },
          {
            begin: "'",
            end: "'",
            relevance: 0
          }
        ]
      },
      // Matching numbers immediately following punctuation and operators is
      // tricky since we need to look at the character ahead of a number to
      // ensure the number is not part of an identifier, and we cannot use
      // negative look-behind assertions. So instead we explicitly handle all
      // possible combinations of (operator|punctuation), number.
      // TODO: replace with negative look-behind when available
      // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/ },
      // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?/ },
      // { begin: /(?<![a-zA-Z0-9._])(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?/ }
      {
        relevance: 0,
        variants: [
          {
            scope: {
              1: "operator",
              2: "number"
            },
            match: [
              OPERATORS_RE,
              NUMBER_TYPES_RE
            ]
          },
          {
            scope: {
              1: "operator",
              2: "number"
            },
            match: [
              /%[^%]*%/,
              NUMBER_TYPES_RE
            ]
          },
          {
            scope: {
              1: "punctuation",
              2: "number"
            },
            match: [
              PUNCTUATION_RE,
              NUMBER_TYPES_RE
            ]
          },
          {
            scope: { 2: "number" },
            match: [
              /[^a-zA-Z0-9._]|^/,
              // not part of an identifier, or start of document
              NUMBER_TYPES_RE
            ]
          }
        ]
      },
      // Operators/punctuation when they're not directly followed by numbers
      {
        // Relevance boost for the most common assignment form.
        scope: { 3: "operator" },
        match: [
          IDENT_RE2,
          /\s+/,
          /<-/,
          /\s+/
        ]
      },
      {
        scope: "operator",
        relevance: 0,
        variants: [
          { match: OPERATORS_RE },
          { match: /%[^%]*%/ }
        ]
      },
      {
        scope: "punctuation",
        relevance: 0,
        match: PUNCTUATION_RE
      },
      {
        // Escaped identifier
        begin: "`",
        end: "`",
        contains: [{ begin: /\\./ }]
      }
    ]
  };
}
var decimalDigits = "[0-9](_*[0-9])*";
var frac = `\\.(${decimalDigits})`;
var hexDigits = "[0-9a-fA-F](_*[0-9a-fA-F])*";
var NUMERIC = {
  className: "number",
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${decimalDigits})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${decimalDigits})((${frac})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${frac})[fFdD]?\\b` },
    { begin: `\\b(${decimalDigits})[fFdD]\\b` },
    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${hexDigits})\\.?|(${hexDigits})?\\.(${hexDigits}))[pP][+-]?(${decimalDigits})[fFdD]?\\b` },
    // DecimalIntegerLiteral
    { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
    // HexIntegerLiteral
    { begin: `\\b0[xX](${hexDigits})[lL]?\\b` },
    // OctalIntegerLiteral
    { begin: "\\b0(_*[0-7])*[lL]?\\b" },
    // BinaryIntegerLiteral
    { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
  ],
  relevance: 0
};
function kotlin(hljs) {
  const KEYWORDS2 = {
    keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
    built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
    literal: "true false null"
  };
  const KEYWORDS_WITH_LABEL = {
    className: "keyword",
    begin: /\b(break|continue|return|this)\b/,
    starts: { contains: [
      {
        className: "symbol",
        begin: /@\w+/
      }
    ] }
  };
  const LABEL = {
    className: "symbol",
    begin: hljs.UNDERSCORE_IDENT_RE + "@"
  };
  const SUBST = {
    className: "subst",
    begin: /\$\{/,
    end: /\}/,
    contains: [hljs.C_NUMBER_MODE]
  };
  const VARIABLE = {
    className: "variable",
    begin: "\\$" + hljs.UNDERSCORE_IDENT_RE
  };
  const STRING = {
    className: "string",
    variants: [
      {
        begin: '"""',
        end: '"""(?=[^"])',
        contains: [
          VARIABLE,
          SUBST
        ]
      },
      // Can't use built-in modes easily, as we want to use STRING in the meta
      // context as 'meta-string' and there's no syntax to remove explicitly set
      // classNames in built-in modes.
      {
        begin: "'",
        end: "'",
        illegal: /\n/,
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: '"',
        end: '"',
        illegal: /\n/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          VARIABLE,
          SUBST
        ]
      }
    ]
  };
  SUBST.contains.push(STRING);
  const ANNOTATION_USE_SITE = {
    className: "meta",
    begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + hljs.UNDERSCORE_IDENT_RE + ")?"
  };
  const ANNOTATION = {
    className: "meta",
    begin: "@" + hljs.UNDERSCORE_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: [
          hljs.inherit(STRING, { className: "string" }),
          "self"
        ]
      }
    ]
  };
  const KOTLIN_NUMBER_MODE = NUMERIC;
  const KOTLIN_NESTED_COMMENT = hljs.COMMENT(
    "/\\*",
    "\\*/",
    { contains: [hljs.C_BLOCK_COMMENT_MODE] }
  );
  const KOTLIN_PAREN_TYPE = { variants: [
    {
      className: "type",
      begin: hljs.UNDERSCORE_IDENT_RE
    },
    {
      begin: /\(/,
      end: /\)/,
      contains: []
      // defined later
    }
  ] };
  const KOTLIN_PAREN_TYPE2 = KOTLIN_PAREN_TYPE;
  KOTLIN_PAREN_TYPE2.variants[1].contains = [KOTLIN_PAREN_TYPE];
  KOTLIN_PAREN_TYPE.variants[1].contains = [KOTLIN_PAREN_TYPE2];
  return {
    name: "Kotlin",
    aliases: [
      "kt",
      "kts"
    ],
    keywords: KEYWORDS2,
    contains: [
      hljs.COMMENT(
        "/\\*\\*",
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      KOTLIN_NESTED_COMMENT,
      KEYWORDS_WITH_LABEL,
      LABEL,
      ANNOTATION_USE_SITE,
      ANNOTATION,
      {
        className: "function",
        beginKeywords: "fun",
        end: "[(]|$",
        returnBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS2,
        relevance: 5,
        contains: [
          {
            begin: hljs.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "type",
            begin: /</,
            end: />/,
            keywords: "reified",
            relevance: 0
          },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: KEYWORDS2,
            relevance: 0,
            contains: [
              {
                begin: /:/,
                end: /[=,\/]/,
                endsWithParent: true,
                contains: [
                  KOTLIN_PAREN_TYPE,
                  hljs.C_LINE_COMMENT_MODE,
                  KOTLIN_NESTED_COMMENT
                ],
                relevance: 0
              },
              hljs.C_LINE_COMMENT_MODE,
              KOTLIN_NESTED_COMMENT,
              ANNOTATION_USE_SITE,
              ANNOTATION,
              STRING,
              hljs.C_NUMBER_MODE
            ]
          },
          KOTLIN_NESTED_COMMENT
        ]
      },
      {
        begin: [
          /class|interface|trait/,
          /\s+/,
          hljs.UNDERSCORE_IDENT_RE
        ],
        beginScope: {
          3: "title.class"
        },
        keywords: "class interface trait",
        end: /[:\{(]|$/,
        excludeEnd: true,
        illegal: "extends implements",
        contains: [
          { beginKeywords: "public protected internal private constructor" },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: "type",
            begin: /</,
            end: />/,
            excludeBegin: true,
            excludeEnd: true,
            relevance: 0
          },
          {
            className: "type",
            begin: /[,:]\s*/,
            end: /[<\(,){\s]|$/,
            excludeBegin: true,
            returnEnd: true
          },
          ANNOTATION_USE_SITE,
          ANNOTATION
        ]
      },
      STRING,
      {
        className: "meta",
        begin: "^#!/usr/bin/env",
        end: "$",
        illegal: "\n"
      },
      KOTLIN_NUMBER_MODE
    ]
  };
}
function rust(hljs) {
  const regex = hljs.regex;
  const FUNCTION_INVOKE = {
    className: "title.function.invoke",
    relevance: 0,
    begin: regex.concat(
      /\b/,
      /(?!let|for|while|if|else|match\b)/,
      hljs.IDENT_RE,
      regex.lookahead(/\s*\(/)
    )
  };
  const NUMBER_SUFFIX = "([ui](8|16|32|64|128|size)|f(32|64))?";
  const KEYWORDS2 = [
    "abstract",
    "as",
    "async",
    "await",
    "become",
    "box",
    "break",
    "const",
    "continue",
    "crate",
    "do",
    "dyn",
    "else",
    "enum",
    "extern",
    "false",
    "final",
    "fn",
    "for",
    "if",
    "impl",
    "in",
    "let",
    "loop",
    "macro",
    "match",
    "mod",
    "move",
    "mut",
    "override",
    "priv",
    "pub",
    "ref",
    "return",
    "self",
    "Self",
    "static",
    "struct",
    "super",
    "trait",
    "true",
    "try",
    "type",
    "typeof",
    "unsafe",
    "unsized",
    "use",
    "virtual",
    "where",
    "while",
    "yield"
  ];
  const LITERALS2 = [
    "true",
    "false",
    "Some",
    "None",
    "Ok",
    "Err"
  ];
  const BUILTINS = [
    // functions
    "drop ",
    // traits
    "Copy",
    "Send",
    "Sized",
    "Sync",
    "Drop",
    "Fn",
    "FnMut",
    "FnOnce",
    "ToOwned",
    "Clone",
    "Debug",
    "PartialEq",
    "PartialOrd",
    "Eq",
    "Ord",
    "AsRef",
    "AsMut",
    "Into",
    "From",
    "Default",
    "Iterator",
    "Extend",
    "IntoIterator",
    "DoubleEndedIterator",
    "ExactSizeIterator",
    "SliceConcatExt",
    "ToString",
    // macros
    "assert!",
    "assert_eq!",
    "bitflags!",
    "bytes!",
    "cfg!",
    "col!",
    "concat!",
    "concat_idents!",
    "debug_assert!",
    "debug_assert_eq!",
    "env!",
    "eprintln!",
    "panic!",
    "file!",
    "format!",
    "format_args!",
    "include_bytes!",
    "include_str!",
    "line!",
    "local_data_key!",
    "module_path!",
    "option_env!",
    "print!",
    "println!",
    "select!",
    "stringify!",
    "try!",
    "unimplemented!",
    "unreachable!",
    "vec!",
    "write!",
    "writeln!",
    "macro_rules!",
    "assert_ne!",
    "debug_assert_ne!"
  ];
  const TYPES2 = [
    "i8",
    "i16",
    "i32",
    "i64",
    "i128",
    "isize",
    "u8",
    "u16",
    "u32",
    "u64",
    "u128",
    "usize",
    "f32",
    "f64",
    "str",
    "char",
    "bool",
    "Box",
    "Option",
    "Result",
    "String",
    "Vec"
  ];
  return {
    name: "Rust",
    aliases: ["rs"],
    keywords: {
      $pattern: hljs.IDENT_RE + "!?",
      type: TYPES2,
      keyword: KEYWORDS2,
      literal: LITERALS2,
      built_in: BUILTINS
    },
    illegal: "</",
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        begin: /b?"/,
        illegal: null
      }),
      {
        className: "string",
        variants: [
          { begin: /b?r(#*)"(.|\n)*?"\1(?!#)/ },
          { begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }
        ]
      },
      {
        className: "symbol",
        begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
      },
      {
        className: "number",
        variants: [
          { begin: "\\b0b([01_]+)" + NUMBER_SUFFIX },
          { begin: "\\b0o([0-7_]+)" + NUMBER_SUFFIX },
          { begin: "\\b0x([A-Fa-f0-9_]+)" + NUMBER_SUFFIX },
          { begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + NUMBER_SUFFIX }
        ],
        relevance: 0
      },
      {
        begin: [
          /fn/,
          /\s+/,
          hljs.UNDERSCORE_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.function"
        }
      },
      {
        className: "meta",
        begin: "#!?\\[",
        end: "\\]",
        contains: [
          {
            className: "string",
            begin: /"/,
            end: /"/
          }
        ]
      },
      {
        begin: [
          /let/,
          /\s+/,
          /(?:mut\s+)?/,
          hljs.UNDERSCORE_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "keyword",
          4: "variable"
        }
      },
      // must come before impl/for rule later
      {
        begin: [
          /for/,
          /\s+/,
          hljs.UNDERSCORE_IDENT_RE,
          /\s+/,
          /in/
        ],
        className: {
          1: "keyword",
          3: "variable",
          5: "keyword"
        }
      },
      {
        begin: [
          /type/,
          /\s+/,
          hljs.UNDERSCORE_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        begin: [
          /(?:trait|enum|struct|union|impl|for)/,
          /\s+/,
          hljs.UNDERSCORE_IDENT_RE
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        begin: hljs.IDENT_RE + "::",
        keywords: {
          keyword: "Self",
          built_in: BUILTINS,
          type: TYPES2
        }
      },
      {
        className: "punctuation",
        begin: "->"
      },
      FUNCTION_INVOKE
    ]
  };
}
HighlightJS.registerLanguage("plaintext", plaintext);
HighlightJS.registerLanguage("json", json);
HighlightJS.registerLanguage("javascript", javascript$1);
HighlightJS.registerLanguage("java", java);
HighlightJS.registerLanguage("typescript", typescript);
HighlightJS.registerLanguage("python", python);
HighlightJS.registerLanguage("php", php);
HighlightJS.registerLanguage("css", css);
HighlightJS.registerLanguage("less", less);
HighlightJS.registerLanguage("scss", scss);
HighlightJS.registerLanguage("html", xml);
HighlightJS.registerLanguage("markdown", markdown);
HighlightJS.registerLanguage("objectivec", objectivec);
HighlightJS.registerLanguage("swift", swift);
HighlightJS.registerLanguage("dart", dart);
HighlightJS.registerLanguage("nginx", nginx);
HighlightJS.registerLanguage("go", go);
HighlightJS.registerLanguage("http", http);
HighlightJS.registerLanguage("ruby", ruby);
HighlightJS.registerLanguage("c", c);
HighlightJS.registerLanguage("cpp", cpp);
HighlightJS.registerLanguage("csharp", csharp);
HighlightJS.registerLanguage("sql", sql);
HighlightJS.registerLanguage("shell", shell);
HighlightJS.registerLanguage("r", r);
HighlightJS.registerLanguage("kotlin", kotlin);
HighlightJS.registerLanguage("rust", rust);
HighlightJS.configure({
  cssSelector: "pre",
  classPrefix: "editify-hljs-",
  ignoreUnescapedHTML: true
});
const getHljsHtml = function(code, language) {
  if (language) {
    return HighlightJS.highlight(code, {
      language,
      ignoreIllegals: true
    }).value;
  }
  return HighlightJS.highlightAuto(code).value;
};
const languages = [
  {
    label: "Plain Text",
    value: "plaintext"
  },
  {
    label: "JSON",
    value: "json"
  },
  {
    label: "JavaScript",
    value: "javascript"
  },
  {
    label: "Java",
    value: "java"
  },
  {
    label: "TypeScript",
    value: "typescript"
  },
  {
    label: "Python",
    value: "python"
  },
  {
    label: "PHP",
    value: "php"
  },
  {
    label: "CSS",
    value: "css"
  },
  {
    label: "Less",
    value: "less"
  },
  {
    label: "Scss",
    value: "scss"
  },
  {
    label: "HTML",
    value: "html"
  },
  {
    label: "Markdown",
    value: "markdown"
  },
  {
    label: "Objective-C",
    value: "objectivec"
  },
  {
    label: "Swift",
    value: "swift"
  },
  {
    label: "Dart",
    value: "dart"
  },
  {
    label: "Nginx",
    value: "nginx"
  },
  {
    label: "HTTP",
    value: "http"
  },
  {
    label: "Go",
    value: "go"
  },
  {
    label: "Ruby",
    value: "ruby"
  },
  {
    label: "C",
    value: "c"
  },
  {
    label: "C++",
    value: "cpp"
  },
  {
    label: "C#",
    value: "csharp"
  },
  {
    label: "SQL",
    value: "sql"
  },
  {
    label: "Shell",
    value: "shell"
  },
  {
    label: "R",
    value: "r"
  },
  {
    label: "Kotlin",
    value: "kotlin"
  },
  {
    label: "Rust",
    value: "rust"
  }
];
const pasteKeepData = {
  //粘贴html时元素保留的样式（全部元素）
  marks: {
    "data-editify-list": ["div"],
    "data-editify-value": ["div"],
    "data-editify-code": ["span"],
    "data-editify-task": ["div"],
    contenteditable: "*",
    src: ["img", "video"],
    autoplay: ["video"],
    loop: ["video"],
    muted: ["video"],
    href: ["a"],
    target: ["a"],
    alt: ["img"],
    controls: ["video"],
    name: "*",
    disabled: "*",
    colspan: ["td"]
  },
  //粘贴html时非文本元素保留的样式
  styles: {
    "text-indent": "*",
    "text-align": "*"
  }
};
const mergeObject = function(o1, o2) {
  if (!common.isObject(o1) && common.isObject(o2)) {
    return null;
  }
  for (let key in o2) {
    if (common.isObject(o2[key]) && !Array.isArray(o2[key]) && common.isObject(o1[key]) && !Array.isArray(o1[key])) {
      o1[key] = mergeObject(o1[key], o2[key]);
    } else {
      o1[key] = o2[key];
    }
  }
  return o1;
};
const queryHasValue = function(obj, name, value) {
  if (value == null || value == void 0) {
    return obj.hasOwnProperty(name);
  }
  let ownValue = obj[name];
  if (ownValue == null || ownValue == void 0) {
    return false;
  }
  if (typeof value == "string") {
    value = value.toLocaleLowerCase();
  }
  if (typeof ownValue == "string") {
    ownValue = ownValue.toLocaleLowerCase();
  }
  if (typeof value == "string" && value && (common.matchingText(value, "rgb") || common.matchingText(value, "rgba"))) {
    value = string.trim(value, true);
  }
  if (typeof ownValue == "string" && ownValue && (common.matchingText(ownValue, "rgb") || common.matchingText(ownValue, "rgba"))) {
    ownValue = string.trim(ownValue, true);
  }
  if (typeof value == "string" && value && common.matchingText(value, "hex")) {
    const arr = color.hex2rgb(value);
    value = `rgb(${arr[0]},${arr[1]},${arr[2]})`;
  }
  if (typeof ownValue == "string" && ownValue && common.matchingText(ownValue, "hex")) {
    const arr = color.hex2rgb(ownValue);
    ownValue = `rgb(${arr[0]},${arr[1]},${arr[2]})`;
  }
  return ownValue == value;
};
const cloneData = function(data2) {
  if (common.isObject(data2) || Array.isArray(data2)) {
    return JSON.parse(JSON.stringify(data2));
  }
  return data2;
};
const getColNumbers = function(row) {
  const children = row.children || [];
  let num = 0;
  children.forEach((td) => {
    if (td.hasMarks() && td.marks.hasOwnProperty("colspan")) {
      const span = Number(td.marks.colspan);
      if (!isNaN(span)) {
        num += span;
      }
    } else {
      num += 1;
    }
  });
  return num;
};
const getButtonOptionsConfig = function(editTrans) {
  return {
    //标题配置
    heading: [
      {
        label: editTrans("text"),
        value: "p"
      },
      {
        label: editTrans("h1"),
        value: "h1",
        style: {
          fontSize: "26px",
          fontWeight: "bold"
        }
      },
      {
        label: editTrans("h2"),
        value: "h2",
        style: {
          fontSize: "24px",
          fontWeight: "bold"
        }
      },
      {
        label: editTrans("h3"),
        value: "h3",
        style: {
          fontSize: "22px",
          fontWeight: "bold"
        }
      },
      {
        label: editTrans("h4"),
        value: "h4",
        style: {
          fontSize: "20px",
          fontWeight: "bold"
        }
      },
      {
        label: editTrans("h5"),
        value: "h5",
        style: {
          fontSize: "18px",
          fontWeight: "bold"
        }
      },
      {
        label: editTrans("h6"),
        value: "h6",
        style: {
          fontSize: "16px",
          fontWeight: "bold"
        }
      }
    ],
    //缩进配置
    indent: [
      {
        label: editTrans("indentIncrease"),
        value: "indent-increase",
        icon: "indent-increase"
      },
      {
        label: editTrans("indentDecrease"),
        value: "indent-decrease",
        icon: "indent-decrease"
      }
    ],
    //对齐方式
    align: [
      {
        label: editTrans("alignLeft"),
        value: "left",
        icon: "align-left"
      },
      {
        label: editTrans("alignRight"),
        value: "right",
        icon: "align-right"
      },
      {
        label: editTrans("alignCenter"),
        value: "center",
        icon: "align-center"
      },
      {
        label: editTrans("alignJustify"),
        value: "justify",
        icon: "align-justify"
      }
    ],
    //字号配置
    fontSize: [
      {
        label: editTrans("defaultSize"),
        value: ""
      },
      {
        label: "12px",
        value: "12px"
      },
      {
        label: "14px",
        value: "14px"
      },
      {
        label: "16px",
        value: "16px"
      },
      {
        label: "18px",
        value: "18px"
      },
      {
        label: "20px",
        value: "20px"
      },
      {
        label: "24px",
        value: "24px"
      },
      {
        label: "28px",
        value: "28px"
      },
      {
        label: "32px",
        value: "32px"
      },
      {
        label: "36px",
        value: "36px"
      },
      {
        label: "40px",
        value: "40px"
      }
    ],
    //字体配置
    fontFamily: [
      {
        label: editTrans("defaultFontFamily"),
        value: ""
      },
      {
        label: "黑体",
        value: "黑体,黑体-简"
      },
      {
        label: "华文仿宋",
        value: "华文仿宋"
      },
      {
        label: "楷体",
        value: "楷体,楷体-简"
      },
      {
        label: "华文楷体",
        value: "华文楷体"
      },
      {
        label: "宋体",
        value: "宋体,宋体-简"
      },
      {
        label: "Arial",
        value: "Arial"
      },
      {
        label: "Consolas",
        value: "Consolas,monospace"
      }
    ],
    //行高配置
    lineHeight: [
      {
        label: editTrans("defaultLineHeight"),
        value: ""
      },
      1,
      1.15,
      1.5,
      2,
      2.5,
      3
    ],
    //前景色配置
    foreColor: ["#000000", "#505050", "#808080", "#BBBBBB", "#CCCCCC", "#EEEEEE", "#F7F7F7", "#FFFFFF", "#EC1A0A", "#FF9900", "#FFFF00", "#07C160", "#00FFFF", "#0B73DE", "#9C00FF", "#FF00FF", "#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE", "#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD", "#e45649", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5", "#CE0000", "#E79439", "#EFC631", "#50a14f", "#4A7B8C", "#03A8F3", "#634AA5", "#A54A7B", "#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842", "#630000", "#7B3900", "#986801", "#295218", "#083139", "#003163", "#21104A", "#4A1031"],
    //背景色配置
    backColor: ["#000000", "#505050", "#808080", "#BBBBBB", "#CCCCCC", "#EEEEEE", "#F7F7F7", "#FFFFFF", "#EC1A0A", "#FF9900", "#FFFF00", "#07C160", "#00FFFF", "#0B73DE", "#9C00FF", "#FF00FF", "#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE", "#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD", "#e45649", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5", "#CE0000", "#E79439", "#EFC631", "#50a14f", "#4A7B8C", "#03A8F3", "#634AA5", "#A54A7B", "#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842", "#630000", "#7B3900", "#986801", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]
  };
};
const getToolbarConfig = function(editTrans, editLocale) {
  return {
    //是否使用工具条
    use: true,
    // 工具条的样式设置
    style: null,
    // 是否使用工具提示
    tooltip: true,
    // 代码块工具条配置
    codeBlock: {
      //语言列表
      languages: {
        //是否显示此工具
        show: true,
        //列表配置
        options: [
          {
            label: editTrans("autoRecognize"),
            value: ""
          },
          ...languages
        ],
        //浮层宽度
        width: 120,
        //浮层最大高度
        maxHeight: 180,
        //左侧边框是否显示
        leftBorder: true,
        //右侧边框是否显示
        rightBorder: false
      }
    },
    //文本工具条配置
    text: {
      //标题
      heading: {
        //是否显示此工具
        show: true,
        //列表配置
        options: getButtonOptionsConfig(editTrans).heading,
        //按钮默认显示的值
        defaultValue: "p",
        //浮层宽度
        width: editLocale == "en_US" ? 150 : 130,
        //浮层最大高度
        maxHeight: "",
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: true
      },
      //对齐方式
      align: {
        //是否显示此工具
        show: false,
        //列表配置
        options: getButtonOptionsConfig(editTrans).align,
        //浮层宽度
        width: editLocale == "zh_CN" ? 110 : 130,
        //浮层最大高度
        maxHeight: "",
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //有序列表
      orderList: {
        //是否显示此工具
        show: false,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //无序列表
      unorderList: {
        //是否显示此工具
        show: false,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //任务列表
      task: {
        //是否显示此工具
        show: false,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //粗体
      bold: {
        //是否显示此工具
        show: true,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //斜体
      italic: {
        //是否显示此工具
        show: true,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //删除线
      strikethrough: {
        //是否显示此工具
        show: true,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //下划线
      underline: {
        //是否显示此工具
        show: true,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //行内代码
      code: {
        //是否显示此工具
        show: true,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //上标
      super: {
        //是否显示此工具
        show: false,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //下标
      sub: {
        //是否显示此工具
        show: false,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //字号
      fontSize: {
        //是否显示此工具
        show: true,
        //列表配置
        options: getButtonOptionsConfig(editTrans).fontSize,
        //按钮默认显示的值
        defaultValue: "",
        //浮层宽度
        width: 100,
        //浮层最大高度
        maxHeight: 200,
        //左侧边框是否显示
        leftBorder: true,
        //右侧边框是否显示
        rightBorder: false
      },
      //字体
      fontFamily: {
        //是否显示此工具
        show: false,
        //列表配置
        options: getButtonOptionsConfig(editTrans).fontFamily,
        //按钮默认显示的值
        defaultValue: "",
        //浮层宽度
        width: 100,
        //浮层最大高度
        maxHeight: 200,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //行高
      lineHeight: {
        //是否显示此工具
        show: false,
        //列表配置
        options: getButtonOptionsConfig(editTrans).lineHeight,
        //按钮默认显示的值
        defaultValue: "",
        //浮层宽度
        width: 90,
        //浮层最大高度
        maxHeight: "",
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //前景色
      foreColor: {
        //是否显示此工具
        show: true,
        //列表配置
        options: getButtonOptionsConfig(editTrans).foreColor,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //背景色
      backColor: {
        //是否显示此工具
        show: true,
        //列表配置
        options: getButtonOptionsConfig(editTrans).backColor,
        //左侧边框是否显示
        leftBorder: false,
        //右侧边框是否显示
        rightBorder: false
      },
      //清除格式
      formatClear: {
        //是否显示此工具
        show: true,
        //左侧边框是否显示
        leftBorder: true,
        //右侧边框是否显示
        rightBorder: false
      }
    },
    //（只对文本工具条中的按钮生效）添加额外的按钮禁用判定，回调参数为name，this指向组件实例
    extraDisabled: null
  };
};
const getMenuConfig = function(editTrans, editLocale) {
  return {
    //是否使用菜单栏
    use: true,
    //是否使用工具提示
    tooltip: true,
    //菜单栏显示模式，支持default/inner/fixed
    mode: "default",
    //添加额外的按钮禁用判定，回调参数为name，this指向组件实例
    extraDisabled: null,
    //菜单栏的样式自定义
    style: null,
    //菜单排序
    sequence: {
      undo: 0,
      redo: 1,
      heading: 2,
      indent: 3,
      quote: 4,
      align: 5,
      orderList: 6,
      unorderList: 7,
      task: 8,
      bold: 9,
      underline: 10,
      italic: 11,
      strikethrough: 12,
      code: 13,
      super: 14,
      sub: 15,
      formatClear: 16,
      fontSize: 17,
      fontFamily: 18,
      lineHeight: 19,
      foreColor: 20,
      backColor: 21,
      link: 22,
      image: 23,
      video: 24,
      table: 25,
      codeBlock: 26,
      sourceView: 27,
      fullScreen: 28
    },
    //撤销按钮配置
    undo: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //重做按钮配置
    redo: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //标题
    heading: {
      //是否显示此按钮
      show: true,
      //列表配置
      options: getButtonOptionsConfig(editTrans).heading,
      //按钮默认显示的值
      defaultValue: "p",
      //浮层宽度
      width: editLocale == "en_US" ? 150 : 130,
      //浮层最大高度
      maxHeight: "",
      //左侧边框是否显示
      leftBorder: true,
      //右侧边框是否显示
      rightBorder: false
    },
    //缩进
    indent: {
      //是否显示此工具
      show: true,
      //列表配置
      options: getButtonOptionsConfig(editTrans).indent,
      //浮层宽度
      width: editLocale == "en_US" ? 150 : 110,
      //浮层最大高度
      maxHeight: "",
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //引用按钮配置
    quote: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //对齐方式
    align: {
      //是否显示此工具
      show: true,
      //列表配置
      options: getButtonOptionsConfig(editTrans).align,
      //浮层宽度
      width: editLocale == "zh_CN" ? 110 : 130,
      //浮层最大高度
      maxHeight: "",
      //左侧边框是否显示
      leftBorder: true,
      //右侧边框是否显示
      rightBorder: false
    },
    //有序列表按钮配置
    orderList: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //无序列表按钮配置
    unorderList: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //任务列表按钮配置
    task: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //粗体按钮配置
    bold: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: true,
      //右侧边框是否显示
      rightBorder: false
    },
    //下划线按钮配置
    underline: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //斜体按钮配置
    italic: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //删除线按钮配置
    strikethrough: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //行内代码按钮配置
    code: {
      //是否显示此按钮
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //上标
    super: {
      //是否显示此工具
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //下标
    sub: {
      //是否显示此工具
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //清除格式
    formatClear: {
      //是否显示此工具
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //字号
    fontSize: {
      //是否显示此工具
      show: true,
      //列表配置
      options: getButtonOptionsConfig(editTrans).fontSize,
      //按钮默认显示的值
      defaultValue: "",
      //浮层宽度
      width: 100,
      //浮层最大高度
      maxHeight: 200,
      //左侧边框是否显示
      leftBorder: true,
      //右侧边框是否显示
      rightBorder: false
    },
    //字体
    fontFamily: {
      //是否显示此工具
      show: true,
      //列表配置
      options: getButtonOptionsConfig(editTrans).fontFamily,
      //按钮默认显示的值
      defaultValue: "",
      //浮层宽度
      width: 100,
      //浮层最大高度
      maxHeight: 200,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //行高
    lineHeight: {
      //是否显示此工具
      show: true,
      //列表配置
      options: getButtonOptionsConfig(editTrans).lineHeight,
      //按钮默认显示的值
      defaultValue: "",
      //浮层宽度
      width: 90,
      //浮层最大高度
      maxHeight: "",
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //前景色
    foreColor: {
      //是否显示此工具
      show: true,
      //列表配置
      options: getButtonOptionsConfig(editTrans).foreColor,
      //左侧边框是否显示
      leftBorder: true,
      //右侧边框是否显示
      rightBorder: false
    },
    //背景色
    backColor: {
      //是否显示此工具
      show: true,
      //列表配置
      options: getButtonOptionsConfig(editTrans).backColor,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //链接
    link: {
      //是否显示此工具
      show: true,
      //左侧边框是否显示
      leftBorder: true,
      //右侧边框是否显示
      rightBorder: false
    },
    //图片
    image: {
      //是否显示此工具
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false,
      //图片支持上传的类型，不区分大小写
      allowedFileType: ["jpg", "png", "jpeg", "webp", "jfif", "ico", "gif", "svg", "psd"],
      //是否多选图片
      multiple: false,
      //单张图片的最大值，单位kb
      maxSize: null,
      //单张图片的最小值，单位kb
      minSize: null,
      //自定义上传图片
      customUpload: null,
      //异常处理函数
      handleError: null
    },
    //视频
    video: {
      //是否显示此工具
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false,
      //视频支持上传的类型，不区分大小写
      allowedFileType: ["mp4", "avi", "mpg", "wmv", "mov", "rm", "swf", "flv"],
      //是否多选视频
      multiple: false,
      //单个视频的的最大值，单位kb
      maxSize: null,
      //单个视频的最小值，单位kb
      minSize: null,
      //自定义上传视频
      customUpload: null,
      //异常处理函数
      handleError: null
    },
    //表格
    table: {
      //是否显示此工具
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false,
      //创建时表格的最大行数
      maxRows: 10,
      //创建时表格的最大列数
      maxColumns: 10
    },
    //代码块
    codeBlock: {
      //是否显示此工具
      show: true,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //代码视图
    sourceView: {
      //是否显示此工具
      show: false,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //全屏
    fullScreen: {
      //是否显示此工具
      show: false,
      //左侧边框是否显示
      leftBorder: false,
      //右侧边框是否显示
      rightBorder: false
    },
    //拓展菜单，每个key表示拓展菜单的唯一名称，value是对象，包含type/title/rightBorder/leftBorder/disabled/active/width/maxHeight/options/value/hideScroll/onLayerShow/onLayerShown/onLayerHidden/onOperate/default/layer/option属性
    extends: {}
  };
};
const getParsedomElementByElement = (element2, parsedom) => {
  if (element2.isBlock()) {
    return element2.parsedom == parsedom ? element2 : null;
  }
  if (!element2.isText() && element2.parsedom == parsedom) {
    return element2;
  }
  return getParsedomElementByElement(element2.parent, parsedom);
};
const getCurrentParsedomElement = (editor, dataRangeCaches, parsedom) => {
  if (!editor.range) {
    return null;
  }
  if (editor.range.anchor.element.isEqual(editor.range.focus.element)) {
    return getParsedomElementByElement(editor.range.anchor.element, parsedom);
  }
  const arr = dataRangeCaches.list.map((item) => {
    return getParsedomElementByElement(item.element, parsedom);
  });
  let hasNull = arr.some((el) => {
    return el == null;
  });
  if (hasNull) {
    return null;
  }
  if (arr.length == 1) {
    return arr[0];
  }
  let flag = true;
  for (let i = 1; i < arr.length; i++) {
    if (!arr[i].isEqual(arr[0])) {
      flag = false;
      break;
    }
  }
  if (flag) {
    return arr[0];
  }
  return null;
};
const elementIsInList = (element2, ordered) => {
  if (isList(element2, ordered)) {
    return true;
  }
  if (element2.parent) {
    return elementIsInList(element2.parent, ordered);
  }
  return false;
};
const elementIsInTask = (element2) => {
  if (isTask(element2)) {
    return true;
  }
  if (element2.parent) {
    return elementIsInTask(element2.parent);
  }
  return false;
};
const isList = (element2, ordered = false) => {
  if (element2.isEmpty()) {
    return false;
  }
  return element2.parsedom == "div" && element2.hasMarks() && element2.marks["data-editify-list"] == (ordered ? "ol" : "ul");
};
const isTask = (element2) => {
  if (element2.isEmpty()) {
    return false;
  }
  return element2.parsedom == "div" && element2.hasMarks() && element2.marks.hasOwnProperty("data-editify-task");
};
const hasPreInRange = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return !!getParsedomElementByElement(editor.range.anchor.element, "pre");
  }
  return dataRangeCaches.flatList.some((item) => {
    return !!getParsedomElementByElement(item.element, "pre");
  });
};
const isRangeInPre = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return !!getParsedomElementByElement(editor.range.anchor.element, "pre");
  }
  return dataRangeCaches.list.every((item) => {
    return !!getParsedomElementByElement(item.element, "pre");
  });
};
const hasQuoteInRange = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return !!getParsedomElementByElement(editor.range.anchor.element, "blockquote");
  }
  return dataRangeCaches.flatList.some((item) => {
    return !!getParsedomElementByElement(item.element, "blockquote");
  });
};
const isRangeInQuote = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return !!getParsedomElementByElement(editor.range.anchor.element, "blockquote");
  }
  return dataRangeCaches.list.every((item) => {
    return !!getParsedomElementByElement(item.element, "blockquote");
  });
};
const hasListInRange = (editor, dataRangeCaches, ordered = false) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return elementIsInList(editor.range.anchor.element, ordered);
  }
  return dataRangeCaches.flatList.some((item) => {
    return elementIsInList(item.element, ordered);
  });
};
const isRangeInList = (editor, dataRangeCaches, ordered = false) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return elementIsInList(editor.range.anchor.element, ordered);
  }
  return dataRangeCaches.list.every((item) => {
    return elementIsInList(item.element, ordered);
  });
};
const hasTaskInRange = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return elementIsInTask(editor.range.anchor.element);
  }
  return dataRangeCaches.flatList.some((item) => {
    return elementIsInTask(item.element);
  });
};
const isRangeInTask = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return elementIsInTask(editor.range.anchor.element);
  }
  return dataRangeCaches.list.every((item) => {
    return elementIsInTask(item.element);
  });
};
const hasLinkInRange = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return !!getParsedomElementByElement(editor.range.anchor.element, "a");
  }
  return dataRangeCaches.flatList.some((item) => {
    return !!getParsedomElementByElement(item.element, "a");
  });
};
const hasTableInRange = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return !!getParsedomElementByElement(editor.range.anchor.element, "table");
  }
  return dataRangeCaches.flatList.some((item) => {
    return !!getParsedomElementByElement(item.element, "table");
  });
};
const hasImageInRange = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return !!getParsedomElementByElement(editor.range.anchor.element, "img");
  }
  return dataRangeCaches.flatList.some((item) => {
    return !!getParsedomElementByElement(item.element, "img");
  });
};
const hasVideoInRange = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return !!getParsedomElementByElement(editor.range.anchor.element, "video");
  }
  return dataRangeCaches.flatList.some((item) => {
    return !!getParsedomElementByElement(item.element, "video");
  });
};
const queryTextStyle = (editor, dataRangeCaches, name, value) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    if (editor.range.anchor.element.isText() && editor.range.anchor.element.hasStyles()) {
      return queryHasValue(editor.range.anchor.element.styles, name, value);
    }
    return false;
  }
  let result = dataRangeCaches.flatList.filter((item) => {
    return item.element.isText();
  });
  if (result.length == 0) {
    return false;
  }
  let flag = result.every((item) => {
    if (item.element.hasStyles()) {
      return queryHasValue(item.element.styles, name, value);
    }
    return false;
  });
  return flag;
};
const queryTextMark = (editor, dataRangeCaches, name, value) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    if (editor.range.anchor.element.isText() && editor.range.anchor.element.hasMarks()) {
      return queryHasValue(editor.range.anchor.element.marks, name, value);
    }
    return false;
  }
  let result = dataRangeCaches.flatList.filter((item) => {
    return item.element.isText();
  });
  if (result.length == 0) {
    return false;
  }
  let flag = result.every((item) => {
    if (item.element.hasMarks()) {
      return queryHasValue(item.element.marks, name, value);
    }
    return false;
  });
  return flag;
};
const getRangeText = (dataRangeCaches) => {
  let text = "";
  dataRangeCaches.flatList.forEach((item) => {
    if (item.element.isText()) {
      if (item.offset) {
        text += item.element.textContent.substring(item.offset[0], item.offset[1]);
      } else {
        text += item.element.textContent || "";
      }
    }
  });
  return text;
};
const getFlatElementsByRange = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return [];
  }
  let length = dataRangeCaches.flatList.length;
  let elements = [];
  for (let i = 0; i < length; i++) {
    const item = dataRangeCaches.flatList[i];
    if (item.offset) {
      let selectEl = null;
      if (item.offset[0] == 0 && item.offset[1] < item.element.textContent.length) {
        const el = item.element.clone();
        item.element.textContent = item.element.textContent.substring(0, item.offset[1]);
        el.textContent = el.textContent.substring(item.offset[1]);
        editor.addElementAfter(el, item.element);
        selectEl = item.element;
      } else if (item.offset[1] == item.element.textContent.length && item.offset[0] > 0) {
        const el = item.element.clone();
        item.element.textContent = item.element.textContent.substring(0, item.offset[0]);
        el.textContent = el.textContent.substring(item.offset[0]);
        editor.addElementAfter(el, item.element);
        selectEl = el;
      } else if (item.offset[0] > 0 && item.offset[1] < item.element.textContent.length) {
        const el = item.element.clone();
        const el2 = item.element.clone();
        item.element.textContent = item.element.textContent.substring(0, item.offset[0]);
        el.textContent = el.textContent.substring(item.offset[0], item.offset[1]);
        el2.textContent = el2.textContent.substring(item.offset[1]);
        editor.addElementAfter(el, item.element);
        editor.addElementAfter(el2, el);
        selectEl = el;
      }
      if (selectEl) {
        if (i == 0) {
          editor.range.anchor.moveToStart(selectEl);
        }
        if (i == length - 1) {
          editor.range.focus.moveToEnd(selectEl);
        }
        elements.push(selectEl);
      }
    } else {
      elements.push(item.element);
    }
  }
  return elements;
};
const elementToParagraph = (element2) => {
  element2.marks = null;
  element2.styles = null;
  element2.parsedom = AlexElement.BLOCK_NODE;
};
const elementToList = (element2, ordered = false) => {
  if (isList(element2, ordered)) {
    return;
  }
  elementToParagraph(element2);
  element2.parsedom = "div";
  if (!element2.hasMarks()) {
    element2.marks = {};
  }
  element2.marks["data-editify-list"] = ordered ? "ol" : "ul";
};
const elementToTask = (element2) => {
  if (isTask(element2)) {
    return;
  }
  elementToParagraph(element2);
  element2.parsedom = "div";
  if (!element2.hasMarks()) {
    element2.marks = {};
  }
  element2.marks["data-editify-task"] = "uncheck";
};
const setHeading = (editor, dataRangeCaches, editTrans, parsedom) => {
  if (!editor.range) {
    return;
  }
  const values = getButtonOptionsConfig(editTrans).heading.map((item) => {
    return item.value;
  });
  if (!values.includes(parsedom)) {
    throw new Error("The parameter supports only h1-h6 and p");
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    const block = editor.range.anchor.element.getBlock();
    elementToParagraph(block);
    block.parsedom = parsedom;
  } else {
    dataRangeCaches.list.forEach((el) => {
      if (el.element.isBlock()) {
        elementToParagraph(el.element);
        el.element.parsedom = parsedom;
      } else {
        const block = el.element.getBlock();
        elementToParagraph(block);
        block.parsedom = parsedom;
      }
    });
  }
};
const setIndentIncrease = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return;
  }
  const fn = (element2) => {
    if (element2.hasStyles()) {
      if (element2.styles.hasOwnProperty("text-indent")) {
        let val = element2.styles["text-indent"];
        if (val.endsWith("em")) {
          val = parseFloat(val);
        } else {
          val = 0;
        }
        element2.styles["text-indent"] = `${val + 2}em`;
      } else {
        element2.styles["text-indent"] = "2em";
      }
    } else {
      element2.styles = {
        "text-indent": "2em"
      };
    }
  };
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    const block = editor.range.anchor.element.getBlock();
    const inblock = editor.range.anchor.element.getInblock();
    if (inblock && inblock.behavior == "block" && !inblock.isPreStyle()) {
      fn(inblock);
    } else if (!block.isPreStyle()) {
      fn(block);
    }
  } else {
    dataRangeCaches.list.forEach((item) => {
      const block = item.element.getBlock();
      const inblock = item.element.getInblock();
      if (inblock && inblock.behavior == "block" && !inblock.isPreStyle()) {
        fn(inblock);
      } else if (!block.isPreStyle()) {
        fn(block);
      }
    });
  }
};
const setIndentDecrease = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return;
  }
  const fn = (element2) => {
    if (element2.hasStyles() && element2.styles.hasOwnProperty("text-indent")) {
      let val = element2.styles["text-indent"];
      if (val.endsWith("em")) {
        val = parseFloat(val);
      } else {
        val = 0;
      }
      element2.styles["text-indent"] = `${val - 2 >= 0 ? val - 2 : 0}em`;
    }
  };
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    const block = editor.range.anchor.element.getBlock();
    const inblock = editor.range.anchor.element.getInblock();
    if (inblock && inblock.behavior == "block" && !inblock.isPreStyle()) {
      fn(inblock);
    } else if (!block.isPreStyle()) {
      fn(block);
    }
  } else {
    dataRangeCaches.list.forEach((item) => {
      const block = item.element.getBlock();
      const inblock = item.element.getInblock();
      if (inblock && inblock.behavior == "block" && !inblock.isPreStyle()) {
        fn(inblock);
      } else if (!block.isPreStyle()) {
        fn(block);
      }
    });
  }
};
const setQuote = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return;
  }
  const flag = isRangeInQuote(editor, dataRangeCaches);
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    const block = editor.range.anchor.element.getBlock();
    elementToParagraph(block);
    if (!flag) {
      block.parsedom = "blockquote";
    }
  } else {
    let blocks = [];
    dataRangeCaches.list.forEach((item) => {
      const block = item.element.getBlock();
      const exist = blocks.some((el) => block.isEqual(el));
      if (!exist) {
        blocks.push(block);
      }
    });
    blocks.forEach((block) => {
      elementToParagraph(block);
      if (!flag) {
        block.parsedom = "blockquote";
      }
    });
  }
};
const setAlign = (editor, dataRangeCaches, value) => {
  if (!editor.range) {
    return;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    const block = editor.range.anchor.element.getBlock();
    const inblock = editor.range.anchor.element.getInblock();
    if (inblock) {
      if (inblock.hasStyles()) {
        inblock.styles["text-align"] = value;
      } else {
        inblock.styles = {
          "text-align": value
        };
      }
    } else {
      if (block.hasStyles()) {
        block.styles["text-align"] = value;
      } else {
        block.styles = {
          "text-align": value
        };
      }
    }
  } else {
    dataRangeCaches.list.forEach((el) => {
      if (el.element.isBlock() || el.element.isInblock()) {
        if (el.element.hasStyles()) {
          el.element.styles["text-align"] = value;
        } else {
          el.element.styles = {
            "text-align": value
          };
        }
      } else {
        const block = el.element.getBlock();
        const inblock = el.element.getInblock();
        if (inblock) {
          if (inblock.hasStyles()) {
            inblock.styles["text-align"] = value;
          } else {
            inblock.styles = {
              "text-align": value
            };
          }
        } else {
          if (block.hasStyles()) {
            block.styles["text-align"] = value;
          } else {
            block.styles = {
              "text-align": value
            };
          }
        }
      }
    });
  }
};
const setList = (editor, dataRangeCaches, ordered) => {
  if (!editor.range) {
    return;
  }
  const flag = isRangeInList(editor, dataRangeCaches, ordered);
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    const block = editor.range.anchor.element.getBlock();
    if (flag) {
      elementToParagraph(block);
    } else {
      elementToList(block, ordered);
    }
  } else {
    let blocks = [];
    dataRangeCaches.list.forEach((item) => {
      const block = item.element.getBlock();
      const exist = blocks.some((el) => block.isEqual(el));
      if (!exist) {
        blocks.push(block);
      }
    });
    blocks.forEach((block) => {
      if (flag) {
        elementToParagraph(block);
      } else {
        elementToList(block, ordered);
      }
    });
  }
};
const setTask = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return;
  }
  const flag = isRangeInTask(editor, dataRangeCaches);
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    const block = editor.range.anchor.element.getBlock();
    if (flag) {
      elementToParagraph(block);
    } else {
      elementToTask(block);
    }
  } else {
    let blocks = [];
    dataRangeCaches.list.forEach((item) => {
      const block = item.element.getBlock();
      const exist = blocks.some((el) => block.isEqual(el));
      if (!exist) {
        blocks.push(block);
      }
    });
    blocks.forEach((block) => {
      if (flag) {
        elementToParagraph(block);
      } else {
        elementToTask(block);
      }
    });
  }
};
const setTextStyle = (editor, dataRangeCaches, styles) => {
  if (!editor.range) {
    return;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    if (editor.range.anchor.element.isSpaceText()) {
      if (editor.range.anchor.element.hasStyles()) {
        Object.assign(editor.range.anchor.element.styles, cloneData(styles));
      } else {
        editor.range.anchor.element.styles = cloneData(styles);
      }
    } else if (editor.range.anchor.element.isText()) {
      const el = AlexElement.getSpaceElement();
      el.styles = cloneData(editor.range.anchor.element.styles);
      el.marks = cloneData(editor.range.anchor.element.marks);
      if (el.hasStyles()) {
        Object.assign(el.styles, cloneData(styles));
      } else {
        el.styles = cloneData(styles);
      }
      editor.insertElement(el);
    } else {
      const el = AlexElement.getSpaceElement();
      el.styles = cloneData(styles);
      editor.insertElement(el);
    }
  } else {
    const elements = getFlatElementsByRange(editor, dataRangeCaches);
    elements.forEach((ele) => {
      if (ele.isText()) {
        if (ele.hasStyles()) {
          Object.assign(ele.styles, cloneData(styles));
        } else {
          ele.styles = cloneData(styles);
        }
      }
    });
  }
};
const setTextMark = (editor, dataRangeCaches, marks) => {
  if (!editor.range) {
    return;
  }
  if (!common.isObject(marks)) {
    throw new Error("The argument must be an object");
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    if (editor.range.anchor.element.isSpaceText()) {
      if (editor.range.anchor.element.hasMarks()) {
        Object.assign(editor.range.anchor.element.marks, cloneData(marks));
      } else {
        editor.range.anchor.element.marks = cloneData(marks);
      }
    } else if (editor.range.anchor.element.isText()) {
      const el = AlexElement.getSpaceElement();
      el.styles = cloneData(editor.range.anchor.element.styles);
      el.marks = cloneData(editor.range.anchor.element.marks);
      if (el.hasMarks()) {
        Object.assign(el.marks, cloneData(marks));
      } else {
        el.marks = cloneData(marks);
      }
      editor.insertElement(el);
    } else {
      const el = AlexElement.getSpaceElement();
      el.marks = cloneData(marks);
      editor.insertElement(el);
    }
  } else {
    const elements = getFlatElementsByRange(editor, dataRangeCaches);
    elements.forEach((ele) => {
      if (ele.isText()) {
        if (ele.hasMarks()) {
          Object.assign(ele.marks, cloneData(marks));
        } else {
          ele.marks = cloneData(marks);
        }
      }
    });
  }
};
const removeTextStyle = (editor, dataRangeCaches, styleNames) => {
  if (!editor.range) {
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
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    if (editor.range.anchor.element.isSpaceText()) {
      removeFn(editor.range.anchor.element);
    } else if (editor.range.anchor.element.isText()) {
      const el = AlexElement.getSpaceElement();
      el.styles = cloneData(editor.range.anchor.element.styles);
      el.marks = cloneData(editor.range.anchor.element.marks);
      removeFn(el);
      editor.insertElement(el);
    }
  } else {
    const elements = getFlatElementsByRange(editor, dataRangeCaches);
    elements.forEach((ele) => {
      if (ele.isText()) {
        removeFn(ele);
      }
    });
  }
};
const removeTextMark = (editor, dataRangeCaches, markNames) => {
  if (!editor.range) {
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
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    if (editor.range.anchor.element.isSpaceText()) {
      removeFn(editor.range.anchor.element);
    } else if (editor.range.anchor.element.isText()) {
      const el = AlexElement.getSpaceElement();
      el.styles = cloneData(editor.range.anchor.element.styles);
      el.marks = cloneData(editor.range.anchor.element.marks);
      removeFn(el);
      editor.insertElement(el);
    }
  } else {
    const elements = getFlatElementsByRange(editor, dataRangeCaches);
    elements.forEach((ele) => {
      if (ele.isText()) {
        removeFn(ele);
      }
    });
  }
};
const setLineHeight = (editor, dataRangeCaches, value) => {
  if (!editor.range) {
    return;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    const block = editor.range.anchor.element.getBlock();
    const inblock = editor.range.anchor.element.getInblock();
    if (inblock) {
      if (inblock.hasStyles()) {
        inblock.styles["line-height"] = value;
      } else {
        inblock.styles = {
          "line-height": value
        };
      }
    } else {
      if (block.hasStyles()) {
        block.styles["line-height"] = value;
      } else {
        block.styles = {
          "line-height": value
        };
      }
    }
  } else {
    dataRangeCaches.list.forEach((el) => {
      if (el.element.isBlock() || el.element.isInblock()) {
        if (el.element.hasStyles()) {
          el.element.styles["line-height"] = value;
        } else {
          el.element.styles = {
            "line-height": value
          };
        }
      } else {
        const block = el.element.getBlock();
        const inblock = el.element.getInblock();
        if (inblock) {
          if (inblock.hasStyles()) {
            inblock.styles["line-height"] = value;
          } else {
            inblock.styles = {
              "line-height": value
            };
          }
        } else {
          if (block.hasStyles()) {
            block.styles["line-height"] = value;
          } else {
            block.styles = {
              "line-height": value
            };
          }
        }
      }
    });
  }
};
const insertLink = (editor, text, url, newOpen) => {
  if (!editor.range) {
    return;
  }
  if (!text) {
    text = url;
  }
  const marks = {
    href: url
  };
  if (newOpen) {
    marks.target = "_blank";
  }
  const linkEle = new AlexElement("inline", "a", marks, null, null);
  const textEle = new AlexElement("text", null, null, null, text);
  editor.addElementTo(textEle, linkEle);
  editor.insertElement(linkEle);
};
const insertImage = (editor, value) => {
  if (!editor.range) {
    return;
  }
  const image = new AlexElement(
    "closed",
    "img",
    {
      src: value
    },
    null,
    null
  );
  editor.insertElement(image);
};
const insertVideo = (editor, value) => {
  if (!editor.range) {
    return;
  }
  const video = new AlexElement(
    "closed",
    "video",
    {
      src: value
    },
    null,
    null
  );
  editor.insertElement(video);
  const leftSpace = AlexElement.getSpaceElement();
  const rightSpace = AlexElement.getSpaceElement();
  editor.addElementAfter(rightSpace, video);
  editor.addElementBefore(leftSpace, video);
  editor.range.anchor.moveToEnd(rightSpace);
  editor.range.focus.moveToEnd(rightSpace);
};
const insertTable = (editor, rowLength, colLength) => {
  if (!editor.range) {
    return;
  }
  const table = new AlexElement("block", "table", null, null, null);
  const tbody = new AlexElement("inblock", "tbody", null, null, null);
  editor.addElementTo(tbody, table);
  for (let i = 0; i < rowLength; i++) {
    const row = new AlexElement("inblock", "tr", null, null, null);
    for (let j = 0; j < colLength; j++) {
      const column = new AlexElement("inblock", "td", null, null, null);
      const breakEl2 = new AlexElement("closed", "br", null, null, null);
      editor.addElementTo(breakEl2, column);
      editor.addElementTo(column, row);
    }
    editor.addElementTo(row, tbody);
  }
  editor.insertElement(table);
  const paragraph = new AlexElement("block", AlexElement.BLOCK_NODE, null, null, null);
  const breakEl = new AlexElement("closed", "br", null, null, null);
  editor.addElementTo(breakEl, paragraph);
  editor.addElementAfter(paragraph, table);
  editor.range.anchor.moveToStart(tbody);
  editor.range.focus.moveToStart(tbody);
};
const insertCodeBlock = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return;
  }
  const pre = getCurrentParsedomElement(editor, dataRangeCaches, "pre");
  if (pre) {
    let content = "";
    AlexElement.flatElements(pre.children).filter((item) => {
      return item.isText();
    }).forEach((item) => {
      content += item.textContent;
    });
    const splits = content.split("\n");
    splits.forEach((item) => {
      const paragraph = new AlexElement("block", AlexElement.BLOCK_NODE, null, null, null);
      const text = new AlexElement("text", null, null, null, item);
      editor.addElementTo(text, paragraph);
      editor.addElementBefore(paragraph, pre);
    });
    pre.toEmpty();
  } else {
    if (editor.range.anchor.isEqual(editor.range.focus)) {
      const block = editor.range.anchor.element.getBlock();
      elementToParagraph(block);
      block.parsedom = "pre";
      const paragraph = new AlexElement("block", AlexElement.BLOCK_NODE, null, null, null);
      const breakEl = new AlexElement("closed", "br", null, null, null);
      editor.addElementTo(breakEl, paragraph);
      editor.addElementAfter(paragraph, block);
    } else {
      editor.range.anchor.moveToStart(dataRangeCaches.list[0].element.getBlock());
      editor.range.focus.moveToEnd(dataRangeCaches.list[dataRangeCaches.list.length - 1].element.getBlock());
      const res = dataRangeCaches.flatList.filter((el) => el.element.isText());
      const obj = {};
      res.forEach((el) => {
        if (obj[el.element.getBlock().key]) {
          obj[el.element.getBlock().key].push(el.element.clone());
        } else {
          obj[el.element.getBlock().key] = [el.element.clone()];
        }
      });
      const pre2 = new AlexElement("block", "pre", null, null, null);
      Object.keys(obj).forEach((key, index) => {
        if (index > 0) {
          const text = new AlexElement("text", null, null, null, "\n");
          if (pre2.hasChildren()) {
            editor.addElementTo(text, pre2, pre2.children.length);
          } else {
            editor.addElementTo(text, pre2);
          }
        }
        obj[key].forEach((el) => {
          if (pre2.hasChildren()) {
            editor.addElementTo(el, pre2, pre2.children.length);
          } else {
            editor.addElementTo(el, pre2);
          }
        });
      });
      editor.delete();
      editor.insertElement(pre2);
      const paragraph = new AlexElement("block", AlexElement.BLOCK_NODE, null, null, null);
      const breakEl = new AlexElement("closed", "br", null, null, null);
      editor.addElementTo(breakEl, paragraph);
      editor.addElementAfter(paragraph, pre2);
    }
  }
};
const updateRangeInPre = (editor, element2, originalTextElements, newElements) => {
  if (!editor.range) {
    return;
  }
  if (editor.range.anchor.element.getBlock().isEqual(element2)) {
    const elIndex = originalTextElements.findIndex((el) => editor.range.anchor.element.isEqual(el));
    const offset = originalTextElements.filter((_el, i2) => i2 < elIndex).reduce((total, item) => total + item.textContent.length, 0) + editor.range.anchor.offset;
    const newTextElements = AlexElement.flatElements(newElements).filter((el) => el.isText() && !el.isEmpty());
    let i = 0;
    let index = 0;
    while (i < newTextElements.length) {
      let newIndex = index + newTextElements[i].textContent.length;
      if (offset >= index && offset <= newIndex) {
        editor.range.anchor.element = newTextElements[i];
        editor.range.anchor.offset = offset - index;
        break;
      }
      i++;
      index = newIndex;
    }
  }
  if (editor.range.focus.element.getBlock().isEqual(element2)) {
    const elIndex = originalTextElements.findIndex((el) => editor.range.focus.element.isEqual(el));
    const offset = originalTextElements.filter((_el, i2) => i2 < elIndex).reduce((total, item) => total + item.textContent.length, 0) + editor.range.focus.offset;
    const newTextElements = AlexElement.flatElements(newElements).filter((el) => el.isText() && !el.isEmpty());
    let i = 0;
    let index = 0;
    while (i < newTextElements.length) {
      let newIndex = index + newTextElements[i].textContent.length;
      if (offset >= index && offset <= newIndex) {
        editor.range.focus.element = newTextElements[i];
        editor.range.focus.offset = offset - index;
        break;
      }
      i++;
      index = newIndex;
    }
  }
};
const parseList = (editor, element2) => {
  if (element2.parsedom == "ol" || element2.parsedom == "ul") {
    if (element2.hasChildren()) {
      element2.children.forEach((el) => {
        const newEl = el.clone();
        newEl.parsedom = "div";
        newEl.type = element2.type;
        if (!newEl.hasMarks()) {
          newEl.marks = {};
        }
        newEl.marks["data-editify-list"] = element2.parsedom;
        editor.addElementBefore(newEl, element2);
      });
    }
    element2.toEmpty();
  }
};
const orderdListHandle = function(editor, element2) {
  if (isList(element2, true)) {
    const previousElement = editor.getPreviousElement(element2);
    if (previousElement && isList(previousElement, true)) {
      const previousValue = Number(previousElement.marks["data-editify-value"]);
      element2.marks["data-editify-value"] = previousValue + 1;
    } else {
      element2.marks["data-editify-value"] = 1;
    }
  }
};
const mediaHandle = function(editor, element2) {
  if (element2.parsedom == "img" || element2.parsedom == "video" || element2.parsedom == "a") {
    const marks = {
      "data-editify-element": element2.key
    };
    if (element2.hasMarks()) {
      Object.assign(element2.marks, marks);
    } else {
      element2.marks = marks;
    }
  }
  if (element2.parsedom == "video") {
    const previousElement = editor.getPreviousElement(element2);
    const newTextElement = editor.getNextElement(element2);
    if (!previousElement || previousElement.isEmpty()) {
      const spaceText = AlexElement.getSpaceElement();
      editor.addElementBefore(spaceText, element2);
    }
    if (!newTextElement || newTextElement.isEmpty()) {
      const spaceText = AlexElement.getSpaceElement();
      editor.addElementAfter(spaceText, element2);
    }
  }
};
const tableHandle = function(editor, element2) {
  if (element2.parsedom == "table") {
    const marks = {
      "data-editify-element": element2.key
    };
    if (element2.hasMarks()) {
      Object.assign(element2.marks, marks);
    } else {
      element2.marks = marks;
    }
    const styles = {
      "white-space": "pre-wrap",
      "word-break": "break-word"
    };
    if (element2.hasStyles()) {
      Object.assign(element2.styles, styles);
    } else {
      element2.styles = styles;
    }
    const elements = AlexElement.flatElements(element2.children);
    const rows = elements.filter((el) => {
      return el.parsedom == "tr";
    });
    let colgroup = elements.find((el) => {
      return el.parsedom == "colgroup";
    });
    if (colgroup) {
      colgroup.children.forEach((col) => {
        if (!col.hasMarks()) {
          col.marks = {
            width: "auto"
          };
        } else if (!col.marks["width"]) {
          col.marks["width"] = "auto";
        }
      });
    } else {
      colgroup = new AlexElement("inblock", "colgroup", null, null, null);
      const colNumber = getColNumbers(rows[0]);
      for (let i = colNumber - 1; i >= 0; i--) {
        const col = new AlexElement(
          "closed",
          "col",
          {
            width: "auto"
          },
          null,
          null
        );
        editor.addElementTo(col, colgroup);
      }
    }
    element2.children = [];
    const tbody = new AlexElement("inblock", "tbody", null, null, null);
    rows.reverse().forEach((row) => {
      editor.addElementTo(row, tbody);
    });
    editor.addElementTo(tbody, element2);
    editor.addElementTo(colgroup, element2);
  }
  if (element2.parsedom == "th") {
    element2.parsedom = "td";
  }
};
const preHandle = function(editor, element2, highlight2, languages2) {
  if (element2.parsedom == "pre") {
    const marks = {
      "data-editify-element": element2.key
    };
    if (element2.hasMarks()) {
      Object.assign(element2.marks, marks);
    } else {
      element2.marks = marks;
    }
    if (highlight2 && element2.hasChildren()) {
      let language = element2.marks["data-editify-hljs"] || "";
      if (language && languages2) {
        const flag = languages2.some((item) => {
          if (common.isObject(item)) {
            return item.value == language;
          }
          return item == language;
        });
        if (!flag) {
          language = "";
        }
      }
      const originalTextElements = AlexElement.flatElements(element2.children).filter((el) => el.isText() && !el.isEmpty());
      const textContent = originalTextElements.reduce((val, item) => {
        return val + item.textContent;
      }, "");
      const html = getHljsHtml(textContent, language);
      if (html) {
        const newElements = editor.parseHtml(html);
        element2.children = newElements;
        newElements.forEach((newEl) => {
          newEl.parent = element2;
        });
        updateRangeInPre(editor, element2, originalTextElements, newElements);
      } else {
        const breakElement = new AlexElement("closed", "br", null, null, null);
        element2.children = [breakElement];
        breakElement.parent = element2;
        if (editor.range) {
          editor.range.anchor.moveToStart(breakElement);
          editor.range.focus.moveToStart(breakElement);
        }
      }
    }
  }
};
const specialInblockHandle = function(editor, element2) {
  if (element2.hasChildren()) {
    element2.children.forEach((el) => {
      if (isList(el, true) || isList(el, false) || isTask(el) || ["blockquote", "pre", "table", "h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(el.parsedom)) {
        const newEl = el.clone();
        newEl.type = "block";
        const block = element2.getBlock();
        editor.addElementAfter(newEl, block);
        el.toEmpty();
      }
    });
  }
};
const TriangleProps = {
  //位置
  placement: {
    type: String,
    default: "top",
    validator(value) {
      return ["top", "left", "right", "bottom"].includes(value);
    }
  },
  //边框颜色
  color: {
    type: String,
    default: null
  },
  //背景色
  background: {
    type: String,
    default: null
  }
};
const _hoisted_1$d = ["data-editify-placement"];
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...{
    name: "Triangle"
  },
  __name: "triangle",
  props: TriangleProps,
  setup(__props) {
    const props = __props;
    const style = computed(() => {
      if (props.placement == "top") {
        return {
          borderBottomColor: props.color || ""
        };
      }
      if (props.placement == "bottom") {
        return {
          borderTopColor: props.color || ""
        };
      }
      if (props.placement == "left") {
        return {
          borderRightColor: props.color || ""
        };
      }
      if (props.placement == "right") {
        return {
          borderLeftColor: props.color || ""
        };
      }
      return {};
    });
    const elStyle = computed(() => {
      if (props.placement == "top") {
        return {
          borderBottomColor: props.background || ""
        };
      }
      if (props.placement == "bottom") {
        return {
          borderTopColor: props.background || ""
        };
      }
      if (props.placement == "left") {
        return {
          borderRightColor: props.background || ""
        };
      }
      if (props.placement == "right") {
        return {
          borderLeftColor: props.background || ""
        };
      }
      return {};
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "editify-triangle",
        style: normalizeStyle(style.value),
        "data-editify-placement": _ctx.placement
      }, [
        createElementVNode("div", {
          class: "editify-triangle-el",
          style: normalizeStyle(elStyle.value)
        }, null, 4)
      ], 12, _hoisted_1$d);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Triangle = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-e1abc967"]]);
const LayerProps = {
  //是否显示
  modelValue: {
    type: Boolean,
    default: false
  },
  //关联元素
  node: {
    type: [String, HTMLElement],
    default: null
  },
  //是否显示边框
  border: {
    type: Boolean,
    default: false
  },
  //边框颜色
  borderColor: {
    type: String,
    default: null
  },
  //背景色
  background: {
    type: String,
    default: null
  },
  //字体颜色
  color: {
    type: String,
    default: null
  },
  //位置
  placement: {
    type: String,
    default: "bottom",
    validator(value) {
      return ["top", "bottom", "top-start", "top-end", "bottom-start", "bottom-end"].includes(value);
    }
  },
  //是否显示三角形
  showTriangle: {
    type: Boolean,
    default: false
  },
  //层级
  zIndex: {
    type: Number,
    default: 10
  },
  //动画
  animation: {
    type: String,
    default: null,
    validator(value) {
      return ["translate", "fade", null].includes(value);
    }
  },
  //是否根据range对象来定位，此时不需要传入node
  useRange: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$c = ["data-editify-placement"];
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  ...{
    name: "Layer"
  },
  __name: "layer",
  props: LayerProps,
  emits: ["update:modelValue", "show", "shown", "hidden"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const realPlacement = ref(null);
    const wrapRef = ref(null);
    const elRef = ref(null);
    const triangleRef = ref(null);
    const triPlacement = computed(() => {
      if (realPlacement.value == "bottom-start" || realPlacement.value == "bottom" || realPlacement.value == "bottom-end") {
        return "top";
      }
      if (realPlacement.value == "top-start" || realPlacement.value == "top" || realPlacement.value == "top-end") {
        return "bottom";
      }
      if (realPlacement.value == "left-start" || realPlacement.value == "left" || realPlacement.value == "left-end") {
        return "right";
      }
      if (realPlacement.value == "right-start" || realPlacement.value == "right" || realPlacement.value == "right-end") {
        return "left";
      }
      return "top";
    });
    const wrapStyle = computed(() => {
      return {
        borderColor: props.border ? props.borderColor || "" : "",
        background: props.background || "",
        color: props.color || ""
      };
    });
    const getNode = () => {
      if (!props.node) {
        return null;
      }
      if (element.isElement(props.node)) {
        return props.node;
      }
      return document.body.querySelector(props.node);
    };
    const setTrianglePositionByRange = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount) {
        const range = selection.getRangeAt(0);
        const rects = range.getClientRects();
        if (rects.length) {
          const firstRect = rects[0];
          const lastRect = rects[rects.length - 1];
          if (realPlacement.value == "top") {
            triangleRef.value.$el.style.left = wrapRef.value.offsetWidth / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
            triangleRef.value.$el.style.right = "auto";
            triangleRef.value.$el.style.top = wrapRef.value.offsetHeight - 1 + "px";
            triangleRef.value.$el.style.bottom = "auto";
          } else if (realPlacement.value == "top-start") {
            triangleRef.value.$el.style.left = (wrapRef.value.offsetWidth > firstRect.width ? firstRect.width : wrapRef.value.offsetWidth) / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
            triangleRef.value.$el.style.right = "auto";
            triangleRef.value.$el.style.top = wrapRef.value.offsetHeight - 1 + "px";
            triangleRef.value.$el.style.bottom = "auto";
          } else if (realPlacement.value == "top-end") {
            triangleRef.value.$el.style.left = "auto";
            triangleRef.value.$el.style.right = (wrapRef.value.offsetWidth > firstRect.width ? firstRect.width : wrapRef.value.offsetWidth) / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
            triangleRef.value.$el.style.top = wrapRef.value.offsetHeight - 1 + "px";
            triangleRef.value.$el.style.bottom = "auto";
          } else if (realPlacement.value == "bottom") {
            triangleRef.value.$el.style.left = wrapRef.value.offsetWidth / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
            triangleRef.value.$el.style.right = "auto";
            triangleRef.value.$el.style.top = "auto";
            triangleRef.value.$el.style.bottom = wrapRef.value.offsetHeight - 1 + "px";
          } else if (realPlacement.value == "bottom-start") {
            triangleRef.value.$el.style.left = (wrapRef.value.offsetWidth > lastRect.width ? lastRect.width : wrapRef.value.offsetWidth) / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
            triangleRef.value.$el.style.right = "auto";
            triangleRef.value.$el.style.top = "auto";
            triangleRef.value.$el.style.bottom = wrapRef.value.offsetHeight - 1 + "px";
          } else if (realPlacement.value == "bottom-end") {
            triangleRef.value.$el.style.left = "auto";
            triangleRef.value.$el.style.right = (wrapRef.value.offsetWidth > lastRect.width ? lastRect.width : wrapRef.value.offsetWidth) / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
            triangleRef.value.$el.style.top = "auto";
            triangleRef.value.$el.style.bottom = wrapRef.value.offsetHeight - 1 + "px";
          } else {
            triangleRef.value.$el.style.left = wrapRef.value.offsetWidth / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
            triangleRef.value.$el.style.right = "auto";
            triangleRef.value.$el.style.top = -triangleRef.value.$el.offsetHeight + 1 + "px";
            triangleRef.value.$el.style.bottom = "auto";
          }
        }
      }
    };
    const setTrianglePositionByNode = () => {
      const node = getNode();
      if (!element.isElement(node)) {
        return;
      }
      if (realPlacement.value == "top") {
        triangleRef.value.$el.style.left = wrapRef.value.offsetWidth / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.top = wrapRef.value.offsetHeight - 1 + "px";
        triangleRef.value.$el.style.bottom = "auto";
      } else if (realPlacement.value == "top-start") {
        triangleRef.value.$el.style.left = (wrapRef.value.offsetWidth > node.offsetWidth ? node.offsetWidth : wrapRef.value.offsetWidth) / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.top = wrapRef.value.offsetHeight - 1 + "px";
        triangleRef.value.$el.style.bottom = "auto";
      } else if (realPlacement.value == "top-end") {
        triangleRef.value.$el.style.left = "auto";
        triangleRef.value.$el.style.right = (wrapRef.value.offsetWidth > node.offsetWidth ? node.offsetWidth : wrapRef.value.offsetWidth) / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
        triangleRef.value.$el.style.top = wrapRef.value.offsetHeight - 1 + "px";
        triangleRef.value.$el.style.bottom = "auto";
      } else if (realPlacement.value == "bottom") {
        triangleRef.value.$el.style.left = wrapRef.value.offsetWidth / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.top = "auto";
        triangleRef.value.$el.style.bottom = wrapRef.value.offsetHeight - 1 + "px";
      } else if (realPlacement.value == "bottom-start") {
        triangleRef.value.$el.style.left = (wrapRef.value.offsetWidth > node.offsetWidth ? node.offsetWidth : wrapRef.value.offsetWidth) / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.top = "auto";
        triangleRef.value.$el.style.bottom = wrapRef.value.offsetHeight - 1 + "px";
      } else if (realPlacement.value == "bottom-end") {
        triangleRef.value.$el.style.left = "auto";
        triangleRef.value.$el.style.right = (wrapRef.value.offsetWidth > node.offsetWidth ? node.offsetWidth : wrapRef.value.offsetWidth) / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
        triangleRef.value.$el.style.top = "auto";
        triangleRef.value.$el.style.bottom = wrapRef.value.offsetHeight - 1 + "px";
      } else {
        triangleRef.value.$el.style.left = wrapRef.value.offsetWidth / 2 - triangleRef.value.$el.offsetWidth / 2 + "px";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.top = -triangleRef.value.$el.offsetHeight + 1 + "px";
        triangleRef.value.$el.style.bottom = "auto";
      }
    };
    const setPositionByRange = () => {
      realPlacement.value = null;
      const selection = window.getSelection();
      if (selection && selection.rangeCount) {
        const range = selection.getRangeAt(0);
        const rects = range.getClientRects();
        if (rects.length) {
          const firstRect = rects[0];
          const lastRect = rects[rects.length - 1];
          const parentRect = element.getElementBounding(elRef.value.offsetParent);
          const documentHeight = document.documentElement.clientHeight || window.innerHeight;
          const documentWidth = document.documentElement.clientWidth || window.innerWidth;
          if (props.placement == "top" || props.placement == "top-start" || props.placement == "top-end") {
            if (firstRect.top >= 0 && firstRect.top >= parentRect.top && firstRect.top >= elRef.value.offsetHeight) {
              realPlacement.value = props.placement;
            } else if (documentHeight - lastRect.bottom >= 0 && documentHeight - lastRect.bottom >= parentRect.bottom && documentHeight - lastRect.bottom >= elRef.value.offsetHeight) {
              realPlacement.value = props.placement == "top" ? "bottom" : props.placement == "top-start" ? "bottom-start" : "bottom-end";
            }
          } else if (props.placement == "bottom" || props.placement == "bottom-start" || props.placement == "bottom-end") {
            if (documentHeight - lastRect.bottom >= 0 && documentHeight - lastRect.bottom >= parentRect.bottom && documentHeight - lastRect.bottom >= elRef.value.offsetHeight) {
              realPlacement.value = props.placement;
            } else if (firstRect.top >= 0 && firstRect.top >= parentRect.top && firstRect.top >= elRef.value.offsetHeight) {
              realPlacement.value = props.placement == "bottom" ? "top" : props.placement == "bottom-start" ? "top-start" : "top-end";
            }
          }
          if (realPlacement.value == "top") {
            if (documentWidth - firstRect.right + firstRect.width / 2 < elRef.value.offsetWidth / 2) {
              realPlacement.value = "top-end";
            } else if (firstRect.left + firstRect.width / 2 < elRef.value.offsetWidth / 2) {
              realPlacement.value = "top-start";
            }
          } else if (realPlacement.value == "bottom") {
            if (documentWidth - lastRect.right + lastRect.width / 2 < elRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-end";
            } else if (lastRect.left + lastRect.width / 2 < elRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-start";
            }
          } else if (realPlacement.value == "top-start") {
            if (documentWidth - firstRect.right + firstRect.width < elRef.value.offsetWidth) {
              if (documentWidth - firstRect.right + firstRect.width / 2 >= elRef.value.offsetWidth / 2) {
                realPlacement.value = "top";
              } else {
                realPlacement.value = "top-end";
              }
            }
          } else if (realPlacement.value == "bottom-start") {
            if (documentWidth - lastRect.right + lastRect.width < elRef.value.offsetWidth) {
              if (documentWidth - lastRect.right + lastRect.width / 2 >= elRef.value.offsetWidth / 2) {
                realPlacement.value = "bottom";
              } else {
                realPlacement.value = "bottom-end";
              }
            }
          } else if (realPlacement.value == "top-end") {
            if (firstRect.left + firstRect.width < elRef.value.offsetWidth) {
              if (firstRect.left + firstRect.width / 2 >= elRef.value.offsetWidth / 2) {
                realPlacement.value = "top";
              } else {
                realPlacement.value = "top-start";
              }
            }
          } else if (realPlacement.value == "bottom-end") {
            if (lastRect.left + lastRect.width < elRef.value.offsetWidth) {
              if (lastRect.left + lastRect.width / 2 >= elRef.value.offsetWidth / 2) {
                realPlacement.value = "bottom";
              } else {
                realPlacement.value = "bottom-start";
              }
            }
          }
          nextTick(() => {
            if (realPlacement.value == "top") {
              elRef.value.style.left = firstRect.left - parentRect.left + firstRect.width / 2 - elRef.value.offsetWidth / 2 + "px";
              elRef.value.style.right = "auto";
              elRef.value.style.top = firstRect.top - parentRect.top - elRef.value.offsetHeight + "px";
              elRef.value.style.bottom = "auto";
            } else if (realPlacement.value == "top-start") {
              elRef.value.style.left = firstRect.left - parentRect.left + "px";
              elRef.value.style.right = "auto";
              elRef.value.style.top = firstRect.top - parentRect.top - elRef.value.offsetHeight + "px";
              elRef.value.style.bottom = "auto";
            } else if (realPlacement.value == "top-end") {
              elRef.value.style.left = "auto";
              elRef.value.style.right = documentWidth - firstRect.right - parentRect.right + "px";
              elRef.value.style.top = firstRect.top - parentRect.top - elRef.value.offsetHeight + "px";
              elRef.value.style.bottom = "auto";
            } else if (realPlacement.value == "bottom") {
              elRef.value.style.left = lastRect.left - parentRect.left + lastRect.width / 2 - elRef.value.offsetWidth / 2 + "px";
              elRef.value.style.right = "auto";
              elRef.value.style.top = "auto";
              elRef.value.style.bottom = documentHeight - lastRect.bottom - parentRect.bottom - elRef.value.offsetHeight + "px";
            } else if (realPlacement.value == "bottom-start") {
              elRef.value.style.left = lastRect.left - parentRect.left + "px";
              elRef.value.style.right = "auto";
              elRef.value.style.top = "auto";
              elRef.value.style.bottom = documentHeight - lastRect.bottom - parentRect.bottom - elRef.value.offsetHeight + "px";
            } else if (realPlacement.value == "bottom-end") {
              elRef.value.style.left = "auto";
              elRef.value.style.right = documentWidth - lastRect.right - parentRect.right + "px";
              elRef.value.style.top = "auto";
              elRef.value.style.bottom = documentHeight - lastRect.bottom - parentRect.bottom - elRef.value.offsetHeight + "px";
            } else {
              elRef.value.style.top = "auto";
              elRef.value.style.bottom = (parentRect.bottom < 0 ? -parentRect.bottom : 0) + "px";
              if (props.placement == "top") {
                if (documentWidth - firstRect.right + firstRect.width / 2 < elRef.value.offsetWidth / 2) {
                  elRef.value.style.left = "auto";
                  elRef.value.style.right = documentWidth - firstRect.right - parentRect.right + "px";
                } else if (firstRect.left + firstRect.width / 2 < elRef.value.offsetWidth / 2) {
                  elRef.value.style.left = firstRect.left - parentRect.left + "px";
                  elRef.value.style.right = "auto";
                } else {
                  elRef.value.style.left = firstRect.left - parentRect.left + firstRect.width / 2 - elRef.value.offsetWidth / 2 + "px";
                  elRef.value.style.right = "auto";
                }
              } else if (props.placement == "bottom") {
                if (documentWidth - lastRect.right + lastRect.width / 2 < elRef.value.offsetWidth / 2) {
                  elRef.value.style.left = "auto";
                  elRef.value.style.right = documentWidth - lastRect.right - parentRect.right + "px";
                } else if (lastRect.left + lastRect.width / 2 < elRef.value.offsetWidth / 2) {
                  elRef.value.style.left = lastRect.left - parentRect.left + "px";
                  elRef.value.style.right = "auto";
                } else {
                  elRef.value.style.left = lastRect.left - parentRect.left + lastRect.width / 2 - elRef.value.offsetWidth / 2 + "px";
                  elRef.value.style.right = "auto";
                }
              } else if (props.placement == "top-start") {
                if (documentWidth - firstRect.right + firstRect.width < elRef.value.offsetWidth) {
                  if (documentWidth - firstRect.right + firstRect.width / 2 >= elRef.value.offsetWidth / 2) {
                    elRef.value.style.left = firstRect.left - parentRect.left + firstRect.width / 2 - elRef.value.offsetWidth / 2 + "px";
                    elRef.value.style.right = "auto";
                  } else {
                    elRef.value.style.left = "auto";
                    elRef.value.style.right = documentWidth - firstRect.right - parentRect.right + "px";
                  }
                } else {
                  elRef.value.style.left = firstRect.left - parentRect.left + "px";
                  elRef.value.style.right = "auto";
                }
              } else if (props.placement == "bottom-start") {
                if (documentWidth - lastRect.right + lastRect.width < elRef.value.offsetWidth) {
                  if (documentWidth - lastRect.right + lastRect.width / 2 >= elRef.value.offsetWidth / 2) {
                    elRef.value.style.left = lastRect.left - parentRect.left + lastRect.width / 2 - elRef.value.offsetWidth / 2 + "px";
                    elRef.value.style.right = "auto";
                  } else {
                    elRef.value.style.left = "auto";
                    elRef.value.style.right = documentWidth - lastRect.right - parentRect.right + "px";
                  }
                } else {
                  elRef.value.style.left = lastRect.left - parentRect.left + "px";
                  elRef.value.style.right = "auto";
                }
              } else if (props.placement == "top-end") {
                if (firstRect.left + firstRect.width < elRef.value.offsetWidth) {
                  if (firstRect.left + firstRect.width / 2 >= elRef.value.offsetWidth / 2) {
                    elRef.value.style.left = firstRect.left - parentRect.left + firstRect.width / 2 - elRef.value.offsetWidth / 2 + "px";
                    elRef.value.style.right = "auto";
                  } else {
                    elRef.value.style.left = firstRect.left - parentRect.left + "px";
                    elRef.value.style.right = "auto";
                  }
                } else {
                  elRef.value.style.left = "auto";
                  elRef.value.style.right = documentWidth - firstRect.right - parentRect.right + "px";
                }
              } else if (props.placement == "bottom-end") {
                if (lastRect.left + lastRect.width < elRef.value.offsetWidth) {
                  if (lastRect.left + lastRect.width / 2 >= elRef.value.offsetWidth / 2) {
                    elRef.value.style.left = lastRect.left - parentRect.left + lastRect.width / 2 - elRef.value.offsetWidth / 2 + "px";
                    elRef.value.style.right = "auto";
                  } else {
                    elRef.value.style.left = lastRect.left - parentRect.left + "px";
                    elRef.value.style.right = "auto";
                  }
                } else {
                  elRef.value.style.left = "auto";
                  elRef.value.style.right = documentWidth - lastRect.right - parentRect.right + "px";
                }
              }
            }
            if (props.showTriangle) {
              setTrianglePositionByRange();
            }
          });
        }
      }
    };
    const setPositionByNode = () => {
      const node = getNode();
      if (!element.isElement(node)) {
        return;
      }
      realPlacement.value = null;
      const nodeRect = element.getElementBounding(node);
      const parentRect = element.getElementBounding(elRef.value.offsetParent);
      if (props.placement == "top" || props.placement == "top-start" || props.placement == "top-end") {
        if (nodeRect.top >= 0 && nodeRect.top >= parentRect.top && nodeRect.top >= elRef.value.offsetHeight) {
          realPlacement.value = props.placement;
        } else if (nodeRect.bottom >= 0 && nodeRect.bottom >= parentRect.bottom && nodeRect.bottom >= elRef.value.offsetHeight) {
          realPlacement.value = props.placement == "top" ? "bottom" : props.placement == "top-start" ? "bottom-start" : "bottom-end";
        }
      } else if (props.placement == "bottom" || props.placement == "bottom-start" || props.placement == "bottom-end") {
        if (nodeRect.bottom >= 0 && nodeRect.bottom >= parentRect.bottom && nodeRect.bottom >= elRef.value.offsetHeight) {
          realPlacement.value = props.placement;
        } else if (nodeRect.top >= 0 && nodeRect.top >= parentRect.top && nodeRect.top >= elRef.value.offsetHeight) {
          realPlacement.value = props.placement == "bottom" ? "top" : props.placement == "bottom-start" ? "top-start" : "top-end";
        }
      }
      if (realPlacement.value == "top") {
        if (nodeRect.right + node.offsetWidth / 2 < elRef.value.offsetWidth / 2) {
          realPlacement.value = "top-end";
        } else if (nodeRect.left + node.offsetWidth / 2 < elRef.value.offsetWidth / 2) {
          realPlacement.value = "top-start";
        }
      } else if (realPlacement.value == "top-start") {
        if (nodeRect.right + node.offsetWidth < elRef.value.offsetWidth) {
          if (nodeRect.right + node.offsetWidth / 2 >= elRef.value.offsetWidth / 2) {
            realPlacement.value = "top";
          } else {
            realPlacement.value = "top-end";
          }
        }
      } else if (realPlacement.value == "top-end") {
        if (nodeRect.left + node.offsetWidth < elRef.value.offsetWidth) {
          if (nodeRect.left + node.offsetWidth / 2 >= elRef.value.offsetWidth / 2) {
            realPlacement.value = "top";
          } else {
            realPlacement.value = "top-start";
          }
        }
      } else if (realPlacement.value == "bottom") {
        if (nodeRect.right + node.offsetWidth / 2 < elRef.value.offsetWidth / 2) {
          realPlacement.value = "bottom-end";
        } else if (nodeRect.left + node.offsetWidth / 2 < elRef.value.offsetWidth / 2) {
          realPlacement.value = "bottom-start";
        }
      } else if (realPlacement.value == "bottom-start") {
        if (nodeRect.right + node.offsetWidth < elRef.value.offsetWidth) {
          if (nodeRect.right + node.offsetWidth / 2 >= elRef.value.offsetWidth / 2) {
            realPlacement.value = "bottom";
          } else {
            realPlacement.value = "bottom-end";
          }
        }
      } else if (realPlacement.value == "bottom-end") {
        if (nodeRect.left + node.offsetWidth < elRef.value.offsetWidth) {
          if (nodeRect.left + node.offsetWidth / 2 >= elRef.value.offsetWidth / 2) {
            realPlacement.value = "bottom";
          } else {
            realPlacement.value = "bottom-start";
          }
        }
      }
      nextTick(() => {
        if (realPlacement.value == "top") {
          elRef.value.style.left = nodeRect.left - parentRect.left + node.offsetWidth / 2 - elRef.value.offsetWidth / 2 + "px";
          elRef.value.style.right = "auto";
          elRef.value.style.top = nodeRect.top - parentRect.top - elRef.value.offsetHeight + "px";
          elRef.value.style.bottom = "auto";
        } else if (realPlacement.value == "top-start") {
          elRef.value.style.left = nodeRect.left - parentRect.left + "px";
          elRef.value.style.right = "auto";
          elRef.value.style.top = nodeRect.top - parentRect.top - elRef.value.offsetHeight + "px";
          elRef.value.style.bottom = "auto";
        } else if (realPlacement.value == "top-end") {
          elRef.value.style.left = "auto";
          elRef.value.style.right = nodeRect.right - parentRect.right + "px";
          elRef.value.style.top = nodeRect.top - parentRect.top - elRef.value.offsetHeight + "px";
          elRef.value.style.bottom = "auto";
        } else if (realPlacement.value == "bottom") {
          elRef.value.style.left = nodeRect.left - parentRect.left + node.offsetWidth / 2 - elRef.value.offsetWidth / 2 + "px";
          elRef.value.style.right = "auto";
          elRef.value.style.top = "auto";
          elRef.value.style.bottom = nodeRect.bottom - parentRect.bottom - elRef.value.offsetHeight + "px";
        } else if (realPlacement.value == "bottom-start") {
          elRef.value.style.left = nodeRect.left - parentRect.left + "px";
          elRef.value.style.right = "auto";
          elRef.value.style.top = "auto";
          elRef.value.style.bottom = nodeRect.bottom - parentRect.bottom - elRef.value.offsetHeight + "px";
        } else if (realPlacement.value == "bottom-end") {
          elRef.value.style.left = "auto";
          elRef.value.style.right = nodeRect.right - parentRect.right + "px";
          elRef.value.style.top = "auto";
          elRef.value.style.bottom = nodeRect.bottom - parentRect.bottom - elRef.value.offsetHeight + "px";
        } else {
          elRef.value.style.top = "auto";
          elRef.value.style.bottom = (parentRect.bottom < 0 ? -parentRect.bottom : 0) + "px";
          if (props.placement == "top" || props.placement == "bottom") {
            if (nodeRect.right + node.offsetWidth / 2 < elRef.value.offsetWidth / 2) {
              elRef.value.style.left = "auto";
              elRef.value.style.right = nodeRect.right - parentRect.right + "px";
            } else if (nodeRect.left + node.offsetWidth / 2 < elRef.value.offsetWidth / 2) {
              elRef.value.style.left = nodeRect.left - parentRect.left + "px";
              elRef.value.style.right = "auto";
            } else {
              elRef.value.style.left = nodeRect.left - parentRect.left + node.offsetWidth / 2 - elRef.value.offsetWidth / 2 + "px";
              elRef.value.style.right = "auto";
            }
          } else if (props.placement == "top-start" || props.placement == "bottom-start") {
            if (nodeRect.right + node.offsetWidth < elRef.value.offsetWidth) {
              if (nodeRect.right + node.offsetWidth / 2 >= elRef.value.offsetWidth / 2) {
                elRef.value.style.left = nodeRect.left - parentRect.left + node.offsetWidth / 2 - elRef.value.offsetWidth / 2 + "px";
                elRef.value.style.right = "auto";
              } else {
                elRef.value.style.left = "auto";
                elRef.value.style.right = nodeRect.right - parentRect.right + "px";
              }
            } else {
              elRef.value.style.left = nodeRect.left - parentRect.left + "px";
              elRef.value.style.right = "auto";
            }
          } else if (props.placement == "top-end" || props.placement == "bottom-end") {
            if (nodeRect.left + node.offsetWidth < elRef.value.offsetWidth) {
              if (nodeRect.left + node.offsetWidth / 2 >= elRef.value.offsetWidth / 2) {
                elRef.value.style.left = nodeRect.left - parentRect.left + node.offsetWidth / 2 - elRef.value.offsetWidth / 2 + "px";
                elRef.value.style.right = "auto";
              } else {
                elRef.value.style.left = nodeRect.left - parentRect.left + "px";
                elRef.value.style.right = "auto";
              }
            } else {
              elRef.value.style.left = "auto";
              elRef.value.style.right = nodeRect.right - parentRect.right + "px";
            }
          }
        }
        if (props.showTriangle) {
          setTrianglePositionByNode();
        }
      });
    };
    const setPosition = () => {
      if (props.useRange) {
        setPositionByRange();
      } else {
        setPositionByNode();
      }
    };
    const handleEnter = (el) => {
      setPosition();
      emits("show", el);
    };
    const handleAfterEnter = (el) => {
      emits("shown", el);
    };
    const handleAfterLeave = (el) => {
      emits("hidden", el);
    };
    const handleResize = () => {
      if (props.modelValue) {
        emits("update:modelValue", false);
      }
    };
    const handleClick = (e) => {
      if (!element.isElement(elRef.value)) {
        return;
      }
      if (element.isContains(elRef.value.offsetParent, e.target)) {
        return;
      }
      if (props.modelValue) {
        emits("update:modelValue", false);
      }
    };
    onMounted(() => {
      if (props.modelValue) {
        setPosition();
      }
      event.on(window, `click.editify_layer_${instance.uid}`, handleClick);
      event.on(window, `resize.editify_layer_${instance.uid}`, handleResize);
    });
    onBeforeUnmount(() => {
      event.off(window, `click.editify_layer_${instance.uid} resize.editify_layer_${instance.uid}`);
    });
    __expose({
      setPosition
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: _ctx.animation ? "editify-layer-" + _ctx.animation : "editify-layer",
        onEnter: handleEnter,
        onAfterEnter: handleAfterEnter,
        onAfterLeave: handleAfterLeave
      }, {
        default: withCtx(() => [
          _ctx.modelValue ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "editify-layer",
            "data-editify-placement": realPlacement.value || null,
            style: normalizeStyle({ zIndex: _ctx.zIndex }),
            ref_key: "elRef",
            ref: elRef
          }, [
            _ctx.showTriangle ? (openBlock(), createBlock(Triangle, {
              key: 0,
              color: _ctx.border && _ctx.borderColor ? _ctx.borderColor : _ctx.background,
              background: _ctx.background,
              placement: triPlacement.value,
              ref_key: "triangleRef",
              ref: triangleRef
            }, null, 8, ["color", "background", "placement"])) : createCommentVNode("", true),
            createElementVNode("div", {
              ref_key: "wrapRef",
              ref: wrapRef,
              class: normalizeClass(["editify-layer-wrap", { "editify-border": _ctx.border }]),
              style: normalizeStyle(wrapStyle.value)
            }, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 6)
          ], 12, _hoisted_1$c)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name"]);
    };
  }
});
const Layer = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-09578d83"]]);
const TooltipProps = {
  //提示内容
  content: {
    type: String,
    default: ""
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //是否块级
  block: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$b = { class: "editify-tooltip-content" };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...{
    name: "Tooltip"
  },
  __name: "tooltip",
  props: TooltipProps,
  setup(__props) {
    const props = __props;
    const show = ref(false);
    const targetRef = ref(null);
    const showContent = () => {
      if (props.disabled) {
        return;
      }
      show.value = true;
    };
    const hideContent = () => {
      if (props.disabled) {
        return;
      }
      show.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["editify-tooltip", { "editify-block": _ctx.block }])
      }, [
        createElementVNode("div", {
          ref_key: "targetRef",
          ref: targetRef,
          class: "editify-tooltip-target",
          onMouseenter: showContent,
          onMouseleave: hideContent
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 544),
        createVNode(Layer, {
          modelValue: show.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => show.value = $event),
          node: targetRef.value,
          border: "",
          "border-color": "#000",
          background: "#000",
          "show-triangle": "",
          color: "#fff",
          placement: "bottom",
          animation: "fade",
          "z-index": 10
        }, {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_1$b, toDisplayString(_ctx.content), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "node"])
      ], 2);
    };
  }
});
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-7b5e30d1"]]);
const IconProps = {
  //图标值
  value: {
    type: String,
    default: ""
  }
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...{
    name: "Icon"
  },
  __name: "icon",
  props: IconProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", {
        class: normalizeClass(["editify-icon", "editify-icon-" + _ctx.value])
      }, null, 2);
    };
  }
});
const Icon = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-6e00035b"]]);
const ButtonProps = {
  //按钮类型
  type: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "select", "display"].includes(value);
    }
  },
  //按钮名称，唯一值
  name: {
    type: String,
    default: ""
  },
  //按钮提示内容
  title: {
    type: String,
    default: ""
  },
  //是否显示工具提示
  tooltip: {
    type: Boolean,
    default: false
  },
  //是否显示右侧边框
  rightBorder: {
    type: Boolean,
    default: false
  },
  //是否显示左侧边框
  leftBorder: {
    type: Boolean,
    default: false
  },
  //主题色，用于按钮悬浮颜色变化使用,仅支持十六进制
  color: {
    type: String,
    default: ""
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //是否激活
  active: {
    type: Boolean,
    default: false
  },
  //type=select时的配置
  selectConfig: {
    type: Object,
    default: null
  },
  //type=display时的配置
  displayConfig: {
    type: Object,
    default: null
  },
  //浮层隐藏滚动条
  hideScroll: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$a = { class: "editify-button" };
const _hoisted_2$9 = {
  key: 0,
  class: "editify-button-slot"
};
const _hoisted_3$9 = { key: 1 };
const _hoisted_4$7 = {
  key: 1,
  class: "editify-button-options"
};
const _hoisted_5$6 = ["onClick"];
const _hoisted_6$6 = {
  key: 1,
  class: "editify-button-option-flex"
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  ...{
    name: "Button"
  },
  __name: "button",
  props: ButtonProps,
  emits: ["operate", "layerShow", "layerShown", "layerHidden"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const show = ref(false);
    const status = ref(null);
    const btnRef = ref(null);
    const layerRef = ref(null);
    const parseSelectConfig = computed(() => {
      let options = [];
      let width = "";
      let maxHeight = "";
      if (common.isObject(props.selectConfig)) {
        if (Array.isArray(props.selectConfig.options)) {
          options = props.selectConfig.options.map((item) => {
            if (common.isObject(item)) {
              return {
                label: item.label,
                value: item.value,
                icon: item.icon,
                style: item.style
              };
            }
            return {
              label: item,
              value: item
            };
          });
        }
        if (typeof props.selectConfig.width == "number") {
          width = props.selectConfig.width;
        }
        if (typeof props.selectConfig.maxHeight == "number") {
          maxHeight = props.selectConfig.maxHeight;
        }
      }
      return {
        options,
        width,
        maxHeight
      };
    });
    const parseDisplayConfig = computed(() => {
      let options = [];
      let width = "";
      let maxHeight = "";
      let value = "";
      if (common.isObject(props.displayConfig)) {
        if (typeof props.displayConfig.value == "string" || typeof props.displayConfig.value == "number") {
          value = props.displayConfig.value;
        }
        if (Array.isArray(props.displayConfig.options)) {
          options = props.displayConfig.options.map((item) => {
            if (common.isObject(item)) {
              return {
                label: item.label,
                value: item.value,
                icon: item.icon,
                style: item.style
              };
            }
            return {
              label: item,
              value: item
            };
          });
          let optItem = options.find((item) => {
            return item.value == value;
          });
          if (!optItem && options[0]) {
            value = options[0].value;
          }
        }
        if (typeof props.displayConfig.width == "number") {
          width = props.displayConfig.width;
        }
        if (typeof props.displayConfig.maxHeight == "number") {
          maxHeight = props.displayConfig.maxHeight;
        }
      }
      return {
        options,
        width,
        maxHeight,
        value
      };
    });
    const cmpOptions = computed(() => {
      return props.type == "select" ? parseSelectConfig.value.options : parseDisplayConfig.value.options;
    });
    const displayLabel = computed(() => {
      const val = parseDisplayConfig.value.options.find((item) => {
        return item.value == parseDisplayConfig.value.value;
      });
      return val ? val.label : "";
    });
    const parseColor = computed(() => {
      if (props.color) {
        return color.hex2rgb(props.color);
      }
      return [];
    });
    const btnStyle = computed(() => {
      if (props.disabled) {
        return {};
      }
      if (props.color) {
        if (props.active || status.value == "down") {
          return {
            color: props.color,
            backgroundColor: `rgba(${parseColor.value[0]},${parseColor.value[1]},${parseColor.value[2]},0.15)`
          };
        }
        if (status.value == "hover") {
          return {
            color: `rgba(${parseColor.value[0]},${parseColor.value[1]},${parseColor.value[2]},0.9)`,
            backgroundColor: `rgba(${parseColor.value[0]},${parseColor.value[1]},${parseColor.value[2]},0.05)`
          };
        }
      }
      return {};
    });
    const select = (item) => {
      if (props.disabled) {
        return;
      }
      emits("operate", props.name, item.value);
      show.value = false;
    };
    const handleClick = () => {
      if (props.disabled) {
        return;
      }
      if (props.type == "default") {
        emits("operate", props.name);
      } else {
        show.value = !show.value;
      }
    };
    __expose({
      show,
      status
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createElementVNode("div", {
          class: normalizeClass(["editify-button-wrap", { "editify-right-border": _ctx.rightBorder, "editify-left-border": _ctx.leftBorder }])
        }, [
          createVNode(Tooltip, {
            content: _ctx.title,
            disabled: !_ctx.tooltip
          }, {
            default: withCtx(() => [
              createElementVNode("div", {
                ref_key: "btnRef",
                ref: btnRef,
                style: normalizeStyle(btnStyle.value),
                class: normalizeClass(["editify-button-el", { "editify-disabled": _ctx.disabled, "editify-active": _ctx.active }]),
                onMouseenter: _cache[0] || (_cache[0] = ($event) => status.value = "hover"),
                onMouseleave: _cache[1] || (_cache[1] = ($event) => status.value = null),
                onMousedown: _cache[2] || (_cache[2] = ($event) => status.value = "down"),
                onMouseup: _cache[3] || (_cache[3] = ($event) => status.value = "hover"),
                onClick: handleClick
              }, [
                _ctx.type == "default" || _ctx.type == "select" ? (openBlock(), createElementBlock("div", _hoisted_2$9, [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ])) : _ctx.type == "display" ? (openBlock(), createElementBlock("div", _hoisted_3$9, toDisplayString(displayLabel.value), 1)) : createCommentVNode("", true),
                _ctx.type == "select" || _ctx.type == "display" ? (openBlock(), createBlock(Icon, {
                  key: 2,
                  value: "caret-down",
                  class: normalizeClass(["editify-button-caret", { "editify-rotate": show.value }])
                }, null, 8, ["class"])) : createCommentVNode("", true)
              ], 38)
            ]),
            _: 3
          }, 8, ["content", "disabled"]),
          createVNode(Layer, {
            ref_key: "layerRef",
            ref: layerRef,
            modelValue: show.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => show.value = $event),
            node: btnRef.value,
            border: "",
            fade: "",
            placement: "bottom-start",
            "z-index": 12,
            animation: "translate",
            onShow: _cache[5] || (_cache[5] = ($event) => emits("layerShow")),
            onShown: _cache[6] || (_cache[6] = ($event) => emits("layerShown")),
            onHidden: _cache[7] || (_cache[7] = ($event) => emits("layerHidden"))
          }, {
            default: withCtx(() => [
              createElementVNode("div", {
                class: "editify-button-layer",
                style: normalizeStyle({ width: (_ctx.type == "select" ? parseSelectConfig.value.width : parseDisplayConfig.value.width) + "px", maxHeight: (_ctx.type == "select" ? parseSelectConfig.value.maxHeight : parseDisplayConfig.value.maxHeight) + "px", overflow: _ctx.hideScroll ? "visible" : "" })
              }, [
                _ctx.$slots.layer ? renderSlot(_ctx.$slots, "layer", {
                  key: 0,
                  options: cmpOptions.value
                }, void 0, true) : (openBlock(), createElementBlock("div", _hoisted_4$7, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(cmpOptions.value, (item) => {
                    return openBlock(), createElementBlock("div", {
                      onClick: ($event) => select(item),
                      class: normalizeClass(["editify-button-option", { "editify-active": _ctx.type == "display" ? item.value == parseDisplayConfig.value.value : false }]),
                      style: normalizeStyle(item.style || "")
                    }, [
                      _ctx.$slots.option ? renderSlot(_ctx.$slots, "option", {
                        key: 0,
                        item
                      }, void 0, true) : (openBlock(), createElementBlock("div", _hoisted_6$6, [
                        item.icon ? (openBlock(), createBlock(Icon, {
                          key: 0,
                          value: item.icon
                        }, null, 8, ["value"])) : createCommentVNode("", true),
                        createElementVNode("span", null, toDisplayString(item.label), 1)
                      ]))
                    ], 14, _hoisted_5$6);
                  }), 256))
                ]))
              ], 4)
            ]),
            _: 3
          }, 8, ["modelValue", "node"])
        ], 2)
      ]);
    };
  }
});
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-14398008"]]);
const CheckboxProps = {
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //是否选中
  modelValue: {
    type: [Boolean, Array],
    default: false
  },
  //label文字
  label: {
    type: String,
    default: null
  },
  //值
  value: {
    type: [Object, Number, String, Array],
    default: ""
  },
  //是否圆形
  round: {
    type: Boolean,
    default: false
  },
  //文字位置
  placement: {
    type: String,
    default: "right",
    validator(value) {
      return ["left", "right"].includes(value);
    }
  },
  //主题颜色
  color: {
    type: String,
    default: "",
    validator(value) {
      return common.matchingText(value, "hex");
    }
  }
};
const _hoisted_1$9 = ["data-editify-placement", "textContent"];
const _hoisted_2$8 = ["value", "disabled", "checked"];
const _hoisted_3$8 = ["data-editify-placement", "textContent"];
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  ...{
    name: "Checkbox"
  },
  __name: "checkbox",
  props: CheckboxProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const check = computed(() => {
      if (typeof props.modelValue == "boolean") {
        return props.modelValue;
      }
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.some((item) => {
          return common.equal(item, props.value);
        });
      }
      return false;
    });
    const itemStyle = computed(() => {
      let style = {};
      if (props.color && check.value && !props.disabled) {
        style.backgroundColor = props.color;
        style.borderColor = props.color;
      }
      return style;
    });
    const change = (event2) => {
      if (Array.isArray(props.modelValue)) {
        let arr = [...props.modelValue];
        if (event2.target.checked && !check.value) {
          arr.push(props.value);
        } else if (check.value) {
          arr = arr.filter((item) => {
            return !common.equal(item, props.value);
          });
        }
        emits("update:modelValue", arr);
        emits("change", arr);
      } else if (typeof props.modelValue == "boolean") {
        emits("update:modelValue", event2.target.checked);
        emits("change", event2.target.checked);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: normalizeClass(["editify-checkbox", { "editify-disabled": _ctx.disabled }])
      }, [
        _ctx.placement == "left" && _ctx.label ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "editify-checkbox-label",
          "data-editify-placement": _ctx.placement,
          textContent: toDisplayString(_ctx.label)
        }, null, 8, _hoisted_1$9)) : createCommentVNode("", true),
        createElementVNode("input", {
          onChange: change,
          value: _ctx.value,
          disabled: _ctx.disabled,
          checked: check.value,
          type: "checkbox"
        }, null, 40, _hoisted_2$8),
        createElementVNode("span", {
          class: normalizeClass(["editify-checkbox-item", { "editify-reverse": !_ctx.color, "editify-round": _ctx.round, "editify-checked": check.value && !_ctx.disabled }]),
          style: normalizeStyle(itemStyle.value)
        }, [
          createVNode(Icon, {
            value: "check",
            style: normalizeStyle({ opacity: check.value ? "" : 0 })
          }, null, 8, ["style"])
        ], 6),
        _ctx.placement == "right" && _ctx.label ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "editify-checkbox-label",
          "data-editify-placement": _ctx.placement,
          textContent: toDisplayString(_ctx.label)
        }, null, 8, _hoisted_3$8)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-d99c609b"]]);
const ColorsProps = {
  //颜色数组
  data: {
    type: Array,
    default: function() {
      return [];
    }
  },
  //选中的颜色
  value: {
    type: String,
    default: null
  },
  //激活状态颜色
  color: {
    type: String,
    default: ""
  },
  //是否使用工具提示
  tooltip: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$8 = { class: "editify-colors" };
const _hoisted_2$7 = { class: "editify-colors-list" };
const _hoisted_3$7 = ["onClick"];
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...{
    name: "Colors"
  },
  __name: "colors",
  props: ColorsProps,
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const $editTrans = inject("$editTrans");
    const selectColor = (item) => {
      emits("change", item.value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createElementVNode("div", {
          class: "editify-colors-header",
          onClick: _cache[0] || (_cache[0] = ($event) => selectColor({ value: "" }))
        }, [
          createVNode(Icon, { value: "remove" }),
          createElementVNode("span", null, toDisplayString(unref($editTrans)("defaultColor")), 1)
        ]),
        createElementVNode("div", _hoisted_2$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["editify-color", { "editify-active": _ctx.value == item.value }]),
              style: normalizeStyle({ borderColor: _ctx.value == item.value ? _ctx.color || "" : "" })
            }, [
              createVNode(Tooltip, {
                block: "",
                content: item.label,
                disabled: !_ctx.tooltip
              }, {
                default: withCtx(() => [
                  createElementVNode("div", {
                    onClick: ($event) => selectColor(item),
                    class: "editify-color-el",
                    style: normalizeStyle({ background: item.value })
                  }, null, 12, _hoisted_3$7)
                ]),
                _: 2
              }, 1032, ["content", "disabled"])
            ], 6);
          }), 256))
        ])
      ]);
    };
  }
});
const Colors = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-dec8d117"]]);
const ToolbarProps = {
  //是否显示
  modelValue: {
    type: Boolean,
    default: false
  },
  //关联元素
  node: {
    type: [String, Node],
    default: null
  },
  //类型
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["text", "table", "link", "codeBlock", "image", "video"].includes(value);
    }
  },
  //工具条配置
  config: {
    type: Object,
    default: null
  },
  //主题色
  color: {
    type: String,
    default: ""
  }
};
const _hoisted_1$7 = {
  key: 0,
  class: "editify-toolbar-link"
};
const _hoisted_2$6 = { class: "editify-toolbar-link-label" };
const _hoisted_3$6 = ["placeholder"];
const _hoisted_4$6 = { class: "editify-toolbar-link-footer" };
const _hoisted_5$5 = { class: "editify-toolbar-link-operations" };
const _hoisted_6$5 = ["href"];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...{
    name: "Toolbar"
  },
  __name: "toolbar",
  props: ToolbarProps,
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const editor = inject("editor");
    const dataRangeCaches = inject("dataRangeCaches");
    const $editTrans = inject("$editTrans");
    const layerRef = ref(null);
    const toolbarRef = ref(null);
    const foreColorRef = ref(null);
    const backColorRef = ref(null);
    const linkConfig = ref({
      //链接地址
      url: "",
      //链接是否新窗口打开
      newOpen: false
    });
    const videoConfig = ref({
      //是否显示控制器
      controls: false,
      //是否循环
      loop: false,
      //是否自动播放
      autoplay: false,
      //是否静音
      muted: false
    });
    const languageConfig = ref({
      show: props.config.codeBlock.languages.show,
      displayConfig: {
        options: props.config.codeBlock.languages.options,
        value: "",
        width: props.config.codeBlock.languages.width,
        maxHeight: props.config.codeBlock.languages.maxHeight
      },
      leftBorder: props.config.codeBlock.languages.leftBorder,
      rightBorder: props.config.codeBlock.languages.rightBorder,
      active: false,
      disabled: false
    });
    const headingConfig = ref({
      show: props.config.text.heading.show,
      displayConfig: {
        options: props.config.text.heading.options,
        value: "",
        width: props.config.text.heading.width,
        maxHeight: props.config.text.heading.maxHeight
      },
      defaultValue: props.config.text.heading.defaultValue,
      leftBorder: props.config.text.heading.leftBorder,
      rightBorder: props.config.text.heading.rightBorder,
      active: false,
      disabled: false
    });
    const alignConfig = ref({
      show: props.config.text.align.show,
      selectConfig: {
        options: props.config.text.align.options,
        width: props.config.text.align.width,
        maxHeight: props.config.text.align.maxHeight
      },
      leftBorder: props.config.text.align.leftBorder,
      rightBorder: props.config.text.align.rightBorder,
      active: false,
      disabled: false
    });
    const orderListConfig = ref({
      show: props.config.text.orderList.show,
      leftBorder: props.config.text.orderList.leftBorder,
      rightBorder: props.config.text.orderList.rightBorder,
      active: false,
      disabled: false
    });
    const unorderListConfig = ref({
      show: props.config.text.unorderList.show,
      leftBorder: props.config.text.unorderList.leftBorder,
      rightBorder: props.config.text.unorderList.rightBorder,
      active: false,
      disabled: false
    });
    const taskConfig = ref({
      show: props.config.text.task.show,
      leftBorder: props.config.text.task.leftBorder,
      rightBorder: props.config.text.task.rightBorder,
      active: false,
      disabled: false
    });
    const boldConfig = ref({
      show: props.config.text.bold.show,
      leftBorder: props.config.text.bold.leftBorder,
      rightBorder: props.config.text.bold.rightBorder,
      active: false,
      disabled: false
    });
    const italicConfig = ref({
      show: props.config.text.italic.show,
      leftBorder: props.config.text.italic.leftBorder,
      rightBorder: props.config.text.italic.rightBorder,
      active: false,
      disabled: false
    });
    const strikethroughConfig = ref({
      show: props.config.text.strikethrough.show,
      leftBorder: props.config.text.strikethrough.leftBorder,
      rightBorder: props.config.text.strikethrough.rightBorder,
      active: false,
      disabled: false
    });
    const underlineConfig = ref({
      show: props.config.text.underline.show,
      leftBorder: props.config.text.underline.leftBorder,
      rightBorder: props.config.text.underline.rightBorder,
      active: false,
      disabled: false
    });
    const codeConfig = ref({
      show: props.config.text.code.show,
      leftBorder: props.config.text.code.leftBorder,
      rightBorder: props.config.text.code.rightBorder,
      active: false,
      disabled: false
    });
    const superConfig = ref({
      show: props.config.text.super.show,
      leftBorder: props.config.text.super.leftBorder,
      rightBorder: props.config.text.super.rightBorder,
      active: false,
      disabled: false
    });
    const subConfig = ref({
      show: props.config.text.sub.show,
      leftBorder: props.config.text.sub.leftBorder,
      rightBorder: props.config.text.sub.rightBorder,
      active: false,
      disabled: false
    });
    const fontSizeConfig = ref({
      show: props.config.text.fontSize.show,
      displayConfig: {
        options: props.config.text.fontSize.options,
        value: "",
        width: props.config.text.fontSize.width,
        maxHeight: props.config.text.fontSize.maxHeight
      },
      defaultValue: props.config.text.fontSize.defaultValue,
      leftBorder: props.config.text.fontSize.leftBorder,
      rightBorder: props.config.text.fontSize.rightBorder,
      active: false,
      disabled: false
    });
    const fontFamilyConfig = ref({
      show: props.config.text.fontFamily.show,
      displayConfig: {
        options: props.config.text.fontFamily.options,
        value: "",
        width: props.config.text.fontFamily.width,
        maxHeight: props.config.text.fontFamily.maxHeight
      },
      defaultValue: props.config.text.fontFamily.defaultValue,
      leftBorder: props.config.text.fontFamily.leftBorder,
      rightBorder: props.config.text.fontFamily.rightBorder,
      active: false,
      disabled: false
    });
    const lineHeightConfig = ref({
      show: props.config.text.lineHeight.show,
      displayConfig: {
        options: props.config.text.lineHeight.options,
        value: "",
        width: props.config.text.lineHeight.width,
        maxHeight: props.config.text.lineHeight.maxHeight
      },
      defaultValue: props.config.text.lineHeight.defaultValue,
      leftBorder: props.config.text.lineHeight.leftBorder,
      rightBorder: props.config.text.lineHeight.rightBorder,
      active: false,
      disabled: false
    });
    const foreColorConfig = ref({
      show: props.config.text.foreColor.show,
      selectConfig: {
        options: props.config.text.foreColor.options
      },
      leftBorder: props.config.text.foreColor.leftBorder,
      rightBorder: props.config.text.foreColor.rightBorder,
      value: "",
      //选择的颜色值
      active: false,
      disabled: false
    });
    const backColorConfig = ref({
      show: props.config.text.backColor.show,
      selectConfig: {
        options: props.config.text.backColor.options
      },
      leftBorder: props.config.text.backColor.leftBorder,
      rightBorder: props.config.text.backColor.rightBorder,
      value: "",
      //选择的颜色值
      active: false,
      disabled: false
    });
    const formatClearConfig = ref({
      show: props.config.text.formatClear.show,
      leftBorder: props.config.text.formatClear.leftBorder,
      rightBorder: props.config.text.formatClear.rightBorder,
      active: false,
      disabled: false
    });
    const show = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emits("update:modelValue", val);
      }
    });
    const handleInputFocus = (e) => {
      if (props.color) {
        e.currentTarget.style.borderColor = props.color;
      }
    };
    const handleInputBlur = (e) => {
      e.currentTarget.style.borderColor = "";
    };
    const clearFormat = () => {
      removeTextStyle(editor.value, dataRangeCaches.value);
      removeTextMark(editor.value, dataRangeCaches.value);
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setBackColor = (value) => {
      setTextStyle(editor.value, dataRangeCaches.value, {
        "background-color": value
      });
      backColorRef.value.show = false;
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setForeColor = (value) => {
      setTextStyle(editor.value, dataRangeCaches.value, {
        color: value
      });
      foreColorRef.value.show = false;
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const _setLineHeight = (_name, value) => {
      setLineHeight(editor.value, dataRangeCaches.value, value);
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setFontFamily = (_name, value) => {
      setTextStyle(editor.value, dataRangeCaches.value, {
        "font-family": value
      });
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setFontSize = (_name, value) => {
      setTextStyle(editor.value, dataRangeCaches.value, {
        "font-size": value
      });
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setSuperscript = () => {
      if (queryTextStyle(editor.value, dataRangeCaches.value, "vertical-align", "super")) {
        removeTextStyle(editor.value, dataRangeCaches.value, ["vertical-align"]);
      } else {
        setTextStyle(editor.value, dataRangeCaches.value, {
          "vertical-align": "super"
        });
      }
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setSubscript = () => {
      if (queryTextStyle(editor.value, dataRangeCaches.value, "vertical-align", "sub")) {
        removeTextStyle(editor.value, dataRangeCaches.value, ["vertical-align"]);
      } else {
        setTextStyle(editor.value, dataRangeCaches.value, {
          "vertical-align": "sub"
        });
      }
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setCodeStyle = () => {
      if (queryTextMark(editor.value, dataRangeCaches.value, "data-editify-code")) {
        removeTextMark(editor.value, dataRangeCaches.value, ["data-editify-code"]);
      } else {
        setTextMark(editor.value, dataRangeCaches.value, {
          "data-editify-code": true
        });
      }
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setUnderline = () => {
      if (queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration", "underline") || queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration-line", "underline")) {
        removeTextStyle(editor.value, dataRangeCaches.value, ["text-decoration", "text-decoration-line"]);
      } else {
        setTextStyle(editor.value, dataRangeCaches.value, {
          "text-decoration": "underline"
        });
      }
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setStrikethrough = () => {
      if (queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration", "line-through") || queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration-line", "line-through")) {
        removeTextStyle(editor.value, dataRangeCaches.value, ["text-decoration", "text-decoration-line"]);
      } else {
        setTextStyle(editor.value, dataRangeCaches.value, {
          "text-decoration": "line-through"
        });
      }
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const _setList = (name) => {
      setList(editor.value, dataRangeCaches.value, name == "orderList");
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const _setTask = () => {
      setTask(editor.value, dataRangeCaches.value);
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setItalic = () => {
      if (queryTextStyle(editor.value, dataRangeCaches.value, "font-style", "italic")) {
        removeTextStyle(editor.value, dataRangeCaches.value, ["font-style"]);
      } else {
        setTextStyle(editor.value, dataRangeCaches.value, {
          "font-style": "italic"
        });
      }
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setBold = () => {
      if (queryTextStyle(editor.value, dataRangeCaches.value, "font-weight", "bold") || queryTextStyle(editor.value, dataRangeCaches.value, "font-weight", "700")) {
        removeTextStyle(editor.value, dataRangeCaches.value, ["font-weight"]);
      } else {
        setTextStyle(editor.value, dataRangeCaches.value, {
          "font-weight": "bold"
        });
      }
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const _setHeading = (_name, value) => {
      setHeading(editor.value, dataRangeCaches.value, $editTrans, value);
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const _setAlign = (_name, value) => {
      setAlign(editor.value, dataRangeCaches.value, value);
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setVideo = (prop) => {
      const element2 = editor.value.range.anchor.element;
      if (videoConfig.value[prop]) {
        delete element2.marks[prop];
      } else {
        element2.marks[prop] = true;
      }
      videoConfig.value[prop] = !videoConfig.value[prop];
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const setWidth = (value) => {
      const element2 = editor.value.range.anchor.element;
      if (element2) {
        const styles = {
          width: value
        };
        if (element2.hasStyles()) {
          element2.styles = Object.assign(element2.styles, styles);
        } else {
          element2.styles = styles;
        }
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
        setTimeout(() => {
          layerRef.value.setPosition();
        }, 0);
      }
    };
    const modifyLink = () => {
      if (!linkConfig.value.url) {
        return;
      }
      const link = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "a");
      if (link) {
        link.marks.href = linkConfig.value.url;
        if (linkConfig.value.newOpen) {
          link.marks.target = "_blank";
        } else {
          delete link.marks.target;
        }
      }
      editor.value.formatElementStack();
      editor.value.domRender();
    };
    const removeLink = () => {
      const link = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "a");
      if (link) {
        link.parsedom = AlexElement.TEXT_NODE;
        delete link.marks["target"];
        delete link.marks["href"];
        delete link.marks["data-editify-element"];
      }
      editor.value.formatElementStack();
      editor.value.domRender();
      editor.value.rangeRender();
    };
    const selectLanguage = (_name, value) => {
      const pre = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "pre");
      if (pre) {
        Object.assign(pre.marks, {
          "data-editify-hljs": value
        });
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      }
    };
    const insertParagraphWithPre = (type = "up") => {
      if (!editor.value.range.anchor.isEqual(editor.value.range.focus)) {
        editor.value.range.anchor.element = editor.value.range.focus.element;
        editor.value.range.anchor.offset = editor.value.range.focus.offset;
      }
      const pre = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "pre");
      if (pre) {
        const paragraph = new AlexElement("block", AlexElement.BLOCK_NODE, null, null, null);
        const breakEl = new AlexElement("closed", "br", null, null, null);
        editor.value.addElementTo(breakEl, paragraph);
        if (type == "up") {
          editor.value.addElementBefore(paragraph, pre);
        } else {
          editor.value.addElementAfter(paragraph, pre);
        }
        editor.value.range.anchor.moveToEnd(paragraph);
        editor.value.range.focus.moveToEnd(paragraph);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      }
    };
    const insertTableColumn = (type = "left") => {
      if (!editor.value.range.anchor.isEqual(editor.value.range.focus)) {
        editor.value.range.anchor.element = editor.value.range.focus.element;
        editor.value.range.anchor.offset = editor.value.range.focus.offset;
      }
      const table = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "table");
      const column = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "td");
      const tbody = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "tbody");
      if (column && table && tbody) {
        const rows = tbody.children;
        const index = column.parent.children.findIndex((item) => {
          return item.isEqual(column);
        });
        rows.forEach((row) => {
          const newColumn = column.clone(false);
          const breakEl = new AlexElement("closed", "br", null, null, null);
          editor.value.addElementTo(breakEl, newColumn);
          if (type == "left") {
            editor.value.addElementTo(newColumn, row, index);
          } else {
            editor.value.addElementTo(newColumn, row, index + 1);
          }
        });
        const colgroup = table.children.find((item) => {
          return item.parsedom == "colgroup";
        });
        const col = new AlexElement("closed", "col", null, null, null);
        if (type == "left") {
          editor.value.addElementTo(col, colgroup, index);
        } else {
          editor.value.addElementTo(col, colgroup, index + 1);
        }
        editor.value.formatElementStack();
        if (type == "left") {
          const previousColumn = editor.value.getPreviousElement(column);
          editor.value.range.anchor.moveToStart(previousColumn);
          editor.value.range.focus.moveToStart(previousColumn);
        } else {
          const nextColumn = editor.value.getNextElement(column);
          editor.value.range.anchor.moveToStart(nextColumn);
          editor.value.range.focus.moveToStart(nextColumn);
        }
        editor.value.domRender();
        editor.value.rangeRender();
      }
    };
    const insertTableRow = (type = "up") => {
      if (!editor.value.range.anchor.isEqual(editor.value.range.focus)) {
        editor.value.range.anchor.element = editor.value.range.focus.element;
        editor.value.range.anchor.offset = editor.value.range.focus.offset;
      }
      const table = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "table");
      const row = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "tr");
      if (table && row) {
        const newRow = row.clone();
        newRow.children.forEach((column) => {
          column.children = [];
          const breakEl = new AlexElement("closed", "br", null, null, null);
          editor.value.addElementTo(breakEl, column);
        });
        if (type == "up") {
          editor.value.addElementBefore(newRow, row);
        } else {
          editor.value.addElementAfter(newRow, row);
        }
        editor.value.formatElementStack();
        editor.value.range.anchor.moveToStart(newRow);
        editor.value.range.focus.moveToStart(newRow);
        editor.value.domRender();
        editor.value.rangeRender();
        setTimeout(() => {
          layerRef.value.setPosition();
        }, 0);
      }
    };
    const insertParagraphWithTable = (type = "up") => {
      const table = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "table");
      if (table) {
        const paragraph = new AlexElement("block", AlexElement.BLOCK_NODE, null, null, null);
        const breakEl = new AlexElement("closed", "br", null, null, null);
        editor.value.addElementTo(breakEl, paragraph);
        if (type == "up") {
          editor.value.addElementBefore(paragraph, table);
        } else {
          editor.value.addElementAfter(paragraph, table);
        }
        editor.value.range.anchor.moveToEnd(paragraph);
        editor.value.range.focus.moveToEnd(paragraph);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      }
    };
    const deleteElement = (parsedom) => {
      const element2 = getCurrentParsedomElement(editor.value, dataRangeCaches.value, parsedom);
      if (element2) {
        element2.toEmpty();
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      }
    };
    const deleteTableRow = () => {
      if (!editor.value.range.anchor.isEqual(editor.value.range.focus)) {
        editor.value.range.anchor.element = editor.value.range.focus.element;
        editor.value.range.anchor.offset = editor.value.range.focus.offset;
      }
      const table = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "table");
      const row = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "tr");
      if (table && row) {
        const parent = row.parent;
        if (parent.children.length == 1) {
          deleteElement("table");
          return;
        }
        const previousRow = editor.value.getPreviousElement(row);
        const nextRow = editor.value.getNextElement(row);
        row.toEmpty();
        editor.value.formatElementStack();
        if (previousRow) {
          editor.value.range.anchor.moveToEnd(previousRow.children[0]);
          editor.value.range.focus.moveToEnd(previousRow.children[0]);
        } else {
          editor.value.range.anchor.moveToEnd(nextRow.children[0]);
          editor.value.range.focus.moveToEnd(nextRow.children[0]);
        }
        editor.value.domRender();
        editor.value.rangeRender();
        setTimeout(() => {
          layerRef.value.setPosition();
        }, 0);
      }
    };
    const deleteTableColumn = () => {
      if (!editor.value.range.anchor.isEqual(editor.value.range.focus)) {
        editor.value.range.anchor.element = editor.value.range.focus.element;
        editor.value.range.anchor.offset = editor.value.range.focus.offset;
      }
      const column = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "td");
      const tbody = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "tbody");
      const table = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "table");
      if (column && table && tbody) {
        const rows = tbody.children;
        const parent = column.parent;
        if (parent.children.length == 1) {
          deleteElement("table");
          return;
        }
        const previousColumn = editor.value.getPreviousElement(column);
        const nextColumn = editor.value.getNextElement(column);
        const index = column.parent.children.findIndex((item) => {
          return item.isEqual(column);
        });
        rows.forEach((row) => {
          row.children[index].toEmpty();
        });
        const colgroup = table.children.find((item) => {
          return item.parsedom == "colgroup";
        });
        colgroup.children[index].toEmpty();
        editor.value.formatElementStack();
        if (previousColumn) {
          editor.value.range.anchor.moveToEnd(previousColumn);
          editor.value.range.focus.moveToEnd(previousColumn);
        } else {
          editor.value.range.anchor.moveToEnd(nextColumn);
          editor.value.range.focus.moveToEnd(nextColumn);
        }
        editor.value.domRender();
        editor.value.rangeRender();
      }
    };
    const layerShow = () => {
      if (props.type == "codeBlock") {
        const pre = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "pre");
        if (pre) {
          languageConfig.value.displayConfig.value = pre.marks["data-editify-hljs"] || "";
        }
      } else if (props.type == "link") {
        const link = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "a");
        if (link) {
          linkConfig.value.url = link.marks["href"];
          linkConfig.value.newOpen = link.marks["target"] == "_blank";
        }
      } else if (props.type == "video") {
        const video = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "video");
        if (video) {
          videoConfig.value.autoplay = !!video.marks["autoplay"];
          videoConfig.value.loop = !!video.marks["loop"];
          videoConfig.value.controls = !!video.marks["controls"];
          videoConfig.value.muted = !!video.marks["muted"];
        }
      } else if (props.type == "text") {
        const extraDisabled = (name) => {
          if (typeof props.config.extraDisabled == "function") {
            return props.config.extraDisabled(name) || false;
          }
          return false;
        };
        const findHeadingItem = headingConfig.value.displayConfig.options.find((item) => {
          let val = item;
          if (common.isObject(item)) {
            val = item.value;
          }
          return dataRangeCaches.value.list.every((el) => {
            if (el.element.isBlock()) {
              return el.element.parsedom == val;
            }
            return el.element.getBlock().parsedom == val;
          });
        });
        headingConfig.value.displayConfig.value = findHeadingItem ? common.isObject(findHeadingItem) ? findHeadingItem.value : findHeadingItem : headingConfig.value.defaultValue;
        headingConfig.value.disabled = extraDisabled("heading");
        alignConfig.value.disabled = extraDisabled("align");
        orderListConfig.value.active = isRangeInList(editor.value, dataRangeCaches.value, true);
        orderListConfig.value.disabled = extraDisabled("orderList");
        unorderListConfig.value.active = isRangeInList(editor.value, dataRangeCaches.value, false);
        unorderListConfig.value.disabled = extraDisabled("unorderList");
        taskConfig.value.active = isRangeInTask(editor.value, dataRangeCaches.value);
        taskConfig.value.disabled = extraDisabled("task");
        boldConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "font-weight", "bold") || queryTextStyle(editor.value, dataRangeCaches.value, "font-weight", "700");
        boldConfig.value.disabled = extraDisabled("bold");
        italicConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "font-style", "italic");
        italicConfig.value.disabled = extraDisabled("italic");
        strikethroughConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration", "line-through") || queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration-line", "line-through");
        strikethroughConfig.value.disabled = extraDisabled("strikethrough");
        underlineConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration", "underline") || queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration-line", "underline");
        underlineConfig.value.disabled = extraDisabled("underline");
        codeConfig.value.active = queryTextMark(editor.value, dataRangeCaches.value, "data-editify-code");
        codeConfig.value.disabled = extraDisabled("code");
        superConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "vertical-align", "super");
        superConfig.value.disabled = extraDisabled("super");
        subConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "vertical-align", "sub");
        subConfig.value.disabled = extraDisabled("sub");
        const findFontItem = fontSizeConfig.value.displayConfig.options.find((item) => {
          if (common.isObject(item)) {
            return queryTextStyle(editor.value, dataRangeCaches.value, "font-size", item.value);
          }
          return queryTextStyle(editor.value, dataRangeCaches.value, "font-size", item);
        });
        fontSizeConfig.value.displayConfig.value = findFontItem ? common.isObject(findFontItem) ? findFontItem.value : findFontItem : fontSizeConfig.value.defaultValue;
        fontSizeConfig.value.disabled = extraDisabled("fontSize");
        const findFamilyItem = fontFamilyConfig.value.displayConfig.options.find((item) => {
          if (common.isObject(item)) {
            return queryTextStyle(editor.value, dataRangeCaches.value, "font-family", item.value);
          }
          return queryTextStyle(editor.value, dataRangeCaches.value, "font-family", item);
        });
        fontFamilyConfig.value.displayConfig.value = findFamilyItem ? common.isObject(findFamilyItem) ? findFamilyItem.value : findFamilyItem : fontFamilyConfig.value.defaultValue;
        fontFamilyConfig.value.disabled = extraDisabled("fontFamily");
        const findHeightItem = lineHeightConfig.value.displayConfig.options.find((item) => {
          let val = item;
          if (common.isObject(item)) {
            val = item.value;
          }
          return dataRangeCaches.value.list.every((el) => {
            if (el.element.isBlock() || el.element.isInblock()) {
              return el.element.hasStyles() && el.element.styles["line-height"] == val;
            }
            const block = el.element.getBlock();
            const inblock = el.element.getInblock();
            if (inblock) {
              return inblock.hasStyles() && inblock.styles["line-height"] == val;
            }
            return block.hasStyles() && block.styles["line-height"] == val;
          });
        });
        lineHeightConfig.value.displayConfig.value = findHeightItem ? common.isObject(findHeightItem) ? findHeightItem.value : findHeightItem : lineHeightConfig.value.defaultValue;
        lineHeightConfig.value.disabled = extraDisabled("lineHeight");
        const findForeColorItem = foreColorConfig.value.selectConfig.options.find((item) => {
          if (common.isObject(item)) {
            return queryTextStyle(editor.value, dataRangeCaches.value, "color", item.value);
          }
          return queryTextStyle(editor.value, dataRangeCaches.value, "color", item);
        });
        foreColorConfig.value.value = findForeColorItem ? common.isObject(findForeColorItem) ? findForeColorItem.value : findForeColorItem : "";
        foreColorConfig.value.disabled = extraDisabled("foreColor");
        const findBackColorItem = backColorConfig.value.selectConfig.options.find((item) => {
          if (common.isObject(item)) {
            return queryTextStyle(editor.value, dataRangeCaches.value, "background-color", item.value);
          }
          return queryTextStyle(editor.value, dataRangeCaches.value, "background-color", item);
        });
        backColorConfig.value.value = findBackColorItem ? common.isObject(findBackColorItem) ? findBackColorItem.value : findBackColorItem : "";
        backColorConfig.value.disabled = extraDisabled("backColor");
        formatClearConfig.value.disabled = extraDisabled("formatClear");
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Layer, {
        modelValue: show.value,
        "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => show.value = $event),
        ref_key: "layerRef",
        ref: layerRef,
        node: _ctx.node,
        border: "",
        placement: "bottom-start",
        onShow: layerShow,
        useRange: _ctx.type == "text",
        "z-index": 10
      }, {
        default: withCtx(() => [
          createElementVNode("div", {
            class: "editify-toolbar",
            ref_key: "toolbarRef",
            ref: toolbarRef,
            style: normalizeStyle(_ctx.config.style)
          }, [
            _ctx.type == "link" ? (openBlock(), createElementBlock("div", _hoisted_1$7, [
              createElementVNode("div", _hoisted_2$6, toDisplayString(unref($editTrans)("linkAddress")), 1),
              withDirectives(createElementVNode("input", {
                onChange: modifyLink,
                onFocus: handleInputFocus,
                onBlur: handleInputBlur,
                placeholder: unref($editTrans)("linkUrlEnterPlaceholder"),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => linkConfig.value.url = $event),
                type: "url"
              }, null, 40, _hoisted_3$6), [
                [
                  vModelText,
                  linkConfig.value.url,
                  void 0,
                  { trim: true }
                ]
              ]),
              createElementVNode("div", _hoisted_4$6, [
                createVNode(Checkbox, {
                  onChange: modifyLink,
                  modelValue: linkConfig.value.newOpen,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => linkConfig.value.newOpen = $event),
                  label: unref($editTrans)("newWindowOpen"),
                  color: _ctx.color,
                  size: 10
                }, null, 8, ["modelValue", "label", "color"]),
                createElementVNode("div", _hoisted_5$5, [
                  createElementVNode("span", { onClick: removeLink }, toDisplayString(unref($editTrans)("removeLink")), 1),
                  createElementVNode("a", {
                    href: linkConfig.value.url,
                    target: "_blank",
                    style: normalizeStyle({ color: _ctx.color || "" })
                  }, toDisplayString(unref($editTrans)("viewLink")), 13, _hoisted_6$5)
                ])
              ])
            ])) : _ctx.type == "image" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createVNode(Button, {
                onOperate: _cache[2] || (_cache[2] = ($event) => setWidth("30%")),
                name: "set30Width",
                title: unref($editTrans)("width30"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createTextVNode(" 30% ")
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[3] || (_cache[3] = ($event) => setWidth("50%")),
                name: "set50Width",
                title: unref($editTrans)("width50"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createTextVNode(" 50% ")
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                rightBorder: "",
                onOperate: _cache[4] || (_cache[4] = ($event) => setWidth("100%")),
                name: "set100Width",
                title: unref($editTrans)("width100"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createTextVNode(" 100% ")
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[5] || (_cache[5] = ($event) => setWidth("auto")),
                name: "setAutoWidth",
                title: unref($editTrans)("auto"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "auto-width" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[6] || (_cache[6] = ($event) => deleteElement("img")),
                name: "deleteImage",
                title: unref($editTrans)("deleteImage"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "delete" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"])
            ], 64)) : _ctx.type == "video" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createVNode(Button, {
                onOperate: _cache[7] || (_cache[7] = ($event) => setWidth("30%")),
                name: "set30Width",
                title: unref($editTrans)("width30"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createTextVNode(" 30% ")
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[8] || (_cache[8] = ($event) => setWidth("50%")),
                name: "set50Width",
                title: unref($editTrans)("width50"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createTextVNode(" 50% ")
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[9] || (_cache[9] = ($event) => setWidth("100%")),
                name: "set100Width",
                title: unref($editTrans)("width100"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createTextVNode(" 100% ")
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                rightBorder: "",
                onOperate: _cache[10] || (_cache[10] = ($event) => setWidth("auto")),
                name: "setAutoWidth",
                title: unref($editTrans)("auto"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "auto-width" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: setVideo,
                name: "autoplay",
                title: videoConfig.value.autoplay ? unref($editTrans)("disabledAutoplay") : unref($editTrans)("autoplay"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, {
                    value: videoConfig.value.autoplay ? "autoplay" : "stop"
                  }, null, 8, ["value"])
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: setVideo,
                name: "loop",
                title: videoConfig.value.loop ? unref($editTrans)("disabledLoop") : unref($editTrans)("loop"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, {
                    value: videoConfig.value.loop ? "loop" : "single"
                  }, null, 8, ["value"])
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: setVideo,
                name: "muted",
                title: videoConfig.value.muted ? unref($editTrans)("unmuted") : unref($editTrans)("muted"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, {
                    value: videoConfig.value.muted ? "muted" : "unmuted"
                  }, null, 8, ["value"])
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                leftBorder: "",
                onOperate: setVideo,
                name: "controls",
                title: unref($editTrans)("controls"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "controls" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[11] || (_cache[11] = ($event) => deleteElement("video")),
                name: "deleteVideo",
                title: unref($editTrans)("deleteVideo"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "delete" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"])
            ], 64)) : _ctx.type == "table" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
              createVNode(Button, {
                onOperate: _cache[12] || (_cache[12] = ($event) => insertParagraphWithTable("up")),
                name: "textWrapUp",
                title: unref($editTrans)("textWrapUp"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, {
                    value: "text-wrap",
                    class: "editify-icon-rotate"
                  })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[13] || (_cache[13] = ($event) => insertParagraphWithTable("down")),
                rightBorder: "",
                name: "textWrapDown",
                title: unref($editTrans)("textWrapDown"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "text-wrap" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[14] || (_cache[14] = ($event) => insertTableRow("up")),
                name: "insertRowTop",
                title: unref($editTrans)("insertRowTop"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "insert-row-top" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[15] || (_cache[15] = ($event) => insertTableRow("down")),
                name: "insertRowBottom",
                title: unref($editTrans)("insertRowBottom"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "insert-row-bottom" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: deleteTableRow,
                rightBorder: "",
                name: "deleteRow",
                title: unref($editTrans)("deleteRow"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "delete-row" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[16] || (_cache[16] = ($event) => insertTableColumn("left")),
                name: "insertColumnLeft",
                title: unref($editTrans)("insertColumnLeft"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "insert-column-left" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[17] || (_cache[17] = ($event) => insertTableColumn("right")),
                name: "insertColumnRight",
                title: unref($editTrans)("insertColumnRight"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "insert-column-right" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: deleteTableColumn,
                rightBorder: "",
                name: "deleteColumn",
                title: unref($editTrans)("deleteColumn"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "delete-column" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[18] || (_cache[18] = ($event) => deleteElement("table")),
                name: "deleteTable",
                title: unref($editTrans)("deleteTable"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "delete-table" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"])
            ], 64)) : createCommentVNode("", true),
            _ctx.type == "codeBlock" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
              createVNode(Button, {
                onOperate: _cache[19] || (_cache[19] = ($event) => insertParagraphWithPre("up")),
                name: "textWrapUp",
                title: unref($editTrans)("textWrapUp"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, {
                    value: "text-wrap",
                    class: "editify-icon-rotate"
                  })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              createVNode(Button, {
                onOperate: _cache[20] || (_cache[20] = ($event) => insertParagraphWithPre("down")),
                name: "textWrapDown",
                title: unref($editTrans)("textWrapDown"),
                tooltip: _ctx.config.tooltip,
                color: _ctx.color
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "text-wrap" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "color"]),
              languageConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 0,
                name: "languages",
                type: "display",
                title: unref($editTrans)("selectLanguages"),
                tooltip: _ctx.config.tooltip,
                leftBorder: languageConfig.value.leftBorder,
                rightBorder: languageConfig.value.rightBorder,
                "display-config": languageConfig.value.displayConfig,
                color: _ctx.color,
                active: languageConfig.value.active,
                disabled: languageConfig.value.disabled,
                onOperate: selectLanguage
              }, null, 8, ["title", "tooltip", "leftBorder", "rightBorder", "display-config", "color", "active", "disabled"])) : createCommentVNode("", true)
            ], 64)) : _ctx.type == "text" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
              headingConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 0,
                name: "heading",
                type: "display",
                title: unref($editTrans)("heading"),
                tooltip: _ctx.config.tooltip,
                "display-config": headingConfig.value.displayConfig,
                leftBorder: headingConfig.value.leftBorder,
                rightBorder: headingConfig.value.rightBorder,
                color: _ctx.color,
                active: headingConfig.value.active,
                disabled: headingConfig.value.disabled,
                onOperate: _setHeading
              }, null, 8, ["title", "tooltip", "display-config", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              alignConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 1,
                name: "align",
                type: "select",
                title: unref($editTrans)("align"),
                tooltip: _ctx.config.tooltip,
                "select-config": alignConfig.value.selectConfig,
                leftBorder: alignConfig.value.leftBorder,
                rightBorder: alignConfig.value.rightBorder,
                color: _ctx.color,
                active: alignConfig.value.active,
                disabled: alignConfig.value.disabled,
                onOperate: _setAlign
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "align-left" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "select-config", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              orderListConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 2,
                name: "orderList",
                title: unref($editTrans)("orderList"),
                tooltip: _ctx.config.tooltip,
                leftBorder: orderListConfig.value.leftBorder,
                rightBorder: orderListConfig.value.rightBorder,
                color: _ctx.color,
                active: orderListConfig.value.active,
                disabled: orderListConfig.value.disabled,
                onOperate: _setList
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "list-ordered" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              unorderListConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 3,
                name: "unorderList",
                title: unref($editTrans)("unorderList"),
                tooltip: _ctx.config.tooltip,
                leftBorder: unorderListConfig.value.leftBorder,
                rightBorder: unorderListConfig.value.rightBorder,
                color: _ctx.color,
                active: unorderListConfig.value.active,
                disabled: unorderListConfig.value.disabled,
                onOperate: _setList
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "list-unordered" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              taskConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 4,
                name: "task",
                title: unref($editTrans)("task"),
                tooltip: _ctx.config.tooltip,
                leftBorder: taskConfig.value.leftBorder,
                rightBorder: taskConfig.value.rightBorder,
                color: _ctx.color,
                active: taskConfig.value.active,
                disabled: taskConfig.value.disabled,
                onOperate: _setTask
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "task" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              boldConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 5,
                name: "bold",
                title: unref($editTrans)("bold"),
                tooltip: _ctx.config.tooltip,
                leftBorder: boldConfig.value.leftBorder,
                rightBorder: boldConfig.value.rightBorder,
                color: _ctx.color,
                active: boldConfig.value.active,
                disabled: boldConfig.value.disabled,
                onOperate: setBold
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "bold" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              italicConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 6,
                name: "italic",
                title: unref($editTrans)("italic"),
                tooltip: _ctx.config.tooltip,
                leftBorder: italicConfig.value.leftBorder,
                rightBorder: italicConfig.value.rightBorder,
                color: _ctx.color,
                active: italicConfig.value.active,
                disabled: italicConfig.value.disabled,
                onOperate: setItalic
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "italic" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              strikethroughConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 7,
                name: "strikethrough",
                title: unref($editTrans)("strikethrough"),
                tooltip: _ctx.config.tooltip,
                leftBorder: strikethroughConfig.value.leftBorder,
                rightBorder: strikethroughConfig.value.rightBorder,
                color: _ctx.color,
                active: strikethroughConfig.value.active,
                disabled: strikethroughConfig.value.disabled,
                onOperate: setStrikethrough
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "strikethrough" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              underlineConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 8,
                name: "underline",
                title: unref($editTrans)("underline"),
                tooltip: _ctx.config.tooltip,
                leftBorder: underlineConfig.value.leftBorder,
                rightBorder: underlineConfig.value.rightBorder,
                color: _ctx.color,
                active: underlineConfig.value.active,
                disabled: underlineConfig.value.disabled,
                onOperate: setUnderline
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "underline" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              codeConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 9,
                name: "code",
                title: unref($editTrans)("code"),
                tooltip: _ctx.config.tooltip,
                leftBorder: codeConfig.value.leftBorder,
                rightBorder: codeConfig.value.rightBorder,
                color: _ctx.color,
                active: codeConfig.value.active,
                disabled: codeConfig.value.disabled,
                onOperate: setCodeStyle
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "code" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              superConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 10,
                name: "superscript",
                title: unref($editTrans)("superscript"),
                tooltip: _ctx.config.tooltip,
                leftBorder: superConfig.value.leftBorder,
                rightBorder: superConfig.value.rightBorder,
                color: _ctx.color,
                active: superConfig.value.active,
                disabled: superConfig.value.disabled,
                onOperate: setSuperscript
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "superscript" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              subConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 11,
                name: "subscript",
                title: unref($editTrans)("subscript"),
                tooltip: _ctx.config.tooltip,
                leftBorder: subConfig.value.leftBorder,
                rightBorder: subConfig.value.rightBorder,
                color: _ctx.color,
                active: subConfig.value.active,
                disabled: subConfig.value.disabled,
                onOperate: setSubscript
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "subscript" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              fontSizeConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 12,
                name: "fontSize",
                type: "display",
                title: unref($editTrans)("fontSize"),
                tooltip: _ctx.config.tooltip,
                "display-config": fontSizeConfig.value.displayConfig,
                leftBorder: fontSizeConfig.value.leftBorder,
                rightBorder: fontSizeConfig.value.rightBorder,
                color: _ctx.color,
                active: fontSizeConfig.value.active,
                disabled: fontSizeConfig.value.disabled,
                onOperate: setFontSize
              }, null, 8, ["title", "tooltip", "display-config", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              fontFamilyConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 13,
                name: "fontFamily",
                type: "display",
                title: unref($editTrans)("fontFamily"),
                tooltip: _ctx.config.tooltip,
                "display-config": fontFamilyConfig.value.displayConfig,
                leftBorder: fontFamilyConfig.value.leftBorder,
                rightBorder: fontFamilyConfig.value.rightBorder,
                color: _ctx.color,
                active: fontFamilyConfig.value.active,
                disabled: fontFamilyConfig.value.disabled,
                onOperate: setFontFamily
              }, null, 8, ["title", "tooltip", "display-config", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              lineHeightConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 14,
                name: "lineHeight",
                type: "display",
                title: unref($editTrans)("lineHeight"),
                tooltip: _ctx.config.tooltip,
                "display-config": lineHeightConfig.value.displayConfig,
                leftBorder: lineHeightConfig.value.leftBorder,
                rightBorder: lineHeightConfig.value.rightBorder,
                color: _ctx.color,
                active: lineHeightConfig.value.active,
                disabled: lineHeightConfig.value.disabled,
                onOperate: _setLineHeight
              }, null, 8, ["title", "tooltip", "display-config", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              foreColorConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 15,
                name: "foreColor",
                type: "select",
                title: unref($editTrans)("foreColor"),
                tooltip: _ctx.config.tooltip,
                "select-config": foreColorConfig.value.selectConfig,
                leftBorder: foreColorConfig.value.leftBorder,
                rightBorder: foreColorConfig.value.rightBorder,
                color: _ctx.color,
                active: foreColorConfig.value.active,
                disabled: foreColorConfig.value.disabled,
                hideScroll: "",
                ref_key: "foreColorRef",
                ref: foreColorRef
              }, {
                layer: withCtx(({ options }) => [
                  createVNode(Colors, {
                    tooltip: _ctx.config.tooltip,
                    color: _ctx.color,
                    value: foreColorConfig.value.value,
                    onChange: setForeColor,
                    data: options
                  }, null, 8, ["tooltip", "color", "value", "data"])
                ]),
                default: withCtx(() => [
                  createVNode(Icon, { value: "font-color" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "select-config", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              backColorConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 16,
                name: "backColor",
                type: "select",
                title: unref($editTrans)("backColor"),
                tooltip: _ctx.config.tooltip,
                "select-config": backColorConfig.value.selectConfig,
                leftBorder: backColorConfig.value.leftBorder,
                rightBorder: backColorConfig.value.rightBorder,
                color: _ctx.color,
                active: backColorConfig.value.active,
                disabled: backColorConfig.value.disabled,
                hideScroll: "",
                ref_key: "backColorRef",
                ref: backColorRef
              }, {
                layer: withCtx(({ options }) => [
                  createVNode(Colors, {
                    tooltip: _ctx.config.tooltip,
                    color: _ctx.color,
                    value: backColorConfig.value.value,
                    onChange: setBackColor,
                    data: options
                  }, null, 8, ["tooltip", "color", "value", "data"])
                ]),
                default: withCtx(() => [
                  createVNode(Icon, { value: "brush" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "select-config", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true),
              formatClearConfig.value.show ? (openBlock(), createBlock(Button, {
                key: 17,
                name: "formatClear",
                title: unref($editTrans)("formatClear"),
                tooltip: _ctx.config.tooltip,
                leftBorder: formatClearConfig.value.leftBorder,
                rightBorder: formatClearConfig.value.rightBorder,
                color: _ctx.color,
                active: formatClearConfig.value.active,
                disabled: formatClearConfig.value.disabled,
                onOperate: clearFormat
              }, {
                default: withCtx(() => [
                  createVNode(Icon, { value: "format-clear" })
                ]),
                _: 1
              }, 8, ["title", "tooltip", "leftBorder", "rightBorder", "color", "active", "disabled"])) : createCommentVNode("", true)
            ], 64)) : createCommentVNode("", true)
          ], 4)
        ]),
        _: 1
      }, 8, ["modelValue", "node", "useRange"]);
    };
  }
});
const Toolbar = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-357be052"]]);
const InsertLinkProps = {
  //主题色
  color: {
    type: String,
    default: ""
  },
  //预置的链接文本值
  text: {
    type: String,
    default: ""
  }
};
const _hoisted_1$6 = { class: "editify-link" };
const _hoisted_2$5 = { class: "editify-link-label" };
const _hoisted_3$5 = ["placeholder"];
const _hoisted_4$5 = ["placeholder"];
const _hoisted_5$4 = { class: "editify-link-footer" };
const _hoisted_6$4 = { class: "editify-link-operations" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...{
    name: "InsertLink"
  },
  __name: "insertLink",
  props: InsertLinkProps,
  emits: ["insert"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const $editTrans = inject("$editTrans");
    const linkUrl = ref("");
    const linkText = ref("");
    const newOpen = ref(false);
    watch(
      () => props.text,
      (newVal) => {
        linkText.value = newVal;
      },
      {
        immediate: true
      }
    );
    const handleInputFocus = (e) => {
      if (props.color) {
        e.currentTarget.style.borderColor = props.color;
      }
    };
    const handleInputBlur = (e) => {
      e.currentTarget.style.borderColor = "";
    };
    const insertLink2 = () => {
      emits("insert", linkText.value, linkUrl.value, newOpen.value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createElementVNode("div", _hoisted_2$5, toDisplayString(unref($editTrans)("linkAddress")), 1),
        withDirectives(createElementVNode("input", {
          onFocus: handleInputFocus,
          onBlur: handleInputBlur,
          placeholder: unref($editTrans)("linkTextEnterPlaceholder"),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => linkText.value = $event),
          type: "text"
        }, null, 40, _hoisted_3$5), [
          [
            vModelText,
            linkText.value,
            void 0,
            { trim: true }
          ]
        ]),
        withDirectives(createElementVNode("input", {
          onFocus: handleInputFocus,
          onBlur: handleInputBlur,
          placeholder: unref($editTrans)("linkUrlEnterPlaceholder"),
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => linkUrl.value = $event),
          type: "url"
        }, null, 40, _hoisted_4$5), [
          [
            vModelText,
            linkUrl.value,
            void 0,
            { trim: true }
          ]
        ]),
        createElementVNode("div", _hoisted_5$4, [
          createVNode(Checkbox, {
            modelValue: newOpen.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => newOpen.value = $event),
            label: unref($editTrans)("newWindowOpen"),
            color: _ctx.color,
            size: 10
          }, null, 8, ["modelValue", "label", "color"]),
          createElementVNode("div", _hoisted_6$4, [
            createElementVNode("span", {
              style: normalizeStyle({ color: _ctx.color || "" }),
              onClick: insertLink2
            }, toDisplayString(unref($editTrans)("insertLink")), 5)
          ])
        ])
      ]);
    };
  }
});
const InsertLink = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-9f80e392"]]);
const InsertImageProps = {
  //主题色
  color: {
    type: String,
    default: ""
  },
  //支持的图片类型数组
  allowedFileType: {
    type: Array,
    default: null
  },
  //是否支持多选
  multiple: {
    type: Boolean,
    default: false
  },
  //单个文件最大值
  maxSize: {
    type: Number,
    default: null
  },
  //单个文件最小值
  minSize: {
    type: Number,
    default: null
  },
  //是否自定义上传图片
  customUpload: {
    type: Function,
    default: null
  },
  //处理上传图片异常
  handleError: {
    type: Function,
    default: null
  }
};
const _hoisted_1$5 = { class: "editify-image" };
const _hoisted_2$4 = { class: "editify-image-header" };
const _hoisted_3$4 = {
  key: 0,
  class: "editify-image-remote"
};
const _hoisted_4$4 = ["placeholder"];
const _hoisted_5$3 = {
  key: 1,
  class: "editify-image-upload"
};
const _hoisted_6$3 = ["multiple"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...{
    name: "InsertImage"
  },
  __name: "insertImage",
  props: InsertImageProps,
  emits: ["change", "insert"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const $editTrans = inject("$editTrans");
    const current = ref("upload");
    const remoteUrl = ref("");
    const activeStyle = computed(() => {
      return (name) => {
        if (current.value == name) {
          return {
            color: props.color
          };
        }
        return {};
      };
    });
    const getSuffix = (file2) => {
      const index = file2.name.lastIndexOf(".");
      if (index <= 0) {
        return "";
      }
      return file2.name.substring(index + 1);
    };
    const handleInputFocus = (e) => {
      if (props.color) {
        e.currentTarget.style.borderColor = props.color;
      }
    };
    const handleInputBlur = (e) => {
      e.currentTarget.style.borderColor = "";
    };
    const insertRemoteImage = () => {
      emits("insert", [remoteUrl.value]);
    };
    const selectFile = async (e) => {
      const inputEle = e.currentTarget;
      const files = inputEle.files;
      if (!files || !files.length) {
        return;
      }
      let filterFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file2 = files[i];
        const suffix = getSuffix(file2);
        const isMatch = props.allowedFileType && Array.isArray(props.allowedFileType) && props.allowedFileType.length ? props.allowedFileType.some((item) => {
          return item.toLocaleLowerCase() == suffix.toLocaleLowerCase();
        }) : true;
        if (!isMatch) {
          if (typeof props.handleError == "function") {
            props.handleError("suffixError", file2);
          }
          continue;
        }
        if (props.maxSize && file2.size / 1024 > props.maxSize) {
          if (typeof props.handleError == "function") {
            props.handleError("maxSizeError", file2);
          }
          continue;
        }
        if (props.minSize && file2.size / 1024 < props.minSize) {
          if (typeof props.handleError == "function") {
            props.handleError("minSizeError", file2);
          }
          continue;
        }
        filterFiles.push(file2);
      }
      if (filterFiles.length) {
        let urls = [];
        if (typeof props.customUpload == "function") {
          urls = await props.customUpload(filterFiles) || [];
        } else {
          for (let i = 0; i < filterFiles.length; i++) {
            const url = await file.dataFileToBase64(filterFiles[i]);
            urls.push(url);
          }
        }
        emits("insert", urls);
      }
      inputEle.value = "";
    };
    watch(
      () => current.value,
      () => {
        emits("change");
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createElementVNode("div", _hoisted_2$4, [
          createElementVNode("div", {
            onClick: _cache[0] || (_cache[0] = ($event) => current.value = "upload"),
            class: normalizeClass(["editify-image-header-item", { "editify-active": current.value == "upload" }]),
            style: normalizeStyle(activeStyle.value("upload"))
          }, toDisplayString(unref($editTrans)("uploadImage")), 7),
          createElementVNode("div", {
            onClick: _cache[1] || (_cache[1] = ($event) => current.value = "remote"),
            class: normalizeClass(["editify-image-header-item", { "editify-active": current.value == "remote" }]),
            style: normalizeStyle(activeStyle.value("remote"))
          }, toDisplayString(unref($editTrans)("remoteImage")), 7),
          createElementVNode("div", {
            class: normalizeClass(["editify-image-header-slider", "editify-" + current.value]),
            style: normalizeStyle({ backgroundColor: _ctx.color || "" })
          }, null, 6)
        ]),
        current.value == "remote" ? (openBlock(), createElementBlock("div", _hoisted_3$4, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => remoteUrl.value = $event),
            placeholder: unref($editTrans)("imageUrlPlaceholder"),
            onBlur: handleInputBlur,
            onFocus: handleInputFocus
          }, null, 40, _hoisted_4$4), [
            [
              vModelText,
              remoteUrl.value,
              void 0,
              { trim: true }
            ]
          ]),
          createElementVNode("div", {
            class: "editify-image-remote-footer",
            style: normalizeStyle({ color: _ctx.color || "" })
          }, [
            createElementVNode("span", { onClick: insertRemoteImage }, toDisplayString(unref($editTrans)("insert")), 1)
          ], 4)
        ])) : (openBlock(), createElementBlock("div", _hoisted_5$3, [
          createVNode(Icon, { value: "upload" }),
          createElementVNode("input", {
            multiple: _ctx.multiple,
            accept: "image/*",
            onChange: selectFile,
            type: "file"
          }, null, 40, _hoisted_6$3)
        ]))
      ]);
    };
  }
});
const InsertImage = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-b63a5bff"]]);
const InsertVideoProps = {
  //主题色
  color: {
    type: String,
    default: ""
  },
  //支持的视频类型数组
  allowedFileType: {
    type: Array,
    default: null
  },
  //是否支持多选
  multiple: {
    type: Boolean,
    default: false
  },
  //单个文件最大值
  maxSize: {
    type: Number,
    default: null
  },
  //单个文件最小值
  minSize: {
    type: Number,
    default: null
  },
  //是否自定义上传视频
  customUpload: {
    type: Function,
    default: null
  },
  //处理上传视频异常
  handleError: {
    type: Function,
    default: null
  }
};
const _hoisted_1$4 = { class: "editify-video" };
const _hoisted_2$3 = { class: "editify-video-header" };
const _hoisted_3$3 = {
  key: 0,
  class: "editify-video-remote"
};
const _hoisted_4$3 = ["placeholder"];
const _hoisted_5$2 = {
  key: 1,
  class: "editify-video-upload"
};
const _hoisted_6$2 = ["multiple"];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{
    name: "InsertVideo"
  },
  __name: "insertVideo",
  props: InsertVideoProps,
  emits: ["change", "insert"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const $editTrans = inject("$editTrans");
    const current = ref("upload");
    const remoteUrl = ref("");
    const activeStyle = computed(() => {
      return (name) => {
        if (current.value == name) {
          return {
            color: props.color
          };
        }
        return {};
      };
    });
    const getSuffix = (file2) => {
      const index = file2.name.lastIndexOf(".");
      if (index <= 0) {
        return "";
      }
      return file2.name.substring(index + 1);
    };
    const handleInputFocus = (e) => {
      if (props.color) {
        e.currentTarget.style.borderColor = props.color;
      }
    };
    const handleInputBlur = (e) => {
      e.currentTarget.style.borderColor = "";
    };
    const insertRemoteVideo = () => {
      emits("insert", [remoteUrl.value]);
    };
    const selectFile = async (e) => {
      const inputEle = e.currentTarget;
      const files = inputEle.files;
      if (!files || !files.length) {
        return;
      }
      let filterFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file2 = files[i];
        const suffix = getSuffix(file2);
        const isMatch = props.allowedFileType && Array.isArray(props.allowedFileType) && props.allowedFileType.length ? props.allowedFileType.some((item) => {
          return item.toLocaleLowerCase() == suffix.toLocaleLowerCase();
        }) : true;
        if (!isMatch) {
          if (typeof props.handleError == "function") {
            props.handleError("suffixError", file2);
          }
          continue;
        }
        if (props.maxSize && file2.size / 1024 > props.maxSize) {
          if (typeof props.handleError == "function") {
            props.handleError("maxSizeError", file2);
          }
          continue;
        }
        if (props.minSize && file2.size / 1024 < props.minSize) {
          if (typeof props.handleError == "function") {
            props.handleError("minSizeError", file2);
          }
          continue;
        }
        filterFiles.push(file2);
      }
      if (filterFiles.length) {
        let urls = [];
        if (typeof props.customUpload == "function") {
          urls = await props.customUpload(filterFiles) || [];
        } else {
          for (let i = 0; i < filterFiles.length; i++) {
            const url = await file.dataFileToBase64(filterFiles[i]);
            urls.push(url);
          }
        }
        emits("insert", urls);
      }
      inputEle.value = "";
    };
    watch(
      () => current.value,
      () => {
        emits("change");
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createElementVNode("div", _hoisted_2$3, [
          createElementVNode("div", {
            onClick: _cache[0] || (_cache[0] = ($event) => current.value = "upload"),
            class: normalizeClass(["editify-video-header-item", { "editify-active": current.value == "upload" }]),
            style: normalizeStyle(activeStyle.value("upload"))
          }, toDisplayString(unref($editTrans)("uploadVideo")), 7),
          createElementVNode("div", {
            onClick: _cache[1] || (_cache[1] = ($event) => current.value = "remote"),
            class: normalizeClass(["editify-video-header-item", { "editify-active": current.value == "remote" }]),
            style: normalizeStyle(activeStyle.value("remote"))
          }, toDisplayString(unref($editTrans)("remoteVideo")), 7),
          createElementVNode("div", {
            class: normalizeClass(["editify-video-header-slider", "editify-" + current.value]),
            style: normalizeStyle({ backgroundColor: _ctx.color || "" })
          }, null, 6)
        ]),
        current.value == "remote" ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => remoteUrl.value = $event),
            placeholder: unref($editTrans)("videoUrlPlaceholder"),
            onBlur: handleInputBlur,
            onFocus: handleInputFocus
          }, null, 40, _hoisted_4$3), [
            [
              vModelText,
              remoteUrl.value,
              void 0,
              { trim: true }
            ]
          ]),
          createElementVNode("div", {
            class: "editify-video-remote-footer",
            style: normalizeStyle({ color: _ctx.color || "" })
          }, [
            createElementVNode("span", { onClick: insertRemoteVideo }, toDisplayString(unref($editTrans)("insert")), 1)
          ], 4)
        ])) : (openBlock(), createElementBlock("div", _hoisted_5$2, [
          createVNode(Icon, { value: "upload" }),
          createElementVNode("input", {
            multiple: _ctx.multiple,
            accept: "video/*",
            onChange: selectFile,
            type: "file"
          }, null, 40, _hoisted_6$2)
        ]))
      ]);
    };
  }
});
const InsertVideo = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-4383bae9"]]);
const InsertTableProps = {
  //主题色
  color: {
    type: String,
    default: ""
  },
  //最大行数
  maxRows: {
    type: Number,
    default: 10
  },
  //最大列数
  maxColumns: {
    type: Number,
    default: 10
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-9a40c4f5"), n = n(), popScopeId(), n);
const _hoisted_1$3 = { class: "editify-table" };
const _hoisted_2$2 = ["onMouseenter", "onClick"];
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, null, -1));
const _hoisted_4$2 = [
  _hoisted_3$2
];
const _hoisted_5$1 = { class: "editify-table-footer" };
const _hoisted_6$1 = { key: 0 };
const _hoisted_7$1 = { key: 1 };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    name: "InsertTable"
  },
  __name: "insertTable",
  props: InsertTableProps,
  emits: ["insert"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const $editTrans = inject("$editTrans");
    const getTableGrids = () => {
      const grids = [];
      for (let i = 1; i <= props.maxRows; i++) {
        let row = [];
        for (let j = 1; j <= props.maxColumns; j++) {
          row.push({
            x: i,
            y: j,
            inside: false
            //是否被选中
          });
        }
        grids.push(row);
      }
      return grids;
    };
    const tableGrids = ref(getTableGrids());
    const specification = computed(() => {
      return tableGrids.value.flat().filter((item) => {
        return item.inside;
      }).sort((a, b) => {
        if (a.x > b.x && a.y > b.y) {
          return -1;
        }
        if (a.x > b.x) {
          return -1;
        }
        if (a.y > b.y) {
          return -1;
        }
        return 1;
      })[0];
    });
    const changeTableSize = (data2) => {
      for (let i in tableGrids.value) {
        const grid = tableGrids.value[i];
        for (let j in grid) {
          if (grid[j].x <= data2.x && grid[j].y <= data2.y) {
            tableGrids.value[i][j].inside = true;
          } else {
            tableGrids.value[i][j].inside = false;
          }
        }
      }
    };
    const createTable = (data2) => {
      emits("insert", data2.x, data2.y);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createElementVNode("table", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(tableGrids.value, (row) => {
            return openBlock(), createElementBlock("tr", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(row, (column) => {
                return openBlock(), createElementBlock("td", {
                  class: normalizeClass({ "editify-inside": column.inside }),
                  onMouseenter: ($event) => changeTableSize(column),
                  onClick: ($event) => createTable(column)
                }, _hoisted_4$2, 42, _hoisted_2$2);
              }), 256))
            ]);
          }), 256))
        ]),
        createElementVNode("div", _hoisted_5$1, [
          specification.value ? (openBlock(), createElementBlock("span", _hoisted_6$1, toDisplayString(specification.value.x) + " x " + toDisplayString(specification.value.y), 1)) : (openBlock(), createElementBlock("span", _hoisted_7$1, toDisplayString(unref($editTrans)("insertTable")), 1))
        ])
      ]);
    };
  }
});
const InsertTable = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-9a40c4f5"]]);
const MenuProps = {
  //菜单栏配置
  config: {
    type: Object,
    default: null
  },
  //主题色
  color: {
    type: String,
    default: ""
  }
};
const _hoisted_1$2 = ["data-editify-mode"];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: "Menu"
  },
  __name: "menu",
  props: MenuProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const $editTrans = inject("$editTrans");
    const editify = inject("editify");
    const isSourceView = inject("isSourceView");
    const isFullScreen = inject("isFullScreen");
    const canUseMenu = inject("canUseMenu");
    const editor = inject("editor");
    const dataRangeCaches = inject("dataRangeCaches");
    const showBorder = inject("showBorder");
    const pluginResultList = inject("pluginResultList");
    const undoConfig = ref({
      show: props.config.undo.show,
      leftBorder: props.config.undo.leftBorder,
      rightBorder: props.config.undo.rightBorder,
      active: false,
      disabled: false
    });
    const redoConfig = ref({
      show: props.config.redo.show,
      leftBorder: props.config.redo.leftBorder,
      rightBorder: props.config.redo.rightBorder,
      active: false,
      disabled: false
    });
    const headingConfig = ref({
      show: props.config.heading.show,
      displayConfig: {
        options: props.config.heading.options,
        value: "",
        width: props.config.heading.width,
        maxHeight: props.config.heading.maxHeight
      },
      defaultValue: props.config.heading.defaultValue,
      leftBorder: props.config.heading.leftBorder,
      rightBorder: props.config.heading.rightBorder,
      active: false,
      disabled: false
    });
    const indentConfig = ref({
      show: props.config.indent.show,
      selectConfig: {
        options: props.config.indent.options,
        value: "",
        width: props.config.indent.width,
        maxHeight: props.config.indent.maxHeight
      },
      leftBorder: props.config.indent.leftBorder,
      rightBorder: props.config.indent.rightBorder,
      active: false,
      disabled: false
    });
    const quoteConfig = ref({
      show: props.config.quote.show,
      leftBorder: props.config.quote.leftBorder,
      rightBorder: props.config.quote.rightBorder,
      active: false,
      disabled: false
    });
    const alignConfig = ref({
      show: props.config.align.show,
      selectConfig: {
        options: props.config.align.options,
        width: props.config.align.width,
        maxHeight: props.config.align.maxHeight
      },
      leftBorder: props.config.align.leftBorder,
      rightBorder: props.config.align.rightBorder,
      active: false,
      disabled: false
    });
    const orderListConfig = ref({
      show: props.config.orderList.show,
      leftBorder: props.config.orderList.leftBorder,
      rightBorder: props.config.orderList.rightBorder,
      active: false,
      disabled: false
    });
    const unorderListConfig = ref({
      show: props.config.unorderList.show,
      leftBorder: props.config.unorderList.leftBorder,
      rightBorder: props.config.unorderList.rightBorder,
      active: false,
      disabled: false
    });
    const taskConfig = ref({
      show: props.config.task.show,
      leftBorder: props.config.task.leftBorder,
      rightBorder: props.config.task.rightBorder,
      active: false,
      disabled: false
    });
    const boldConfig = ref({
      show: props.config.bold.show,
      leftBorder: props.config.bold.leftBorder,
      rightBorder: props.config.bold.rightBorder,
      active: false,
      disabled: false
    });
    const underlineConfig = ref({
      show: props.config.underline.show,
      leftBorder: props.config.underline.leftBorder,
      rightBorder: props.config.underline.rightBorder,
      active: false,
      disabled: false
    });
    const italicConfig = ref({
      show: props.config.italic.show,
      leftBorder: props.config.italic.leftBorder,
      rightBorder: props.config.italic.rightBorder,
      active: false,
      disabled: false
    });
    const strikethroughConfig = ref({
      show: props.config.strikethrough.show,
      leftBorder: props.config.strikethrough.leftBorder,
      rightBorder: props.config.strikethrough.rightBorder,
      active: false,
      disabled: false
    });
    const codeConfig = ref({
      show: props.config.code.show,
      leftBorder: props.config.code.leftBorder,
      rightBorder: props.config.code.rightBorder,
      active: false,
      disabled: false
    });
    const superConfig = ref({
      show: props.config.super.show,
      leftBorder: props.config.super.leftBorder,
      rightBorder: props.config.super.rightBorder,
      active: false,
      disabled: false
    });
    const subConfig = ref({
      show: props.config.sub.show,
      leftBorder: props.config.sub.leftBorder,
      rightBorder: props.config.sub.rightBorder,
      active: false,
      disabled: false
    });
    const formatClearConfig = ref({
      show: props.config.formatClear.show,
      leftBorder: props.config.formatClear.leftBorder,
      rightBorder: props.config.formatClear.rightBorder,
      active: false,
      disabled: false
    });
    const fontSizeConfig = ref({
      show: props.config.fontSize.show,
      displayConfig: {
        options: props.config.fontSize.options,
        value: "",
        width: props.config.fontSize.width,
        maxHeight: props.config.fontSize.maxHeight
      },
      defaultValue: props.config.fontSize.defaultValue,
      leftBorder: props.config.fontSize.leftBorder,
      rightBorder: props.config.fontSize.rightBorder,
      active: false,
      disabled: false
    });
    const fontFamilyConfig = ref({
      show: props.config.fontFamily.show,
      displayConfig: {
        options: props.config.fontFamily.options,
        value: "",
        width: props.config.fontFamily.width,
        maxHeight: props.config.fontFamily.maxHeight
      },
      defaultValue: props.config.fontFamily.defaultValue,
      leftBorder: props.config.fontFamily.leftBorder,
      rightBorder: props.config.fontFamily.rightBorder,
      active: false,
      disabled: false
    });
    const lineHeightConfig = ref({
      show: props.config.lineHeight.show,
      displayConfig: {
        options: props.config.lineHeight.options,
        value: "",
        width: props.config.lineHeight.width,
        maxHeight: props.config.lineHeight.maxHeight
      },
      defaultValue: props.config.lineHeight.defaultValue,
      leftBorder: props.config.lineHeight.leftBorder,
      rightBorder: props.config.lineHeight.rightBorder,
      active: false,
      disabled: false
    });
    const foreColorConfig = ref({
      show: props.config.foreColor.show,
      selectConfig: {
        options: props.config.foreColor.options
      },
      leftBorder: props.config.foreColor.leftBorder,
      rightBorder: props.config.foreColor.rightBorder,
      value: "",
      //选择的颜色值
      active: false,
      disabled: false
    });
    const backColorConfig = ref({
      show: props.config.backColor.show,
      selectConfig: {
        options: props.config.backColor.options
      },
      leftBorder: props.config.backColor.leftBorder,
      rightBorder: props.config.backColor.rightBorder,
      value: "",
      //选择的颜色值
      active: false,
      disabled: false
    });
    const linkConfig = ref({
      show: props.config.link.show,
      leftBorder: props.config.link.leftBorder,
      rightBorder: props.config.link.rightBorder,
      active: false,
      disabled: false,
      text: ""
      //链接的文本
    });
    const imageConfig = ref({
      show: props.config.image.show,
      leftBorder: props.config.image.leftBorder,
      rightBorder: props.config.image.rightBorder,
      active: false,
      disabled: false,
      allowedFileType: props.config.image.allowedFileType,
      multiple: props.config.image.multiple,
      maxSize: props.config.image.maxSize,
      minSize: props.config.image.minSize,
      handleError: props.config.image.handleError,
      customUpload: props.config.image.customUpload
    });
    const videoConfig = ref({
      show: props.config.video.show,
      leftBorder: props.config.video.leftBorder,
      rightBorder: props.config.video.rightBorder,
      active: false,
      disabled: false,
      allowedFileType: props.config.video.allowedFileType,
      multiple: props.config.video.multiple,
      maxSize: props.config.video.maxSize,
      minSize: props.config.video.minSize,
      handleError: props.config.video.handleError,
      customUpload: props.config.video.customUpload
    });
    const tableConfig = ref({
      show: props.config.table.show,
      leftBorder: props.config.table.leftBorder,
      rightBorder: props.config.table.rightBorder,
      active: false,
      disabled: false,
      maxRows: props.config.table.maxRows,
      maxColumns: props.config.table.maxColumns
    });
    const codeBlockConfig = ref({
      show: props.config.codeBlock.show,
      leftBorder: props.config.codeBlock.leftBorder,
      rightBorder: props.config.codeBlock.rightBorder,
      active: false,
      disabled: false
    });
    const sourceViewConfig = ref({
      show: props.config.sourceView.show,
      leftBorder: props.config.sourceView.leftBorder,
      rightBorder: props.config.sourceView.rightBorder,
      active: false,
      disabled: false
    });
    const fullScreenConfig = ref({
      show: props.config.fullScreen.show,
      leftBorder: props.config.fullScreen.leftBorder,
      rightBorder: props.config.fullScreen.rightBorder,
      active: false,
      disabled: false
    });
    const disabled = computed(() => {
      return editify.props.disabled || !canUseMenu.value;
    });
    const menuNames = computed(() => {
      let pluginSequence = {};
      pluginResultList.value.forEach((pluginResult) => {
        if (pluginResult.menu) {
          pluginSequence[pluginResult.name] = pluginResult.menu.sequence;
        }
      });
      pluginSequence = mergeObject(pluginSequence, props.config.sequence);
      return Object.keys(pluginSequence).sort((a, b) => {
        if (pluginSequence[a] > pluginSequence[b]) {
          return 1;
        }
        return -1;
      });
    });
    const menuDisabled = computed(() => {
      return (name) => {
        if (name == "sourceView" || name == "fullScreen") {
          return false;
        }
        return isSourceView.value;
      };
    });
    const menuMode = computed(() => {
      if (isFullScreen.value || editify.props.autoheight) {
        if (props.config.mode == "fixed") {
          return "default";
        }
      }
      return props.config.mode;
    });
    const menuShowBorder = computed(() => {
      if (menuMode.value == "fixed") {
        return false;
      }
      return showBorder.value;
    });
    const menuExtends = computed(() => {
      let pluginExtends = {};
      pluginResultList.value.forEach((pluginResult) => {
        if (pluginResult.menu) {
          pluginExtends[pluginResult.name] = pluginResult.menu.extend;
        }
      });
      return mergeObject(pluginExtends, props.config.extends);
    });
    const handleOperate = (name, val) => {
      if (disabled.value) {
        return;
      }
      if (!editor.value.range) {
        return;
      }
      if (name == "undo") {
        editify.exposed.undo();
      } else if (name == "redo") {
        editify.exposed.redo();
      } else if (name == "heading") {
        setHeading(editor.value, dataRangeCaches.value, $editTrans, val);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "indent") {
        if (val == "indent-increase") {
          setIndentIncrease(editor.value, dataRangeCaches.value);
        } else if (val == "indent-decrease") {
          setIndentDecrease(editor.value, dataRangeCaches.value);
        }
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "quote") {
        setQuote(editor.value, dataRangeCaches.value);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "align") {
        setAlign(editor.value, dataRangeCaches.value, val);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "orderList") {
        setList(editor.value, dataRangeCaches.value, true);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "unorderList") {
        setList(editor.value, dataRangeCaches.value, false);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "task") {
        setTask(editor.value, dataRangeCaches.value);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "bold") {
        if (queryTextStyle(editor.value, dataRangeCaches.value, "font-weight", "bold") || queryTextStyle(editor.value, dataRangeCaches.value, "font-weight", "700")) {
          removeTextStyle(editor.value, dataRangeCaches.value, ["font-weight"]);
        } else {
          setTextStyle(editor.value, dataRangeCaches.value, {
            "font-weight": "bold"
          });
        }
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "underline") {
        if (queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration", "underline") || queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration-line", "underline")) {
          removeTextStyle(editor.value, dataRangeCaches.value, ["text-decoration", "text-decoration-line"]);
        } else {
          setTextStyle(editor.value, dataRangeCaches.value, {
            "text-decoration": "underline"
          });
        }
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "italic") {
        if (queryTextStyle(editor.value, dataRangeCaches.value, "font-style", "italic")) {
          removeTextStyle(editor.value, dataRangeCaches.value, ["font-style"]);
        } else {
          setTextStyle(editor.value, dataRangeCaches.value, {
            "font-style": "italic"
          });
        }
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "strikethrough") {
        if (queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration", "line-through") || queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration-line", "line-through")) {
          removeTextStyle(editor.value, dataRangeCaches.value, ["text-decoration", "text-decoration-line"]);
        } else {
          setTextStyle(editor.value, dataRangeCaches.value, {
            "text-decoration": "line-through"
          });
        }
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "code") {
        if (queryTextMark(editor.value, dataRangeCaches.value, "data-editify-code")) {
          removeTextMark(editor.value, dataRangeCaches.value, ["data-editify-code"]);
        } else {
          setTextMark(editor.value, dataRangeCaches.value, {
            "data-editify-code": true
          });
        }
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "super") {
        if (queryTextStyle(editor.value, dataRangeCaches.value, "vertical-align", "super")) {
          removeTextStyle(editor.value, dataRangeCaches.value, ["vertical-align"]);
        } else {
          setTextStyle(editor.value, dataRangeCaches.value, {
            "vertical-align": "super"
          });
        }
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "sub") {
        if (queryTextStyle(editor.value, dataRangeCaches.value, "vertical-align", "sub")) {
          removeTextStyle(editor.value, dataRangeCaches.value, ["vertical-align"]);
        } else {
          setTextStyle(editor.value, dataRangeCaches.value, {
            "vertical-align": "sub"
          });
        }
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "formatClear") {
        removeTextStyle(editor.value, dataRangeCaches.value);
        removeTextMark(editor.value, dataRangeCaches.value);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "fontSize") {
        setTextStyle(editor.value, dataRangeCaches.value, {
          "font-size": val
        });
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "fontFamily") {
        setTextStyle(editor.value, dataRangeCaches.value, {
          "font-family": val
        });
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "lineHeight") {
        setLineHeight(editor.value, dataRangeCaches.value, val);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "foreColor") {
        setTextStyle(editor.value, dataRangeCaches.value, {
          color: val
        });
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "backColor") {
        setTextStyle(editor.value, dataRangeCaches.value, {
          "background-color": val
        });
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "link") {
        if (!val.url) {
          return;
        }
        insertLink(editor.value, val.text, val.url, val.newOpen);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "image") {
        if (!val) {
          return;
        }
        const urls = val.filter((url) => {
          return !!url;
        });
        if (urls.length == 0) {
          return;
        }
        urls.forEach((url) => {
          insertImage(editor.value, url);
        });
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "video") {
        if (!val) {
          return;
        }
        const urls = val.filter((url) => {
          return !!url;
        });
        if (urls.length == 0) {
          return;
        }
        urls.forEach((url) => {
          insertVideo(editor.value, url);
        });
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "table") {
        insertTable(editor.value, val.row, val.column);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "codeBlock") {
        insertCodeBlock(editor.value, dataRangeCaches.value);
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      } else if (name == "sourceView") {
        isSourceView.value = !isSourceView.value;
        sourceViewConfig.value.active = isSourceView.value;
        if (!isSourceView.value) {
          editor.value.rangeRender();
        }
      } else if (name == "fullScreen") {
        isFullScreen.value = !isFullScreen.value;
        fullScreenConfig.value.active = isFullScreen.value;
        editor.value.rangeRender();
      }
    };
    const handleRangeUpdate = () => {
      const value_hasPreInRange = hasPreInRange(editor.value, dataRangeCaches.value);
      const value_hasTableInRange = hasTableInRange(editor.value, dataRangeCaches.value);
      const value_hasQuoteInRange = hasQuoteInRange(editor.value, dataRangeCaches.value);
      const value_isRangeInQuote = isRangeInQuote(editor.value, dataRangeCaches.value);
      const value_hasLinkInRange = hasLinkInRange(editor.value, dataRangeCaches.value);
      const value_isRangeInOrderList = isRangeInList(editor.value, dataRangeCaches.value, true);
      const value_isRangeInUnorderList = isRangeInList(editor.value, dataRangeCaches.value, false);
      const value_isRangeInTask = isRangeInTask(editor.value, dataRangeCaches.value);
      const value_hasImageInRange = hasImageInRange(editor.value, dataRangeCaches.value);
      const value_hasVideoInRange = hasVideoInRange(editor.value, dataRangeCaches.value);
      const extraDisabled = (name) => {
        let pluginDisabled = false;
        let length = pluginResultList.value.length;
        for (let i = 0; i < length; i++) {
          const pluginResult = pluginResultList.value[i];
          if (pluginResult.menu && typeof pluginResult.menu.extraDisabled == "function") {
            pluginDisabled = pluginResult.menu.extraDisabled(name);
            if (pluginDisabled) {
              break;
            }
          }
        }
        if (typeof props.config.extraDisabled == "function") {
          return props.config.extraDisabled(name) || pluginDisabled || false;
        }
        return pluginDisabled || false;
      };
      undoConfig.value.disabled = !editor.value.history.get(-1) || extraDisabled("undo");
      redoConfig.value.disabled = !editor.value.history.get(1) || extraDisabled("redo");
      const findHeadingItem = headingConfig.value.displayConfig.options.find((item) => {
        let val = item;
        if (common.isObject(item)) {
          val = item.value;
        }
        if (editor.value.range.anchor.isEqual(editor.value.range.focus)) {
          return editor.value.range.anchor.element.getBlock().parsedom == val;
        }
        return dataRangeCaches.value.list.every((el) => {
          if (el.element.isBlock()) {
            return el.element.parsedom == val;
          }
          return el.element.getBlock().parsedom == val;
        });
      });
      headingConfig.value.displayConfig.value = findHeadingItem ? common.isObject(findHeadingItem) ? findHeadingItem.value : findHeadingItem : headingConfig.value.defaultValue;
      headingConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled("heading");
      indentConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled("indent");
      quoteConfig.value.active = value_isRangeInQuote;
      quoteConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled("quote");
      alignConfig.value.disabled = value_hasPreInRange || extraDisabled("align");
      orderListConfig.value.active = value_isRangeInOrderList;
      orderListConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled("orderList");
      unorderListConfig.value.active = value_isRangeInUnorderList;
      unorderListConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled("unorderList");
      taskConfig.value.active = value_isRangeInTask;
      taskConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || extraDisabled("task");
      boldConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "font-weight", "bold") || queryTextStyle(editor.value, dataRangeCaches.value, "font-weight", "700");
      boldConfig.value.disabled = value_hasPreInRange || extraDisabled("bold");
      underlineConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration", "underline") || queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration-line", "underline");
      underlineConfig.value.disabled = value_hasPreInRange || extraDisabled("underline");
      italicConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "font-style", "italic");
      italicConfig.value.disabled = value_hasPreInRange || extraDisabled("italic");
      strikethroughConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration", "line-through") || queryTextStyle(editor.value, dataRangeCaches.value, "text-decoration-line", "line-through");
      strikethroughConfig.value.disabled = value_hasPreInRange || extraDisabled("strikethrough");
      codeConfig.value.active = queryTextMark(editor.value, dataRangeCaches.value, "data-editify-code");
      codeConfig.value.disabled = value_hasPreInRange || extraDisabled("code");
      superConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "vertical-align", "super");
      superConfig.value.disabled = value_hasPreInRange || extraDisabled("super");
      subConfig.value.active = queryTextStyle(editor.value, dataRangeCaches.value, "vertical-align", "sub");
      subConfig.value.disabled = value_hasPreInRange || extraDisabled("sub");
      formatClearConfig.value.disabled = value_hasPreInRange || extraDisabled("formatClear");
      const findFontItem = fontSizeConfig.value.displayConfig.options.find((item) => {
        if (common.isObject(item)) {
          return queryTextStyle(editor.value, dataRangeCaches.value, "font-size", item.value);
        }
        return queryTextStyle(editor.value, dataRangeCaches.value, "font-size", item);
      });
      fontSizeConfig.value.displayConfig.value = findFontItem ? common.isObject(findFontItem) ? findFontItem.value : findFontItem : fontSizeConfig.value.defaultValue;
      fontSizeConfig.value.disabled = value_hasPreInRange || extraDisabled("fontSize");
      const findFamilyItem = fontFamilyConfig.value.displayConfig.options.find((item) => {
        if (common.isObject(item)) {
          return queryTextStyle(editor.value, dataRangeCaches.value, "font-family", item.value);
        }
        return queryTextStyle(editor.value, dataRangeCaches.value, "font-family", item);
      });
      fontFamilyConfig.value.displayConfig.value = findFamilyItem ? common.isObject(findFamilyItem) ? findFamilyItem.value : findFamilyItem : fontFamilyConfig.value.defaultValue;
      fontFamilyConfig.value.disabled = value_hasPreInRange || extraDisabled("fontFamily");
      const findHeightItem = lineHeightConfig.value.displayConfig.options.find((item) => {
        let val = item;
        if (common.isObject(item)) {
          val = item.value;
        }
        if (editor.value.range.anchor.isEqual(editor.value.range.focus)) {
          const block = editor.value.range.anchor.element.getBlock();
          return block.hasStyles() && block.styles["line-height"] == val;
        }
        return dataRangeCaches.value.list.every((el) => {
          if (el.element.isBlock() || el.element.isInblock()) {
            return el.element.hasStyles() && el.element.styles["line-height"] == val;
          }
          const block = el.element.getBlock();
          const inblock = el.element.getInblock();
          if (inblock) {
            return inblock.hasStyles() && inblock.styles["line-height"] == val;
          }
          return block.hasStyles() && block.styles["line-height"] == val;
        });
      });
      lineHeightConfig.value.displayConfig.value = findHeightItem ? common.isObject(findHeightItem) ? findHeightItem.value : findHeightItem : lineHeightConfig.value.defaultValue;
      lineHeightConfig.value.disabled = value_hasPreInRange || extraDisabled("lineHeight");
      const findForeColorItem = foreColorConfig.value.selectConfig.options.find((item) => {
        if (common.isObject(item)) {
          return queryTextStyle(editor.value, dataRangeCaches.value, "color", item.value);
        }
        return queryTextStyle(editor.value, dataRangeCaches.value, "color", item);
      });
      foreColorConfig.value.value = findForeColorItem ? common.isObject(findForeColorItem) ? findForeColorItem.value : findForeColorItem : "";
      foreColorConfig.value.disabled = value_hasPreInRange || extraDisabled("foreColor");
      const findBackColorItem = backColorConfig.value.selectConfig.options.find((item) => {
        if (common.isObject(item)) {
          return queryTextStyle(editor.value, dataRangeCaches.value, "background-color", item.value);
        }
        return queryTextStyle(editor.value, dataRangeCaches.value, "background-color", item);
      });
      backColorConfig.value.value = findBackColorItem ? common.isObject(findBackColorItem) ? findBackColorItem.value : findBackColorItem : "";
      backColorConfig.value.disabled = value_hasPreInRange || extraDisabled("backColor");
      linkConfig.value.disabled = value_hasLinkInRange || value_hasPreInRange || extraDisabled("link");
      imageConfig.value.disabled = value_hasPreInRange || extraDisabled("image");
      videoConfig.value.disabled = value_hasPreInRange || extraDisabled("video");
      tableConfig.value.disabled = value_hasPreInRange || value_hasTableInRange || value_hasQuoteInRange || extraDisabled("table");
      codeBlockConfig.value.active = !!getCurrentParsedomElement(editor.value, dataRangeCaches.value, "pre");
      codeBlockConfig.value.disabled = value_hasTableInRange || value_hasQuoteInRange || value_hasImageInRange || value_hasVideoInRange || extraDisabled("codeBlock");
      sourceViewConfig.value.active = isSourceView.value;
      fullScreenConfig.value.active = isFullScreen.value;
    };
    const MenuItem = defineComponent(
      (selfProps) => {
        const itemInstance = getCurrentInstance();
        const itemProps = {
          tooltip: props.config.tooltip,
          name: selfProps.name
        };
        return () => {
          if (itemProps.name == "undo" && undoConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("undo"),
                leftBorder: undoConfig.value.leftBorder,
                rightBorder: undoConfig.value.rightBorder,
                disabled: undoConfig.value.disabled || selfProps.disabled || disabled.value,
                color: props.color,
                active: undoConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "undo" })
            );
          }
          if (itemProps.name == "redo" && redoConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("redo"),
                leftBorder: redoConfig.value.leftBorder,
                rightBorder: redoConfig.value.rightBorder,
                disabled: redoConfig.value.disabled || selfProps.disabled || disabled.value,
                color: props.color,
                active: redoConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "redo" })
            );
          }
          if (itemProps.name == "heading" && headingConfig.value.show) {
            return h(Button, {
              ...itemProps,
              type: "display",
              displayConfig: headingConfig.value.displayConfig,
              title: $editTrans("heading"),
              leftBorder: headingConfig.value.leftBorder,
              rightBorder: headingConfig.value.rightBorder,
              color: props.color,
              disabled: headingConfig.value.disabled || selfProps.disabled || disabled.value,
              active: headingConfig.value.active,
              onOperate: handleOperate
            });
          }
          if (itemProps.name == "indent" && indentConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                type: "select",
                selectConfig: indentConfig.value.selectConfig,
                title: $editTrans("indent"),
                leftBorder: indentConfig.value.leftBorder,
                rightBorder: indentConfig.value.rightBorder,
                color: props.color,
                disabled: indentConfig.value.disabled || selfProps.disabled || disabled.value,
                active: indentConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "indent-increase" })
            );
          }
          if (itemProps.name == "quote" && quoteConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("quote"),
                leftBorder: quoteConfig.value.leftBorder,
                rightBorder: quoteConfig.value.rightBorder,
                color: props.color,
                disabled: quoteConfig.value.disabled || selfProps.disabled || disabled.value,
                active: quoteConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "quote" })
            );
          }
          if (itemProps.name == "align" && alignConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                type: "select",
                selectConfig: alignConfig.value.selectConfig,
                title: $editTrans("align"),
                leftBorder: alignConfig.value.leftBorder,
                rightBorder: alignConfig.value.rightBorder,
                color: props.color,
                disabled: alignConfig.value.disabled || selfProps.disabled || disabled.value,
                active: alignConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "align-left" })
            );
          }
          if (itemProps.name == "orderList" && orderListConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("orderList"),
                leftBorder: orderListConfig.value.leftBorder,
                rightBorder: orderListConfig.value.rightBorder,
                color: props.color,
                disabled: orderListConfig.value.disabled || selfProps.disabled || disabled.value,
                active: orderListConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "list-ordered" })
            );
          }
          if (itemProps.name == "unorderList" && unorderListConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("unorderList"),
                leftBorder: unorderListConfig.value.leftBorder,
                rightBorder: unorderListConfig.value.rightBorder,
                color: props.color,
                disabled: unorderListConfig.value.disabled || selfProps.disabled || disabled.value,
                active: unorderListConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "list-unordered" })
            );
          }
          if (itemProps.name == "task" && taskConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("task"),
                leftBorder: taskConfig.value.leftBorder,
                rightBorder: taskConfig.value.rightBorder,
                color: props.color,
                disabled: taskConfig.value.disabled || selfProps.disabled || disabled.value,
                active: taskConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "task" })
            );
          }
          if (itemProps.name == "bold" && boldConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("bold"),
                leftBorder: boldConfig.value.leftBorder,
                rightBorder: boldConfig.value.rightBorder,
                color: props.color,
                disabled: boldConfig.value.disabled || selfProps.disabled || disabled.value,
                active: boldConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "bold" })
            );
          }
          if (itemProps.name == "underline" && underlineConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("underline"),
                leftBorder: underlineConfig.value.leftBorder,
                rightBorder: underlineConfig.value.rightBorder,
                color: props.color,
                disabled: underlineConfig.value.disabled || selfProps.disabled || disabled.value,
                active: underlineConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "underline" })
            );
          }
          if (itemProps.name == "italic" && italicConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("italic"),
                leftBorder: italicConfig.value.leftBorder,
                rightBorder: italicConfig.value.rightBorder,
                color: props.color,
                disabled: italicConfig.value.disabled || selfProps.disabled || disabled.value,
                active: italicConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "italic" })
            );
          }
          if (itemProps.name == "strikethrough" && strikethroughConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("strikethrough"),
                leftBorder: strikethroughConfig.value.leftBorder,
                rightBorder: strikethroughConfig.value.rightBorder,
                color: props.color,
                disabled: strikethroughConfig.value.disabled || selfProps.disabled || disabled.value,
                active: strikethroughConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "strikethrough" })
            );
          }
          if (itemProps.name == "code" && codeConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("code"),
                leftBorder: codeConfig.value.leftBorder,
                rightBorder: codeConfig.value.rightBorder,
                color: props.color,
                disabled: codeConfig.value.disabled || selfProps.disabled || disabled.value,
                active: codeConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "code" })
            );
          }
          if (itemProps.name == "super" && superConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("superscript"),
                leftBorder: superConfig.value.leftBorder,
                rightBorder: superConfig.value.rightBorder,
                color: props.color,
                disabled: superConfig.value.disabled || selfProps.disabled || disabled.value,
                active: superConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "superscript" })
            );
          }
          if (itemProps.name == "sub" && subConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("subscript"),
                leftBorder: subConfig.value.leftBorder,
                rightBorder: subConfig.value.rightBorder,
                color: props.color,
                disabled: subConfig.value.disabled || selfProps.disabled || disabled.value,
                active: subConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "subscript" })
            );
          }
          if (itemProps.name == "formatClear" && formatClearConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("formatClear"),
                leftBorder: formatClearConfig.value.leftBorder,
                rightBorder: formatClearConfig.value.rightBorder,
                color: props.color,
                disabled: formatClearConfig.value.disabled || selfProps.disabled || disabled.value,
                active: formatClearConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "format-clear" })
            );
          }
          if (itemProps.name == "fontSize" && fontSizeConfig.value.show) {
            return h(Button, {
              ...itemProps,
              type: "display",
              displayConfig: fontSizeConfig.value.displayConfig,
              title: $editTrans("fontSize"),
              leftBorder: fontSizeConfig.value.leftBorder,
              rightBorder: fontSizeConfig.value.rightBorder,
              color: props.color,
              disabled: fontSizeConfig.value.disabled || selfProps.disabled || disabled.value,
              active: fontSizeConfig.value.active,
              onOperate: handleOperate
            });
          }
          if (itemProps.name == "fontFamily" && fontFamilyConfig.value.show) {
            return h(Button, {
              ...itemProps,
              type: "display",
              displayConfig: fontFamilyConfig.value.displayConfig,
              title: $editTrans("fontFamily"),
              leftBorder: fontFamilyConfig.value.leftBorder,
              rightBorder: fontFamilyConfig.value.rightBorder,
              color: props.color,
              disabled: fontFamilyConfig.value.disabled || selfProps.disabled || disabled.value,
              active: fontFamilyConfig.value.active,
              onOperate: handleOperate
            });
          }
          if (itemProps.name == "lineHeight" && lineHeightConfig.value.show) {
            return h(Button, {
              ...itemProps,
              type: "display",
              displayConfig: lineHeightConfig.value.displayConfig,
              title: $editTrans("lineHeight"),
              leftBorder: lineHeightConfig.value.leftBorder,
              rightBorder: lineHeightConfig.value.rightBorder,
              color: props.color,
              disabled: lineHeightConfig.value.disabled || selfProps.disabled || disabled.value,
              active: lineHeightConfig.value.active,
              onOperate: handleOperate
            });
          }
          if (itemProps.name == "foreColor" && foreColorConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                ref: "btnRef",
                type: "select",
                selectConfig: foreColorConfig.value.selectConfig,
                title: $editTrans("foreColor"),
                leftBorder: foreColorConfig.value.leftBorder,
                rightBorder: foreColorConfig.value.rightBorder,
                color: props.color,
                disabled: foreColorConfig.value.disabled || selfProps.disabled || disabled.value,
                active: foreColorConfig.value.active,
                hideScroll: true
              },
              {
                default: () => h(Icon, {
                  value: "font-color"
                }),
                layer: (data2) => {
                  return h(Colors, {
                    tooltip: props.config.tooltip,
                    value: foreColorConfig.value.value,
                    data: data2.options,
                    color: props.color,
                    onChange: (val) => {
                      handleOperate("foreColor", val);
                      const btn = itemInstance.proxy.$refs.btnRef;
                      btn.show = false;
                    }
                  });
                }
              }
            );
          }
          if (itemProps.name == "backColor" && backColorConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                type: "select",
                ref: "btnRef",
                selectConfig: backColorConfig.value.selectConfig,
                title: $editTrans("backColor"),
                leftBorder: backColorConfig.value.leftBorder,
                rightBorder: backColorConfig.value.rightBorder,
                color: props.color,
                disabled: backColorConfig.value.disabled || selfProps.disabled || disabled.value,
                active: backColorConfig.value.active,
                onOperate: handleOperate,
                hideScroll: true
              },
              {
                default: () => h(Icon, {
                  value: "brush"
                }),
                layer: (data2) => h(Colors, {
                  tooltip: props.config.tooltip,
                  value: backColorConfig.value.value,
                  data: data2.options,
                  color: props.color,
                  onChange: (val) => {
                    handleOperate("backColor", val);
                    const btn = itemInstance.proxy.$refs.btnRef;
                    btn.show = false;
                  }
                })
              }
            );
          }
          if (itemProps.name == "link" && linkConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                type: "select",
                ref: "btnRef",
                title: $editTrans("insertLink"),
                leftBorder: linkConfig.value.leftBorder,
                rightBorder: linkConfig.value.rightBorder,
                color: props.color,
                disabled: linkConfig.value.disabled || selfProps.disabled || disabled.value,
                active: linkConfig.value.active,
                hideScroll: true,
                onLayerShow: () => {
                  linkConfig.value.text = getRangeText(dataRangeCaches.value);
                }
              },
              {
                default: () => h(Icon, {
                  value: "link"
                }),
                layer: () => h(InsertLink, {
                  color: props.color,
                  text: linkConfig.value.text,
                  onInsert: (text, url, newOpen) => {
                    handleOperate("link", { text, url, newOpen });
                    const btn = itemInstance.proxy.$refs.btnRef;
                    btn.show = false;
                  }
                })
              }
            );
          }
          if (itemProps.name == "image" && imageConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                type: "select",
                ref: "btnRef",
                title: $editTrans("insertImage"),
                leftBorder: imageConfig.value.leftBorder,
                rightBorder: imageConfig.value.rightBorder,
                color: props.color,
                disabled: imageConfig.value.disabled || selfProps.disabled || disabled.value,
                active: imageConfig.value.active,
                hideScroll: true
              },
              {
                default: () => h(Icon, {
                  value: "image"
                }),
                layer: () => h(InsertImage, {
                  color: props.color,
                  allowedFileType: imageConfig.value.allowedFileType,
                  multiple: imageConfig.value.multiple,
                  maxSize: imageConfig.value.maxSize,
                  minSize: imageConfig.value.minSize,
                  customUpload: imageConfig.value.customUpload,
                  handleError: imageConfig.value.handleError,
                  onChange: () => {
                    const btn = itemInstance.proxy.$refs.btnRef;
                    const layer = btn.$refs.layerRef;
                    layer.setPosition();
                  },
                  onInsert: (urls) => {
                    handleOperate("image", urls);
                    const btn = itemInstance.proxy.$refs.btnRef;
                    btn.show = false;
                  }
                })
              }
            );
          }
          if (itemProps.name == "video" && videoConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                type: "select",
                ref: "btnRef",
                title: $editTrans("insertVideo"),
                leftBorder: videoConfig.value.leftBorder,
                rightBorder: videoConfig.value.rightBorder,
                color: props.color,
                disabled: videoConfig.value.disabled || selfProps.disabled || disabled.value,
                active: videoConfig.value.active,
                hideScroll: true
              },
              {
                default: () => h(Icon, {
                  value: "video"
                }),
                layer: () => h(InsertVideo, {
                  color: props.color,
                  allowedFileType: videoConfig.value.allowedFileType,
                  multiple: videoConfig.value.multiple,
                  maxSize: videoConfig.value.maxSize,
                  minSize: videoConfig.value.minSize,
                  customUpload: videoConfig.value.customUpload,
                  handleError: videoConfig.value.handleError,
                  onChange: () => {
                    const btn = itemInstance.proxy.$refs.btnRef;
                    const layer = btn.$refs.layerRef;
                    layer.setPosition();
                  },
                  onInsert: (urls) => {
                    handleOperate("video", urls);
                    const btn = itemInstance.proxy.$refs.btnRef;
                    btn.show = false;
                  }
                })
              }
            );
          }
          if (itemProps.name == "table" && tableConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                type: "select",
                ref: "btnRef",
                title: $editTrans("insertTable"),
                leftBorder: tableConfig.value.leftBorder,
                rightBorder: tableConfig.value.rightBorder,
                color: props.color,
                disabled: tableConfig.value.disabled || selfProps.disabled || disabled.value,
                active: tableConfig.value.active,
                hideScroll: true
              },
              {
                default: () => h(Icon, {
                  value: "table"
                }),
                layer: () => h(InsertTable, {
                  color: props.color,
                  maxRows: tableConfig.value.maxRows,
                  maxColumns: tableConfig.value.maxColumns,
                  onInsert: (row, column) => {
                    handleOperate("table", { row, column });
                    const btn = itemInstance.proxy.$refs.btnRef;
                    btn.show = false;
                  }
                })
              }
            );
          }
          if (itemProps.name == "codeBlock" && codeBlockConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("inserCodeBlock"),
                leftBorder: codeBlockConfig.value.leftBorder,
                rightBorder: codeBlockConfig.value.rightBorder,
                color: props.color,
                disabled: codeBlockConfig.value.disabled || selfProps.disabled || disabled.value,
                active: codeBlockConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "code-block" })
            );
          }
          if (itemProps.name == "sourceView" && sourceViewConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("sourceView"),
                leftBorder: sourceViewConfig.value.leftBorder,
                rightBorder: sourceViewConfig.value.rightBorder,
                color: props.color,
                disabled: sourceViewConfig.value.disabled || selfProps.disabled || disabled.value,
                active: sourceViewConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "source-view" })
            );
          }
          if (itemProps.name == "fullScreen" && fullScreenConfig.value.show) {
            return h(
              Button,
              {
                ...itemProps,
                title: $editTrans("fullScreen"),
                leftBorder: fullScreenConfig.value.leftBorder,
                rightBorder: fullScreenConfig.value.rightBorder,
                color: props.color,
                disabled: fullScreenConfig.value.disabled || selfProps.disabled || disabled.value,
                active: fullScreenConfig.value.active,
                onOperate: handleOperate
              },
              () => h(Icon, { value: "full-screen" })
            );
          }
          if (common.isObject(menuExtends.value)) {
            const configuration = menuExtends.value[itemProps.name];
            if (configuration) {
              return h(
                Button,
                {
                  ...itemProps,
                  ref: "btnRef",
                  type: configuration.type || "default",
                  title: configuration.title || "",
                  leftBorder: configuration.leftBorder || false,
                  rightBorder: configuration.rightBorder || false,
                  disabled: configuration.disabled || selfProps.disabled || disabled.value,
                  hideScroll: configuration.hideScroll || false,
                  active: configuration.active || false,
                  selectConfig: {
                    width: configuration.width,
                    maxHeight: configuration.maxHeight,
                    options: configuration.options
                  },
                  displayConfig: {
                    width: configuration.width,
                    maxHeight: configuration.maxHeight,
                    value: configuration.value,
                    options: configuration.options
                  },
                  color: props.color,
                  onLayerShow: () => {
                    if (typeof configuration.onLayerShow == "function") {
                      configuration.onLayerShow(itemProps.name, itemInstance.proxy.$refs.btnRef);
                    }
                  },
                  onLayerShown: () => {
                    if (typeof configuration.onLayerShown == "function") {
                      configuration.onLayerShown(itemProps.name, itemInstance.proxy.$refs.btnRef);
                    }
                  },
                  onLayerHidden: () => {
                    if (typeof configuration.onLayerHidden == "function") {
                      configuration.onLayerHidden(itemProps.name, itemInstance.proxy.$refs.btnRef);
                    }
                  },
                  onOperate: (name, val) => {
                    if (typeof configuration.onOperate == "function") {
                      configuration.onOperate(name, val, itemInstance.proxy.$refs.btnRef);
                    }
                  }
                },
                {
                  default: () => {
                    if (configuration.default) {
                      return configuration.default(itemProps.name, itemInstance.proxy.$refs.btnRef);
                    }
                    return null;
                  },
                  layer: () => {
                    if (configuration.layer) {
                      return configuration.layer(itemProps.name, itemInstance.proxy.$refs.btnRef);
                    }
                    return null;
                  },
                  option: () => {
                    if (configuration.option) {
                      return configuration.option(itemProps.name, itemInstance.proxy.$refs.btnRef);
                    }
                    return null;
                  }
                }
              );
            }
          }
          return null;
        };
      },
      {
        props: {
          name: String,
          disabled: Boolean
        }
      }
    );
    __expose({
      handleRangeUpdate
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["editify-menu", { "editify-border": menuShowBorder.value, "editify-source": unref(isSourceView) && menuMode.value == "inner", "editify-fullscreen": unref(isFullScreen) }]),
        "data-editify-mode": menuMode.value,
        style: normalizeStyle(_ctx.config.style || "")
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(menuNames.value, (item) => {
          return openBlock(), createBlock(unref(MenuItem), {
            name: item,
            disabled: menuDisabled.value(item)
          }, null, 8, ["name", "disabled"]);
        }), 256))
      ], 14, _hoisted_1$2);
    };
  }
});
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-98c51b8e"]]);
const EditifyProps = {
  //国际化语言类型
  locale: {
    type: String,
    default: "zh_CN"
  },
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
  //是否显示边框
  border: {
    type: Boolean,
    default: false
  },
  //主题色
  color: {
    type: String,
    default: "#03a8f3",
    validator(value) {
      return common.matchingText(value, "hex");
    }
  },
  //视频宽高比
  videoRatio: {
    type: Number,
    default: 16 / 9
  },
  //工具条按钮设置
  toolbar: {
    type: Object,
    default: null
  },
  //是否显示字数统计
  showWordLength: {
    type: Boolean,
    default: false
  },
  //自定义粘贴纯文字
  customTextPaste: {
    type: Function,
    default: null
  },
  //自定义粘贴html
  customHtmlPaste: {
    type: Function,
    default: null
  },
  //自定义粘贴图片
  customImagePaste: {
    type: Function,
    default: null
  },
  //自定义粘贴视频
  customVideoPaste: {
    type: Function,
    default: null
  },
  //自定义粘贴文件
  customFilePaste: {
    type: Function,
    default: null
  },
  //菜单栏配置
  menu: {
    type: Object,
    default: null
  },
  //粘贴html时额外保留的标记（全部元素生效）
  pasteKeepMarks: {
    type: Object,
    default: null
  },
  //粘贴html时额外保留的样式（仅在非文本元素生效）
  pasteKeepStyles: {
    type: Object,
    default: null
  },
  //自定义node转元素时的处理
  customParseNode: {
    type: Function,
    default: null
  },
  //自定义额外的渲染规范
  renderRules: {
    type: Array,
    default: function() {
      return [];
    }
  },
  //自适应高度
  autoheight: {
    type: Boolean,
    default: false
  },
  //是否使用tab快捷键
  tab: {
    type: Boolean,
    default: true
  },
  //插件数组
  plugins: {
    type: Array,
    default: function() {
      return [];
    }
  }
};
const en_US = {
  textWrapUp: "Up feed",
  textWrapDown: "Down feed",
  insertRowTop: "Insert row forward",
  insertRowBottom: "Insert row backward",
  insertColumnLeft: "Insert column forward",
  insertColumnRight: "Insert column backward",
  deleteRow: "Delete rows",
  deleteColumn: "Delete column",
  deleteTable: "Delete table",
  selectLanguages: "Select language",
  autoRecognize: "Auto",
  linkAddress: "Link address",
  newWindowOpen: "Open in new window",
  removeLink: "Remove",
  viewLink: "View",
  linkUrlEnterPlaceholder: "Please enter the link address",
  linkTextEnterPlaceholder: "Please enter the link text",
  width30: "Set the width to 30%",
  width50: "Set the width to 50%",
  width100: "Set the width to 100%",
  deleteImage: "Delete image",
  autoplay: "Autoplay",
  disabledAutoplay: "Turn off autoplay",
  loop: "Loop",
  disabledLoop: "Close loop",
  muted: "Mute",
  unmuted: "Unmute",
  controls: "Play control",
  deleteVideo: "Delete video",
  heading: "Heading",
  bold: "Bold",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  text: "Paragraph",
  italic: "Italic",
  orderList: "Ordered list",
  unorderList: "Unordered list",
  strikethrough: "Strikethrough",
  underline: "Underline",
  code: "Inline code",
  superscript: "Superscript",
  subscript: "Subscript",
  fontSize: "Font size",
  fontFamily: "Font family",
  defaultFontFamily: "Default",
  foreColor: "Forecolor",
  defaultColor: "Default color",
  backColor: "Backcolor",
  formatClear: "Clear format",
  defaultSize: "Default",
  totalWordCount: "Total word count: ",
  align: "Alignment mode",
  undo: "Undo",
  redo: "Redo",
  quote: "Quote",
  lineHeight: "Line height",
  indent: "Indent",
  insertLink: "Insert Link",
  insertImage: "Insert Image",
  remoteImage: "Remote",
  uploadImage: "Upload",
  imageUrlPlaceholder: "Please enter the image address",
  insert: "Insert",
  insertVideo: "Insert Video",
  remoteVideo: "Remote",
  uploadVideo: "Upload",
  videoUrlPlaceholder: "Please enter the video address",
  insertTable: "Insert table",
  inserCodeBlock: "Insert code block",
  sourceView: "Code view",
  task: "Task",
  indentIncrease: "Increase indent",
  indentDecrease: "Reduce indent",
  alignLeft: "Align left",
  alignCenter: "Align center",
  alignRight: "Align right",
  alignJustify: "Align justify",
  defaultLineHeight: "Default",
  auto: "auto",
  fullScreen: "Full screen",
  //插件语言配置
  insertAttachment: "Insert attachment",
  uploadAttachment: "Upload",
  remoteAttachment: "Remote",
  attachmentNamePlaceholder: "Please enter the attachment name",
  attachmentUrlPlaceholder: "Please enter the attachment address",
  attachmentDownloadTitle: "Click to download attachment",
  attachmentDefaultName: "attachment"
};
const zh_CN = {
  textWrapUp: "向上换行",
  textWrapDown: "向下换行",
  insertRowTop: "向前插入行",
  insertRowBottom: "向后插入行",
  insertColumnLeft: "向前插入列",
  insertColumnRight: "向后插入列",
  deleteRow: "删除行",
  deleteColumn: "删除列",
  deleteTable: "删除表格",
  selectLanguages: "选择语言",
  autoRecognize: "自动识别",
  linkAddress: "链接地址",
  newWindowOpen: "新窗口打开",
  removeLink: "移除链接",
  viewLink: "查看链接",
  linkUrlEnterPlaceholder: "请输入链接地址",
  linkTextEnterPlaceholder: "请输入链接文本",
  width30: "30%宽度",
  width50: "50%宽度",
  width100: "100%宽度",
  deleteImage: "删除图片",
  autoplay: "自动播放",
  disabledAutoplay: "关闭自动播放",
  loop: "循环播放",
  disabledLoop: "关闭循环播放",
  muted: "静音",
  unmuted: "播放声音",
  controls: "播放控制",
  deleteVideo: "删除视频",
  heading: "标题",
  bold: "粗体",
  h1: "一级标题",
  h2: "二级标题",
  h3: "三级标题",
  h4: "四级标题",
  h5: "五级标题",
  h6: "六级标题",
  text: "正文",
  italic: "斜体",
  orderList: "有序列表",
  unorderList: "无序列表",
  strikethrough: "删除线",
  underline: "下划线",
  code: "行内代码",
  superscript: "上标",
  subscript: "下标",
  fontSize: "字号",
  fontFamily: "字体",
  defaultFontFamily: "默认字体",
  foreColor: "前景色",
  defaultColor: "默认颜色",
  backColor: "背景色",
  formatClear: "清除格式",
  defaultSize: "默认字号",
  totalWordCount: "总字数：",
  align: "对齐方式",
  undo: "撤销",
  redo: "重做",
  quote: "引用",
  lineHeight: "行高",
  indent: "缩进",
  insertLink: "插入链接",
  insertImage: "插入图片",
  remoteImage: "网络图片",
  uploadImage: "上传图片",
  imageUrlPlaceholder: "请输入图片地址",
  insert: "插入",
  insertVideo: "插入视频",
  remoteVideo: "网络视频",
  uploadVideo: "上传视频",
  videoUrlPlaceholder: "请输入视频地址",
  insertTable: "插入表格",
  inserCodeBlock: "插入代码块",
  sourceView: "代码视图",
  task: "待办",
  indentIncrease: "增加缩进",
  indentDecrease: "减少缩进",
  alignLeft: "左对齐",
  alignCenter: "居中对齐",
  alignRight: "右对齐",
  alignJustify: "两端对齐",
  defaultLineHeight: "默认行高",
  auto: "自适应",
  fullScreen: "全屏",
  //插件语言配置
  insertAttachment: "插入附件",
  uploadAttachment: "上传附件",
  remoteAttachment: "远程地址",
  attachmentNamePlaceholder: "请输入附件名称",
  attachmentUrlPlaceholder: "请输入附件地址",
  attachmentDownloadTitle: "点击下载附件",
  attachmentDefaultName: "附件"
};
const trans = (locale) => {
  return (key) => {
    return { zh_CN, en_US }[locale][key];
  };
};
const _hoisted_1$1 = ["data-editify-uid"];
const _hoisted_2$1 = ["data-editify-placeholder"];
const _hoisted_3$1 = ["value"];
const _hoisted_4$1 = { class: "editify-footer-words" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "editify"
  },
  __name: "editify",
  props: EditifyProps,
  emits: ["update:modelValue", "focus", "blur", "change", "keydown", "keyup", "insertparagraph", "rangeupdate", "updateview"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const $editTrans = trans(props.locale || "zh_CN");
    const isModelChange = ref(false);
    const isInputChinese = ref(false);
    const rangeUpdateTimer = ref(null);
    const tableColumnResizeParams = ref({
      element: null,
      //被拖拽的td
      start: 0
      //水平方向起点位置
    });
    const toolbarOptions = ref({
      //是否显示工具条
      show: false,
      //关联元素
      node: null,
      //类型
      type: "text"
    });
    const menuRef = ref(null);
    const bodyRef = ref(null);
    const contentRef = ref(null);
    const toolbarRef = ref(null);
    const footerRef = ref(null);
    const elRef = ref(null);
    const editor = ref(null);
    const isSourceView = ref(false);
    const isFullScreen = ref(false);
    const canUseMenu = ref(false);
    const dataRangeCaches = ref({
      flatList: [],
      list: []
    });
    const value = computed({
      set(val) {
        emits("update:modelValue", val);
      },
      get() {
        return props.modelValue || "<p><br></p>";
      }
    });
    const textValue = computed(() => {
      return element.string2dom(`<div>${value.value}</div>`).innerText;
    });
    const showPlaceholder = computed(() => {
      if (editor.value) {
        if (value.value && editor.value.stack.length == 1 && editor.value.stack[0].type == "block" && editor.value.stack[0].parsedom == AlexElement.BLOCK_NODE && editor.value.stack[0].isOnlyHasBreak() && !editor.value.stack[0].hasStyles() && !editor.value.stack[0].hasMarks()) {
          return !isInputChinese.value;
        }
      }
      return false;
    });
    const showBorder = computed(() => {
      if (isFullScreen.value) {
        return false;
      }
      return props.border;
    });
    const toolbarConfig = computed(() => {
      return mergeObject(getToolbarConfig($editTrans, props.locale), props.toolbar || {});
    });
    const pluginResultList = computed(() => {
      const pluginResultList2 = [];
      props.plugins.forEach((plugin) => {
        let pluginResult = plugin(instance, $editTrans);
        pluginResultList2.push(pluginResult);
      });
      return pluginResultList2;
    });
    const menuConfig = computed(() => {
      return mergeObject(getMenuConfig($editTrans, props.locale), props.menu || {});
    });
    const internalModify = (val) => {
      isModelChange.value = true;
      value.value = val;
      nextTick(() => {
        isModelChange.value = false;
      });
    };
    const hideToolbar = () => {
      toolbarOptions.value.show = false;
      toolbarOptions.value.node = null;
    };
    const handleScroll = () => {
      const setScroll = (el) => {
        event.on(el, `scroll.editify_${instance.uid}`, () => {
          if (toolbarConfig.value.use && toolbarOptions.value.show) {
            hideToolbar();
          }
        });
        if (el.parentNode) {
          setScroll(el.parentNode);
        }
      };
      setScroll(contentRef.value);
    };
    const removeScrollHandle = () => {
      const removeScroll = (el) => {
        event.off(el, `scroll.editify_${instance.uid}`);
        if (el.parentNode) {
          removeScroll(el.parentNode);
        }
      };
      removeScroll(contentRef.value);
    };
    const handleToolbar = () => {
      if (props.disabled || isSourceView.value) {
        return;
      }
      hideToolbar();
      nextTick(() => {
        const table = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "table");
        const pre = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "pre");
        const link = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "a");
        const image = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "img");
        const video = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "video");
        if (link) {
          toolbarOptions.value.type = "link";
          toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${link.key}"]`;
          if (toolbarOptions.value.show) {
            toolbarRef.value.$refs.layerRef.setPosition();
          } else {
            toolbarOptions.value.show = true;
          }
        } else if (image) {
          toolbarOptions.value.type = "image";
          toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${image.key}"]`;
          if (toolbarOptions.value.show) {
            toolbarRef.value.$refs.layerRef.setPosition();
          } else {
            toolbarOptions.value.show = true;
          }
        } else if (video) {
          toolbarOptions.value.type = "video";
          toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${video.key}"]`;
          if (toolbarOptions.value.show) {
            toolbarRef.value.$refs.layerRef.setPosition();
          } else {
            toolbarOptions.value.show = true;
          }
        } else if (table) {
          toolbarOptions.value.type = "table";
          toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${table.key}"]`;
          if (toolbarOptions.value.show) {
            toolbarRef.value.$refs.layerRef.setPosition();
          } else {
            toolbarOptions.value.show = true;
          }
        } else if (pre) {
          toolbarOptions.value.type = "codeBlock";
          toolbarOptions.value.node = `[data-editify-uid="${instance.uid}"] [data-editify-element="${pre.key}"]`;
          if (toolbarOptions.value.show) {
            toolbarRef.value.$refs.layerRef.setPosition();
          } else {
            toolbarOptions.value.show = true;
          }
        } else {
          const result = dataRangeCaches.value.flatList.filter((item) => {
            return item.element.isText();
          });
          if (result.length && !hasTableInRange(editor.value, dataRangeCaches.value) && !hasPreInRange(editor.value, dataRangeCaches.value) && !hasLinkInRange(editor.value, dataRangeCaches.value) && !hasImageInRange(editor.value, dataRangeCaches.value) && !hasVideoInRange(editor.value, dataRangeCaches.value)) {
            toolbarOptions.value.type = "text";
            if (toolbarOptions.value.show) {
              toolbarRef.value.$refs.layerRef.setPosition();
            } else {
              toolbarOptions.value.show = true;
            }
          }
        }
      });
    };
    const createEditor = () => {
      let pluginRules = [];
      pluginResultList.value.forEach((pluginResult) => {
        if (pluginResult.renderRule) {
          pluginRules.push(pluginResult.renderRule);
        }
      });
      editor.value = new AlexEditor(contentRef.value, {
        value: value.value,
        disabled: props.disabled,
        renderRules: [
          (el) => {
            parseList(editor.value, el);
          },
          (el) => {
            orderdListHandle(editor.value, el);
          },
          (el) => {
            mediaHandle(editor.value, el);
          },
          (el) => {
            tableHandle(editor.value, el);
          },
          (el) => {
            var _a, _b, _c, _d, _e, _f, _g;
            preHandle(editor.value, el, !!(((_a = toolbarConfig.value) == null ? void 0 : _a.use) && ((_d = (_c = (_b = toolbarConfig.value) == null ? void 0 : _b.codeBlock) == null ? void 0 : _c.languages) == null ? void 0 : _d.show)), (_g = (_f = (_e = toolbarConfig.value) == null ? void 0 : _e.codeBlock) == null ? void 0 : _f.languages) == null ? void 0 : _g.options);
          },
          (el) => {
            specialInblockHandle(editor.value, el);
          },
          ...pluginRules,
          ...props.renderRules
        ],
        allowCopy: props.allowCopy,
        allowPaste: props.allowPaste,
        allowCut: props.allowCut,
        allowPasteHtml: props.allowPasteHtml,
        customTextPaste: props.customTextPaste,
        customImagePaste: props.customImagePaste,
        customVideoPaste: props.customVideoPaste,
        customFilePaste: props.customFilePaste,
        customHtmlPaste: handleCustomHtmlPaste,
        customMerge: handleCustomMerge,
        customParseNode: handleCustomParseNode
      });
      internalModify(editor.value.value);
      editor.value.on("change", handleEditorChange);
      editor.value.on("focus", handleEditorFocus);
      editor.value.on("blur", handleEditorBlur);
      editor.value.on("keydown", handleEditorKeydown);
      editor.value.on("keyup", handleEditorKeyup);
      editor.value.on("insertParagraph", handleInsertParagraph);
      editor.value.on("rangeUpdate", handleRangeUpdate);
      editor.value.on("deleteInStart", handleDeleteInStart);
      editor.value.on("deleteComplete", handleDeleteComplete);
      editor.value.on("afterRender", handleAfterRender);
      editor.value.formatElementStack();
      editor.value.domRender();
      if (props.autofocus && !isSourceView.value && !props.disabled) {
        collapseToEnd();
      }
    };
    const setVideoHeight = () => {
      contentRef.value.querySelectorAll("video").forEach((video) => {
        video.style.height = video.offsetWidth / props.videoRatio + "px";
      });
    };
    const documentMouseDown = (e) => {
      if (props.disabled) {
        return;
      }
      if (element.isContains(contentRef.value, e.target)) {
        const elm = e.target;
        const key = data.get(elm, "data-alex-editor-key");
        if (key) {
          const element$12 = editor.value.getElementByKey(key);
          if (element$12 && element$12.parsedom == "td") {
            const length = element$12.parent.children.length;
            if (element$12.parent.children[length - 1].isEqual(element$12)) {
              return;
            }
            const rect = element.getElementBounding(elm);
            if (e.pageX >= Math.abs(rect.left + elm.offsetWidth - 5) && e.pageX <= Math.abs(rect.left + elm.offsetWidth + 5)) {
              tableColumnResizeParams.value.element = element$12;
              tableColumnResizeParams.value.start = e.pageX;
            }
          }
        }
      }
      if (!element.isContains(elRef.value, e.target) && !isSourceView.value) {
        canUseMenu.value = false;
      }
    };
    const documentMouseMove = (e) => {
      if (props.disabled) {
        return;
      }
      if (!tableColumnResizeParams.value.element) {
        return;
      }
      const table = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "table");
      if (!table) {
        return;
      }
      const colgroup = table.children.find((item) => {
        return item.parsedom == "colgroup";
      });
      const index = tableColumnResizeParams.value.element.parent.children.findIndex((el) => {
        return el.isEqual(tableColumnResizeParams.value.element);
      });
      const width = `${tableColumnResizeParams.value.element.elm.offsetWidth + e.pageX - tableColumnResizeParams.value.start}`;
      colgroup.children[index].marks["width"] = width;
      colgroup.children[index].elm.setAttribute("width", width);
      tableColumnResizeParams.value.start = e.pageX;
    };
    const documentMouseUp = () => {
      if (props.disabled) {
        return;
      }
      if (!tableColumnResizeParams.value.element) {
        return;
      }
      const table = getCurrentParsedomElement(editor.value, dataRangeCaches.value, "table");
      if (!table) {
        return;
      }
      const colgroup = table.children.find((item) => {
        return item.parsedom == "colgroup";
      });
      const index = tableColumnResizeParams.value.element.parent.children.findIndex((el) => {
        return el.isEqual(tableColumnResizeParams.value.element);
      });
      const width = Number(colgroup.children[index].marks["width"]);
      if (!isNaN(width)) {
        colgroup.children[index].marks["width"] = `${Number((width / tableColumnResizeParams.value.element.parent.elm.offsetWidth * 100).toFixed(2))}%`;
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      }
      tableColumnResizeParams.value.element = null;
      tableColumnResizeParams.value.start = 0;
    };
    const documentClick = (e) => {
      if (props.disabled) {
        return;
      }
      if (element.isContains(contentRef.value, e.target)) {
        const elm = e.target;
        const key = data.get(elm, "data-alex-editor-key");
        if (key) {
          const element$12 = editor.value.getElementByKey(key);
          if (isTask(element$12)) {
            const rect = element.getElementBounding(elm);
            if (e.pageX >= Math.abs(rect.left) && e.pageX <= Math.abs(rect.left + 16) && e.pageY >= Math.abs(rect.top + elm.offsetHeight / 2 - 8) && e.pageY <= Math.abs(rect.top + elm.offsetHeight / 2 + 8)) {
              if (element$12.marks["data-editify-task"] == "checked") {
                element$12.marks["data-editify-task"] = "uncheck";
              } else {
                element$12.marks["data-editify-task"] = "checked";
              }
              if (!editor.value.range) {
                editor.value.initRange();
              }
              editor.value.range.anchor.moveToEnd(element$12);
              editor.value.range.focus.moveToEnd(element$12);
              editor.value.formatElementStack();
              editor.value.domRender();
              editor.value.rangeRender();
            }
          }
        }
      }
    };
    const handleCustomHtmlPaste = async (elements) => {
      let keepStyles = pasteKeepData.styles;
      let keepMarks = pasteKeepData.marks;
      pluginResultList.value.forEach((pluginResult) => {
        keepStyles = Object.assign(keepStyles, pluginResult.pasteKeepStyles || {});
        keepMarks = Object.assign(keepMarks, pluginResult.pasteKeepMarks || {});
      });
      keepStyles = Object.assign(keepStyles, props.pasteKeepStyles || {});
      keepMarks = Object.assign(keepMarks, props.pasteKeepMarks || {});
      AlexElement.flatElements(elements).forEach((el) => {
        let marks = {};
        let styles = {};
        if (el.hasMarks()) {
          for (let key in keepMarks) {
            if (el.marks.hasOwnProperty(key) && (Array.isArray(keepMarks[key]) && keepMarks[key].includes(el.parsedom) || keepMarks[key] == "*")) {
              marks[key] = el.marks[key];
            }
          }
          el.marks = marks;
        }
        if (el.hasStyles() && !el.isText()) {
          for (let key in keepStyles) {
            if (el.styles.hasOwnProperty(key) && (Array.isArray(keepStyles[key]) && keepStyles[key].includes(el.parsedom) || keepStyles[key] == "*")) {
              styles[key] = el.styles[key];
            }
          }
          el.styles = styles;
        }
      });
      if (typeof props.customHtmlPaste == "function") {
        await props.customHtmlPaste(elements);
      } else {
        for (let i = 0; i < elements.length; i++) {
          editor.value.insertElement(elements[i], false);
        }
      }
    };
    const handleCustomMerge = (ele, preEle) => {
      const uneditable = preEle.getUneditableElement();
      if (uneditable) {
        uneditable.toEmpty();
      } else {
        preEle.children.push(...ele.children);
        preEle.children.forEach((item) => {
          item.parent = preEle;
        });
        ele.children = null;
      }
    };
    const handleCustomParseNode = (ele) => {
      if (ele.parsedom == "code") {
        ele.parsedom = "span";
        const marks = {
          "data-editify-code": true
        };
        if (ele.hasMarks()) {
          Object.assign(ele.marks, marks);
        } else {
          ele.marks = marks;
        }
      }
      pluginResultList.value.forEach((pluginResult) => {
        if (pluginResult.customParseNode) {
          ele = pluginResult.customParseNode(ele);
        }
      });
      if (typeof props.customParseNode == "function") {
        ele = props.customParseNode(ele);
      }
      return ele;
    };
    const handleEditorKeydown = (val, e) => {
      if (props.disabled) {
        return;
      }
      if (e.key.toLocaleLowerCase() == "tab" && !e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey && props.tab) {
        e.preventDefault();
        editor.value.insertText("    ");
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
      }
      emits("keydown", val, e);
    };
    const handleEditorKeyup = (val, e) => {
      if (props.disabled) {
        return;
      }
      emits("keyup", val, e);
    };
    const handleEditorClick = (e) => {
      if (props.disabled || isSourceView.value) {
        return;
      }
      const node = e.target;
      if (node.nodeName.toLocaleLowerCase() == "img" || node.nodeName.toLocaleLowerCase() == "video") {
        const key = Number(node.getAttribute("data-editify-element"));
        if (number.isNumber(key)) {
          const element2 = editor.value.getElementByKey(key);
          if (!editor.value.range) {
            editor.value.initRange();
          }
          editor.value.range.anchor.moveToStart(element2);
          editor.value.range.focus.moveToEnd(element2);
          editor.value.rangeRender();
        }
      }
    };
    const handleEditorChange = (newVal, oldVal) => {
      if (props.disabled) {
        return;
      }
      internalModify(newVal);
      emits("change", newVal, oldVal);
    };
    const handleEditorBlur = (val) => {
      if (props.disabled) {
        return;
      }
      if (props.border && props.color && !isFullScreen.value) {
        bodyRef.value.style.borderColor = "";
        bodyRef.value.style.boxShadow = "";
        if (menuConfig.value.use) {
          menuRef.value.$el.style.borderColor = "";
          menuRef.value.$el.style.boxShadow = "";
        }
      }
      emits("blur", val);
    };
    const handleEditorFocus = (val) => {
      if (props.disabled) {
        return;
      }
      if (props.border && props.color && !isFullScreen.value) {
        bodyRef.value.style.borderColor = props.color;
        const rgb = color.hex2rgb(props.color);
        if (menuConfig.value.use && menuConfig.value.mode == "inner") {
          bodyRef.value.style.boxShadow = `0 8px 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5),8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5), -8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
          menuRef.value.$el.style.borderColor = props.color;
          menuRef.value.$el.style.boxShadow = `0 -8px 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5),8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5), -8px 0 8px -8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
        } else if (menuConfig.value.use) {
          bodyRef.value.style.boxShadow = `0 0 8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
        } else {
          bodyRef.value.style.boxShadow = `0 0 8px rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
        }
      }
      setTimeout(() => {
        canUseMenu.value = true;
        emits("focus", val);
      }, 0);
    };
    const handleInsertParagraph = (element2, previousElement) => {
      if (!element2.isEqual(previousElement)) {
        if (previousElement.isBlock() && element2.isBlock() && previousElement.isOnlyHasBreak() && element2.isOnlyHasBreak()) {
          if (previousElement.parsedom != AlexElement.BLOCK_NODE) {
            elementToParagraph(previousElement);
            editor.value.range.anchor.moveToStart(previousElement);
            editor.value.range.focus.moveToStart(previousElement);
            element2.toEmpty();
          }
        }
        if (isTask(element2)) {
          element2.marks["data-editify-task"] = "uncheck";
        }
      }
      emits("insertparagraph", value.value);
    };
    const handleRangeUpdate = () => {
      if (props.disabled) {
        return;
      }
      canUseMenu.value = !!editor.value.range;
      if (!editor.value.range) {
        return;
      }
      dataRangeCaches.value = editor.value.getElementsByRange();
      if (rangeUpdateTimer.value) {
        clearTimeout(rangeUpdateTimer.value);
        rangeUpdateTimer.value = null;
      }
      rangeUpdateTimer.value = setTimeout(() => {
        if (toolbarConfig.value.use || menuConfig.value.use) {
          if (toolbarConfig.value.use) {
            handleToolbar();
          }
          if (menuConfig.value.use) {
            menuRef.value.handleRangeUpdate();
          }
        }
      }, 200);
      emits("rangeupdate");
    };
    const handleDeleteInStart = (element2) => {
      if (element2.isBlock()) {
        elementToParagraph(element2);
      }
    };
    const handleDeleteComplete = () => {
      const uneditable = editor.value.range.anchor.element.getUneditableElement();
      if (uneditable) {
        uneditable.toEmpty();
      }
    };
    const handleAfterRender = () => {
      setVideoHeight();
      pluginResultList.value.forEach((pluginResult) => {
        if (pluginResult.updateView) {
          pluginResult.updateView();
        }
      });
      emits("updateview");
    };
    const collapseToEnd = () => {
      if (props.disabled) {
        return;
      }
      editor.value.collapseToEnd();
      editor.value.rangeRender();
      element.setScrollTop({
        el: contentRef.value,
        number: 1e6,
        time: 0
      });
    };
    const collapseToStart = () => {
      if (props.disabled) {
        return;
      }
      editor.value.collapseToStart();
      editor.value.rangeRender();
      nextTick(() => {
        element.setScrollTop({
          el: contentRef.value,
          number: 0,
          time: 0
        });
      });
    };
    const undo = () => {
      if (props.disabled) {
        return;
      }
      const historyRecord = editor.value.history.get(-1);
      if (historyRecord) {
        editor.value.history.current = historyRecord.current;
        editor.value.stack = historyRecord.stack;
        editor.value.range = historyRecord.range;
        editor.value.formatElementStack();
        editor.value.domRender(true);
        editor.value.rangeRender();
      }
    };
    const redo = () => {
      if (props.disabled) {
        return;
      }
      const historyRecord = editor.value.history.get(1);
      if (historyRecord) {
        editor.value.history.current = historyRecord.current;
        editor.value.stack = historyRecord.stack;
        editor.value.range = historyRecord.range;
        editor.value.formatElementStack();
        editor.value.domRender(true);
        editor.value.rangeRender();
      }
    };
    watch(
      () => value.value,
      (newVal) => {
        if (isModelChange.value) {
          return;
        }
        editor.value.stack = editor.value.parseHtml(newVal);
        editor.value.range = null;
        editor.value.formatElementStack();
        editor.value.domRender();
        editor.value.rangeRender();
        contentRef.value.blur();
      }
    );
    watch(
      () => isSourceView.value,
      (newVal) => {
        if (toolbarConfig.value.use) {
          if (newVal) {
            hideToolbar();
          } else {
            handleToolbar();
          }
        }
      }
    );
    watch(
      () => props.disabled,
      (newVal) => {
        if (newVal) {
          editor.value.setDisabled();
        } else {
          editor.value.setEnabled();
        }
      }
    );
    onMounted(() => {
      createEditor();
      handleScroll();
      event.on(document.documentElement, `mousedown.editify_${instance.uid}`, documentMouseDown);
      event.on(document.documentElement, `mousemove.editify_${instance.uid}`, documentMouseMove);
      event.on(document.documentElement, `mouseup.editify_${instance.uid}`, documentMouseUp);
      event.on(document.documentElement, `click.editify_${instance.uid}`, documentClick);
      event.on(window, `resize.editify_${instance.uid}`, setVideoHeight);
    });
    onBeforeUnmount(() => {
      removeScrollHandle();
      event.off(document.documentElement, `mousedown.editify_${instance.uid} mousemove.editify_${instance.uid} mouseup.editify_${instance.uid} click.editify_${instance.uid}`);
      event.off(window, `resize.editify_${instance.uid}`);
      editor.value.destroy();
    });
    provide("$editTrans", $editTrans);
    provide("editify", instance);
    provide("isSourceView", isSourceView);
    provide("isFullScreen", isFullScreen);
    provide("canUseMenu", canUseMenu);
    provide("editor", editor);
    provide("dataRangeCaches", dataRangeCaches);
    provide("showBorder", showBorder);
    provide("pluginResultList", pluginResultList);
    __expose({
      editor,
      isSourceView,
      isFullScreen,
      canUseMenu,
      dataRangeCaches,
      textValue,
      collapseToEnd,
      collapseToStart,
      undo,
      redo
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["editify", { "editify-fullscreen": isFullScreen.value, "editify-autoheight": !isFullScreen.value && _ctx.autoheight }]),
        ref_key: "elRef",
        ref: elRef
      }, [
        menuConfig.value.use ? (openBlock(), createBlock(Menu, {
          key: 0,
          config: menuConfig.value,
          color: _ctx.color,
          ref_key: "menuRef",
          ref: menuRef
        }, null, 8, ["config", "color"])) : createCommentVNode("", true),
        createElementVNode("div", {
          ref_key: "bodyRef",
          ref: bodyRef,
          class: normalizeClass(["editify-body", { "editify-border": showBorder.value, "editify-menu_inner": menuConfig.value.use && menuConfig.value.mode == "inner" }]),
          "data-editify-uid": unref(instance).uid
        }, [
          createElementVNode("div", {
            ref_key: "contentRef",
            ref: contentRef,
            class: normalizeClass(["editify-content", { "editify-placeholder": showPlaceholder.value, "editify-disabled": _ctx.disabled }]),
            onClick: handleEditorClick,
            onCompositionstart: _cache[0] || (_cache[0] = ($event) => isInputChinese.value = true),
            onCompositionend: _cache[1] || (_cache[1] = ($event) => isInputChinese.value = false),
            "data-editify-placeholder": _ctx.placeholder
          }, null, 42, _hoisted_2$1),
          isSourceView.value ? (openBlock(), createElementBlock("textarea", {
            key: 0,
            value: value.value,
            readonly: "",
            class: "editify-sourceview"
          }, null, 8, _hoisted_3$1)) : createCommentVNode("", true),
          createVNode(Toolbar, {
            ref_key: "toolbarRef",
            ref: toolbarRef,
            modelValue: toolbarOptions.value.show,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => toolbarOptions.value.show = $event),
            node: toolbarOptions.value.node,
            type: toolbarOptions.value.type,
            config: toolbarConfig.value,
            color: _ctx.color
          }, null, 8, ["modelValue", "node", "type", "config", "color"])
        ], 10, _hoisted_1$1),
        _ctx.showWordLength ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["editify-footer", { "editify-fullscreen": isFullScreen.value && !isSourceView.value }]),
          ref_key: "footerRef",
          ref: footerRef
        }, [
          createElementVNode("div", _hoisted_4$1, toDisplayString(unref($editTrans)("totalWordCount")) + toDisplayString(textValue.value.length), 1)
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Editify = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4a3bc815"]]);
const InsertAttachmentProps = {
  //主题色
  color: {
    type: String,
    default: ""
  },
  //可选择的文件类型
  accept: {
    type: String,
    default: null
  },
  //支持的类型数组
  allowedFileType: {
    type: Array,
    default: null
  },
  //是否支持多选
  multiple: {
    type: Boolean,
    default: false
  },
  //单个文件最大值
  maxSize: {
    type: Number,
    default: null
  },
  //单个文件最小值
  minSize: {
    type: Number,
    default: null
  },
  //是否自定义上传附件
  customUpload: {
    type: Function,
    default: null
  },
  //处理上传附件异常
  handleError: {
    type: Function,
    default: null
  }
};
const _hoisted_1 = { class: "editify-attachment" };
const _hoisted_2 = { class: "editify-attachment-header" };
const _hoisted_3 = {
  key: 0,
  class: "editify-attachment-remote"
};
const _hoisted_4 = ["placeholder"];
const _hoisted_5 = ["placeholder"];
const _hoisted_6 = {
  key: 1,
  class: "editify-attachment-upload"
};
const _hoisted_7 = ["placeholder"];
const _hoisted_8 = ["multiple", "accept"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "InsertAttachment"
  },
  __name: "insertAttachment",
  props: InsertAttachmentProps,
  emits: ["change", "insert"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const $editTrans = inject("$editTrans");
    const current = ref("upload");
    const attachmentName = ref("");
    const attachmentUrl = ref("");
    const fileInputRef = ref(null);
    const activeStyle = computed(() => {
      return (name) => {
        if (current.value == name) {
          return {
            color: props.color
          };
        }
        return {};
      };
    });
    const getSuffix = (file2) => {
      const index = file2.name.lastIndexOf(".");
      if (index <= 0) {
        return "";
      }
      return file2.name.substring(index + 1);
    };
    const handleInputFocus = (e) => {
      if (props.color) {
        e.currentTarget.style.borderColor = props.color;
      }
    };
    const handleInputBlur = (e) => {
      e.currentTarget.style.borderColor = "";
    };
    const insertRemoteAttachment = () => {
      emits("insert", attachmentName.value, [attachmentUrl.value]);
    };
    const triggerFileInput = () => {
      fileInputRef.value.click();
    };
    const selectFile = async () => {
      const files = fileInputRef.value.files;
      if (!files || !files.length) {
        return;
      }
      let filterFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file2 = files[i];
        const suffix = getSuffix(file2);
        const isMatch = props.allowedFileType && Array.isArray(props.allowedFileType) && props.allowedFileType.length ? props.allowedFileType.some((item) => {
          return item.toLocaleLowerCase() == suffix.toLocaleLowerCase();
        }) : true;
        if (!isMatch) {
          if (typeof props.handleError == "function") {
            props.handleError("suffixError", file2);
          }
          continue;
        }
        if (props.maxSize && file2.size / 1024 > props.maxSize) {
          if (typeof props.handleError == "function") {
            props.handleError("maxSizeError", file2);
          }
          continue;
        }
        if (props.minSize && file2.size / 1024 < props.minSize) {
          if (typeof props.handleError == "function") {
            props.handleError("minSizeError", file2);
          }
          continue;
        }
        filterFiles.push(file2);
      }
      if (filterFiles.length) {
        let urls = [];
        if (typeof props.customUpload == "function") {
          urls = await props.customUpload(filterFiles) || [];
        } else {
          for (let i = 0; i < filterFiles.length; i++) {
            const url = await file.dataFileToBase64(filterFiles[i]);
            urls.push(url);
          }
        }
        emits("insert", attachmentName.value, urls);
      }
      fileInputRef.value.value = "";
    };
    watch(
      () => current.value,
      () => {
        emits("change");
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", {
            onClick: _cache[0] || (_cache[0] = ($event) => current.value = "upload"),
            class: normalizeClass(["editify-attachment-header-item", { "editify-active": current.value == "upload" }]),
            style: normalizeStyle(activeStyle.value("upload"))
          }, toDisplayString(unref($editTrans)("uploadAttachment")), 7),
          createElementVNode("div", {
            onClick: _cache[1] || (_cache[1] = ($event) => current.value = "remote"),
            class: normalizeClass(["editify-attachment-header-item", { "editify-active": current.value == "remote" }]),
            style: normalizeStyle(activeStyle.value("remote"))
          }, toDisplayString(unref($editTrans)("remoteAttachment")), 7),
          createElementVNode("div", {
            class: normalizeClass(["editify-attachment-header-slider", "editify-" + current.value]),
            style: normalizeStyle({ backgroundColor: _ctx.color || "" })
          }, null, 6)
        ]),
        current.value == "remote" ? (openBlock(), createElementBlock("div", _hoisted_3, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => attachmentName.value = $event),
            placeholder: unref($editTrans)("attachmentNamePlaceholder"),
            onBlur: handleInputBlur,
            onFocus: handleInputFocus,
            type: "text"
          }, null, 40, _hoisted_4), [
            [
              vModelText,
              attachmentName.value,
              void 0,
              { trim: true }
            ]
          ]),
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => attachmentUrl.value = $event),
            placeholder: unref($editTrans)("attachmentUrlPlaceholder"),
            onBlur: handleInputBlur,
            onFocus: handleInputFocus,
            type: "url"
          }, null, 40, _hoisted_5), [
            [
              vModelText,
              attachmentUrl.value,
              void 0,
              { trim: true }
            ]
          ]),
          createElementVNode("div", {
            class: "editify-attachment-remote-footer",
            style: normalizeStyle({ color: _ctx.color || "" })
          }, [
            createElementVNode("span", { onClick: insertRemoteAttachment }, toDisplayString(unref($editTrans)("insert")), 1)
          ], 4)
        ])) : (openBlock(), createElementBlock("div", _hoisted_6, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => attachmentName.value = $event),
            placeholder: unref($editTrans)("attachmentNamePlaceholder"),
            onBlur: handleInputBlur,
            onFocus: handleInputFocus,
            type: "text"
          }, null, 40, _hoisted_7), [
            [
              vModelText,
              attachmentName.value,
              void 0,
              { trim: true }
            ]
          ]),
          createElementVNode("div", {
            class: "editify-attachment-btn",
            onClick: triggerFileInput
          }, [
            createVNode(Icon, { value: "upload" }),
            createElementVNode("input", {
              ref_key: "fileInputRef",
              ref: fileInputRef,
              multiple: _ctx.multiple,
              accept: _ctx.accept,
              onChange: selectFile,
              type: "file"
            }, null, 40, _hoisted_8)
          ])
        ]))
      ]);
    };
  }
});
const InsertAttachment = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-52b1e545"]]);
const isAttachment = (element2) => {
  if (element2.isEmpty()) {
    return false;
  }
  return element2.parsedom == "span" && element2.type == "closed" && element2.hasMarks() && element2.marks["data-attachment"];
};
const hasAttachmentInRange = (editor, dataRangeCaches) => {
  if (!editor.range) {
    return false;
  }
  if (editor.range.anchor.isEqual(editor.range.focus)) {
    return isAttachment(editor.range.anchor.element);
  }
  return dataRangeCaches.flatList.some((item) => {
    return isAttachment(item.element);
  });
};
const attachment = (options) => {
  if (!common.isObject(options)) {
    options = {};
  }
  const plugin = (editifyInstance, editTrans) => {
    let isDisabled = false;
    if (editifyInstance.exposed.editor.value) {
      isDisabled = hasPreInRange(editifyInstance.exposed.editor.value, editifyInstance.exposed.dataRangeCaches.value) || hasLinkInRange(editifyInstance.exposed.editor.value, editifyInstance.exposed.dataRangeCaches.value) || hasQuoteInRange(editifyInstance.exposed.editor.value, editifyInstance.exposed.dataRangeCaches.value);
    }
    return {
      name: "attachment",
      //附件菜单项配置
      menu: {
        sequence: options.sequence || 100,
        extraDisabled: (name) => {
          if (name == "link" || name == "quote" || name == "codeBlock") {
            return hasAttachmentInRange(editifyInstance.exposed.editor.value, editifyInstance.exposed.dataRangeCaches.value);
          }
          return false;
        },
        extend: {
          type: "select",
          title: options.title || editTrans("insertAttachment"),
          leftBorder: options.leftBorder,
          rightBorder: options.rightBorder,
          hideScroll: true,
          disabled: isDisabled,
          default: () => h(Icon, { value: "attachment" }),
          layer: (_name, btnInstance) => h(InsertAttachment, {
            color: editifyInstance.props.color,
            accept: options.accept,
            allowedFileType: options.allowedFileType || [],
            multiple: !!options.multiple,
            maxSize: options.maxSize,
            minSize: options.minSize,
            customUpload: options.customUpload,
            handleError: options.handleError,
            onChange: () => {
              btnInstance.$refs.layerRef.setPosition();
            },
            onInsert: (name, urls) => {
              urls = urls.filter((url) => {
                return !!url;
              });
              if (urls.length) {
                const editor = editifyInstance.exposed.editor.value;
                urls.forEach((url) => {
                  const marks = {
                    "data-attachment": url,
                    "data-attachment-name": name || editTrans("attachmentDefaultName"),
                    contenteditable: "false"
                  };
                  const attachmentElement = new AlexElement("closed", "span", marks, null, null);
                  editor.insertElement(attachmentElement);
                  const beforeText = AlexElement.getSpaceElement();
                  const afterText = AlexElement.getSpaceElement();
                  editor.addElementAfter(afterText, attachmentElement);
                  editor.addElementBefore(beforeText, attachmentElement);
                  editor.range.anchor.moveToStart(afterText);
                  editor.range.focus.moveToStart(afterText);
                });
                editor.formatElementStack();
                editor.domRender();
                editor.rangeRender();
              }
              btnInstance.show = false;
            }
          })
        }
      },
      //找到附件元素点击下载
      updateView: () => {
        const editor = editifyInstance.exposed.editor.value;
        AlexElement.flatElements(editor.stack).forEach((el) => {
          if (el.parsedom == "span" && el.hasMarks() && el.marks["data-attachment"]) {
            event.off(el.elm, "click");
            event.on(el.elm, "click", async () => {
              const url = el.marks["data-attachment"];
              const res = await fetch(url, {
                method: "GET"
              });
              const blob = await res.blob();
              const a = document.createElement("a");
              a.setAttribute("target", "_blank");
              a.setAttribute("href", URL.createObjectURL(blob));
              a.setAttribute("download", el.marks["data-attachment-name"]);
              a.click();
            });
          }
        });
      },
      //span含有data-attachment的元素设为自闭合元素
      customParseNode: (el) => {
        if (el.hasMarks() && el.marks["data-attachment"] && el.parsedom == "span") {
          el.type = "closed";
        }
        return el;
      },
      //span元素粘贴保留data-attachment
      pasteKeepMarks: {
        "data-attachment": ["span"],
        "data-attachment-name": ["span"]
      },
      //自定义渲染规范
      renderRule: (el) => {
        if (el.type == "closed" && el.hasMarks() && el.marks["data-attachment"]) {
          el.marks["title"] = editTrans("attachmentDownloadTitle");
          const editor = editifyInstance.exposed.editor.value;
          const previousElement = editor.getPreviousElement(el);
          const newTextElement = editor.getNextElement(el);
          if (!previousElement || !previousElement.isSpaceText()) {
            const spaceText = AlexElement.getSpaceElement();
            editor.addElementBefore(spaceText, el);
          }
          if (!newTextElement || !newTextElement.isSpaceText()) {
            const spaceText = AlexElement.getSpaceElement();
            editor.addElementAfter(spaceText, el);
          }
        }
      }
    };
  };
  return plugin;
};
const install = (app) => {
  app.component(Editify.name, Editify);
};
const version = "0.1.34";
console.log(`%c vue-editify %c v${version} `, "padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;", "padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;");
export {
  AlexElement,
  Editify,
  attachment,
  install as default,
  elementIsInList,
  elementIsInTask,
  getCurrentParsedomElement,
  getParsedomElementByElement,
  getRangeText,
  hasAttachmentInRange,
  hasImageInRange,
  hasLinkInRange,
  hasListInRange,
  hasPreInRange,
  hasQuoteInRange,
  hasTableInRange,
  hasTaskInRange,
  hasVideoInRange,
  insertCodeBlock,
  insertImage,
  insertLink,
  insertTable,
  insertVideo,
  install,
  isAttachment,
  isList,
  isRangeInList,
  isRangeInPre,
  isRangeInQuote,
  isRangeInTask,
  isTask,
  queryTextMark,
  queryTextStyle,
  removeTextMark,
  removeTextStyle,
  setAlign,
  setIndentDecrease,
  setIndentIncrease,
  setLineHeight,
  setList,
  setQuote,
  setTask,
  setTextMark,
  setTextStyle,
  version
};
