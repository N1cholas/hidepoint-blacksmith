<script setup lang="ts">
import ModItem from './ModItem.vue'
import { MOD_GENERATION_TYPE, type Modifier } from '@/types/types'
defineProps<{ mods: Modifier[] }>()
</script>
<template>
  <ul class="mods-wrapper">
    <ModItem
      v-for="(mod, i) in mods.filter((m) => m.ModGenerationTypeID === MOD_GENERATION_TYPE.PREFIX)"
      :key="mod.str + mod.ModFamilyList"
      :mod="mod"
      :type="'prefix'"
      :showModType="i === 0"
    />
    <ModItem
      v-for="(mod, i) in mods.filter((m) => m.ModGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX)"
      :key="mod.str + mod.ModFamilyList"
      :mod="mod"
      :type="'suffix'"
      :showModType="i === 0"
    />
  </ul>
</template>
<style scoped>
.mods-wrapper {
  height: 150px;
  text-align: center;
  padding: 0;
}
</style>
