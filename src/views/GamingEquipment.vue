<script setup lang="ts">
import { useItemState } from '@/stores/itemState'
import ModsList from '@/components/ModsList.vue'
import { ITEM_RARITY } from '@/types/types'
import { showItemRarityMsg } from '@/utils/processString'
import { ITEM_CONFIG } from '@/config/itemConfig'

const itemState = useItemState()
</script>
<template>
  <div class="equipment">
    <h3 class="item-type">
      <span
        :class="{
          normal: itemState.itemRarity === ITEM_RARITY.NORMAL,
          magic: itemState.itemRarity === ITEM_RARITY.MAGIC,
          rare: itemState.itemRarity === ITEM_RARITY.RARE,
        }"
        ><input
          type="text"
          v-model.number.trim="itemState.itemLevel"
          :max="ITEM_CONFIG.MAXIMUM_LEVEL"
        />级 ({{ showItemRarityMsg(itemState.itemRarity) }}) 双生之弓</span
      >
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

.equipment h1,
.equipment h3 {
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
input {
  width: 25px;
  font-size: inherit;
  border: none;
  line-height: inherit;
  color: inherit;
  background: inherit;
}
</style>
