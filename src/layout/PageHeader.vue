<script setup lang="ts">
import { routes } from '@/router'
import IconTranslate from '@/styles/icons/IconTranslate.vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const routePath = ref('/')

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
        <t-menu-item v-for="route in routes" :key="route.path" :value="route.path">
          <span>{{ route.name }}</span>
        </t-menu-item>
        <div class="icon-wrapper">
          <IconTranslate />
        </div>
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

.icon-wrapper {
  display: inline-flex;
  color: var(--td-text-color-primary);
  border-radius: var(--td-radius-default);
  transition: 0.2s linear;
  width: var(--td-size-10);
  height: var(--td-size-10);
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-wrapper:hover {
  background-color: var(--td-gray-color-1);
}
</style>
