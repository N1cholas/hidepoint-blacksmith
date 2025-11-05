import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import enConfig from 'tdesign-vue-next/es/locale/en_US'
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN'
import { localeConfigKey, setI18nLanguage } from '.'

const useLocale = defineStore('locale', () => {
  const i18n = useI18n()

  const locale = computed(() => i18n.locale.value as Locale)

  const setLocale = (locale: Locale) => {
    setI18nLanguage(locale)

    localStorage.setItem(localeConfigKey, locale)
  }

  const componentLocale = computed(() => {
    return locale.value === 'zh_CN' ? zhConfig : enConfig
  })

  return { locale, setLocale, componentLocale }
})

export default useLocale
