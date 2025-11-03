import { createI18n } from 'vue-i18n'
import { useLocalStorage, usePreferredLanguages } from '@vueuse/core'
import en_US from './lang/en_US'
import zh_CN from './lang/zh_CN'

export const LOCALE_STORE_KEY = 'tdesign-starter-locale'

const resolveLocale = (): Locale => {
  const saved = useLocalStorage<Locale>(LOCALE_STORE_KEY, 'zh_CN').value

  if (saved) return saved

  const sys = usePreferredLanguages().value[0] || 'zh_CN'

  return sys.startsWith('zh') ? 'zh_CN' : 'en_US'
}

export const i18n = createI18n({
  legacy: false,
  locale: resolveLocale(),
  fallbackLocale: 'zh_CN',
  messages: {
    en_US,
    zh_CN,
  },
})

export const { t } = i18n.global

export default i18n
