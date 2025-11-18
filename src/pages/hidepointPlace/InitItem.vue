<script setup lang="ts">
import { Item_Rarity_Options, useItem, type ItemType } from '@/stores/modules/useItem'
import AffixList from './AffixList.vue'
import AffixSearch from './AffixSearch.vue'
import type { Affix } from '@/utils/factory/newAffix'
import { DeleteIcon } from 'tdesign-icons-vue-next'
import { computed, ref, watchEffect } from 'vue'
import { generateAddPool } from '@/utils/pool/generateAddPool'
import { Item_Type_Options } from '@/stores/modules/useItem'
import type { SelectValue, SliderValue } from 'tdesign-vue-next'

const { inited } = defineProps<{
  inited?: boolean
}>()

const item = useItem()

const removeAffix = (affix: Affix) => {
  item.setState({
    affixFamilies: item.state.affixFamilies.filter((af) => af.id !== affix.id),
  })
}

const affixFamilies = ref(null)

watchEffect(async () => {
  const data = await item.currentAffixFamiliesPool
  // FileContent类型，取出normal部分
  affixFamilies.value = data.normal
})

const affixFamiliesPool = computed(() => {
  if (item.state.affixFamilies.length >= 6 || !affixFamilies.value) return []

  let pool = generateAddPool(affixFamilies.value, item.state.affixFamilies, {
    deduplication: true,
    onlyPrefix: item.counts.suffixCount >= 3,
    onlySuffix: item.counts.prefixCount >= 3,
  })

  const itemLevel = item.state.level

  pool = pool
    .map((af) => ({
      ...af,
      items: af.items.filter((a) => a.level <= itemLevel).sort((a, b) => a.tier - b.tier),
    }))
    // 当af没有符合等级affix的时候，需要清除当前af
    .filter((af) => af.items.length)

  return pool
})

const handleSlide = (level: SliderValue) => {
  item.setState({
    level: level as number,
    affixFamilies: [],
  })
}

const handleSelectType = (value: SelectValue) => {
  item.setState({
    type: value as ItemType,
    affixFamilies: [],
  })
}
</script>

<template>
  <section class="init-item">
    <div class="side left">
      <t-card header="基础信息与已选词缀">
        <div class="line">
          <t-form-item label="装备类型" label-width="72">
            <t-select
              :value="item.state.type"
              @change="handleSelectType"
              size="small"
              :options="Item_Type_Options"
              placeholder="选择"
              :disabled="inited"
            />
          </t-form-item>
          <t-form-item label="稀有度" label-width="60">
            <t-select
              v-model="item.state.rarity"
              size="small"
              :options="Item_Rarity_Options"
              placeholder="选择"
              :disabled="inited"
            />
          </t-form-item>
          <t-form-item label="等级" label-width="48">
            <t-input-number
              v-model="item.state.level"
              size="small"
              :min="1"
              :max="100"
              :disabled="inited"
            />
          </t-form-item>
        </div>

        <div class="slider">
          <t-slider
            :value="item.state.level"
            @change-end="handleSlide"
            :min="1"
            :max="100"
            :show-tooltip="true"
            :disabled="inited"
          />
        </div>

        <div class="selected-wrap">
          <div class="selected-title">已选择（{{ item.hitAffixes.length }}）</div>
          <AffixList :items="item.hitAffixes" :itemKey="(a) => `${a.id}-${a.tier}`" showTier>
            <template v-if="!inited" #actions="{ item }">
              <t-button size="small" theme="danger" @click="() => removeAffix(item)">
                <delete-icon></delete-icon>
              </t-button>
            </template>
          </AffixList>
        </div>
      </t-card>
    </div>

    <!-- 右 -->
    <div class="side right">
      <t-card v-if="!inited" header="词缀搜索与目录">
        <AffixSearch :affixFamiliesPool="affixFamiliesPool"> </AffixSearch>
      </t-card>
      <template v-else>
        <slot></slot>
      </template>
    </div>
  </section>
</template>

<style scoped>
.init-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.side {
  flex: 1 1 480px;
  min-width: 0;
}

/* 顶部行 */
.line {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.line :deep(.t-form__item) {
  flex: 1 1 180px;
  margin: 0;
}

/* 滑块 */
.slider {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 8px;
}
.slider :deep(.t-slider) {
  flex: 1 1 auto;
  min-width: 320px;
  max-width: 100%;
}
.slider :deep(.t-slider__button) {
  background-color: var(--td-brand-color);
}
</style>
