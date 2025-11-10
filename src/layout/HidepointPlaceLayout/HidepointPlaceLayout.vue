<script setup lang="ts">
import { computed, ref, watch, useSlots, defineExpose } from 'vue'

const props = withDefaults(
  defineProps<{
    /* v-model:step 当前步骤索引 */
    modelValue?: number
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
  (e: 'update:modelValue', v: number): void
  (e: 'finish'): void
  (e: 'change', v: number): void
}>()

// 步骤状态（受控/非受控）
const step = ref<number>(props.modelValue ?? props.initial)
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) step.value = v!
  },
)
watch(step, (v) => {
  if (props.modelValue !== undefined) emit('update:modelValue', v)
  emit('change', v)
})

const maxIndex = 2
const isFirst = computed(() => step.value === 0)
const isLast = computed(() => step.value === maxIndex)

function prev() {
  if (!isFirst.value) step.value--
}
function next() {
  if (!isLast.value) step.value++
}
function finish() {
  emit('finish')
}

defineExpose({ prev, next, finish, step })

// 插槽存在性检测（命名插槽：step-0/1/2）
const slots = useSlots()
const namedExists = (name: string) => Boolean(slots[name])
</script>

<template>
  <main class="hp-layout">
    <!-- 步骤条 -->
    <t-steps :current="step" theme="default" class="steps">
      <t-step-item :title="titles[0]" />
      <t-step-item :title="titles[1]" />
      <t-step-item :title="titles[2]" />
    </t-steps>

    <!-- 步骤内容：命名插槽优先，未提供则用默认插槽（传 step） -->
    <section v-for="i in 3" :key="i" v-show="step === i - 1" class="step">
      <slot v-if="namedExists(`step-${i - 1}`)" :name="`step-${i - 1}`" :step="step" />
      <slot v-else :step="step"></slot>
    </section>

    <!-- 底部控制 -->
    <footer class="footer" :class="{ 'footer--sticky': stickyFooter }">
      <t-space>
        <t-button variant="outline" :disabled="isFirst" @click="prev">{{ prevText }}</t-button>
        <t-button v-if="!isLast" theme="primary" @click="next">{{ nextText }}</t-button>
        <t-button v-else theme="primary" @click="finish">{{ finishText }}</t-button>
      </t-space>
    </footer>
  </main>
</template>

<style scoped>
.steps {
  margin-bottom: 16px;
}
.step {
  margin-bottom: 16px;
}
.footer {
  padding: 10px 12px;
  background: var(--td-bg-color-container);
  border: 1px solid var(--td-border-level-1-color);
  border-radius: var(--td-radius-extraLarge);
}
.footer--sticky {
  position: sticky;
  bottom: 12px;
  z-index: 5;
}
</style>
