<script setup lang="ts">
import { useItemState } from '@/stores/itemState'
import ModItem from './ModItem.vue'
import { MOD_GENERATION_TYPE, type Affix } from '@/types/types'
import { SESSION3_CONFIG } from '@/config/session3Config'

defineProps<{ mods: Affix[] }>()

const itemState = useItemState()
</script>
<template>
  <ul class="mods-wrapper">
    <ModItem
      v-for="(mod, i) in mods.filter((m) => m.ModGenerationTypeID === MOD_GENERATION_TYPE.PREFIX)"
      :key="mod.str + mod.ModFamilyList"
      :mod="mod"
      :type="'prefix'"
      :showModType="i === 0"
      :locked="mod.ModFamilyList[0] === itemState.lockedAffixId"
      :showPlaceholder="mod.ModFamilyList[0] === SESSION3_CONFIG.PLACEHOLDER_ID"
    />
    <ModItem
      v-for="(mod, i) in mods.filter((m) => m.ModGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX)"
      :key="mod.str + mod.ModFamilyList"
      :mod="mod"
      :type="'suffix'"
      :showModType="i === 0"
      :locked="mod.ModFamilyList[0] === itemState.lockedAffixId"
      :showPlaceholder="mod.ModFamilyList[0] === SESSION3_CONFIG.PLACEHOLDER_ID"
    />
  </ul>
</template>
<style scoped>
.mods-wrapper {
  min-height: 200px;
  text-align: center;
  padding: 0;
  margin: 20px 0;
}
</style>
