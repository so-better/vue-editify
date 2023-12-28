//引入核心库
import hljs from 'highlight.js/lib/core'
//引入语言支持
import plaintext from 'highlight.js/lib/languages/plaintext'
import json from 'highlight.js/lib/languages/json'
import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import php from 'highlight.js/lib/languages/php'
import css from 'highlight.js/lib/languages/css'
import less from 'highlight.js/lib/languages/less'
import scss from 'highlight.js/lib/languages/scss'
import html from 'highlight.js/lib/languages/xml'
import markdown from 'highlight.js/lib/languages/markdown'
import objectivec from 'highlight.js/lib/languages/objectivec'
import swift from 'highlight.js/lib/languages/swift'
import dart from 'highlight.js/lib/languages/dart'
import nginx from 'highlight.js/lib/languages/nginx'
import go from 'highlight.js/lib/languages/go'
import http from 'highlight.js/lib/languages/http'
import ruby from 'highlight.js/lib/languages/ruby'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import sql from 'highlight.js/lib/languages/sql'
import shell from 'highlight.js/lib/languages/shell'
import r from 'highlight.js/lib/languages/r'
import kotlin from 'highlight.js/lib/languages/kotlin'
import rust from 'highlight.js/lib/languages/rust'
//注册语言
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('json', json)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('java', java)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('php', php)
hljs.registerLanguage('css', css)
hljs.registerLanguage('less', less)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('html', html)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('objectivec', objectivec)
hljs.registerLanguage('swift', swift)
hljs.registerLanguage('dart', dart)
hljs.registerLanguage('nginx', nginx)
hljs.registerLanguage('go', go)
hljs.registerLanguage('http', http)
hljs.registerLanguage('ruby', ruby)
hljs.registerLanguage('c', c)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('csharp', csharp)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('r', r)
hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('rust', rust)
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
//可选择语言列表
const languages = [
	{
		label: 'Plain Text',
		value: 'plaintext'
	},
	{
		label: 'JSON',
		value: 'json'
	},
	{
		label: 'JavaScript',
		value: 'javascript'
	},
	{
		label: 'Java',
		value: 'java'
	},
	{
		label: 'TypeScript',
		value: 'typescript'
	},
	{
		label: 'Python',
		value: 'python'
	},
	{
		label: 'PHP',
		value: 'php'
	},
	{
		label: 'CSS',
		value: 'css'
	},
	{
		label: 'Less',
		value: 'less'
	},
	{
		label: 'Scss',
		value: 'scss'
	},
	{
		label: 'HTML',
		value: 'html'
	},
	{
		label: 'Markdown',
		value: 'markdown'
	},
	{
		label: 'Objective-C',
		value: 'objectivec'
	},
	{
		label: 'Swift',
		value: 'swift'
	},
	{
		label: 'Dart',
		value: 'dart'
	},
	{
		label: 'Nginx',
		value: 'nginx'
	},
	{
		label: 'HTTP',
		value: 'http'
	},
	{
		label: 'Go',
		value: 'go'
	},
	{
		label: 'Ruby',
		value: 'ruby'
	},
	{
		label: 'C',
		value: 'c'
	},
	{
		label: 'C++',
		value: 'cpp'
	},
	{
		label: 'C#',
		value: 'csharp'
	},
	{
		label: 'SQL',
		value: 'sql'
	},
	{
		label: 'Shell',
		value: 'shell'
	},
	{
		label: 'R',
		value: 'r'
	},
	{
		label: 'Kotlin',
		value: 'kotlin'
	},
	{
		label: 'Rust',
		value: 'rust'
	}
]

export { getHljsHtml, languages }
