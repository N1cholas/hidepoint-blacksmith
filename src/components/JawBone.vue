<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { useOmen } from '@/stores/modules/useOmen'
import { newAffix } from '@/utils/factory/newAffix'
import { newAffixFamily } from '@/utils/factory/newAffixFamily'
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
  const placeholderAffix = newAffix({
    Name: '亵渎占位符',
    str: '此词条已被亵渎需点击解密',
    ModFamilyList: ['ABYSSAL_ID'],
    ModGenerationTypeID: getModGenerationType(),
    Level: '82',
    DropChance: getAverageAffixFamilyWeight() + '',
  })

  const placeholderAffixFamily = newAffixFamily([placeholderAffix])

  _item.addAffix([placeholderAffixFamily], minimumLevel, maximumLevel, 'rare')
}

const getModGenerationType = (): '1' | '2' => {
  // 1 前缀 2 后缀
  if (_item.isSuffixFull || _omen.config.sinistralNecromancy) {
    return '1'
  }

  if (_item.isPrefixFull || _omen.config.dextralNecromancy) {
    return '2'
  }

  return Math.random() < 0.5 ? '1' : '2'
}

const getAverageAffixFamilyWeight = (): number =>
  Math.round(
    _item.state.affixFamilies.reduce((sum, affixFamily) => sum + affixFamily.weight, 0) /
      _item.state.affixFamilies.length,
  )
</script>
<template>
  <t-button @click="addPlaceholder()" :disabled="disable">{{ name }}</t-button>
</template>

<style scoped></style>
