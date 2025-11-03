import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALE_STORE_KEY } from '.'
import enConfig from 'tdesign-vue-next/es/locale/en_US'
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN'

const useLocale = defineStore('locale', () => {
  const i18n = useI18n()

  const locale = computed(() => i18n.locale.value as Locale)

  const setLocale = (locale: Locale) => {
    i18n.locale.value = locale

    useLocalStorage(LOCALE_STORE_KEY, 'zh_CN').value = locale
  }

  const componentLocale = computed(() => {
    return locale.value === 'zh_CN' ? zhConfig : enConfig
  })

  return { locale, setLocale, componentLocale }
})

export default useLocale
