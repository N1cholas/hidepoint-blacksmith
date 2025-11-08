<script setup lang="ts">
import { t } from '@/locales'
import { routes } from '@/router'
import { computed, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AppThemeToggle from '@/layout/AppLayout/AppThemeToggle.vue'
import AppTranslate from '@/layout/AppLayout/AppTranslate.vue'
import AppLogo from '@/layout/AppLayout/AppLogo.vue'

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
      <t-head-menu v-model="routePath" class="menu">
        <template #operations>
          <RouterLink v-for="route in menuRoutes" :to="route.path" :key="route.name">
            {{ route.label }}
          </RouterLink>
          <t-divider layout="vertical" />
          <app-translate />
          <t-divider layout="vertical" />
          <app-theme-toggle />
        </template>
      </t-head-menu>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1376px;
  margin: 0 auto;
}

.menu.t-menu {
  background-color: transparent;
}

.logo {
  display: flex;
  align-items: center;
}

a {
  color: var(--td-text-color-primary);
  font-weight: 600;
  padding: 19px var(--td-size-5);
  transition: color 0.25s;
  line-height: 1;
  box-sizing: border-box;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

a:hover {
  color: var(--td-brand-color-5);
}

a.router-link-active {
  color: var(--td-brand-color-5);
  border-bottom-color: var(--td-brand-color-5);
}
</style>
