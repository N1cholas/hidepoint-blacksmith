<script setup lang="ts">
import { useItem } from '@/stores/modules/useItem'
import { useDesecrated } from '@/stores/modules/useDesecrated'
import { ref, watchEffect } from 'vue'
import CommonModal from '@/components/CommonModal.vue'
import AffixList from './AffixList.vue'

defineProps<{
  title: string
}>()

const _desecrated = useDesecrated()
const _item = useItem()

const affixFamiliesPool = ref()

watchEffect(async () => {
  const data = await _item.currentAffixFamiliesPool
  affixFamiliesPool.value = data.normal
})

const handleSelect = () => {}

const handleConfirm = () => {}

const handleReselect = () => {}

const handleClose = () => {
  _desecrated.$reset()
}
</script>
<template>
  <Teleport to="body">
    <CommonModal :show="_desecrated.state.showModal" @close="handleClose">
      <template #header>
        <h3>解密亵渎词缀</h3>
      </template>
      <template #body>
        <AffixList
          :items="_desecrated.hitAffixes"
          :itemKey="(affix) => affix.id"
          :lockedAffix="null"
        />
      </template>
      <template #footer> </template>
    </CommonModal>
  </Teleport>
</template>

<style scoped>
.mr-20 {
  margin-right: 20px;
}
</style>
