<script setup lang="ts">
import { t } from '@/locales'
import { routes } from '@/router'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppThemeToggle from '@/layout/AppHeader/AppThemeToggle.vue'
import AppTranslate from '@/layout/AppHeader/AppTranslate.vue'
import AppLogo from '@/layout/AppHeader/AppLogo.vue'

// 导航改为routerlink
const router = useRouter()

const routePath = ref('/')

const menuRoutes = computed(() =>
  routes.map((r) => ({
    ...r,
    label: t(r.meta?.titleKey as string),
  })),
)

watch(
  routePath,
  () => {
    router.push(routePath.value)
  },
  { immediate: true },
)
</script>

<template>
  <header class="header">
    <AppLogo />
    <div class="nav">
      <t-head-menu v-model="routePath" class="header">
        <t-menu-item v-for="route in menuRoutes" :key="route.path" :value="route.path">
          <t-typography-title level="h6">{{ route.label }}</t-typography-title>
        </t-menu-item>
        <t-divider layout="vertical" />
        <app-translate />
        <t-divider layout="vertical" />
        <app-theme-toggle />
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

.logo {
  display: flex;
  align-items: center;
}
</style>
