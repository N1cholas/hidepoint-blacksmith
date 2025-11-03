import { createI18n } from 'vue-i18n'
import { useLocalStorage, usePreferredLanguages } from '@vueuse/core'
import en_US from './lang/en_US'
import zh_CN from './lang/zh_CN'

function resolveLocale(): Locale {
  const saved = useLocalStorage('tdesign-starter-locale', 'zh_CN').value as Locale | null

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

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale

  useLocalStorage('tdesign-starter-locale', 'zh_CN').value = locale

  document.documentElement.lang = locale
}

export default i18n
