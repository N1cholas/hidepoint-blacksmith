import { usePreferredLanguages } from '@vueuse/core'
import { createI18n } from 'vue-i18n'
import en_US from './lang/en_US'
import zh_CN from './lang/zh_CN'

export const langCode: Locale[] = ['zh_CN', 'en_US'] as const

export const localeConfigKey = 'tdesign-starter-locale'

const readSavedLocale = (): Locale | null => {
  const raw = window.localStorage.getItem(localeConfigKey) as Locale

  return raw && langCode.includes(raw) ? raw : null
}

const detectSystemLocale = (): Locale => {
  const langs = usePreferredLanguages().value

  return langs[0]?.startsWith('zh') ? 'zh_CN' : 'en_US'
}

export const setI18nLanguage = (locale: Locale) => {
  i18n.global.locale.value = locale

  document.documentElement.lang = locale.replace('_', '-')

  const l = document.documentElement.lang

  const rtlPrefixes = ['ar', 'he', 'fa', 'ur']

  document.documentElement.dir = rtlPrefixes.some((p) => l.startsWith(p)) ? 'rtl' : 'ltr'
}

export const i18n = createI18n({
  legacy: false,
  locale: readSavedLocale() || detectSystemLocale(),
  messages: {
    en_US,
    zh_CN,
  },
  datetimeFormats: {
    en_US: {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      },
    },
    zh_CN: {
      short: { year: 'numeric', month: 'numeric', day: 'numeric' },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      },
    },
  },
  numberFormats: {
    en_US: {
      currency: { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' },
    },
    zh_CN: {
      currency: { style: 'currency', currency: 'CNY', currencyDisplay: 'symbol' },
    },
  },
})

export const { t } = i18n.global

export default i18n
