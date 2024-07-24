import { platform } from 'dap-util'
import { hasPanelInRange, hasPreInRange, hasTableInRange, insertSeparator, queryTextMark, queryTextStyle, removeTextMark, removeTextStyle, setAlign, setHeading, setIndentDecrease, setIndentIncrease, setList, setQuote, setTask, setTextMark, setTextStyle } from './function'
import { ShortcutType } from './tool'

const { Mac } = platform.os()

export type ShortcutConfigType = {
	heading: ShortcutType
	indent: ShortcutType
	quote: ShortcutType
	separator: ShortcutType
	align: ShortcutType
	orderList: ShortcutType
	unorderList: ShortcutType
	task: ShortcutType
	bold: ShortcutType
	underline: ShortcutType
	italic: ShortcutType
	strikethrough: ShortcutType
	code: ShortcutType
	super: ShortcutType
	sub: ShortcutType
	formatClear: ShortcutType
	fontSize: ShortcutType
	fontFamily: ShortcutType
	lineHeight: ShortcutType
	foreColor: ShortcutType
	backColor: ShortcutType
	link: ShortcutType
	image: ShortcutType
	video: ShortcutType
	table: ShortcutType
	codeBlock: ShortcutType
	sourceView: ShortcutType
	fullScreen: ShortcutType
	attachment: ShortcutType
	mathformula: ShortcutType
	panel: ShortcutType
	infoBlock: ShortcutType
}

