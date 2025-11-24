<script setup lang="ts">
import { computed } from 'vue'
import { useItem } from '@/stores/modules/useItem'
import AffixList from './AffixList.vue'

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
        <h3>分类道具</h3>
        <div class="category">
          <h4>category.name</h4>
          <ul>
            <li>item.name</li>
          </ul>
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
</style>
