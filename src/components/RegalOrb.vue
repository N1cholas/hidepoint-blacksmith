<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { useOmen } from '@/stores/modules/useOmen'
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
const _omen = useOmen()

const disable = computed(() => {
  return !(
    _item.state.rarity === 'magic' &&
    _item.state.usedProps.augmentationOrb &&
    !_item.state.usedProps.regalOrb &&
    maximumLevel >= minimumLevel
  )
})

const affixFamilies = ref()

watchEffect(async () => {
  const data = await _item.currentAffixFamiliesPool
  // FileContent类型，取出normal部分
  affixFamilies.value = data.normal
})

// 富豪石
const addModifier = () => {
  const affixFamiliesPool = generateAddPool(affixFamilies.value, _item.state.affixFamilies, {
    deduplication: true,
    filterByTags: _omen.config.homogenisingCoronation,
  })

  if (affixFamiliesPool.length) {
    const hitAffixFamily = randomlyGetAffixFamily(affixFamiliesPool)
    const hitAffix = randomlyGetAffix(hitAffixFamily.items, minimumLevel, maximumLevel)

    if (hitAffix) {
      _item.addAffix(hitAffixFamily, hitAffix)

      _item.setState({
        rarity: 'rare',
        usedProps: { ..._item.state.usedProps, regalOrb: true },
      })
    }
  }
}
</script>
<template>
  <t-button :class="{ disable }" @click="addModifier()" :disabled="disable">
    {{ name }}
  </t-button>
</template>

<style scoped></style>
