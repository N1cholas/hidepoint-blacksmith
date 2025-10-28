<script setup lang="ts">
import _ from 'lodash'
import { useItemState } from '@/stores/itemState'
import { computed } from 'vue'
import { useSession3State } from '@/stores/session3State'
import { generateAddPool } from '@/utils/generatePool'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { MOD_GENERATION_TYPE, type Affix } from '@/types/types'
import { SESSION3_CONFIG } from '@/config/session3Config'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'

defineProps<{
  name: string
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const session3State = useSession3State()

const disable = computed(() => !session3State.placeholder)

const modGenerationType = session3State.placeholder?.modGenerationTypeID

// 解密亵渎占位符
// 展示3条词缀以及重选按钮
const decryptAffix = () => {
  const newAffixFamily = generateAddPool(normalMods.normalModsFamily, itemState.affixFamilies, {
    deduplication: true,
    onlyPrefix: modGenerationType === MOD_GENERATION_TYPE.PREFIX,
    onlySuffix: modGenerationType === MOD_GENERATION_TYPE.SUFFIX,
  })

  const [shouldRemoveAffixFamilyIndex, shouldRemoveAffixIndex] = itemState.findIndexById(
    SESSION3_CONFIG.PLACEHOLDER_ID,
  )

  if (newAffixFamily.length) {
    const hitAffixFamily = randomlyObtainAffixFamily<Affix[]>(newAffixFamily)

    const [minimumLevel, maximumLevel] = session3State.affixLevelRange
    const hitAffix = randomlyObtainAffix(hitAffixFamily.items, minimumLevel, maximumLevel)

    if (hitAffix) {
      itemState.replaceAffix(
        hitAffixFamily,
        shouldRemoveAffixFamilyIndex,
        hitAffix,
        shouldRemoveAffixIndex,
      )
    }
  }
}
</script>
<template>
  <button @click="decryptAffix()" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
