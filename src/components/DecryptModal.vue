<script setup lang="ts">
import _ from 'lodash'
import Modal from '@/components/Modal.vue'
import { useItemState } from '@/stores/itemState'
import { computed, ref } from 'vue'
import { useSession3State } from '@/stores/session3State'
import { generateAddPool } from '@/utils/generatePool'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { MOD_GENERATION_TYPE, type Affix, type AffixFamily } from '@/types/types'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'
import DecryptList from './DecryptList.vue'
import Button from '../Button.vue'
import { useOmenState } from '@/stores/omenState'

defineProps<{
  name: string
}>()

const showModal = ref(false)
const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const session3State = useSession3State()
const omenState = useOmenState()

const echoesCounts = ref<number>(1)

const disable = computed(() => !session3State.placeholder)

const decryptingAffixFamily = ref<AffixFamily[]>([])
const decryptingAffixes = ref<Affix[]>([])

const replaceInfos = ref<{
  newAffixFamily: AffixFamily
  affixFamilyIndex: number
  newAffix: Affix
  affixIndex: number
} | null>(null)

// 解密亵渎占位符
// 展示3条词缀以及重选按钮
const generateDecryptAffix = (num: number) => {
  const modGenerationType = session3State.placeholder?.modGenerationTypeID
  decryptingAffixFamily.value = []
  decryptingAffixes.value = []
  for (let i = 0; i < num; i++) {
    const newAffixFamily = generateAddPool(
      normalMods.normalModsFamily,
      itemState.affixFamilies.concat(decryptingAffixFamily.value),
      {
        deduplication: true,
        onlyPrefix: modGenerationType === MOD_GENERATION_TYPE.PREFIX,
        onlySuffix: modGenerationType === MOD_GENERATION_TYPE.SUFFIX,
      },
    )

    const hitAffixFamily = randomlyObtainAffixFamily<Affix[]>(newAffixFamily)
    const hitAffix = randomlyObtainAffix(
      hitAffixFamily.items,
      session3State.affixLevelRange[0],
      session3State.affixLevelRange[1],
    )

    decryptingAffixFamily.value.push(hitAffixFamily)
    decryptingAffixes.value.push(hitAffix)
  }
}

const openDecryptModal = () => {
  showModal.value = true
  echoesCounts.value = 1
  generateDecryptAffix(3)
}

const handleSelect = (payload: { key: string; item: Affix; index: number }) => {
  if (!session3State.placeholder) return

  const [affixFamilyIndex, affixIndex] = itemState.findIndexById(session3State.placeholder.id)

  const newAffixFamily = decryptingAffixFamily.value[payload.index]

  replaceInfos.value = {
    newAffixFamily,
    affixFamilyIndex,
    newAffix: payload.item,
    affixIndex,
  }
}

const handleConfirm = () => {
  if (!replaceInfos.value) return

  const { newAffixFamily, affixFamilyIndex, newAffix, affixIndex } = replaceInfos.value

  itemState.replaceAffix(
    { ...newAffixFamily, desecrated: true },
    affixFamilyIndex,
    { ...newAffix, desecrated: true },
    affixIndex,
  )

  replaceInfos.value = null
  showModal.value = false
}

const handleReselect = () => {
  echoesCounts.value--
  generateDecryptAffix(3)
}
</script>
<template>
  <Button id="show-modal" @click="openDecryptModal" :disabled="disable">{{ name }}</Button>

  <Teleport to="body">
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>解密亵渎词缀</h3>
      </template>
      <template #body>
        <DecryptList :onSelect="handleSelect" :affixes="decryptingAffixes" />
      </template>
      <template #footer>
        <Button @click="handleConfirm" :disable="replaceInfos">确定</Button>
        <Button
          class="mr-20"
          @click="handleReselect"
          :disabled="!(omenState.omenConfig.abyssalEchoes && echoesCounts > 0)"
        >
          重选词缀
        </Button>
      </template>
    </Modal>
  </Teleport>
</template>

<style scoped>
.mr-20 {
  margin-right: 20px;
}
</style>
