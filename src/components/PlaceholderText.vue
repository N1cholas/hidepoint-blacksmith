<template>
  <div class="canvas-wrapper">
    <canvas ref="canvasEl" class="glitch-pixel-text" aria-hidden="true"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'

type FontWeight = number | string

interface GlitchPixelTextProps {
  text?: string
  fontSize?: number
  paddingX?: number
  paddingY?: number
  fontFamily?: string
  fontWeight?: FontWeight
  colors?: string[]
  pixelScale?: number
  glitchSliceCount?: number
  glitchMaxSliceH?: number
  glitchMaxOffset?: number
  chipProbability?: number
  safeMargin?: number
}

const props = withDefaults(defineProps<GlitchPixelTextProps>(), {
  fontSize: 15,
  paddingX: 8,
  paddingY: 8,
  fontFamily:
    '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  fontWeight: 400 as FontWeight,
  colors: () => ['#375a00', '#233705', '#558705', '#73aa05', '#91cd00', '#c3eb05'],
  pixelScale: 0.5,
  glitchSliceCount: 28,
  glitchMaxSliceH: 2,
  glitchMaxOffset: 2,
  chipProbability: 0.05,
  safeMargin: 4,
})

const canvasEl = ref<HTMLCanvasElement | null>(null)
let ro: ResizeObserver | null = null

function setFont(ctx: CanvasRenderingContext2D, size: number, family: string, weight: FontWeight) {
  ctx.font = `${weight} ${size}px ${family}`
}

function measureTextWidth(size: number, family: string, weight: FontWeight, text: string) {
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')!
  setFont(ctx, size, family, weight)
  return ctx.measureText(text).width
}

function ensureCanvasSize(cvs: HTMLCanvasElement, wCss: number, hCss: number) {
  const dpr = Math.max(1, window.devicePixelRatio || 1)
  if (cvs.style.width !== `${wCss}px`) cvs.style.width = `${wCss}px`
  if (cvs.style.height !== `${hCss}px`) cvs.style.height = `${hCss}px`
  const w = Math.max(1, Math.round(wCss * dpr))
  const h = Math.max(1, Math.round(hCss * dpr))
  if (cvs.width !== w) cvs.width = w
  if (cvs.height !== h) cvs.height = h
  const ctx = cvs.getContext('2d')!
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(dpr, dpr)
  ctx.imageSmoothingEnabled = false
  return ctx
}

function createOffscreen(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = Math.max(1, Math.floor(w))
  c.height = Math.max(1, Math.floor(h))
  return c
}

function draw() {
  const cvs = canvasEl.value
  if (!cvs) return

  const text = props.text ?? ''
  const fontSize = Math.max(1, props.fontSize)
  const padX = Math.max(0, props.paddingX)
  const padY = Math.max(0, props.paddingY)

  const textWidth = Math.ceil(measureTextWidth(fontSize, props.fontFamily, props.fontWeight, text))
  const textHeight = Math.ceil(fontSize * 1.2)
  const wCss = Math.max(1, textWidth + padX * 2)
  const hCss = Math.max(1, textHeight + padY * 2)
  const ctx = ensureCanvasSize(cvs, wCss, hCss)

  // 1) 基础渐变文字 -> 离屏
  const base = createOffscreen(wCss, hCss)
  const bctx = base.getContext('2d')!
  bctx.imageSmoothingEnabled = false
  setFont(bctx, fontSize, props.fontFamily, props.fontWeight)
  bctx.textAlign = 'left'
  bctx.textBaseline = 'middle'
  const grad = bctx.createLinearGradient(0, 0, 0, hCss)
  const colors = props.colors?.length ? props.colors : ['#fff', '#ccc']
  const stops = Math.max(2, colors.length)
  colors.forEach((c, i) => grad.addColorStop(i / (stops - 1), c))
  bctx.fillStyle = grad
  bctx.clearRect(0, 0, wCss, hCss)
  bctx.fillText(text, padX, Math.floor(hCss / 2))

  // 2) 像素化：缩小再放大
  const scale = Math.min(0.99, Math.max(0.1, props.pixelScale))
  const smallW = Math.max(1, Math.floor(wCss * scale))
  const smallH = Math.max(1, Math.floor(hCss * scale))
  const small = createOffscreen(smallW, smallH)
  const sctx = small.getContext('2d')!
  sctx.imageSmoothingEnabled = false
  sctx.clearRect(0, 0, smallW, smallH)
  sctx.drawImage(base, 0, 0, smallW, smallH)

  ctx.clearRect(0, 0, wCss, hCss)
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(small, 0, 0, wCss, hCss)

  // 3) glitch 横向切片
  const snap = createOffscreen(wCss, hCss)
  snap.getContext('2d')!.drawImage(cvs, 0, 0, wCss, hCss)
  const sliceCount = Math.max(0, props.glitchSliceCount | 0)
  const maxSliceH = Math.max(1, props.glitchMaxSliceH)
  const maxOffset = props.glitchMaxOffset
  for (let i = 0; i < sliceCount; i++) {
    const sliceH = Math.max(1, Math.floor(Math.random() * maxSliceH) + 1)
    const y = Math.floor(Math.random() * Math.max(1, hCss - sliceH))
    const off = (Math.random() * 2 - 1) * maxOffset
    ctx.drawImage(snap, 0, y, wCss, sliceH, off, y, wCss, sliceH)
  }

  // 4) 缺口 chips（destination-out）
  const chipP = Math.max(0, Math.min(1, props.chipProbability))
  const safe = Math.max(0, props.safeMargin)
  const innerW = Math.max(0, wCss - safe * 2)
  const innerH = Math.max(0, hCss - safe * 2)
  if (chipP > 0 && innerW > 0 && innerH > 0) {
    const trials = Math.floor((innerW * innerH) / 200)
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    for (let i = 0; i < trials; i++) {
      if (Math.random() > chipP) continue
      const cw = Math.max(1, Math.floor(Math.random() * 3) + 1)
      const ch = Math.max(1, Math.floor(Math.random() * 3) + 1)
      const cx = safe + Math.floor(Math.random() * Math.max(1, innerW - cw))
      const cy = safe + Math.floor(Math.random() * Math.max(1, innerH - ch))
      ctx.fillRect(cx, cy, cw, ch)
    }
    ctx.restore()
  }
}

function redraw() {
  draw()
}

onMounted(async () => {
  await nextTick()
  draw()
  // 监听容器尺寸变化
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(() => draw())
    const host = canvasEl.value?.parentElement
    if (host) ro.observe(host)
  }
})

onBeforeUnmount(() => {
  ro?.disconnect()
  ro = null
})

defineExpose({ redraw })

watch(
  () => ({
    t: props.text,
    fs: props.fontSize,
    px: props.paddingX,
    py: props.paddingY,
    ff: props.fontFamily,
    fw: props.fontWeight,
    cs: (props.colors ?? []).join('|'),
    ps: props.pixelScale,
    sc: props.glitchSliceCount,
    sh: props.glitchMaxSliceH,
    so: props.glitchMaxOffset,
    cp: props.chipProbability,
    sm: props.safeMargin,
  }),
  async () => {
    await nextTick()
    draw()
  },
  { deep: false },
)
</script>

<style scoped>
.canvas-wrapper {
  display: flex;
  justify-content: center;
}
.glitch-pixel-text {
  display: block;
  image-rendering: pixelated;
}
</style>
