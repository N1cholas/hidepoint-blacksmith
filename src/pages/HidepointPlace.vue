<script setup lang="ts">
import HidepointPlaceLayout from '@/layout/HidepointPlaceLayout'
import InitItem from './hidepointPlace/InitItem.vue'
import { ref } from 'vue'
import CraftingItem from './hidepointPlace/CraftingItem.vue'

const currentStep = ref(0)

const onFinish = () => {
  console.log('完成做装，导出结果')
}
</script>

<template>
  <main class="hp">
    <HidepointPlaceLayout v-model="currentStep" @finish="onFinish">
      <template #step-0>
        <InitItem />
      </template>

      <template #step-1>
        <CraftingItem />
      </template>

      <template #step-2>
        <t-card header="步骤三 · 结果归档">
          <p class="desc">查看结果与导出记录。</p>
          <div class="body">
            <t-button variant="outline" size="small">导出 JSON</t-button>
          </div>
        </t-card>
      </template>
    </HidepointPlaceLayout>
  </main>
</template>

<style scoped>
.hp {
  max-width: 1376px;
  margin: 0 auto;
  padding: 24px 16px 64px;
}
</style>
