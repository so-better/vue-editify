import en_US from './en_US'
import zh_CN from './zh_CN'

class I18n {
	constructor(locale) {
		this.locale = locale
		this.translations = {
			zh_CN,
			en_US
		}
	}

	//翻译函数
	translate(key) {
		return this.translations[this.locale][key]
	}
}

export default I18n
