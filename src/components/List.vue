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
type Key = string | number

const props = withDefaults(
  defineProps<{
    items: T[]
    itemKey?: string | ((item: any, index: number) => Key)
    removable?: boolean
    selection?: 'none' | 'single'
    selectedKey?: Key | null // v-model:selectedKey
    modelValue?: Key | null // 兼容 v-model
  }>(),
  {
    items: () => [],
    removable: false,
    selection: 'none',
    selectedKey: undefined,
    modelValue: undefined,
  },
)

const emit = defineEmits<{
  (e: 'remove', payload: { item: any; index: number }): void
  (e: 'itemClick', payload: { item: any; index: number }): void
  (e: 'update:selectedKey', v: Key | null): void
  (e: 'update:modelValue', v: Key | null): void
  (e: 'select', payload: { key: Key; item: any; index: number }): void
  (e: 'unselect', payload: { key: Key; item: any; index: number }): void
}>()

function keyOf(item: any, index: number): Key {
  const k = props.itemKey
  if (typeof k === 'function') return k(item, index)
  if (typeof k === 'string' && item && k in item) return (item as any)[k] as Key
  return index
}

// 受控/非受控单选
let innerSelected: Key | null = null
const isControlled = () => props.selectedKey !== undefined || props.modelValue !== undefined
const getSelected = (): Key | null =>
  props.selectedKey !== undefined
    ? props.selectedKey
    : props.modelValue !== undefined
      ? props.modelValue
      : innerSelected
const setSelected = (v: Key | null) => {
  if (props.selectedKey !== undefined) emit('update:selectedKey', v)
  if (props.modelValue !== undefined) emit('update:modelValue', v)
  if (!isControlled()) innerSelected = v
}

function isSelectedKey(k: Key): boolean {
  return getSelected() === k
}

function toggleSingle(k: Key, item: any, index: number) {
  const cur = getSelected()
  if (cur === k) {
    setSelected(null)
    emit('unselect', { key: k, item, index })
  } else {
    setSelected(k)
    emit('select', { key: k, item, index })
  }
}

function onItemClick(item: any, index: number) {
  const k = keyOf(item, index)
  if (props.selection === 'single') {
    toggleSingle(k, item, index)
  }
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
  min-width: 360px;
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
