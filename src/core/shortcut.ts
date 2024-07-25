import { platform } from 'dap-util'
import { hasPreInRange, hasTableInRange, setHeading, setIndentDecrease, setIndentIncrease } from './function'
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
	infoBlock: ShortcutType
}

export const config: ShortcutConfigType = {
	heading: {
		title: `${Mac ? 'Command' : 'Ctrl'} + [1-7]`,
		define: event => {
			return {
				h1: event.key.toLocaleLowerCase() == '1' && (Mac ? event.metaKey : event.ctrlKey),
				h2: event.key.toLocaleLowerCase() == '2' && (Mac ? event.metaKey : event.ctrlKey),
				h3: event.key.toLocaleLowerCase() == '3' && (Mac ? event.metaKey : event.ctrlKey),
				h4: event.key.toLocaleLowerCase() == '4' && (Mac ? event.metaKey : event.ctrlKey),
				h5: event.key.toLocaleLowerCase() == '5' && (Mac ? event.metaKey : event.ctrlKey),
				h6: event.key.toLocaleLowerCase() == '6' && (Mac ? event.metaKey : event.ctrlKey),
				p: event.key.toLocaleLowerCase() == '7' && (Mac ? event.metaKey : event.ctrlKey)
			}
		},
		operation: (editor, dataRangeCaches, isSourceView, _isFullScreen, code) => {
			if (isSourceView.value || hasPreInRange(editor, dataRangeCaches) || hasTableInRange(editor, dataRangeCaches)) {
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
		operation: (editor, dataRangeCaches, isSourceView, _isFullScreen, code) => {
			if (isSourceView.value || hasPreInRange(editor, dataRangeCaches) || hasTableInRange(editor, dataRangeCaches)) {
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
		define: event => event.key.toLocaleLowerCase() == 'e' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	separator: {
		title: '',
		define: null,
		operation: null
	},
	align: {
		title: '',
		define: null,
		operation: null
	},
	orderList: {
		title: `${Mac ? 'Command' : 'Ctrl'} + O`,
		define: event => event.key.toLocaleLowerCase() == 'o' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	unorderList: {
		title: `${Mac ? 'Command' : 'Ctrl'} + U`,
		define: event => event.key.toLocaleLowerCase() == 'u' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	task: {
		title: `${Mac ? 'Command' : 'Ctrl'} + I`,
		define: event => event.key.toLocaleLowerCase() == 'i' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	bold: {
		title: `${Mac ? 'Command' : 'Ctrl'} + B`,
		define: event => event.key.toLocaleLowerCase() == 'b' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	underline: {
		title: `${Mac ? 'Command' : 'Ctrl'} + G`,
		define: event => event.key.toLocaleLowerCase() == 'g' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	italic: {
		title: `${Mac ? 'Command' : 'Ctrl'} + H`,
		define: event => event.key.toLocaleLowerCase() == 'h' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	strikethrough: {
		title: `${Mac ? 'Command' : 'Ctrl'} + J`,
		define: event => event.key.toLocaleLowerCase() == 'j' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	code: {
		title: `${Mac ? 'Command' : 'Ctrl'} + K`,
		define: event => event.key.toLocaleLowerCase() == 'k' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	super: {
		title: `${Mac ? 'Command' : 'Ctrl'} + L`,
		define: event => event.key.toLocaleLowerCase() == 'l' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	sub: {
		title: `${Mac ? 'Command' : 'Ctrl'} + M`,
		define: event => event.key.toLocaleLowerCase() == 'm' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	formatClear: {
		title: `${Mac ? 'Command' : 'Ctrl'} + Enter`,
		define: event => event.key.toLocaleLowerCase() == 'enter' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	fontSize: {
		title: '',
		define: null,
		operation: null
	},
	fontFamily: {
		title: '',
		define: null,
		operation: null
	},
	lineHeight: {
		title: '',
		define: null,
		operation: null
	},
	foreColor: {
		title: '',
		define: null,
		operation: null
	},
	backColor: {
		title: '',
		define: null,
		operation: null
	},
	link: {
		title: '',
		define: null,
		operation: null
	},
	image: {
		title: '',
		define: null,
		operation: null
	},
	video: {
		title: '',
		define: null,
		operation: null
	},
	table: {
		title: '',
		define: null,
		operation: null
	},
	codeBlock: {
		title: `${Mac ? 'Command' : 'Ctrl'} + P`,
		define: event => event.key.toLocaleLowerCase() == 'p' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	sourceView: {
		title: `${Mac ? 'Command' : 'Ctrl'} + 8`,
		define: event => event.key.toLocaleLowerCase() == '8' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	fullScreen: {
		title: `${Mac ? 'Command' : 'Ctrl'} + 9`,
		define: event => event.key.toLocaleLowerCase() == '9' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	},
	attachment: {
		title: '',
		define: null,
		operation: null
	},
	mathformula: {
		title: '',
		define: null,
		operation: null
	},
	infoBlock: {
		title: `${Mac ? 'Command' : 'Ctrl'} + 0`,
		define: event => event.key.toLocaleLowerCase() == '0' && (Mac ? event.metaKey : event.ctrlKey),
		operation: null
	}
}
