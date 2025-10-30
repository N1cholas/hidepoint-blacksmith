<script setup lang="ts">
import _ from 'lodash'
import Modal from '@/components/Modal.vue'
import { useItemState } from '@/stores/itemState'
import { computed, ref } from 'vue'
import { useSession3State } from '@/stores/session3State'
import { generateAddPool } from '@/utils/generatePool'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { MOD_GENERATION_TYPE, type Affix, type AffixFamily } from '@/types/types'
import { SESSION3_CONFIG } from '@/config/session3Config'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'
import DecryptList from './DecryptList.vue'

defineProps<{
  name: string
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const session3State = useSession3State()

const disable = computed(() => !session3State.placeholder)

const modGenerationType = session3State.placeholder?.modGenerationTypeID

const newAffixFamilies = ref<AffixFamily[]>([])

// 解密亵渎占位符
// 展示3条词缀以及重选按钮
const generateDecryptPool = (counts: number) => {
  const newAffixFamily = generateAddPool(normalMods.normalModsFamily, itemState.affixFamilies, {
    deduplication: true,
    onlyPrefix: modGenerationType === MOD_GENERATION_TYPE.PREFIX,
    onlySuffix: modGenerationType === MOD_GENERATION_TYPE.SUFFIX,
  })
}

const showModal = ref(false)
</script>
<template>
  <button id="show-modal" @click="showModal = true" :disabled="disable">{{ name }}</button>

  <Teleport to="body">
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>解密亵渎词缀</h3>
      </template>
      <template #body>
        <DecryptList
          :affixes="
            itemState.affixes.filter((a) => a.ModFamilyList[0] !== SESSION3_CONFIG.PLACEHOLDER_ID)
          "
        />
      </template>
    </Modal>
  </Teleport>
</template>

<style scoped></style>
