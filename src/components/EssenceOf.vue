<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { useOmen } from '@/stores/modules/useOmen'
import { HIDE_TIER, type Affix } from '@/utils/factory/createAffix'
import { createAffixFamily } from '@/utils/factory/createAffixFamily'
import type { Essence } from '@/utils/factory/createEssence'
import { generateRemovePool } from '@/utils/pool/generateRemovePool'
import { reverseRandomlyGetAffixFamily } from '@/utils/random/reverseRandomlyGetAffixFamily'
import { watchEffect, ref, computed } from 'vue'

const { item } = defineProps<{
  item: Essence
}>()
const { name, level, id, workOnRare, isPrefix, str, tags } = item

const _item = useItem()
const _omen = useOmen()

const disable = computed(() => {
  return !(
    ((!workOnRare && _item.state.rarity === 'magic') ||
      (workOnRare && _item.state.rarity === 'rare')) &&
    !_item.hitAffixes.find((a) => a.id === id)
  )
})

const affixFamiliesPool = ref()

watchEffect(async () => {
  const data = await _item.currentAffixFamiliesPool
  affixFamiliesPool.value = data.normal
})

// 添加精华
// 判断是否已有精华词缀
// 判断是否随机删除一条词缀
// 判断添加为前缀还是后缀
// 升级物品稀有度
const handleAddEssence = () => {
  const essenceAffix: Affix = {
    name,
    level,
    isPrefix,
    id,
    str,
    tags,
    dropChance: _item.getCurrentAffixesWeights(),
    // todo: 精华可以没有阶级
    tier: HIDE_TIER,
  }
  const essenceAffixFamily = createAffixFamily([essenceAffix])

  // todo: 测试
  if (workOnRare) {
    const removeAffixFamiliesPool = generateRemovePool(_item.withoutLocked, {
      onlyPrefix:
        (essenceAffixFamily.isPrefix && _item.isPrefixFull) ||
        _omen.config.sinistralCrystallisation,
      onlySuffix:
        (!essenceAffixFamily.isPrefix && _item.isSuffixFull) || _omen.config.dextralCrystallisation,
    })

    if (removeAffixFamiliesPool.length === 0) return

    const shouldRemoveAffixFamily = reverseRandomlyGetAffixFamily(removeAffixFamiliesPool)

    _item.removeAffix(shouldRemoveAffixFamily)
  }

  if (essenceAffix) {
    _item.setState({
      affixFamilies: [
        ..._item.state.affixFamilies,
        { ...essenceAffixFamily, hitAffix: essenceAffix },
      ],
      rarity: 'rare',
    })
  }
}
</script>
<template>
  <t-button :disabled="disable" @click="handleAddEssence">{{ name }}</t-button>
</template>

<style scoped></style>
