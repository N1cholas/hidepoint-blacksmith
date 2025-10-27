<script setup lang="ts">
import { processHTMLString } from '@/utils/processString'
import { type Affix } from '@/types/types'
import PlaceholderText from './PlaceholderText.vue'

defineProps<{
  mod: Affix
  type: 'prefix' | 'suffix'
  showModType: boolean
  locked?: boolean
  showPlaceholder?: boolean
}>()
</script>
<template>
  <li :class="`${type}-mods`">
    <span v-if="showModType" class="prefix">{{ type === 'prefix' ? '前缀' : '后缀' }}</span>
    <span v-if="!showPlaceholder" :class="{ locked }">{{ processHTMLString(mod.str) }}</span>
    <PlaceholderText v-else text="此 词 缀 被 亵 渎 待 解 密" />
    <span class="suffix" v-if="mod.powerLevel">T{{ mod.powerLevel }}</span>
  </li>
</template>
<style scoped>
li {
  min-width: 330px;
  list-style: none;
  position: relative;
  line-height: 34px;
  flex: 1;
}
.prefix {
  position: absolute;
  left: -48px;
}
.suffix {
  position: absolute;
  right: -40px;
  top: 0;
}
.locked {
  color: #f39c12;
}
</style>
