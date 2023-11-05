import en_US from './en_US'
import zh_CN from './zh_CN'

//翻译词组
const translations = {
	zh_CN,
	en_US
}

export default locale => {
	return key => {
		return translations[locale][key]
	}
}
