<script setup lang="ts">
import type { AffixFamily } from '@/utils/factory/newAffixFamily'
import AffixList from './AffixList.vue'
import { computed, ref, watch } from 'vue'
import type { Affix } from '@/utils/factory/newAffix'

export type AffixSearchProps = {
  affixFamilies: AffixFamily[]
}

const { affixFamilies } = defineProps<AffixSearchProps>()

const selectedTierMap = ref<Record<string, number>>(
  affixFamilies
    .map((af) => ({ [af.id]: af.items[af.items.length - 1]?.tier || -1 }))
    .reduce((a, b) => ({ ...a, ...b }), {}),
)

watch(
  () => affixFamilies,
  (affixFamilies) => {
    const next = { ...selectedTierMap.value }
    for (const af of affixFamilies) {
      if (!af?.items?.length) continue
      if (next[af.id] == null) next[af.id] = af.items[af.items.length - 1]?.tier || -1
    }
    selectedTierMap.value = next
  },
  { immediate: true, deep: true },
)

const filteredAffixes = computed(() => {
  return affixFamilies.map((af) => {
    const t = selectedTierMap.value[af.id]
    return af.items.find((a) => a.tier === t) ?? af.items[0]
  }) as Affix[]
})

const tierOptionsMap = computed(() => {
  const tierOptionsMap = new Map()
  affixFamilies.forEach((af) => {
    tierOptionsMap.set(
      af.id,
      af.items
        .map((a) => ({
          label: `T${a.tier}`,
          value: a.tier,
        }))
        .sort((a, b) => a.value - b.value),
    )
  })
  return tierOptionsMap
})
</script>

<template>
  <div class="affix-search">
    <AffixList :items="filteredAffixes" :itemKey="(a) => `${a.id}-${a.tier}`">
      <template #actions="{ item }">
        <t-select
          class="tier-select"
          v-model="selectedTierMap[item.id]"
          :options="tierOptionsMap.get(item.id)"
        />
      </template>
    </AffixList>
  </div>
</template>

<style scoped>
.affix-search {
  height: calc(100vh - 300px);
  overflow-y: scroll;
}
.tier-select {
  width: 70px;
}
</style>
