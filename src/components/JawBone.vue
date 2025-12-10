<script setup lang="ts">
import { useDesecrated } from '@/stores/modules/useDesecrated'
import { useItem } from '@/stores/modules/useItem'
import { useOmen } from '@/stores/modules/useOmen'
import { createAffixFamily } from '@/utils/factory/createAffixFamily'
import { createDesecratedAffix, DESECRATED_ID } from '@/utils/factory/createDesecratedAffix'
import { computed } from 'vue'
import DecryptModal from '@/pages/hidepointPlace/DecryptModal.vue'

const { minimumLevel, maximumLevel } = defineProps<{
  name: string
  minimumLevel: number
  maximumLevel: number
}>()

const _item = useItem()
const _omen = useOmen()
const _desecrated = useDesecrated()

const disable = computed(() => {
  return !(
    _item.state.rarity === 'rare' &&
    maximumLevel >= minimumLevel &&
    _item.state.affixFamilies.length < _item.AFFIX_COUNTS &&
    !_item.placeholder &&
    !_item.desecrated &&
    (_item.state.type === 'bow' || _item.state.type === 'quiver')
  )
})

// 颚骨，为武器或弓添加亵渎占位符
const addPlaceholder = () => {
  const placeholderAffix = createDesecratedAffix({
    id: DESECRATED_ID,
    name: '亵渎占位符',
    str: '此词条已被亵渎需点击解密',
    tags: [DESECRATED_ID],
    level: 82,
    isPrefix: getModGenerationType(),
    dropChance: _item.getCurrentAffixesWeights(),
  })

  const placeholderAffixFamily = createAffixFamily([placeholderAffix], true)

  _item.randomlyAddAffix([placeholderAffixFamily], minimumLevel, maximumLevel, 'rare')

  _desecrated.setState({
    minimumLevel,
    maximumLevel,
  })
}

// todo: test
const getModGenerationType = (): boolean => {
  if (_item.isSuffixFull || _omen.config.sinistralNecromancy) {
    return true
  }

  if (_item.isPrefixFull || _omen.config.dextralNecromancy) {
    return false
  }

  return Math.random() < 0.5
}
</script>
<template>
  <t-button @click="addPlaceholder()" :disabled="disable">{{ name }}</t-button>
  <DecryptModal title="解密亵渎词条" />
</template>

<style scoped></style>
