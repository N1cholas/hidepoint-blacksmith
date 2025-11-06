<script setup lang="ts">
import useLocale from '@/locales/useLocale'
import { TranslateIcon } from 'tdesign-icons-vue-next'

const locale = useLocale()

const toggleLocale = () => {
  locale.setLocale(locale.locale === 'zh_CN' ? 'en_US' : 'zh_CN')
}
</script>

<template>
  <div @click="toggleLocale" class="locale">
    <TranslateIcon size="24" />
  </div>
</template>

<style scoped>
.locale {
  display: inline-flex;
  color: var(--td-text-color-primary);
  border-radius: var(--td-radius-default);
  transition: 0.2s linear;
  width: var(--td-size-10);
  height: var(--td-size-10);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}

.locale:hover {
  background-color: var(--td-bg-color-secondarycontainer-hover);
}
</style>
