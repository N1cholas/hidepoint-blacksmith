<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { generateAddPool } from '@/utils/pool/generateAddPool'
import { computed, ref, watchEffect } from 'vue'

const { maximumLevel, minimumLevel } = defineProps<{
  name: string
  minimumLevel: number
  maximumLevel: number
}>()

const _item = useItem()

const disable = computed(() => {
  return !(
    _item.state.rarity === 'magic' &&
    _item.state.usedProps.transmutationOrb &&
    !_item.state.usedProps.augmentationOrb &&
    maximumLevel >= minimumLevel
  )
})

const affixFamilies = ref()

watchEffect(async () => {
  const data = await _item.currentAffixFamiliesPool
  // FileContent类型，取出normal部分
  affixFamilies.value = data.normal
})

// 增幅石
const addAffix = () => {
  const affixFamiliesPool = generateAddPool(affixFamilies.value, _item.state.affixFamilies, {
    deduplication: true,
  })

  _item.addAffix(affixFamiliesPool, minimumLevel, maximumLevel, 'magic', 'augmentationOrb')
}
</script>
<template>
  <t-button @click="addAffix()" :disabled="disable">{{ name }}</t-button>
</template>

<style scoped></style>
