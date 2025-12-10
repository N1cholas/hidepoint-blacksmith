<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { createAffixFamily, type AffixFamily } from '@/utils/factory/createAffixFamily'
import type { Essence } from '@/utils/factory/createEssence'
import { generateRemovePool } from '@/utils/pool/generateRemovePool'
import { reverseRandomlyGetAffixFamily } from '@/utils/random/reverseRandomlyGetAffixFamily'
import { watchEffect, ref, computed } from 'vue'

const { item } = defineProps<{
  item: Essence
}>()
const { name, level, id, workOnRare, isPrefix, str, tags } = item

const _item = useItem()

const disable = computed(() => {
  return !(
    (!workOnRare && _item.state.rarity === 'magic') ||
    (workOnRare && _item.state.rarity === 'rare')
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
  // 精华词缀可以从affixFamiliesPool中获取，没有则生成AffixFamily
  let essenceAffixFamily: AffixFamily = affixFamiliesPool.value.find(
    (item: AffixFamily) => item.id === id,
  )
  if (!essenceAffixFamily) {
    essenceAffixFamily = createAffixFamily([
      {
        name,
        level,
        isPrefix,
        id,
        str,
        tags,
        dropChance: _item.getCurrentAffixesWeights(),
        // todo: 阶级需要判断
        tier: -1,
      },
    ])
  }
  const essenceAffix = essenceAffixFamily.items.find((a) => a.id === id)

  // todo
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
</script>
<template>
  <t-button :disabled="disable" @click="handleAddEssence">{{ name }}</t-button>
</template>

<style scoped></style>
