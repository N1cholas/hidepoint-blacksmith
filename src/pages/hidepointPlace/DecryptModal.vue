<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { useDesecrated } from '@/stores/modules/useDesecrated'
import { ref, watchEffect } from 'vue'
import CommonModal from '@/components/CommonModal.vue'
import AffixList from './AffixList.vue'
import { useOmen } from '@/stores/modules/useOmen'
import type { Affix } from '@/utils/factory/createAffix'

defineProps<{
  title: string
}>()

const _item = useItem()
const _omen = useOmen()
const _desecrated = useDesecrated()

const affixFamiliesPool = ref()

watchEffect(async () => {
  const data = await _item.currentAffixFamiliesPool
  affixFamiliesPool.value = data.normal
})

const handleDecrypt = (selectedAffix: Affix) => {
  _desecrated.selectAffixFamily(selectedAffix)
}

const handleConfirm = () => {
  _desecrated.confirmSelect()
}

const handleReselect = () => {
  _desecrated.reSelect()
  _desecrated.setState({
    echoesCounts: _desecrated.state.echoesCounts - 1,
  })
}
</script>
<template>
  <Teleport to="body">
    <CommonModal :show="_desecrated.state.showModal" :enableMaskClose="true">
      <template #header>
        <h3>解密亵渎词缀</h3>
      </template>
      <template #body>
        <AffixList
          :items="_desecrated.hitAffixes"
          :itemKey="(affix) => `${affix.id}`"
          :lockedAffix="null"
          @decrypt="handleDecrypt"
          isSelectAffix
          showTier
        />
      </template>
      <template #footer>
        <div>
          <t-button
            :disabled="_desecrated.state.echoesCounts <= 0"
            v-show="_omen.config.abyssalEchoes"
            class="mr-20"
            @click="handleReselect"
          >
            重新选择
          </t-button>
          <t-button :disabled="!_desecrated.isSelect" @click="handleConfirm">确认解密</t-button>
        </div>
      </template>
    </CommonModal>
  </Teleport>
</template>

<style scoped>
.mr-20 {
  margin-right: 20px;
}
</style>
