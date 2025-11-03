<script setup lang="ts">
import PageHeader from '@/layout/PageHeader.vue'
import PageFooter from '@/layout/PageFooter.vue'
</script>

<template>
  <t-layout class="layout">
    <t-header>
      <PageHeader />
    </t-header>
    <t-content>
      <RouterView />
    </t-content>
    <t-footer>
      <PageFooter />
    </t-footer>
  </t-layout>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: var(--td-bg-color-container);
}
</style>
