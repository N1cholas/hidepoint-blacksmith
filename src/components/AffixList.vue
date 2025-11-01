<script setup lang="ts">
import { useItemState } from '@/stores/itemState'
import List from '@/components/List.vue'
import { MOD_GENERATION_TYPE, type Affix } from '@/types/types'
import { processHTMLString } from '@/utils/processString'
import { SESSION3_CONFIG } from '@/config/session3Config'
import PlaceholderText from './session3/PlaceholderText.vue'
import { computed } from 'vue'

const itemState = useItemState()

type Row = {
  key: string
  affix: Affix
  isFirstPrefix: boolean
  isFirstSuffix: boolean
}

const items = computed<Row[]>(() => {
  const src = [...itemState.affixes]
  // 前缀在前，后缀在后
  src.sort((a, b) => {
    const va = a.ModGenerationTypeID === MOD_GENERATION_TYPE.PREFIX ? 0 : 1
    const vb = b.ModGenerationTypeID === MOD_GENERATION_TYPE.PREFIX ? 0 : 1
    return va - vb
  })

  let seenPrefix = false
  let seenSuffix = false

  return src.map((a) => {
    const isPrefix = a.ModGenerationTypeID === MOD_GENERATION_TYPE.PREFIX
    const markPrefix = isPrefix && !seenPrefix
    const markSuffix = !isPrefix && !seenSuffix
    if (markPrefix) seenPrefix = true
    if (markSuffix) seenSuffix = true

    return {
      key: `${a.str}|${a.ModFamilyList[0]}`,
      affix: a,
      isFirstPrefix: markPrefix,
      isFirstSuffix: markSuffix,
    }
  })
})
</script>
<template>
  <List :items="items" item-key="key" class="affix-list">
    <template #default="{ item }">
      <span
        v-if="item.affix.ModGenerationTypeID === MOD_GENERATION_TYPE.PREFIX"
        :class="{ invisible: !item.isFirstPrefix }"
        class="type-badge"
        >前缀
      </span>
      <span
        v-if="item.affix.ModGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX"
        :class="{ invisible: !item.isFirstSuffix }"
        class="type-badge"
        >后缀
      </span>

      <template v-if="item.affix.ModFamilyList[0] !== SESSION3_CONFIG.PLACEHOLDER_ID">
        <span
          :class="{
            locked: item.affix.ModFamilyList[0] === itemState.lockedAffixId,
            desecrated: item.affix.desecrated,
          }"
          class="content"
          v-html="processHTMLString(item.affix.str)"
        ></span>
      </template>
      <template v-else>
        <PlaceholderText text="此 词 缀 被 亵 渎 待 解 密" />
      </template>

      <span class="suffix" :class="{ invisible: !item.affix.powerLevel }">
        T{{ item.affix.powerLevel }}
      </span>
    </template>
  </List>
</template>

<style scoped>
.affix-list {
  min-height: 380px;
}

.type-badge {
  flex: 0 0 auto;
  padding: 2px 8px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-text);
  background: color-mix(in oklab, var(--color-background) 90%, var(--color-text) 10%);
  font-size: 12px;
  line-height: 1.6;
}

.content {
  flex: 1 1 auto;
  color: var(--color-text);
  word-break: break-word;
}

.locked {
  color: #d2870f;
  text-shadow: 0 0 0 transparent;
}

.desecrated {
  color: var(--affix-desecrated-text);
}

.suffix {
  flex: 0 0 auto;
  padding: 2px 8px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text);
  background: color-mix(in oklab, var(--color-background) 92%, var(--color-text) 8%);
  font-weight: 600;
}

.invisible {
  opacity: 0;
}
</style>
