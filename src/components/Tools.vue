<script setup lang="ts">
import ToolWrapper from './ToolWrapper.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import ExaltedOrb from '@/components/ExaltedOrb.vue'
import OmenOfHomogenisingExaltation from '@/components/OmenOfHomogenisingExaltation.vue'
import OmenOfSinistralExaltation from '@/components/OmenOfSinistralExaltation.vue'
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
    </div>
  </ToolWrapper>

  <ToolWrapper>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>仪式</template>

    <!-- todo: 启动 和 作用对象 -->
    <div class="tools">
      <OmenOfHomogenisingExaltation name="同质化崇高预兆" />
      <OmenOfSinistralExaltation name="左旋崇高预兆" />
      <button class="tools">右旋崇高预兆</button>
      <button class="tools">催化崇高预兆</button>
      <button class="tools">强效崇高预兆</button>
      <button class="tools">同质化加冕预兆</button>
    </div>
  </ToolWrapper>

  <ToolWrapper>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </ToolWrapper>

  <ToolWrapper>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

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
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </ToolWrapper>
</template>
<style>
.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
