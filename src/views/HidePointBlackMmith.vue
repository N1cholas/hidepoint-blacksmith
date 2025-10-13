<script setup lang="ts">
import { processHtmlString } from '../utils/utils'
import _ from 'lodash'
import { MOD_GENERATION_TYPE } from '@/types/types'
import { useItemState } from '@/stores/itemState'

defineProps<{
  msg: string
}>()

const itemState = useItemState()
</script>
<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3 class="item-type"><span class="green">双生之弓</span>:</h3>
    <ul class="mods-wrapper">
      <li
        v-for="(mod, i) in itemState.mods.filter(
          (mod) => mod.ModGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
        )"
        class="prefix-mods"
        :key="mod.str + mod.ModFamilyList"
      >
        <span v-if="i === 0" class="prefix">前缀</span>
        {{ processHtmlString(mod.str) }}
        <span class="power-level" v-if="mod.powerLevel">T{{ mod.powerLevel }}</span>
      </li>
      <li
        v-for="(mod, i) in itemState.mods.filter(
          (mod) => mod.ModGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
        )"
        class="suffix-mods"
        :key="mod.str + mod.ModFamilyList"
      >
        <span v-if="i === 0" class="prefix">后缀</span>
        {{ processHtmlString(mod.str) }}
        <span class="power-level" v-if="mod.powerLevel">T{{ mod.powerLevel }}</span>
      </li>
    </ul>
    <button @click="itemState.$reset">重置</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    /* text-align: left; */
  }
}
.item-type {
  text-align: center;
}
.mods-wrapper {
  height: 150px;
  text-align: center;
  padding: 0;
}
.mods-wrapper li {
  list-style: none;
  position: relative;
  padding-top: 2px;
}
.prefix {
  position: absolute;
  left: -40px;
}
.power-level {
  position: absolute;
  right: -40px;
}
</style>
