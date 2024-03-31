import { en_US } from './en_US'
import { zh_CN } from './zh_CN'

//语言类型
export type LocaleType = 'zh_CN' | 'en_US'

//翻译方法
export const trans = (locale: LocaleType) => {
	return (key: string) => {
		return { zh_CN, en_US }[locale][key]
	}
}
