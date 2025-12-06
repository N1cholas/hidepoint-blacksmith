<script setup lang="ts">
import { computed } from 'vue'
import { useItemState } from '@/stores/itemState'
import { reverseRandomlyObtainAffixFamily } from '@/utils/randomlyObtain'
import { SESSION3_CONFIG } from '@/config/session3Config'
import type { Affix } from '@/types/types'

defineProps<{
  name: string
}>()

const itemState = useItemState()

// 可被锁定：排除占位与亵渎
const eligibleAffixFamilies = computed(() =>
  itemState.affixFamilies.filter(
    (af) => af.id !== SESSION3_CONFIG.PLACEHOLDER_ID && !af.desecrated,
  ),
)

const disable = computed(() => {
  return !(
    itemState.affixes.length >= 4 &&
    !itemState.lockedAffixId &&
    eligibleAffixFamilies.value.length > 0
  )
})

// 破溃宝珠：锁定一个随机词缀家族
const lockModifier = () => {
  if (disable.value) return

  const shouldLock = reverseRandomlyObtainAffixFamily<Affix[]>(eligibleAffixFamilies.value as any)

  if (shouldLock?.id) {
    itemState.setLockedAffixId(shouldLock.id)
  }
}
</script>

<template>
  <button class="btn btn--secondary" :disabled="disable" @click="lockModifier">
    {{ name }}
  </button>
</template>
