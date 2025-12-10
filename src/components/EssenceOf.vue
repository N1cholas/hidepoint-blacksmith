<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import type { Affix } from '@/utils/factory/createAffix'
import type { AffixFamily } from '@/utils/factory/createAffixFamily'
import { generateRemovePool } from '@/utils/pool/generateRemovePool'
import { reverseRandomlyGetAffixFamily } from '@/utils/random/reverseRandomlyGetAffixFamily'
import { watchEffect, ref, computed } from 'vue'

const { name, level, id, workOnRare } = defineProps<{
  name: string
  level: number
  id: string
  workOnRare?: boolean
}>()

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
  if (_item.state.affixFamilies.some((item: AffixFamily) => item.id === id)) {
    return
  }

  const essenceAffixFamily = affixFamiliesPool.value.find((item: AffixFamily) => item.id === id)
  const essenceAffix = essenceAffixFamily.items.find((item: Affix) => item.level === level)

  if (workOnRare) {
    const removeAffixFamiliesPool = generateRemovePool(_item.withoutLocked, {
      onlyPrefix: essenceAffixFamily.isPrefix && _item.isPrefixFull,
      onlySuffix: !essenceAffixFamily.isPrefix && _item.isSuffixFull,
    })

    const shouldRemoveAffixFamily = reverseRandomlyGetAffixFamily(removeAffixFamiliesPool)

    _item.removeAffix(shouldRemoveAffixFamily)
  }

  _item.setState({
    affixFamilies: [
      ..._item.state.affixFamilies,
      { ...essenceAffixFamily, hitAffix: essenceAffix },
    ],
    rarity: 'rare',
  })
}
</script>
<template>
  <t-button :disabled="disable" @click="handleAddEssence">{{ name }}</t-button>
</template>

<style scoped></style>
