<script setup lang="ts">
import { useItemState } from '@/stores/itemState'
import ModsList from '@/components/ModsList.vue'
import { ITEM_TYPE } from '@/types/types'
import { showItemTypeMsg } from '@/utils/processString'

const itemState = useItemState()
</script>
<template>
  <div class="greetings">
    <h3 class="item-type">
      <span
        :class="{
          normal: itemState.itemType === ITEM_TYPE.NORMAL,
          magic: itemState.itemType === ITEM_TYPE.MAGIC,
          rare: itemState.itemType === ITEM_TYPE.RARE,
        }"
        >({{ showItemTypeMsg(itemState.itemType) }})双生之弓</span
      >:
    </h3>
    <ModsList :mods="itemState.affixes" />
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

.normal {
  color: gray;
}
.magic {
  color: rgb(64, 64, 229);
}
.rare {
  color: rgb(231, 199, 16);
}
</style>
