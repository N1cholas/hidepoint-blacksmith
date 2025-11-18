<script setup lang="ts">
import HidepointPlaceLayout from '@/layout/HidepointPlaceLayout'
import InitItem from './hidepointPlace/InitItem.vue'
import { ref } from 'vue'

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
        <t-card header="步骤二 · 执行做装">
          <p class="desc">在这里进行做装操作与模拟。</p>
          <div class="body">
            <t-space>
              <t-button size="small">蜕变石</t-button>
              <t-button size="small">增幅石</t-button>
              <t-button size="small" theme="primary">崇高石</t-button>
            </t-space>
          </div>
        </t-card>
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
