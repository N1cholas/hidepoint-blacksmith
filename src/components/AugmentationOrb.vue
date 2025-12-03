<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { generateAddPool } from '@/utils/pool/generateAddPool'
import { randomlyGetAffix } from '@/utils/random/randomlyGetAffix'
import { randomlyGetAffixFamily } from '@/utils/random/randomlyGetAffixFamily'
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
const addModifier = () => {
  const newAffixFamily = generateAddPool(affixFamilies.value, _item.state.affixFamilies, {
    deduplication: true,
  })

  if (newAffixFamily.length) {
    const hitAffixFamily = randomlyGetAffixFamily(newAffixFamily)
    const hitAffix = randomlyGetAffix(hitAffixFamily.items, minimumLevel, maximumLevel)

    if (hitAffix) {
      _item.addAffix(hitAffixFamily, hitAffix)

      _item.setState({
        rarity: 'magic',
        usedProps: { ..._item.state.usedProps, augmentationOrb: true },
      })
    }
  }
}
</script>
<template>
  <t-button @click="addModifier()" :disabled="disable">{{ name }}</t-button>
</template>

<style scoped></style>
