<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: number | string
    height?: number | string
    markColor?: string
    text?: string
    textColor?: string
    fontFamily?: string
    fontSize?: number
    ariaLabel?: string
  }>(),
  {
    width: 200,
    height: 44,
    markColor: '#F97316',
    text: 'ie-Forge',
    textColor: 'var(--td-text-color-primary)',
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: 100,
    ariaLabel: 'App Logo',
  },
)
</script>
<template>
  <svg
    class="app-logo"
    :width="width"
    :height="height"
    viewBox="0 0 1000 220"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="ariaLabel"
  >
    <g transform="translate(20,18) scale(0.1484375)">
      <path
        :fill="markColor"
        d="M725.333333 341.333333V85.333333h128a42.666667 42.666667 0 0 1 42.666667 42.666667v170.666667a42.666667 42.666667 0 0 1-42.666667 42.666666h-128z m-85.333333 597.333334a42.666667 42.666667 0 0 1-42.666667 42.666666h-170.666666a42.666667 42.666667 0 0 1-42.666667-42.666666V341.333333H106.666667V259.157333a42.666667 42.666667 0 0 1 21.162666-36.821333L362.666667 85.333333H640v853.333334z"
      />
    </g>
    <text
      x="160"
      y="188"
      :font-family="fontFamily"
      :font-size="fontSize"
      font-weight="700"
      :fill="textColor"
      dominant-baseline="text-after-edge"
    >
      {{ text }}
    </text>
  </svg>
</template>
<style scoped>
.app-logo text {
  font-weight: 700;
  user-select: none;
}
</style>
