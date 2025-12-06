<script setup lang="ts">
import { ITEM_CONFIG, useItem } from '@/stores/modules/useItem'
import { useOmen } from '@/stores/modules/useOmen'
import { generateAddPool } from '@/utils/pool/generateAddPool'
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
    _item.state.affixFamilies.length <
      ITEM_CONFIG.PREFIX_COUNT_LIMIT + ITEM_CONFIG.SUFFIX_COUNT_LIMIT &&
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
const addAffix = () => {
  const iterations = _omen.config.greaterExaltation ? 2 : 1

  for (let i = 0; i < iterations; i++) {
    const addAffixFamiliesPool = generateAddPool(affixFamilies.value, _item.state.affixFamilies, {
      deduplication: true,
      filterByTags: _omen.config.homogenisingExaltaion,
      onlyPrefix: shouldOnlyPrefix(),
      onlySuffix: shouldOnlySuffix(),
    })

    _item.addAffix(addAffixFamiliesPool, minimumLevel, maximumLevel, 'rare', 'exaltedOrb')
  }
}

const shouldOnlyPrefix = (): boolean => {
  return _omen.config.sinistralExaltation || _item.isSuffixFull
}

const shouldOnlySuffix = (): boolean => {
  return _omen.config.dextralExaltation || _item.isPrefixFull
}
</script>
<template>
  <t-button @click="addAffix()" :disabled="disable">{{ name }}</t-button>
</template>

<style scoped></style>
