<script setup lang="ts">
import _ from 'lodash'
import { useItemState } from '@/stores/itemState'
import { computed } from 'vue'
import type { Affix } from '@/types/types'
import { reverseRandomlyObtainAffixFamily } from '@/utils/randomlyObtain'

defineProps<{
  name: string
}>()

const itemState = useItemState()

const disable = computed(() => {
  return !(itemState.affixes.length >= 4)
})

// 破溃宝珠
const lockModifier = () => {
  const shouldLockAffixFamily = reverseRandomlyObtainAffixFamily<Affix[]>(
    itemState.affixFamilies,
  )

  const [shouldLockAffixFamilyIndex, shouldLockAffixIndex] = itemState.findIndexById(shouldLockAffixFamily.id)
}
</script>
<template>
  <button @click="lockModifier()" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
