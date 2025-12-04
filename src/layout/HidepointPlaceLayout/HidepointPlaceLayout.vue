<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    initial?: number
    titles?: [string, string, string]
    btnTexts?: string[]
    stickyFooter?: boolean
  }>(),
  {
    initial: 0,
    titles: () => ['设置初始状态', '开始做装', '做装过程'],
    btnTexts: () => ['上一步', '下一步', '完成'],
    stickyFooter: true,
  },
)

const emit = defineEmits<{
  (e: 'finish'): void
  (e: 'next', value: number): void
  (e: 'prev', value: number): void
}>()

const step = ref<number>(props.initial)

const maxIndex = computed(() => props.titles.length - 1)

const isFirst = computed(() => step.value === 0)
const isLast = computed(() => step.value === maxIndex.value)

const handlePrev = () => {
  step.value--
  emit('prev', step.value)
}

const handleNext = () => {
  step.value++
  emit('next', step.value)
}

const handleFinish = () => {
  emit('finish')
}

const slots = useSlots()
function namedExists(name: string) {
  return !!slots[name]
}
</script>

<template>
  <div class="hidepoint-layout">
    <t-steps :current="step" theme="default" class="steps">
      <t-step-item :title="titles[0]" />
      <t-step-item :title="titles[1]" />
      <t-step-item :title="titles[2]" />
    </t-steps>

    <section class="content">
      <slot v-if="!namedExists(`step-${step}`)"></slot>
      <slot v-else :name="`step-${step}`"></slot>
    </section>

    <footer class="footer" :class="{ sticky: props.stickyFooter }">
      <t-space>
        <t-button v-if="!isFirst" variant="outline" @click="handlePrev">
          {{ props.btnTexts[0] }}
        </t-button>
        <t-button v-if="!isLast" theme="primary" @click="handleNext">
          {{ props.btnTexts[1] }}
        </t-button>
        <t-button v-else theme="success" @click="handleFinish">
          {{ props.btnTexts[2] }}
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
