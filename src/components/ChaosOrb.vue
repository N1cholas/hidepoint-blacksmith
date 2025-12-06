<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { useOmen } from '@/stores/modules/useOmen'
import { generateAddPool } from '@/utils/pool/generateAddPool'
import { generateReplacePool } from '@/utils/pool/generateReplacePool'
import { reverseRandomlyObtainAffixFamily } from '@/utils/random/reverseRandomlyGetAffixFamily'
import { computed, ref, watchEffect } from 'vue'

const { maximumLevel, minimumLevel } = defineProps<{
  name: string
  minimumLevel: number
  maximumLevel: number
}>()

const _item = useItem()
const _omen = useOmen()

const disable = computed(
  () =>
    !(
      _item.state.rarity === 'rare' &&
      _item.state.affixFamilies.length > 0 &&
      maximumLevel >= minimumLevel
    ),
)

const affixFamilies = ref()

watchEffect(async () => {
  const data = await _item.currentAffixFamiliesPool
  // FileContent类型，取出normal部分
  affixFamilies.value = data.normal
})

// todo: test
// 混沌石替换的词条可以是前缀或者后缀
// 但是要处理6词条的情况，如果替换的是前缀，那么生成的也是前缀.如果替换的是后缀，那么生成的也是后缀。
const changeModifier = () => {
  const replaceAffixFamiliesPool = generateReplacePool(_item.state.affixFamilies, {
    lowestValue: _omen.config.whittling,
    onlyPrefix: _omen.config.sinistralErasure,
    onlySuffix: _omen.config.dextralErasure,
  })

  if (!replaceAffixFamiliesPool.length) return

  const shouldRemoveAffixFamily = reverseRandomlyObtainAffixFamily(replaceAffixFamiliesPool)

  const is6Mods = _item.state.affixFamilies.length === 6

  const [PREFIX_COUNTS, SUFFIX_COUNTS] = _item.state.config.affixCounts

  const addAffixFamiliesPool = generateAddPool(affixFamilies.value, _item.state.affixFamilies, {
    deduplication: true,
    onlyPrefix:
      (!is6Mods && _item.counts.suffixCount === PREFIX_COUNTS) ||
      (is6Mods && shouldRemoveAffixFamily.isPrefix),
    onlySuffix:
      (!is6Mods && _item.counts.prefixCount === SUFFIX_COUNTS) ||
      (is6Mods && !shouldRemoveAffixFamily.isPrefix),
  })

  if (addAffixFamiliesPool.length) {
    _item.addAffix(addAffixFamiliesPool, minimumLevel, maximumLevel, 'rare')
    _item.removeAffix(shouldRemoveAffixFamily)
  }
}
</script>

<template>
  <t-button @click="changeModifier()" :disabled="disable">
    {{ name }}
  </t-button>
</template>

<style scoped></style>
