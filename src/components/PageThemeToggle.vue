<script setup lang="ts">
import { ref, watch } from 'vue'
import { SunnyFilledIcon, MoonFilledIcon } from 'tdesign-icons-vue-next'

const themeConfigKey = 'theme-mode'

const getUserTheme = (): string => {
  const attr = document.documentElement.getAttribute('theme-mode')

  if (attr) return attr

  const saved = localStorage.getItem(themeConfigKey)

  if (saved) return saved

  return matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyLightTheme = ref(getUserTheme() === 'light')

watch(
  applyLightTheme,
  (isLight) => {
    if (isLight) {
      document.documentElement.removeAttribute('theme-mode')
      localStorage.setItem(themeConfigKey, 'light')
    } else {
      document.documentElement.setAttribute('theme-mode', 'dark')
      localStorage.setItem(themeConfigKey, 'dark')
    }
  },
  { immediate: true },
)
</script>

<template>
  <t-switch class="theme-switch" v-model="applyLightTheme" size="large">
    <template #label="slotProps">
      <template v-if="slotProps.value">
        <sunny-filled-icon class="sun" />
      </template>
      <template v-else>
        <moon-filled-icon class="moon" />
      </template>
    </template>
  </t-switch>
</template>

<style scoped>
.theme-switch :deep(.t-switch__handle) {
  display: none;
}
</style>
