<script setup lang="ts">
import ToolWrapper from './ToolWrapper.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import ExaltedOrb from '@/components/ExaltedOrb.vue'
import Omen from '@/components/Omen.vue'
</script>

<template>
  <ToolWrapper>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>通货</template>

    <div class="tools">
      <ExaltedOrb name="崇高石" :minimumLevel="0" />
      <ExaltedOrb name="高级崇高石" :minimumLevel="35" />
      <ExaltedOrb name="完美崇高石" :minimumLevel="50" />
      <span>富豪石</span>
      <span>高级富豪石</span>
      <span>完美富豪石</span>
      <span>混沌石</span>
      <span>高级混沌石</span>
      <span>完美混沌石</span>
      <span>剥离石</span>
      <span>破溃宝珠</span>
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
      <button class="tools">催化崇高预兆</button>
      <!-- 富豪石 -->
      <button class="tools">同质化加冕预兆</button>
      <!-- 混沌石 -->
      <button class="tools">消减预兆</button>
      <button class="tools">左旋抹除预兆</button>
      <button class="tools">右旋抹除预兆</button>
      <!-- 剥离石 -->
      <button class="tools">左旋剥离预兆</button>
      <button class="tools">右旋剥离预兆</button>
    </div>
  </ToolWrapper>

  <ToolWrapper>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>深渊（赛季特有）</template>

    <div class="tools">
      <button class="tools">啃噬颚骨</button>
      <button class="tools">啃噬肋骨</button>
      <button class="tools">啃噬锁骨</button>
      <button class="tools">遗存头骨</button>
      <button class="tools">深渊回响预兆</button>
      <button class="tools">至高预兆</button>
      <button class="tools">领主预兆</button>
      <button class="tools">黑血预兆</button>
      <button class="tools">腐烂预兆</button>
      <button class="tools">光明预兆</button>
      <button class="tools">左旋死灵预兆</button>
      <button class="tools">右旋死灵预兆</button>
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
