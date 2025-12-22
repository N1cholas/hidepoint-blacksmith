<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { ABYSSAL_PLACEHOLDER_ID } from '@/utils/factory/createDesecratedAffix'
import { reverseRandomlyGetAffixFamily } from '@/utils/random/reverseRandomlyGetAffixFamily'
import { computed } from 'vue'

defineProps<{
  name: string
}>()

const _item = useItem()

const disable = computed(() => {
  return !(
    _item.state.affixFamilies.length >= 4 &&
    !_item.state.lockedAffix &&
    eligibleAffixFamilies.value.length > 0
  )
})

// 可被锁定：排除占位与亵渎
const eligibleAffixFamilies = computed(() =>
  _item.state.affixFamilies.filter((af) => af.id !== ABYSSAL_PLACEHOLDER_ID && !af.desecrated),
)

// 破溃宝珠：锁定一个随机词缀家族
const lockModifier = () => {
  const shouldLockAffixFamily = reverseRandomlyGetAffixFamily(eligibleAffixFamilies.value)

  if (shouldLockAffixFamily) {
    _item.setState({
      lockedAffix: shouldLockAffixFamily.hitAffix,
    })
  }
}
</script>

<template>
  <t-button class="btn btn--secondary" :disabled="disable" @click="lockModifier">
    {{ name }}
  </t-button>
</template>
