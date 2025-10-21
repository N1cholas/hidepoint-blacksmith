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
  return !(itemState.affixes.length >= 4 && !itemState.lockedAffixId)
})

// 破溃宝珠
// 锁定一个随机词缀，使其在下一次改造时不会被移除。
// 影响剥离石、混沌石
const lockModifier = () => {
  const shouldLockAffixFamily = reverseRandomlyObtainAffixFamily<Affix[]>(
    itemState.affixFamilies,
  )

  if (shouldLockAffixFamily) {
    itemState.setLockedAffixId(shouldLockAffixFamily.id)
  }
}
</script>
<template>
  <button @click="lockModifier()" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
