<script setup lang="ts">
import _ from 'lodash'
import { ITEM_RARITY, MOD_GENERATION_TYPE } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { computed } from 'vue'
import { ITEM_CONFIG } from '@/config/itemConfig'
import { createAffix, createAffixFamily } from '@/utils/factory'
import { SESSION3_CONFIG } from '@/config/session3Config'
import { useSession3State } from '@/stores/session3State'

const { maximumLevel, minimumLevel } = defineProps<{
  name: string
  minimumLevel: number
  maximumLevel: number
}>()

const itemState = useItemState()
const session3State = useSession3State()

const disable = computed(() => {
  return !(
    itemState.itemRarity === ITEM_RARITY.RARE &&
    maximumLevel >= minimumLevel &&
    itemState.affixes.length < ITEM_CONFIG.PREFIX + ITEM_CONFIG.SUFFIX &&
    !session3State.desecrated
  )
})

// 颚骨，为武器或弓添加亵渎占位符
// 解决混沌石、剥离石会一直移除占位符的问题
// 解决破溃宝珠锁定占位符
const addPlaceholder = () => {
  const hitAffix = createAffix({
    Name: '亵渎占位符',
    str: '在武器或弓上附加一个亵渎词缀。',
    ModFamilyList: [SESSION3_CONFIG.PLACEHOLDER_ID],
    ModGenerationTypeID: getModGenerationType(),
  })

  const hitAffixFamily = createAffixFamily({
    items: [hitAffix],
    id: SESSION3_CONFIG.PLACEHOLDER_ID,
    modGenerationTypeID: hitAffix.ModGenerationTypeID,
    weight: getAverageAffixFamilyWeight(),
  })

  if (hitAffix) {
    itemState.addAffix(hitAffixFamily, hitAffix)

    itemState.setItemRarity(ITEM_RARITY.RARE)
  }
}

const getModGenerationType = (): MOD_GENERATION_TYPE => {
  const prefixCounts = itemState.prefixCounts
  const suffixCounts = itemState.suffixCounts

  if (prefixCounts >= ITEM_CONFIG.PREFIX) {
    return MOD_GENERATION_TYPE.SUFFIX
  }

  if (suffixCounts >= ITEM_CONFIG.SUFFIX) {
    return MOD_GENERATION_TYPE.PREFIX
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
