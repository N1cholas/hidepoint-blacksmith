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

const [PREFIX_COUNT, SUFFIX_COUNT] = _item.state.config.affixCounts

const disable = computed(() => {
  return !(
    _item.state.affixFamilies.length < PREFIX_COUNT + SUFFIX_COUNT &&
    _item.state.rarity === 'rare' &&
    maximumLevel >= minimumLevel
  )
})

const affixFamilies = ref()

watchEffect(async () => {
  const data = await _item.currentAffixFamiliesPool
  // FileContent类型，取出normal部分
  affixFamilies.value = data.normal
})

// 添加词缀规则：去重 前3 后3 共6
const addModifier = () => {
  const iterations = _omen.config.greaterExaltation ? 2 : 1

  for (let i = 0; i < iterations; i++) {
    const affixFamiliesPool = generateAddPool(affixFamilies.value, _item.state.affixFamilies, {
      deduplication: true,
      filterByTags: _omen.config.homogenisingExaltaion,
      onlyPrefix: shouldOnlyPrefix(),
      onlySuffix: shouldOnlySuffix(),
    })

    if (affixFamiliesPool.length) {
      const hitAffixFamily = randomlyGetAffixFamily(affixFamiliesPool)
      const hitAffix = randomlyGetAffix(hitAffixFamily.items, minimumLevel, maximumLevel)

      if (hitAffix) {
        _item.addAffix(hitAffixFamily, hitAffix)

        _item.setState({
          rarity: 'rare',
          usedProps: { ..._item.state.usedProps, exaltedOrb: true },
        })
      }
    }
  }
}

const shouldOnlyPrefix = (): boolean => {
  return _omen.config.sinistralExaltation || _item.counts.suffixCount >= SUFFIX_COUNT
}

const shouldOnlySuffix = (): boolean => {
  return _omen.config.dextralExaltation || _item.counts.prefixCount >= PREFIX_COUNT
}
</script>
<template>
  <t-button @click="addModifier()" :disabled="disable">{{ name }}</t-button>
</template>

<style scoped></style>
