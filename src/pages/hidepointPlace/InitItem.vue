<script setup lang="ts">
import { Item_Rarity_Options, useItem } from '@/stores/modules/useItem'
import AffixList from './AffixList.vue'
import AffixSearch from './AffixSearch.vue'
import { useData } from '@/stores/modules/useData'

const item = useItem()
const data = useData()
</script>

<template>
  <section class="init-item">
    <div class="side left">
      <t-card header="基础信息与已选词缀">
        <div class="line">
          <t-form-item label="装备类型" label-width="72">
            <t-select
              v-model="item.state.type"
              size="small"
              :options="[
                { label: '弓', value: 'Bow' },
                { label: '箭袋', value: 'Quiver' },
              ]"
              placeholder="选择"
            />
          </t-form-item>
          <t-form-item label="稀有度" label-width="60">
            <t-select
              v-model="item.state.rarity"
              size="small"
              :options="Item_Rarity_Options"
              placeholder="选择"
            />
          </t-form-item>
          <t-form-item label="等级" label-width="48">
            <t-input-number v-model="item.state.level" size="small" :min="1" :max="100" />
          </t-form-item>
        </div>

        <div class="slider">
          <t-slider v-model="item.state.level" :min="1" :max="100" :show-tooltip="true" />
        </div>

        <div class="selected-wrap">
          <div class="selected-title">已选择（{{ item.hitAffixes.length }}）</div>
          <AffixList :items="item.hitAffixes" :itemKey="(a) => `${a.id}-${a.tier}`" showTier>
            <template #actions="{ item }">
              <t-button size="small" theme="danger" @click="() => console.log(item)">移除</t-button>
            </template>
          </AffixList>
        </div>
      </t-card>
    </div>

    <!-- 右 -->
    <div class="side right">
      <t-card header="词缀搜索与目录">
        <AffixSearch :affixFamilies="data.bowData"> </AffixSearch>
      </t-card>
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
