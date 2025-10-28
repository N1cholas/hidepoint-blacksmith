<script setup lang="ts">
import _ from 'lodash'
import Modal from '@/components/Modal.vue'
import ModsList from '@/components/ModsList.vue'
import { useItemState } from '@/stores/itemState'
import { computed, ref } from 'vue'
import { useSession3State } from '@/stores/session3State'
import { generateAddPool } from '@/utils/generatePool'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { MOD_GENERATION_TYPE, type Affix } from '@/types/types'
import { SESSION3_CONFIG } from '@/config/session3Config'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'

defineProps<{
  name: string
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const session3State = useSession3State()

const disable = computed(() => !session3State.placeholder)

const modGenerationType = session3State.placeholder?.modGenerationTypeID

// 解密亵渎占位符
// 展示3条词缀以及重选按钮
const decryptAffix = () => {
  const newAffixFamily = generateAddPool(normalMods.normalModsFamily, itemState.affixFamilies, {
    deduplication: true,
    onlyPrefix: modGenerationType === MOD_GENERATION_TYPE.PREFIX,
    onlySuffix: modGenerationType === MOD_GENERATION_TYPE.SUFFIX,
  })

  const [shouldRemoveAffixFamilyIndex, shouldRemoveAffixIndex] = itemState.findIndexById(
    SESSION3_CONFIG.PLACEHOLDER_ID,
  )

  if (newAffixFamily.length) {
    const hitAffixFamily = randomlyObtainAffixFamily<Affix[]>(newAffixFamily)

    const [minimumLevel, maximumLevel] = session3State.affixLevelRange
    const hitAffix = randomlyObtainAffix(hitAffixFamily.items, minimumLevel, maximumLevel)

    if (hitAffix) {
      itemState.replaceAffix(
        hitAffixFamily,
        shouldRemoveAffixFamilyIndex,
        hitAffix,
        shouldRemoveAffixIndex,
      )
    }
  }
}

const open = ref(false)
const msg = ref('')
const modalRef = ref<InstanceType<typeof Modal> | null>(null)

const openByApi = () => {
  modalRef.value?.open()
}

const onOpen = () => {
  // 打开时触发
}
const onClose = () => {
  // 关闭时触发
}
const onConfirm = () => {
  console.log('confirm:', msg.value)
}
const onCancel = () => {
  // 取消时触发
}
</script>
<template>
  <button @click="open = true" :disabled="disable">{{ name }}</button>
  <Modal
    v-model="open"
    ref="modalRef"
    :width="520"
    :z-index="1100"
    append-to="body"
    :close-on-esc="true"
    :close-on-backdrop="true"
    :lock-scroll="true"
    aria-label="解密亵渎词缀"
    @open="onOpen"
    @close="onClose"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template #header>
      <h3 class="modal-title">亵渎词缀解密</h3>
    </template>

    <div>
      <ModsList :mods="itemState.affixes" />
    </div>

    <template #footer>
      <button class="btn btn-secondary" @click="modalRef?.cancel()">取消</button>
      <button class="btn btn-primary" @click="modalRef?.confirm()">确定</button>
    </template>
  </Modal>
</template>

<style scoped></style>
