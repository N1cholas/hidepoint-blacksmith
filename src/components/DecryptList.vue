<script setup lang="ts">
import List from '@/components/List.vue'
import { processHTMLString } from '@/utils/processString'
import type { Affix } from '@/types/types'

defineProps<{
  affixes: Affix[]
}>()
</script>
<template>
  <List
    selection="single"
    :items="affixes"
    :item-key="(a) => `${a.str}|${a.ModFamilyList[0]}`"
    class="affix-list"
  >
    <template #default="{ item }">
      <span></span>
      <span class="content" v-html="processHTMLString(item.str)"></span>
      <span class="suffix" :class="{ invisible: !item.powerLevel }"> T{{ item.powerLevel }} </span>
    </template>
  </List>
</template>

<style scoped></style>
