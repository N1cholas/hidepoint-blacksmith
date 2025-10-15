<script setup lang="ts">
import { processHtmlString } from '@/utils/utils'
import { type Modifier } from '@/types/types'
defineProps<{
  mod: Modifier
  type: 'prefix' | 'suffix'
  showModType: boolean
}>()
</script>
<template>
  <li :class="`${type}-mods`">
    <span v-if="showModType" class="prefix">{{ type === 'prefix' ? '前缀' : '后缀' }}</span>
    {{ processHtmlString(mod.str) }}
    <span class="suffix" v-if="mod.powerLevel">T{{ mod.powerLevel }}</span>
  </li>
</template>
<style scoped>
li {
  min-width: 320px;
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
</style>
