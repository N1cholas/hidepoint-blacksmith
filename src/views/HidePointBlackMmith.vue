<script setup lang="ts">
import { useItemState } from '@/stores/itemState'
import ModsList from '@/components/ModsList.vue'

defineProps<{ msg: string }>()

const itemState = useItemState()
</script>
<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3 class="item-type"><span class="green">双生之弓</span>:</h3>
    <ModsList :mods="itemState.mods" />
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
</style>
