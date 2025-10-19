<script setup lang="ts">
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { useItemState } from '@/stores/itemState'
import { type Modifier, MOD_GENERATION_TYPE } from '@/types/types'
import {
  reverseRandomlyObtainAffixFamily,
  randomlyObtainAffixFamily,
  randomlyObtainAffix,
} from '@/utils/randomlyObtain'
import { generateAddPool, generateRemovePool, generateReplacePool } from '@/utils/generatePool'
import { computed } from 'vue'
import { useOmenState } from '@/stores/omenState'

defineProps<{
  name: string
}>()

const itemState = useItemState()
const omenState = useOmenState()

const disable = computed(() => itemState.affixes.length < 2)

const removeAffix = () => {
  const removeAffixFamiliesPool = generateRemovePool(itemState.affixFamilies, {
    onlyPrefix: omenState.omenConfig.sinistralAnnulment,
    onlySuffix: omenState.omenConfig.dextralAnnulment,
  })

  const shouldRemoveAffixFamily =
    reverseRandomlyObtainAffixFamily<Modifier[]>(removeAffixFamiliesPool)

  const [shouldRemoveAffixFamilyIndex, shouldRemoveAffixIndex] = itemState.findIndexById(
    shouldRemoveAffixFamily.id,
  )

  itemState.removeAffix(shouldRemoveAffixIndex, shouldRemoveAffixFamilyIndex)
}
</script>

<template>
  <button @click="removeAffix()" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
