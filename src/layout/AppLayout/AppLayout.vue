<script setup lang="ts">
import AppHeader from '@/layout/AppLayout/AppHeader.vue'
import AppFooter from '@/layout/AppLayout/AppFooter.vue'
import useLocale from '@/locales/useLocale'

const locale = useLocale()
</script>

<template>
  <t-config-provider :global-config="locale.componentLocale">
    <t-layout class="app-content-wrapper">
      <t-header class="app-header">
        <app-header />
      </t-header>
      <t-content>
        <slot></slot>
      </t-content>
      <t-footer class="app-footer">
        <app-footer />
      </t-footer>
    </t-layout>
  </t-config-provider>
</template>

<style scoped>
.app-content-wrapper {
  min-height: 100vh;
  background-color: var(--tf-bg-color-primary);
}

.app-header {
  box-shadow: var(--td-shadow-inset-bottom);
}

.app-footer {
  margin-top: 42px;
  background-color: var(--tf-bg-color-secondary);
}
</style>
