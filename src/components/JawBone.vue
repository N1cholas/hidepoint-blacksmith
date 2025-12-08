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
    str: '在武器或弓上附加一个亵渎词缀。',
    ModFamilyList: ['ABYSSAL_ID'],
    ModGenerationTypeID: getModGenerationType(),
    Level: '82',
    DropChance: getAverageAffixFamilyWeight() + '',
  })

  const placeholderAffixFamily = newAffixFamily({
    items: [placeholderAffix],
    id: SESSION3_CONFIG.PLACEHOLDER_ID,
    modGenerationTypeID: hitAffix.ModGenerationTypeID,
    weight: getAverageAffixFamilyWeight(),
  })

  if (hitAffix) {
    itemState.addAffix(placeholderAffixFamily, hitAffix)

    itemState.setItemRarity(ITEM_RARITY.RARE)

    session3State.setAffixLevelRange([minimumLevel, maximumLevel])
  }
}

const getModGenerationType = (): MOD_GENERATION_TYPE => {
  const prefixCounts = itemState.prefixCounts
  const suffixCounts = itemState.suffixCounts

  if (suffixCounts >= ITEM_CONFIG.SUFFIX || omenState.omenConfig.sinistralNecromancy) {
    return MOD_GENERATION_TYPE.PREFIX
  }

  if (prefixCounts >= ITEM_CONFIG.PREFIX || omenState.omenConfig.dextralNecromancy) {
    return MOD_GENERATION_TYPE.SUFFIX
  }

  return Math.random() < 0.5 ? MOD_GENERATION_TYPE.PREFIX : MOD_GENERATION_TYPE.SUFFIX
}

const getAverageAffixFamilyWeight = (): number =>
  Math.round(
    itemState.affixFamilies.reduce((sum, affixFamily) => sum + affixFamily.weight, 0) /
      itemState.affixFamilies.length,
  )
</script>
<template>
  <button @click="addPlaceholder()" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