export const config: ShortcutConfigType = {
	heading: {
		title: `${Mac ? 'Command' : 'Ctrl'} + [0-6]`,
		define: event => {
			return {
				p: event.key.toLocaleLowerCase() == '0' && (Mac ? event.metaKey : event.ctrlKey),
				h1: event.key.toLocaleLowerCase() == '1' && (Mac ? event.metaKey : event.ctrlKey),
				h2: event.key.toLocaleLowerCase() == '2' && (Mac ? event.metaKey : event.ctrlKey),
				h3: event.key.toLocaleLowerCase() == '3' && (Mac ? event.metaKey : event.ctrlKey),
				h4: event.key.toLocaleLowerCase() == '4' && (Mac ? event.metaKey : event.ctrlKey),
				h5: event.key.toLocaleLowerCase() == '5' && (Mac ? event.metaKey : event.ctrlKey),
				h6: event.key.toLocaleLowerCase() == '6' && (Mac ? event.metaKey : event.ctrlKey)
			}
		},
		operation: (editor, dataRangeCaches, isSourceView, code) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches) || hasTableInRange(editor, dataRangeCaches) || hasPanelInRange(editor, dataRangeCaches)) {
				return
			}
			setHeading(editor, dataRangeCaches, code!)
			editor.domRender()
			editor.rangeRender()
		}
	},
	indent: {
		title: `Tab / Shift + Tab`,
		define: event => {
			return {
				'indent-increase': event.key.toLocaleLowerCase() == 'tab' && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey,
				'indent-decrease': event.key.toLocaleLowerCase() == 'tab' && event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey
			}
		},
		operation: (editor, dataRangeCaches, isSourceView, code) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches) || hasTableInRange(editor, dataRangeCaches)) {
				return
			}
			//增加缩进
			if (code == 'indent-increase') {
				setIndentIncrease(editor, dataRangeCaches)
			}
			//减少缩进
			else if (code == 'indent-decrease') {
				setIndentDecrease(editor, dataRangeCaches)
			}
			editor.domRender()
			editor.rangeRender()
		}
	},
	quote: {
		title: `${Mac ? 'Command' : 'Ctrl'} + E`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'e' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches) || hasTableInRange(editor, dataRangeCaches) || hasPanelInRange(editor, dataRangeCaches)) {
				return
			}
			setQuote(editor, dataRangeCaches)
			editor.domRender()
			editor.rangeRender()
		}
	},
	separator: {
		title: `${Mac ? 'Command' : 'Ctrl'} + Y`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'y' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches)) {
				return
			}
			insertSeparator(editor)
			editor.domRender()
			editor.rangeRender()
		}
	},
	align: {
		title: `${Mac ? 'Command' : 'Ctrl'} + [U/I/O/P]`,
		define: event => {
			return {
				left: event.key.toLocaleLowerCase() == 'u' && (Mac ? event.metaKey : event.ctrlKey),
				right: event.key.toLocaleLowerCase() == 'i' && (Mac ? event.metaKey : event.ctrlKey),
				center: event.key.toLocaleLowerCase() == 'o' && (Mac ? event.metaKey : event.ctrlKey),
				justify: event.key.toLocaleLowerCase() == 'p' && (Mac ? event.metaKey : event.ctrlKey)
			}
		},
		operation: (editor, dataRangeCaches, isSourceView, code) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches)) {
				return
			}
			setAlign(editor, dataRangeCaches, code as 'left' | 'right' | 'center' | 'justify')
			editor.domRender()
			editor.rangeRender()
		}
	},
	orderList: {
		title: `${Mac ? 'Command' : 'Ctrl'} + D`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'd' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches) || hasTableInRange(editor, dataRangeCaches) || hasPanelInRange(editor, dataRangeCaches)) {
				return
			}
			setList(editor, dataRangeCaches, true)
			editor.domRender()
			editor.rangeRender()
		}
	},
	unorderList: {
		title: `${Mac ? 'Command' : 'Ctrl'} + G`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'g' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches) || hasTableInRange(editor, dataRangeCaches) || hasPanelInRange(editor, dataRangeCaches)) {
				return
			}
			setList(editor, dataRangeCaches, false)
			editor.domRender()
			editor.rangeRender()
		}
	},
	task: {
		title: `${Mac ? 'Command' : 'Ctrl'} + H`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'h' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches) || hasTableInRange(editor, dataRangeCaches) || hasPanelInRange(editor, dataRangeCaches)) {
				return
			}
			setTask(editor, dataRangeCaches)
			editor.domRender()
			editor.rangeRender()
		}
	},
	bold: {
		title: `${Mac ? 'Command' : 'Ctrl'} + J`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'j' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches)) {
				return
			}
			const active = queryTextStyle(editor, dataRangeCaches, 'font-weight', 'bold') || queryTextStyle(editor, dataRangeCaches, 'font-weight', '700')
			if (active) {
				removeTextStyle(editor, dataRangeCaches, ['font-weight'])
			} else {
				setTextStyle(editor, dataRangeCaches, {
					'font-weight': 'bold'
				})
			}
			editor.domRender()
			editor.rangeRender()
		}
	},
	underline: {
		title: `${Mac ? 'Command' : 'Ctrl'} + K`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'k' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches)) {
				return
			}
			const active = queryTextStyle(editor, dataRangeCaches, 'text-decoration', 'underline') || queryTextStyle(editor, dataRangeCaches, 'text-decoration-line', 'underline')
			if (active) {
				removeTextStyle(editor, dataRangeCaches, ['text-decoration', 'text-decoration-line'])
			} else {
				setTextStyle(editor, dataRangeCaches, {
					'text-decoration': 'underline'
				})
			}
			editor.domRender()
			editor.rangeRender()
		}
	},
	italic: {
		title: `${Mac ? 'Command' : 'Ctrl'} + L`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'l' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches)) {
				return
			}
			const active = queryTextStyle(editor, dataRangeCaches, 'text-decoration', 'underline') || queryTextStyle(editor, dataRangeCaches, 'font-style', 'italic')
			if (active) {
				removeTextStyle(editor, dataRangeCaches, ['font-style'])
			} else {
				setTextStyle(editor, dataRangeCaches, {
					'font-style': 'italic'
				})
			}
			editor.domRender()
			editor.rangeRender()
		}
	},
	strikethrough: {
		title: `${Mac ? 'Command' : 'Ctrl'} + B`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'b' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches)) {
				return
			}
			const active = queryTextStyle(editor, dataRangeCaches, 'text-decoration', 'line-through') || queryTextStyle(editor, dataRangeCaches, 'text-decoration-line', 'line-through')
			if (active) {
				removeTextStyle(editor, dataRangeCaches, ['text-decoration', 'text-decoration-line'])
			} else {
				setTextStyle(editor, dataRangeCaches, {
					'text-decoration': 'line-through'
				})
			}
			editor.domRender()
			editor.rangeRender()
		}
	},
	code: {
		title: `${Mac ? 'Command' : 'Ctrl'} + M`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'm' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches)) {
				return
			}
			const active = queryTextMark(editor, dataRangeCaches, 'data-editify-code')
			if (active) {
				removeTextMark(editor, dataRangeCaches, ['data-editify-code'])
			} else {
				setTextMark(editor, dataRangeCaches, {
					'data-editify-code': true
				})
			}
			editor.domRender()
			editor.rangeRender()
		}
	},
	super: {
		title: `${Mac ? 'Command' : 'Ctrl'} + ;`,
		define: event => {
			return event.key.toLocaleLowerCase() == ';' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches)) {
				return
			}
			const active = queryTextStyle(editor, dataRangeCaches, 'vertical-align', 'super')
			if (active) {
				removeTextStyle(editor, dataRangeCaches, ['vertical-align'])
			} else {
				setTextStyle(editor, dataRangeCaches, {
					'vertical-align': 'super'
				})
			}
			editor.domRender()
			editor.rangeRender()
		}
	},
	sub: {
		title: `${Mac ? 'Command' : 'Ctrl'} + '`,
		define: event => {
			return event.key.toLocaleLowerCase() == "'" && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches)) {
				return
			}
			const active = queryTextStyle(editor, dataRangeCaches, 'vertical-align', 'sub')
			if (active) {
				removeTextStyle(editor, dataRangeCaches, ['vertical-align'])
			} else {
				setTextStyle(editor, dataRangeCaches, {
					'vertical-align': 'sub'
				})
			}
			editor.domRender()
			editor.rangeRender()
		}
	},
	formatClear: {
		title: `${Mac ? 'Command' : 'Ctrl'} + Enter`,
		define: event => {
			return event.key.toLocaleLowerCase() == 'enter' && (Mac ? event.metaKey : event.ctrlKey)
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches)) {
				return
			}
			removeTextStyle(editor, dataRangeCaches)
			removeTextMark(editor, dataRangeCaches)
			editor.domRender()
			editor.rangeRender()
		}
	},
	fontSize: {
		title: '',
		define: null
	},
	fontFamily: {
		title: '',
		define: null
	},
	lineHeight: {
		title: '',
		define: null
	},
	foreColor: {
		title: '',
		define: null
	},
	backColor: {
		title: '',
		define: null
	},
	link: {
		title: '',
		define: null
	},
	image: {
		title: '',
		define: null
	},
	video: {
		title: '',
		define: null
	},
	table: {
		title: '',
		define: null
	},
	codeBlock: {
		title: '',
		define: null
	},
	sourceView: {
		title: '',
		define: null
	},
	fullScreen: {
		title: '',
		define: null
	},
	attachment: {
		title: '',
		define: null
	},
	mathformula: {
		title: '',
		define: null
	},
	panel: {
		title: '',
		define: null
	},
	infoBlock: {
		title: '',
		define: null
	}
}
