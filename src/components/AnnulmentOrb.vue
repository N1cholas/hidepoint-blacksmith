<script setup lang="ts">
import { useItemState } from '@/stores/itemState'
import { type Affix } from '@/types/types'
import { reverseRandomlyObtainAffixFamily } from '@/utils/randomlyObtain'
import { generateRemovePool } from '@/utils/generatePool'
import { computed } from 'vue'
import { useOmenState } from '@/stores/omenState'

defineProps<{
  name: string
}>()

const itemState = useItemState()
const omenState = useOmenState()

const disable = computed(() => itemState.affixFamilyWithoutLocked.length === 0)

// 剥离石 不会影响物品类型，例如：原本物品是3词条稀有物品，使用剥离石后仍然是2词条稀有物品而不是2词条魔法物品。
const removeAffix = () => {
  const removeAffixFamiliesPool = generateRemovePool(itemState.affixFamilyWithoutLocked, {
    onlyPrefix: omenState.omenConfig.sinistralAnnulment,
    onlySuffix: omenState.omenConfig.dextralAnnulment,
    onlyAbyssal: omenState.omenConfig.light,
  })
  console.log(removeAffixFamiliesPool, '11')
  const shouldRemoveAffixFamily = reverseRandomlyObtainAffixFamily<Affix[]>(removeAffixFamiliesPool)

  const [shouldRemoveAffixFamilyIndex, shouldRemoveAffixIndex] = itemState.findIndexById(
    shouldRemoveAffixFamily.id,
  )

  itemState.removeAffix(shouldRemoveAffixIndex, shouldRemoveAffixFamilyIndex)
}
</script>

<template>
  <button @click="removeAffix()" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
