<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { randomlyGetAffix } from '@/utils/random/randomlyGetAffix'
import { randomlyGetAffixFamily } from '@/utils/random/randomlyGetAffixFamily'
import { computed, ref, watchEffect } from 'vue'

const { minimumLevel, maximumLevel } = defineProps<{
  name: string
  minimumLevel: number
  maximumLevel: number
}>()

const _item = useItem()

const affixFamilies = ref()

watchEffect(async () => {
  const data = await _item.currentAffixFamiliesPool
  // FileContent类型，取出normal部分
  affixFamilies.value = data.normal
})

const disable = computed(() => {
  return !(_item.state.rarity === 'normal' && maximumLevel >= minimumLevel)
})

// 蜕变石
const addModifier = () => {
  const hitAffixFamily = randomlyGetAffixFamily(affixFamilies.value)
  const hitAffix = randomlyGetAffix(hitAffixFamily.items, minimumLevel, maximumLevel)

  if (hitAffix) {
    _item.addAffix(hitAffixFamily, hitAffix)

    _item.setState({
      rarity: 'magic',
      usedProps: { ..._item.state.usedProps, transmutationOrb: true },
    })
  }
}
</script>
<template>
  <t-button variant="outline" @click="addModifier()" :disabled="disable">{{ name }}</t-button>
</template>

<style scoped></style>
