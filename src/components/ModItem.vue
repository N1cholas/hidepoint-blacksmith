<script setup lang="ts">
import { processHTMLString } from '@/utils/processString'
import { type Affix } from '@/types/types'
defineProps<{
  mod: Affix
  type: 'prefix' | 'suffix'
  showModType: boolean
  locked?: boolean
}>()
</script>
<template>
  <li :class="`${type}-mods`">
    <span v-if="showModType" class="prefix">{{ type === 'prefix' ? '前缀' : '后缀' }}</span>
    <span :class="{locked}">{{ processHTMLString(mod.str) }}</span>
    <span class="suffix" v-if="mod.powerLevel">T{{ mod.powerLevel }}</span>
  </li>
</template>
<style scoped>
li {
  min-width: 330px;
  list-style: none;
  position: relative;
  padding-top: 2px;
}
.prefix {
  position: absolute;
  left: -40px;
}
.suffix {
  position: absolute;
  right: -40px;
}
.locked {
  color: #f39c12;
}
</style>
