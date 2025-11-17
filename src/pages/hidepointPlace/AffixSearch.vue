<script setup lang="ts">
import type { AffixFamily } from '@/utils/factory/newAffixFamily'
import AffixList from './AffixList.vue'
import { computed, ref, watch } from 'vue'
import type { Affix } from '@/utils/factory/newAffix'
import { AddIcon } from 'tdesign-icons-vue-next'
import { useItem } from '@/stores/modules/useItem'

export type AffixSearchProps = {
  affixFamiliesPool: AffixFamily[]
}

const { affixFamiliesPool } = defineProps<AffixSearchProps>()

const item = useItem()

const selectedTiers = ref<Record<string, number>>({})

watch(
  () => affixFamiliesPool,
  (affixFamilies) => {
    const next = { ...selectedTiers.value }
    for (const af of affixFamilies) {
      if (!af?.items?.length) continue

      next[af.id] = af.items[0]?.tier || -1
    }
    selectedTiers.value = next
  },
  { deep: true, immediate: true },
)

const generateAffixesByTier = computed(() => {
  return affixFamiliesPool.map((af) => {
    const t = selectedTiers.value?.[af.id]
    return af.items.find((a) => a.tier === t) ?? af.items[0]
  }) as Affix[]
})

const tierOptionsMap = computed(() => {
  const tierOptionsMap = new Map()
  affixFamiliesPool.forEach((af) => {
    tierOptionsMap.set(
      af.id,
      af.items.map((a) => ({
        label: `T${a.tier}`,
        value: a.tier,
      })),
    )
  })
  return tierOptionsMap
})

const addAffix = (affix: Affix) => {
  const hitAffixFamily = affixFamiliesPool.find((af) => af.id === affix.id)

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
          <add-icon></add-icon>
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
