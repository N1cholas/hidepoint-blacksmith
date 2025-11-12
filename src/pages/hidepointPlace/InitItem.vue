<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import AffixList from './AffixList.vue'
import AffixSearch from './AffixSearch.vue'
import type { AffixFamily } from '@/utils/factory/newAffixFamily'

const item = useItem()
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
                { label: '弓', value: 'bows' },
                { label: '箭袋', value: 'quivers' },
                { label: '戒指', value: 'rings' },
                { label: '项链', value: 'amulets' },
              ]"
              placeholder="选择"
            />
          </t-form-item>
          <t-form-item label="稀有度" label-width="60">
            <t-select
              v-model="item.state.rarity"
              size="small"
              :options="[
                { label: '普通', value: 'normal' },
                { label: '魔法', value: 'magic' },
                { label: '稀有', value: 'rare' },
              ]"
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
          <AffixList :items="item.hitAffixes">
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
        <AffixSearch
          :families="
            [
              {
                id: 'phys',
                isPrefix: true,
                items: [
                  { str: '增加 25–35% 物理伤害', tier: 1 },
                  { str: '增加 20–28% 物理伤害', tier: 2 },
                ],
              },
              {
                id: 'aspd',
                isPrefix: false,
                items: [
                  { str: '攻击速度 +10–12%', tier: 2 },
                  { str: '攻击速度 +7–9%', tier: 3 },
                ],
              },
            ] as AffixFamily[]
          "
          :removable="false"
        >
          <template #actions="{ family, tier }">
            <t-button size="small" @click="$emit('choose', { id: family.id, tier })">选择</t-button>
          </template>
        </AffixSearch>
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
</style>
