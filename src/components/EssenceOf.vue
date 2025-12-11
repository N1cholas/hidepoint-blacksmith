<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import type { Affix } from '@/utils/factory/createAffix'
import { createAffixFamily, type AffixFamily } from '@/utils/factory/createAffixFamily'
import type { Essence } from '@/utils/factory/createEssence'
import { generateRemovePool } from '@/utils/pool/generateRemovePool'
import { reverseRandomlyGetAffixFamily } from '@/utils/random/reverseRandomlyGetAffixFamily'
import { watchEffect, ref, computed } from 'vue'

const { item } = defineProps<{
  item: Essence
}>()
const { name, level, id, workOnRare, isPrefix, str, tags, affixID } = item

const _item = useItem()

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
  // essence词缀id level不与normal的词缀一致

  // const existAffixFamily: AffixFamily = affixFamiliesPool.value.find(
  //   (af: AffixFamily) => af.id === affixID,
  // )
  const essenceAffix: Affix = {
    name,
    level,
    isPrefix,
    id,
    str,
    tags,
    dropChance: _item.getCurrentAffixesWeights(),
    // todo: 算出阶级
    tier: getTier(affixID, level),
  }
  const essenceAffixFamily = createAffixFamily([essenceAffix])

  if (workOnRare) {
    const removeAffixFamiliesPool = generateRemovePool(_item.withoutLocked, {
      onlyPrefix: essenceAffixFamily.isPrefix && _item.isPrefixFull,
      onlySuffix: !essenceAffixFamily.isPrefix && _item.isSuffixFull,
    })

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

const getTier = (id: string, level: number): number => {
  const affixFamily = affixFamiliesPool.value.find((af: AffixFamily) => af.id === id)
  if (!affixFamily) return 1
  const affix = affixFamily.items.filter((a: Affix) => a.level <= level).pop()
  return !!affix ? affix.tier : 1
}
</script>
<template>
  <t-button :disabled="disable" @click="handleAddEssence">{{ name }}</t-button>
</template>

<style scoped></style>
