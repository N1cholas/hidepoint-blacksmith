<script setup lang="ts">
import type { Affix } from '@/utils/factory/createAffix'
import { ABYSSAL_PLACEHOLDER_ID } from '@/utils/factory/createDesecratedAffix'

type Key = string | number

export type AffixListProps = {
  items: Affix[]
  itemKey: keyof Affix | ((a: Affix, i: number) => Key)
  showTier?: boolean
  lockedAffix: Affix | null
  isSelectAffix?: boolean
}

const { items, itemKey, showTier } = defineProps<AffixListProps>()

function keyOf(a: Affix, i: number): Key {
  const k = itemKey
  return typeof k === 'function' ? k(a, i) : (a[k] as unknown as Key)
}

const emit = defineEmits<{
  (e: 'decrypt', value: Affix): void
}>()
</script>

<template>
  <TransitionGroup tag="ul" name="affix-fade" class="affix-list">
    <li
      v-for="(a, i) in items"
      :key="keyOf(a, i)"
      class="affix-item"
      :class="{
        locked: a.id === lockedAffix?.id,
        desecrated: a.desecrated,
        'is-select': isSelectAffix,
        pointer: a.id === ABYSSAL_PLACEHOLDER_ID,
      }"
      @click="emit('decrypt', a)"
    >
      <span class="badge" :class="a.isPrefix ? 'badge--prefix' : 'badge--suffix'">
        {{ a.isPrefix ? '前缀' : '后缀' }}
      </span>

      <span class="text" v-html="a.str"> </span>

      <span v-if="showTier" class="tier" :class="{ unvisiable: a.tier === -1 }">
        T{{ a.tier }}
      </span>

      <div class="ops">
        <slot name="actions" :item="a" :index="i"></slot>
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.affix-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;

  --affix-dur: 520ms;
  --affix-move-dur: 640ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

.affix-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--td-bg-color-container);
  border: 1px solid var(--td-border-level-1-color);
  border-radius: var(--td-radius-medium);
  will-change: transform, opacity;
  transform: translateZ(0);
}
.affix-item:hover {
  background: var(--td-bg-color-container-hover);
  border-color: var(--td-component-border);
}

.badge {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid var(--td-border-level-1-color);
  line-height: 1.2;
  white-space: nowrap;
}
.badge--prefix {
  color: var(--td-brand-color);
  border-color: var(--td-brand-color);
}
.badge--suffix {
  color: var(--td-success-color);
  border-color: var(--td-success-color);
}

.text {
  text-align: center;
  flex: 1;
  min-width: 0;
  color: var(--td-text-color-primary);
  font-size: 13px;
}

.pointer,
.is-select {
  cursor: pointer;
}

.affix-item.locked .text {
  color: #d2870f;
}

.affix-item.desecrated .text {
  color: #0a6a01;
}

.unvisiable {
  opacity: 0;
}

.tier {
  font-size: 12px;
  font-weight: 600;
  color: var(--td-text-color-primary);
  white-space: nowrap;
}

.ops {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  white-space: nowrap;
}

.affix-fade-enter-active,
.affix-fade-leave-active {
  transition:
    opacity var(--affix-dur) var(--ease-out),
    transform var(--affix-dur) var(--ease-out);
}
.affix-fade-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
.affix-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
.affix-fade-leave-active {
  position: absolute;
}

.affix-fade-move {
  transition: transform var(--affix-move-dur) var(--ease-out);
}
</style>
