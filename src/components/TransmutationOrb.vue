<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { computed, ref, watchEffect } from 'vue'

const { minimumLevel, maximumLevel } = defineProps<{
  name: string
  minimumLevel: number
  maximumLevel: number
}>()

const _item = useItem()

const affixFamiliesPool = ref()

watchEffect(async () => {
  const data = await _item.currentAffixFamiliesPool
  // FileContent类型，取出normal部分
  affixFamiliesPool.value = data.normal
})

const disable = computed(() => {
  return !(_item.state.rarity === 'normal' && maximumLevel >= minimumLevel)
})

// 蜕变石
const addAffix = () => {
  _item.randomlyAddAffix(
    affixFamiliesPool.value,
    minimumLevel,
    maximumLevel,
    'magic',
    'transmutationOrb',
  )
}
</script>
<template>
  <t-button @click="addAffix()" :disabled="disable">{{ name }}</t-button>
</template>

<style scoped></style>
