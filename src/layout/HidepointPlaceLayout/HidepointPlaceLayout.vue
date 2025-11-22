<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    /* 初始步骤（未使用 v-model 时） */
    initial?: number
    /* 步骤标题 */
    titles?: [string, string, string]
    /* 按钮文案 */
    prevText?: string
    nextText?: string
    finishText?: string
    /* 底部工具条吸底 */
    stickyFooter?: boolean
    /* 当前步骤（受控模式） */
    modelValue?: number
  }>(),
  {
    initial: 0,
    titles: () => ['设置初始状态', '开始做装', '做装过程'],
    prevText: '上一步',
    nextText: '下一步',
    finishText: '完成',
    stickyFooter: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'finish'): void
}>()

// 步骤状态（支持受控模式）
const step = ref<number>(props.modelValue ?? props.initial)
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal != null) step.value = newVal
  },
)

// 最大步骤索引
const maxIndex = computed(() => props.titles.length - 1)

// 是否为第一步/最后一步
const isFirst = computed(() => step.value === 0)
const isLast = computed(() => step.value === maxIndex.value)

// 步骤切换逻辑
function prev() {
  if (step.value > 0) updateStep(step.value - 1)
}
function next() {
  if (step.value < maxIndex.value) updateStep(step.value + 1)
  else emit('finish') // 最后一步触发完成事件
}
function updateStep(newStep: number) {
  step.value = newStep
  emit('update:modelValue', newStep)
}

// 插槽管理
const slots = useSlots()
function namedExists(name: string) {
  return !!slots[name]
}
</script>

<template>
  <div class="hidepoint-layout">
    <!-- 步骤标题 -->
    <t-steps :current="step" theme="default" class="steps">
      <t-step-item :title="titles[0]" />
      <t-step-item :title="titles[1]" />
      <t-step-item :title="titles[2]" />
    </t-steps>

    <!-- 步骤内容 -->
    <section class="content">
      <slot v-if="!namedExists(`step-${step}`)" />
      <slot v-else :name="`step-${step}`" />
    </section>

    <!-- 底部工具栏 -->
    <footer class="footer" :class="{ sticky: props.stickyFooter }">
      <t-space>
        <t-button v-if="!isFirst" variant="outline" @click="prev">
          {{ props.prevText }}
        </t-button>
        <t-button v-if="!isLast" theme="primary" @click="next">
          {{ props.nextText }}
        </t-button>
        <t-button v-else theme="success" @click="next">
          {{ props.finishText }}
        </t-button>
      </t-space>
    </footer>
  </div>
</template>

<style scoped>
.hidepoint-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex: 1;
  padding: 16px;
}

.footer {
  padding: 16px;
  border-top: 1px solid var(--td-border-level-1-color);
  background: var(--td-bg-color-container);
}

.footer.sticky {
  position: sticky;
  bottom: 0;
  z-index: 10;
}
</style>
