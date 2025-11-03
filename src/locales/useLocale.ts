import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const useLocale = defineStore('locale', () => {
  const i18n = useI18n()

  const locale = ref<Locale>(i18n.locale.value as Locale)

  return { locale }
})

export default useLocale
