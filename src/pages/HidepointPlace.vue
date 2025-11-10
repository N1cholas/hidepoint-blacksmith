<script setup lang="ts">
import { ref } from 'vue'
import HidepointPlaceLayout from '@/layout/HidepointPlaceLayout'

const current = ref(0)

const onFinish = () => {
  alert('完成')
}
</script>

<template>
  <main class="hp">
    <HidepointPlaceLayout
      v-model:modelValue="current"
      :titles="['做装初始化', '模拟做装', '结果归档']"
      prev-text="返回上一步"
      next-text="继续"
      finish-text="导出"
      @finish="onFinish"
    >
      <template #step-0>
        <t-card header="步骤一 · 初始化">
          <p class="desc">填写初始装备信息。</p>
          <div class="body">
            <!-- 这里放你的表单/选择项 -->
            <t-button size="small" theme="primary">示例按钮</t-button>
          </div>
        </t-card>
      </template>

      <template #step-1>
        <t-card header="步骤二 · 执行做装">
          <p class="desc">在这里进行做装操作与模拟。</p>
          <div class="body">
            <!-- 操作区 -->
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
