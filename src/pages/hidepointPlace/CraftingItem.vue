<script setup lang="ts">
import { computed } from 'vue'
import { useItem } from '@/stores/modules/useItem'
import TransmutationOrb from '@/components/TransmutationOrb.vue'
import AugmentationOrb from '@/components/AugmentationOrb.vue'
import OmenOf from '@/components/OmenOf.vue'
import AffixList from './AffixList.vue'
import { t } from '@/locales'
import RegalOrb from '@/components/RegalOrb.vue'

const _item = useItem()

const itemType = computed(() => _item.state.type)
const itemLevel = computed(() => _item.state.level)
const itemRarity = computed(() => _item.state.rarity)
</script>

<template>
  <div class="crafting-item">
    <div class="side left">
      <t-card>
        <div class="info-row">
          <span>{{ itemRarity }}</span>
          <span>{{ itemLevel }}</span>
          <span>{{ itemType }}</span>
        </div>
        <AffixList
          :items="_item.hitAffixes"
          :lockedAffix="_item.state.lockedAffix"
          :itemKey="(a) => `${a.id}-${a.tier}`"
          showTier
        >
        </AffixList>
      </t-card>
    </div>

    <!-- 右侧显示分类的道具 -->
    <div class="side right">
      <t-card>
        <div class="category">
          <h3>通货</h3>
          <div class="props-wrapper">
            <TransmutationOrb name="蜕变石" :minimumLevel="0" :maximumLevel="_item.state.level" />
            <AugmentationOrb name="增幅石" :minimumLevel="0" :maximumLevel="_item.state.level" />
            <RegalOrb name="富豪石" :minimumLevel="0" :maximumLevel="_item.state.level" />
          </div>
        </div>
      </t-card>
      <t-card>
        <div class="category">
          <h3>预兆</h3>
          <div class="props-wrapper">
            <!-- 崇高石 -->
            <OmenOf :name="t('omen.homogenisingExaltaion')" omenConfigKey="homogenisingExaltaion" />
            <OmenOf :name="t('omen.sinistralExaltation')" omenConfigKey="sinistralExaltation" />
            <OmenOf :name="t('omen.dextralExaltation')" omenConfigKey="dextralExaltation" />
            <OmenOf :name="t('omen.greaterExaltation')" omenConfigKey="greaterExaltation" />
            <!-- <Button class="tools">催化崇高预兆</Button> -->
            <!-- 富豪石 -->
            <OmenOf
              :name="t('omen.homogenisingCoronation')"
              omenConfigKey="homogenisingCoronation"
            />
            <!-- 混沌石 -->
            <OmenOf :name="t('omen.whittling')" omenConfigKey="whittling" />
            <OmenOf :name="t('omen.sinistralErasure')" omenConfigKey="sinistralErasure" />
            <OmenOf :name="t('omen.dextralErasure')" omenConfigKey="dextralErasure" />
            <!-- 剥离石 -->
            <OmenOf :name="t('omen.sinistralAnnulment')" omenConfigKey="sinistralAnnulment" />
            <OmenOf :name="t('omen.dextralAnnulment')" omenConfigKey="dextralAnnulment" />
          </div>
        </div>
      </t-card>
    </div>
  </div>
</template>

<style scoped>
.crafting-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.side {
  flex: 1 1 480px;
  min-width: 0;
}
.right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.left {
  position: sticky;
  top: 16px; /* 固定在页面顶部 16px */
  align-self: flex-start;
}
.info-row {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
  color: var(--td-text-color-primary);
  background: var(--td-bg-color-container-hover);
  padding: 8px 12px;
  border-radius: var(--td-radius-medium);
  border: 1px solid var(--td-border-level-1-color);
}

.category {
  margin-bottom: 16px;
}

h3 {
  font-size: 20px;
}

.props-wrapper {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
