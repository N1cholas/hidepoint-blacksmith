<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="container">
    <section class="title-wrapper">
      <h1 class="title" level="h1"><span>最接近</span><br />POE2做装的模拟器</h1>
      <p class="desc">易学易用，方便分享，赛季做装模拟器。</p>
      <div>
        <t-button class="start-btn" @click="() => router.push('/hidepoint-place')">
          立即模拟做装
        </t-button>
      </div>
    </section>
    <section class="highlights">
      <div class="box">
        <h2>易用易分享</h2>
        <p>做装通货一目了然，体验公式做装套路，分享做装思路。</p>
      </div>
      <div class="box">
        <h2>积累经验</h2>
        <p>零成本研究做装思路，积累做装经验。</p>
      </div>
      <div class="box">
        <h2>预估成本</h2>
        <p>记录做装过程以及成本，判断装备的市场价值。</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.title-wrapper {
  text-align: center;
  padding: 96px 32px;
}

.title {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0 auto;
  color: var(--tf-text-color-primary);
}

.title span {
  color: var(--tf-brand-color);
  font-weight: bold;
}

.desc {
  max-width: 960px;
  line-height: 1.5;
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;
  color: var(--tf-text-color-secondary);
}

.start-btn.t-button :deep(.t-button__text) {
  font-weight: bold;
  color: var(--td-brand-color-1);
}

.highlights {
  display: flex;
}

.highlights .box {
  padding: 28px 36px;
  border-radius: 8px;
  flex: 0 32%;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
}

.box h2 {
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: bold;
  color: var(--tf-text-color-primary);
}

.box p {
  font-size: 15px;
  color: var(--tf-text-color-secondary);
}
</style>
