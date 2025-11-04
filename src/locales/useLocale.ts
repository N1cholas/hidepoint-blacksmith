import { useLocalStorage } from '@vueuse/core'
import type { GlobalConfigProvider } from 'tdesign-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { langCode, localeConfigKey } from '@/locales/index'

export function useLocale() {
  const { locale, getLocaleMessage } = useI18n({ useScope: 'global' })
  function changeLocale(lang: string) {
    if (!langCode.includes(lang)) {
      lang = 'zh_CN'
    }

    locale.value = lang
    useLocalStorage(localeConfigKey, 'zh_CN').value = lang
  }

  const getComponentsLocale = computed(() => {
    return (getLocaleMessage(locale.value) as any).componentsLocale as GlobalConfigProvider
  })

  return {
    changeLocale,
    getComponentsLocale,
    locale,
  }
}
