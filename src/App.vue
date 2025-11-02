<template>
  <t-select v-model="lang" autoWidth>
    <t-option autoWidth key="en_US" label="English" value="en_US" />
    <t-option autoWidth key="zh_CN" label="简体中文" value="zh_CN" />
  </t-select>
  <t-config-provider :global-config="config">
    <div style="width: 480px">
      <t-dialog
        :header="t('common.title')"
        :body="t('common.content')"
        mode="normal"
        theme="default"
        visible
      />
    </div>
  </t-config-provider>
</template>

<script setup lang="ts">
import enConfig from 'tdesign-vue-next/es/locale/en_US'
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN'
import { useI18n } from 'vue-i18n'
import { computed, ref, watch } from 'vue'
import { setLocale, type Locale } from './locales'

const { t } = useI18n()
const { locale } = useI18n({ useScope: 'global' })

const config = computed(() => {
  return locale.value === 'zh_CN' ? zhConfig : enConfig
})

const lang = ref<Locale>(locale.value as Locale)

watch(lang, () => {
  return setLocale(lang.value as Locale)
})
</script>
