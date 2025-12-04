<script setup lang="ts">
import HidepointPlaceLayout from '@/layout/HidepointPlaceLayout'
import InitItem from './hidepointPlace/InitItem.vue'
import CraftingItem from './hidepointPlace/CraftingItem.vue'
import { useItem } from '@/stores/modules/useItem'

const _item = useItem()

// todo: 添加e2e测试
// 0词条 normal magic rare
// 1词条 magic rare
// 2词条 magic rare
// 3词条 rare
const handleNextStep = (step: number) => {
  const affixCount = _item.state.affixFamilies.length
  const rarity = _item.state.rarity

  if (step === 2) {
    // 0 词条 normal => normal 蜕变
    // 0 词条 magic  => magic  增幅
    // 0 词条 magic  => magic  富豪 (极端case 暂未处理)
    // 0 词条 rare   => rare   崇高
    if (affixCount === 0) {
      _item.setState({
        usedProps: {
          ..._item.state.usedProps,
          transmutationOrb: rarity === 'magic',
          regalOrb: rarity === 'rare',
        },
      })
    }

    // 1 词条 normal => magic 增幅
    // 1 词条 magic  => magic 增幅
    // 1 词条 magic  => magic 富豪 (极端case 暂未处理)
    // 1 词条 rare   => rare  崇高
    if (affixCount === 1) {
      if (rarity === 'normal') {
        _item.setState({
          rarity: 'magic',
        })
      }
      _item.setState({
        usedProps: {
          ..._item.state.usedProps,
          transmutationOrb: true,
        },
      })
    }

    // 2 词条 normal => magic 富豪
    // 2 词条 magin  => magic 富豪
    // 2 词条 rare   => rare  崇高
    if (affixCount === 2) {
      if (rarity === 'normal') {
        _item.setState({
          rarity: 'magic',
        })
      }
      _item.setState({
        usedProps: {
          ..._item.state.usedProps,
          transmutationOrb: true,
          augmentationOrb: true,
        },
      })
    }

    // 3 词条 normal => rare 崇高
    // 3 词条 magic  => rare 崇高
    // 3 词条 rare   => rare 崇高
    if (affixCount >= 3) {
      if (rarity !== 'rare') {
        _item.setState({
          rarity: 'rare',
        })
      }
      _item.setState({
        usedProps: {
          ..._item.state.usedProps,
          transmutationOrb: true,
          augmentationOrb: true,
          regalOrb: true,
        },
      })
    }
  }
}

const handleFinish = () => {
  console.log('完成做装，导出结果')
}
</script>

<template>
  <main class="hp">
    <HidepointPlaceLayout @finish="handleFinish" @next="handleNextStep">
      <template #step-0>
        <InitItem />
      </template>

      <template #step-1>
        <CraftingItem />
      </template>

      <template #step-2>
        <t-card header="步骤三 · 结果归档">
          <p class="desc">查看结果与导出记录。</p>
          <div class="body">
            <t-button variant="outline" size="small">导出 JSON</t-button>
          </div>
        </t-card>
      </template>
    </HidepointPlaceLayout>
  </main>
</template>

<style scoped>
.hp {
  max-width: 1376px;
  margin: 0 auto;
  padding: 24px 16px 64px;
}
</style>
