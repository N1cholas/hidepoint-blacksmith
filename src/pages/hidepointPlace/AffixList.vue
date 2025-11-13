<script setup lang="ts">
import type { Affix } from '@/utils/factory/newAffix'

type Key = string | number

export type AffixListProps = {
  items: Affix[]
  itemKey: keyof Affix | ((a: Affix, i: number) => Key)
  showTier?: boolean
}

const { items, itemKey, showTier } = defineProps<AffixListProps>()

function keyOf(a: Affix, i: number): Key {
  const k = itemKey
  return typeof k === 'function' ? k(a, i) : (a[k] as unknown as Key)
}
</script>

<template>
  <TransitionGroup tag="ul" name="affix-fade" class="affix-list">
    <li v-for="(a, i) in items" :key="keyOf(a, i)" class="affix-item">
      <span class="badge" :class="a.isPrefix ? 'badge--prefix' : 'badge--suffix'">
        {{ a.isPrefix ? '前缀' : '后缀' }}
      </span>

      <span class="text" v-html="a.str"></span>

      <span v-show="showTier" class="tier">T{{ a.tier }} </span>

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
}

.affix-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--td-bg-color-container);
  border: 1px solid var(--td-border-level-1-color);
  border-radius: var(--td-radius-medium);
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease;
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
.affix-fade-leave-active,
.affix-fade-move {
  transition: all 0.35s cubic-bezier(0.55, 0, 0.1, 1);
}
.affix-fade-enter-from,
.affix-fade-leave-to {
  opacity: 0;
  transform: translateX(24px) scale(0.95);
}
.affix-fade-leave-active {
  position: absolute;
  width: 100%;
}
</style>
