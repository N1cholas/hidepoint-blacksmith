<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { useOmen } from '@/stores/modules/useOmen'
import { createAffixFamily } from '@/utils/factory/createAffixFamily'
import { createDesecratedAffix, DESECRATED_ID } from '@/utils/factory/createDesecratedAffix'
import { computed } from 'vue'

const { minimumLevel, maximumLevel } = defineProps<{
  name: string
  minimumLevel: number
  maximumLevel: number
}>()

const _item = useItem()
const _omen = useOmen()

const disable = computed(() => {
  return !(
    _item.state.rarity === 'rare' &&
    maximumLevel >= minimumLevel &&
    _item.state.affixFamilies.length < _item.AFFIX_COUNTS &&
    !_item.placeholder &&
    !_item.desecrated
  )
})

// 颚骨，为武器或弓添加亵渎占位符
const addPlaceholder = () => {
  const placeholderAffix = createDesecratedAffix({
    id: DESECRATED_ID,
    name: '亵渎占位符',
    str: '此词条已被亵渎需点击解密',
    tags: [DESECRATED_ID],
    level: 82,
    isPrefix: getModGenerationType(),
    dropChance: getAverageAffixFamilyWeight(),
  })

  const placeholderAffixFamily = createAffixFamily([placeholderAffix])

  _item.addAffix([placeholderAffixFamily], minimumLevel, maximumLevel, 'rare')
}

// todo: test
const getModGenerationType = (): boolean => {
  if (_item.isSuffixFull || _omen.config.sinistralNecromancy) {
    return true
  }

  if (_item.isPrefixFull || _omen.config.dextralNecromancy) {
    return false
  }

  return Math.random() < 0.5
}

const getAverageAffixFamilyWeight = (): number => {
  if (_item.state.affixFamilies.length === 0) {
    return 0
  }

  const result = Math.round(
    _item.state.affixFamilies.reduce((sum, affixFamily) => sum + affixFamily.weight, 0) /
      _item.state.affixFamilies.length,
  )

  return result
}
</script>
<template>
  <t-button @click="addPlaceholder()" :disabled="disable">{{ name }}</t-button>
</template>

<style scoped></style>
