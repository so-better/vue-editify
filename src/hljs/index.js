//引入核心库
import hljs from 'highlight.js/lib/core'
//引入语言支持
import plaintext from 'highlight.js/lib/languages/plaintext'
import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'
import typescript from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import markdown from 'highlight.js/lib/languages/markdown'
import css from 'highlight.js/lib/languages/css'
import less from 'highlight.js/lib/languages/less'
import scss from 'highlight.js/lib/languages/scss'
import objectivec from 'highlight.js/lib/languages/objectivec'
import swift from 'highlight.js/lib/languages/swift'
import dart from 'highlight.js/lib/languages/dart'
import nginx from 'highlight.js/lib/languages/nginx'
import php from 'highlight.js/lib/languages/php'
import python from 'highlight.js/lib/languages/python'
//注册语言
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('java', java)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('html', html)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('css', css)
hljs.registerLanguage('less', less)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('objectivec', objectivec)
hljs.registerLanguage('swift', swift)
hljs.registerLanguage('dart', dart)
hljs.registerLanguage('nginx', nginx)
hljs.registerLanguage('php', php)
hljs.registerLanguage('python', python)
//引入css样式主题
import '../css/hljs.less'
//import 'highlight.js/styles/github.css'
//import 'highlight.js/styles/atom-one-light.css'
//import 'highlight.js/styles/lightfair.css'
//import 'highlight.js/styles/color-brewer.css'
//全局设置
hljs.configure({
	cssSelector: 'pre',
	classPrefix: 'editify-hljs-',
	ignoreUnescapedHTML: true
})

//获取经过hljs处理的html元素
const getHljsHtml = function (code, language) {
	if (language) {
		return hljs.highlight(code, {
			language: language,
			ignoreIllegals: true
		}).value
	}
	return hljs.highlightAuto(code).value
}
const languages = ['plaintext', 'javascript', 'html', 'css', 'less', 'scss', 'java', 'markdown', 'swift', 'objectivec', 'typescript', 'dart', 'nginx', 'php', 'python']

export { getHljsHtml, languages }
