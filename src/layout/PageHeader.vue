<script setup lang="ts">
import { t } from '@/locales'
import { routes } from '@/router'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PageThemeToggle from '@/components/PageThemeToggle.vue'
import PageTranslate from '@/components/PageTranslate.vue'

const router = useRouter()

const routePath = ref('/')

const menuRoutes = computed(() =>
  routes.map((r) => ({
    ...r,
    label: t(r.meta?.titleKey as string),
  })),
)

watch(routePath, () => {
  router.push(routePath.value)
})
</script>

<template>
  <header class="header">
    <div class="logo">
      <img src="https://www.tencent.com/img/index/menu_logo_hover.png" width="136" />
    </div>
    <div class="nav">
      <t-head-menu v-model="routePath" class="header">
        <t-menu-item v-for="route in menuRoutes" :key="route.path" :value="route.path">
          <t-typography-title level="h6">{{ route.label }}</t-typography-title>
        </t-menu-item>
        <t-divider layout="vertical" />
        <page-translate />
        <t-divider layout="vertical" />
        <!-- theme持久化 -->
        <page-theme-toggle />
      </t-head-menu>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--td-size-8);
  box-shadow: var(--td-shadow-inset-bottom);
  font-weight: 600;
}

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
