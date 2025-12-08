<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useItem } from '@/stores/modules/useItem'
import TransmutationOrb from '@/components/TransmutationOrb.vue'
import AugmentationOrb from '@/components/AugmentationOrb.vue'
import OmenOf from '@/components/OmenOf.vue'
import AffixList from './AffixList.vue'
import { t } from '@/locales'
import RegalOrb from '@/components/RegalOrb.vue'
import ExaltedOrb from '@/components/ExaltedOrb.vue'
import ChaosOrb from '@/components/ChaosOrb.vue'
import AnnulmentOrb from '@/components/AnnulmentOrb.vue'
import FracturingOrb from '@/components/FracturingOrb.vue'
import JawBone from '@/components/JawBone.vue'
import type { Affix } from '@/utils/factory/createAffix'
import { DESECRATED_ID } from '@/utils/factory/createDesecratedAffix'
import { useDesecrated } from '@/stores/modules/useDesecrated'
import { useOmen } from '@/stores/modules/useOmen'
import { generateDecryptAffix } from '@/utils/pool/generateDecryptPool'

const _item = useItem()
const _omen = useOmen()
const _desecrated = useDesecrated()

const itemType = computed(() => _item.state.type)
const itemLevel = computed(() => _item.state.level)
const itemRarity = computed(() => _item.state.rarity)

const affixFamiliesPool = ref()

watchEffect(async () => {
  const data = await _item.currentAffixFamiliesPool
  affixFamiliesPool.value = data.normal
})

const handleDecrypt = (affix: Affix) => {
  if (affix.id === DESECRATED_ID) {
    _desecrated.setState({
      showModal: true,
      echoesCounts: _omen.config.abyssalEchoes ? 1 : 0,
      decryptingAffixFamilies: generateDecryptAffix(
        affixFamiliesPool.value,
        _item.state.affixFamilies.filter(af => af.id !== DESECRATED_ID),
        {
          deduplication: true,
          onlyPrefix: _item.placeholder?.isPrefix,
          onlySuffix: !_item.placeholder?.isPrefix,
        },
        [_desecrated.state.minimumLevel, _desecrated.state.maximumLevel],
        3,
      ),
    })
  }
}
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
          :itemKey="(a: Affix) => `${a.id}-${a.tier}`"
          showTier
          @decrypt="handleDecrypt"
        >
        </AffixList>
      </t-card>
    </div>

    <div class="side right">
      <t-card>
        <div class="category">
          <h3>通货</h3>
          <div class="props-wrapper">
            <div class="sub-category">
              <TransmutationOrb name="蜕变石" :minimumLevel="0" :maximumLevel="_item.state.level" />
              <TransmutationOrb
                name="高级蜕变石"
                :minimumLevel="55"
                :maximumLevel="_item.state.level"
              />
              <TransmutationOrb
                name="完美蜕变石"
                :minimumLevel="70"
                :maximumLevel="_item.state.level"
              />
            </div>
            <div class="sub-category">
              <AugmentationOrb name="增幅石" :minimumLevel="0" :maximumLevel="_item.state.level" />
              <AugmentationOrb
                name="高级增幅石"
                :minimumLevel="55"
                :maximumLevel="_item.state.level"
              />
              <AugmentationOrb
                name="完美增幅石"
                :minimumLevel="70"
                :maximumLevel="_item.state.level"
              />
            </div>
            <div class="sub-category">
              <RegalOrb name="富豪石" :minimumLevel="0" :maximumLevel="_item.state.level" />
              <RegalOrb name="高级富豪石" :minimumLevel="35" :maximumLevel="_item.state.level" />
              <RegalOrb name="完美富豪石" :minimumLevel="50" :maximumLevel="_item.state.level" />
            </div>
            <div class="sub-category">
              <ExaltedOrb name="崇高石" :minimumLevel="0" :maximumLevel="_item.state.level" />
              <ExaltedOrb name="高级崇高石" :minimumLevel="35" :maximumLevel="_item.state.level" />
              <ExaltedOrb name="完美崇高石" :minimumLevel="50" :maximumLevel="_item.state.level" />
            </div>
            <div class="sub-category">
              <ChaosOrb name="混沌石" :minimumLevel="0" :maximumLevel="_item.state.level" />
              <ChaosOrb name="高级混沌石" :minimumLevel="35" :maximumLevel="_item.state.level" />
              <ChaosOrb name="完美混沌石" :minimumLevel="50" :maximumLevel="_item.state.level" />
            </div>
            <div class="sub-category">
              <JawBone name="啃噬颚骨" :minimumLevel="0" :maximumLevel="64" />
              <JawBone name="遗存颚骨" :minimumLevel="0" :maximumLevel="_item.state.level" />
              <JawBone name="远古颚骨" :minimumLevel="40" :maximumLevel="_item.state.level" />
            </div>
            <div class="sub-category">
              <AnnulmentOrb name="剥离石" />
              <FracturingOrb name="破溃宝珠" />
            </div>
          </div>
        </div>
      </t-card>
      <t-card>
        <div class="category">
          <h3>预兆</h3>
          <div class="props-wrapper">
            <div class="sub-category">
              <h4>崇高石相关预兆</h4>
              <!-- <Button class="tools">催化崇高预兆</Button> -->
              <OmenOf
                :name="t('omen.homogenisingExaltaion')"
                omenConfigKey="homogenisingExaltaion"
              />
              <OmenOf :name="t('omen.sinistralExaltation')" omenConfigKey="sinistralExaltation" />
              <OmenOf :name="t('omen.dextralExaltation')" omenConfigKey="dextralExaltation" />
              <OmenOf :name="t('omen.greaterExaltation')" omenConfigKey="greaterExaltation" />
            </div>
            <div class="sub-category">
              <h4>混沌石相关预兆</h4>
              <OmenOf :name="t('omen.whittling')" omenConfigKey="whittling" />
              <OmenOf :name="t('omen.sinistralErasure')" omenConfigKey="sinistralErasure" />
              <OmenOf :name="t('omen.dextralErasure')" omenConfigKey="dextralErasure" />
            </div>
            <div class="sub-category">
              <h4>深渊相关预兆</h4>
              <OmenOf name="深渊回响预兆" omenConfigKey="abyssalEchoes" />
              <OmenOf name="光明预兆" omenConfigKey="light" />
              <OmenOf name="左旋死灵预兆" omenConfigKey="sinistralNecromancy" />
              <OmenOf name="右旋死灵预兆" omenConfigKey="dextralNecromancy" />
            </div>
            <div class="sub-category">
              <h4>剥离石相关预兆</h4>
              <OmenOf :name="t('omen.sinistralAnnulment')" omenConfigKey="sinistralAnnulment" />
              <OmenOf :name="t('omen.dextralAnnulment')" omenConfigKey="dextralAnnulment" />
            </div>
            <div class="sub-category">
              <h4>富豪石相关预兆</h4>
              <OmenOf
                :name="t('omen.homogenisingCoronation')"
                omenConfigKey="homogenisingCoronation"
              />
            </div>
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
  top: 16px;
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

.sub-category {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
