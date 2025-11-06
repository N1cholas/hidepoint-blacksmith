<script setup lang="ts">
import AppHeader from '@/layout/AppHeader.vue'
import AppFooter from '@/layout/AppFooter.vue'
import useLocale from './locales/useLocale'

const locale = useLocale()
</script>

<template>
  <t-config-provider :global-config="locale.componentLocale">
    <t-layout class="layout">
      <t-header>
        <app-header />
      </t-header>
      <t-content>
        <RouterView />
      </t-content>
      <t-footer>
        <app-footer />
      </t-footer>
    </t-layout>
  </t-config-provider>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: var(--td-bg-color-container);
}
</style>
