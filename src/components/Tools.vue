<script setup lang="ts">
import ToolWrapper from './ToolWrapper.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import ExaltedOrb from '@/components/ExaltedOrb.vue'
import Omen from '@/components/Omen.vue'
import RegalOrb from './RegalOrb.vue'
import ChaosOrb from './ChaosOrb.vue'
import AnnulmentOrb from './AnnulmentOrb.vue'
import TransmutationOrb from './TransmutationOrb.vue'
import AugmentationOrb from './AugmentationOrb.vue'
import FracturingOrb from './FracturingOrb.vue'
import { useItemState } from '@/stores/itemState'
import Jawbone from './session3/Jawbone.vue'
import DecryptAffix from './session3/DecryptModal.vue'
import Button from './Button.vue'

const itemState = useItemState()
</script>

<template>
  <ToolWrapper>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>装备</template>
    <div class="tools">
      <Button @click="itemState.$reset">重置装备</Button>
      <DecryptAffix name="解密亵渎词缀" />
    </div>
  </ToolWrapper>
  <ToolWrapper>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>通货</template>

    <div class="tools">
      <TransmutationOrb name="蜕变石" :minimumLevel="0" :maximumLevel="itemState.itemLevel" />
      <TransmutationOrb name="高级蜕变石" :minimumLevel="55" :maximumLevel="itemState.itemLevel" />
      <TransmutationOrb name="完美蜕变石" :minimumLevel="70" :maximumLevel="itemState.itemLevel" />
      <AugmentationOrb name="增幅石" :minimumLevel="0" :maximumLevel="itemState.itemLevel" />
      <AugmentationOrb name="高级增幅石" :minimumLevel="55" :maximumLevel="itemState.itemLevel" />
      <AugmentationOrb name="完美增幅石" :minimumLevel="70" :maximumLevel="itemState.itemLevel" />
      <RegalOrb name="富豪石" :minimumLevel="0" :maximumLevel="itemState.itemLevel" />
      <RegalOrb name="高级富豪石" :minimumLevel="35" :maximumLevel="itemState.itemLevel" />
      <RegalOrb name="完美富豪石" :minimumLevel="50" :maximumLevel="itemState.itemLevel" />
      <ExaltedOrb name="崇高石" :minimumLevel="0" :maximumLevel="itemState.itemLevel" />
      <ExaltedOrb name="高级崇高石" :minimumLevel="35" :maximumLevel="itemState.itemLevel" />
      <ExaltedOrb name="完美崇高石" :minimumLevel="50" :maximumLevel="itemState.itemLevel" />
      <!-- todo 测试原始数据，例如：词条只能是前缀或后缀、ModFamilyList只有一个 -->
      <ChaosOrb name="混沌石" :minimumLevel="0" :maximumLevel="itemState.itemLevel" />
      <ChaosOrb name="高级混沌石" :minimumLevel="35" :maximumLevel="itemState.itemLevel" />
      <ChaosOrb name="完美混沌石" :minimumLevel="50" :maximumLevel="itemState.itemLevel" />
      <AnnulmentOrb name="剥离石" />
      <FracturingOrb name="破溃宝珠" />
      <!-- 这个通货需要最后完成 -->
      <span>辛格拉的发辫</span>
    </div>
  </ToolWrapper>

  <ToolWrapper>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>仪式</template>

    <div class="tools">
      <!-- 崇高石 -->
      <Omen name="同质化崇高预兆" omenConfigKey="homogenisingExaltaion" />
      <Omen name="左旋崇高预兆" omenConfigKey="sinistralExaltation" />
      <Omen name="右旋崇高预兆" omenConfigKey="dextralExaltation" />
      <Omen name="强效崇高预兆" omenConfigKey="greaterExaltation" />
      <Button class="tools">催化崇高预兆</Button>
      <!-- 富豪石 -->
      <Omen name="同质化加冕预兆" omenConfigKey="homogenisingCoronation" />
      <!-- 混沌石 -->
      <Omen name="消减预兆" omenConfigKey="whittling" />
      <Omen name="左旋消抹预兆" omenConfigKey="sinistralErasure" />
      <Omen name="右旋消抹预兆" omenConfigKey="dextralErasure" />
      <!-- 剥离石 -->
      <Omen name="左旋剥离预兆" omenConfigKey="sinistralAnnulment" />
      <Omen name="右旋剥离预兆" omenConfigKey="dextralAnnulment" />
    </div>
  </ToolWrapper>

  <ToolWrapper>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>亵渎（第三赛季特有）</template>

    <div class="tools">
      <Jawbone name="啃噬颚骨" :minimumLevel="0" :maximumLevel="64" />
      <Jawbone name="遗存颚骨" :minimumLevel="0" :maximumLevel="itemState.itemLevel" />
      <Jawbone name="远古颚骨" :minimumLevel="40" :maximumLevel="itemState.itemLevel" />
      <!-- 
      <button class="tools">啃噬肋骨</button>
      <button class="tools">远古肋骨</button>
      <button class="tools">遗存肋骨</button>
      <button class="tools">啃噬锁骨</button>
      <button class="tools">远古锁骨</button>
      <button class="tools">遗存锁骨</button> 
      -->
      <Omen name="深渊回响预兆" omenConfigKey="abyssalEchoes" />
      <Omen name="光明预兆" omenConfigKey="light" />
      <Omen name="左旋死灵预兆" omenConfigKey="sinistralNecromancy" />
      <Omen name="右旋死灵预兆" omenConfigKey="dextralNecromancy" />
      <button class="tools">至高预兆</button>
      <button class="tools">领主预兆</button>
      <button class="tools">黑血预兆</button>
      <button class="tools">腐烂预兆</button>
    </div>
  </ToolWrapper>

  <ToolWrapper>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>精华</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>
    (our official Discord server), or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also follow the official
    <a href="https://bsky.app/profile/vuejs.org" target="_blank" rel="noopener">@vuejs.org</a>
    Bluesky account or the
    <a href="https://x.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    X account for latest news in the Vue world.
  </ToolWrapper>

  <ToolWrapper>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>催化剂</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </ToolWrapper>
</template>
<style>
.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
