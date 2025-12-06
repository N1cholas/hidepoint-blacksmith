<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { useOmen } from '@/stores/modules/useOmen'
import { generateRemovePool } from '@/utils/pool/generateRemovePool'
import { reverseRandomlyGetAffixFamily } from '@/utils/random/reverseRandomlyGetAffixFamily'
import { computed } from 'vue'

defineProps<{
  name: string
}>()

const _item = useItem()
const _omen = useOmen()

const disable = computed(() => !(_item.state.rarity !== 'normal' && _item.withoutLocked.length > 0))

// 剥离石 不会影响物品类型，例如：原本物品是3词条稀有物品，使用剥离石后仍然是2词条稀有物品而不是2词条魔法物品。
const removeAffix = () => {
  const removeAffixFamiliesPool = generateRemovePool(_item.withoutLocked, {
    onlyPrefix: _omen.config.sinistralAnnulment,
    onlySuffix: _omen.config.dextralAnnulment,
    onlyAbyssal: _omen.config.light,
  })

  const shouldRemoveAffixFamily = reverseRandomlyGetAffixFamily(removeAffixFamiliesPool)

  _item.removeAffix(shouldRemoveAffixFamily)
}
</script>

<template>
  <t-button @click="removeAffix()" :disabled="disable">{{ name }}</t-button>
</template>

<style scoped></style>
