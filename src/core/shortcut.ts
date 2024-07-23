import { platform } from 'dap-util'
import { hasPanelInRange, hasPreInRange, hasTableInRange, setHeading, setQuote } from './function'
import { ShortcutType } from './tool'

const { Mac } = platform.os()

export type ShortcutConfigType = {
	heading: ShortcutType
	quote: ShortcutType
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
	quote: {
		title: 'Shift + Q',
		define: event => {
			return event.key.toLocaleLowerCase() == 'q' && event.shiftKey
		},
		operation: (editor, dataRangeCaches, isSourceView) => {
			if (isSourceView || hasPreInRange(editor, dataRangeCaches) || hasTableInRange(editor, dataRangeCaches) || hasPanelInRange(editor, dataRangeCaches)) {
				return
			}
			setQuote(editor, dataRangeCaches)
			editor.domRender()
			editor.rangeRender()
		}
	}
}
