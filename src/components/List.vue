<template>
  <TransitionGroup
    tag="ul"
    name="fade"
    class="clist"
    :role="selection === 'single' ? 'listbox' : 'list'"
  >
    <li
      v-for="(item, index) in items"
      :key="keyOf(item, index)"
      class="clist__item"
      :class="{ 'is-selected': isSelectedKey(keyOf(item, index)) }"
      :aria-selected="selection === 'single' ? isSelectedKey(keyOf(item, index)) : undefined"
      @click="onItemClick(item, index)"
    >
      <slot :item="item" :index="index" :selected="isSelectedKey(keyOf(item, index))">
        <span class="clist__content">{{ String(keyOf(item, index)) }}</span>
      </slot>

      <button
        v-if="removable"
        class="clist__remove"
        type="button"
        @click.stop="$emit('remove', { item, index })"
        aria-label="remove"
      >
        ×
      </button>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts" generic="T">
import { computed, ref } from 'vue'

type Key = string | number

const props = withDefaults(
  defineProps<{
    items: T[]
    itemKey?: keyof T | ((item: T, index: number) => Key)
    removable?: boolean
    selection?: 'none' | 'single'
    selectedKey?: Key | null
    modelValue?: Key | null
  }>(),
  {
    items: () => [] as T[],
    removable: false,
    selection: 'none',
    selectedKey: undefined,
    modelValue: undefined,
  },
)

const emit = defineEmits<{
  (e: 'remove', payload: { item: T; index: number }): void
  (e: 'itemClick', payload: { item: T; index: number }): void
  (e: 'update:selectedKey', v: Key | null): void
  (e: 'update:modelValue', v: Key | null): void
  (e: 'select', payload: { key: Key; item: T; index: number }): void
  (e: 'unselect', payload: { key: Key; item: T; index: number }): void
}>()

// 解析行 key：函数 > 字段 > item.key > index
function keyOf(item: T, index: number): Key {
  const k = props.itemKey
  if (typeof k === 'function') return k(item, index)
  if (k) return item[k] as unknown as Key
  return index
}

// 单选（受控/非受控统一）
const innerSelected = ref<Key | null>(null)
const selectedRef = computed<Key | null>({
  get() {
    if (props.selectedKey !== undefined) return props.selectedKey
    if (props.modelValue !== undefined) return props.modelValue
    return innerSelected.value
  },
  set(v) {
    if (props.selectedKey !== undefined) emit('update:selectedKey', v)
    if (props.modelValue !== undefined) emit('update:modelValue', v)
    if (props.selectedKey === undefined && props.modelValue === undefined) innerSelected.value = v
  },
})

const isSelectedKey = (k: Key) => selectedRef.value === k

function toggleSingle(k: Key, item: T, index: number) {
  if (selectedRef.value === k) {
    selectedRef.value = null
    emit('unselect', { key: k, item, index })
  } else {
    selectedRef.value = k
    emit('select', { key: k, item, index })
  }
}

function onItemClick(item: T, index: number) {
  const k = keyOf(item, index)
  if (props.selection === 'single') toggleSingle(k, item, index)
  emit('itemClick', { item, index })
}
</script>

<style scoped>
.clist {
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  color: var(--color-text);
}

/* item */
.clist__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-width: 380px;
  min-height: 50px;
  padding: 8px 12px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 4px;
  text-align: center;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}
.clist__item:hover {
  background: color-mix(in oklab, var(--color-background) 88%, var(--color-text) 12%);
}
.clist__item.is-selected {
  background: color-mix(in oklab, var(--color-background) 75%, var(--color-text) 25%);
  border-color: var(--color-border-hover);
}

.clist__content {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* remove button */
.clist__remove {
  flex: 0 0 auto;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-text);
  border-radius: 6px;
  width: 28px;
  height: 28px;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease;
}
.clist__remove:hover {
  background: color-mix(in oklab, var(--color-background) 86%, var(--color-text) 14%);
  border-color: var(--color-border-hover);
}

/* transitions (enter from left, leave to right, move) */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
.fade-leave-active {
  position: absolute;
  width: 100%;
}
</style>
