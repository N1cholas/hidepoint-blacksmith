<script setup lang="ts">
import type { AffixFamily } from '@/utils/factory/newAffixFamily'
import AffixList from './AffixList.vue'
import { computed, ref, watch } from 'vue'
import type { Affix } from '@/utils/factory/newAffix'
import { TaskAdd1Icon } from 'tdesign-icons-vue-next'
import { useItem } from '@/stores/modules/useItem'

export type AffixSearchProps = {
  affixFamiliesData: AffixFamily[]
}

const item = useItem()

const { affixFamiliesData } = defineProps<AffixSearchProps>()

const selectedTiers = ref<Record<string, number>>({})

watch(
  () => affixFamiliesData,
  (affixFamilies) => {
    const next = { ...selectedTiers.value }
    for (const af of affixFamilies) {
      if (!af?.items?.length) continue
      if (next[af.id] == null) next[af.id] = af.items[af.items.length - 1]?.tier || -1
    }
    selectedTiers.value = next
  },
  { deep: true, immediate: true },
)

const generateAffixesByTier = computed(() => {
  const addedIDs = item.state.affixFamilies.map((af) => af.id)

  const filteredAF = affixFamiliesData
    .filter((af) => !addedIDs.includes(af.id))
    .map((af) => ({ ...af, items: af.items.filter((a) => a.level <= item.state.level) }))

  const filteredA = filteredAF.map((af) => {
    const t = selectedTiers.value?.[af.id]
    return af.items.find((a) => a.tier === t) ?? af.items[0]
  }) as Affix[]

  return filteredA
})

const tierOptionsMap = computed(() => {
  const tierOptionsMap = new Map()
  affixFamiliesData.forEach((af) => {
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

const addAffix = (affix: Affix) => {
  const hitAffixFamily = affixFamiliesData.find((af) => af.id === affix.id)

  if (!hitAffixFamily) return

  hitAffixFamily.hitAffix = affix

  item.setState({
    affixFamilies: [...item.state.affixFamilies, hitAffixFamily],
  })
}
</script>

<template>
  <div class="affix-search">
    <AffixList :items="generateAffixesByTier" :itemKey="(a) => `${a.id}-${a.tier}`">
      <template #actions="{ item }">
        <t-select
          class="tier-select"
          size="small"
          v-model="selectedTiers[item.id]"
          :options="tierOptionsMap.get(item.id)"
        />
        <t-button size="small" @click="() => addAffix(item)">
          <task-add-1-icon></task-add-1-icon>
        </t-button>
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
