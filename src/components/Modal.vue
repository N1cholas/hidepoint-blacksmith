<template>
  <teleport :to="appendTo">
    <transition name="modal-fade">
      <div
        v-if="visible"
        class="modal-backdrop"
        :style="{ zIndex: zIndex }"
        @mousedown.self="onBackdrop"
      >
        <transition name="modal-zoom">
          <div
            v-if="visible"
            class="modal-dialog"
            :style="{ width: normalizedWidth }"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="title ? idTitle : undefined"
            :aria-label="!title ? ariaLabel : undefined"
            ref="dialogRef"
            tabindex="-1"
            @keydown="onKeydown"
          >
            <div class="modal-header">
              <slot name="header">
                <h3 v-if="title" :id="idTitle" class="modal-title">{{ title }}</h3>
              </slot>
              <button class="modal-close" type="button" aria-label="Close" @click="onCancel">
                ×
              </button>
            </div>

            <div class="modal-body">
              <slot></slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-secondary" type="button" @click="onCancel">取消</button>
                <button class="btn btn-primary" type="button" @click="onConfirm">确定</button>
              </slot>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue'

type Emits = {
  (e: 'update:modelValue', v: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    width?: number | string
    zIndex?: number
    appendTo?: string
    closeOnEsc?: boolean
    closeOnBackdrop?: boolean
    lockScroll?: boolean
    ariaLabel?: string
  }>(),
  {
    width: 520,
    zIndex: 1000,
    appendTo: 'body',
    closeOnEsc: true,
    closeOnBackdrop: true,
    lockScroll: true,
    ariaLabel: 'Dialog',
  },
)

const emit = defineEmits<Emits>()

const visible = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

const normalizedWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width,
)

const dialogRef = ref<HTMLDivElement | null>(null)
const prevActive = ref<HTMLElement | null>(null)
const idTitle = `modal-title-${Math.random().toString(36).slice(2)}`

function focusFirst() {
  const root = dialogRef.value
  if (!root) return
  const list = root.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  const el = list[0] || root
  el.focus()
}

function getScrollbarWidth(): number {
  if (typeof window === 'undefined') return 0
  const sbw = window.innerWidth - document.documentElement.clientWidth
  return sbw > 0 ? sbw : 0
}

function lockBodyScroll(lock: boolean) {
  if (!props.lockScroll || typeof window === 'undefined') return
  const body = document.body

  const count = Math.max(0, Number(body.dataset.modalLockCount || 0))
  const next = lock ? count + 1 : Math.max(0, count - 1)
  body.dataset.modalLockCount = String(next)

  if (lock && count === 0) {
    const cs = getComputedStyle(body)
    body.dataset._overflowY = cs.overflowY
    body.dataset._paddingRight = cs.paddingRight

    const sbw = getScrollbarWidth()
    if (sbw > 0) {
      const prevPad = parseFloat(body.dataset._paddingRight || '0') || 0
      body.style.paddingRight = `${prevPad + sbw}px`
      body.style.setProperty('--sbw', `${sbw}px`)
    }
    body.style.overflow = 'hidden'
  }

  if (!lock && next === 0) {
    const prevOverflow = body.dataset._overflowY ?? ''
    const prevPad = body.dataset._paddingRight ?? ''
    body.style.overflowY = prevOverflow
    body.style.paddingRight = prevPad
    delete body.dataset._overflowY
    delete body.dataset._paddingRight
    body.style.removeProperty('--sbw')
  }
}

function onOpen() {
  prevActive.value = document.activeElement as HTMLElement
  lockBodyScroll(true)
  emit('open')
  queueMicrotask(focusFirst)
}

function onClose() {
  lockBodyScroll(false)
  visible.value = false
  emit('close')
  prevActive.value?.focus()
}

function onConfirm() {
  emit('confirm')
  onClose()
}

function onCancel() {
  emit('cancel')
  onClose()
}

function onBackdrop() {
  if (props.closeOnBackdrop) onCancel()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closeOnEsc) {
    e.stopPropagation()
    e.preventDefault()
    onCancel()
  }
}

watch(
  () => props.modelValue,
  (v) => {
    if (v) onOpen()
    else lockBodyScroll(false)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  lockBodyScroll(false)
})

defineExpose({
  open: () => (visible.value = true),
  close: onClose,
  confirm: onConfirm,
  cancel: onCancel,
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  background: var(--color-background);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  /* max-width: 90vw; */
  max-height: 90vh;
  overflow: hidden;
  outline: none;
}

.modal-header,
.modal-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.modal-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: none;
  justify-content: flex-end;
}
.modal-body {
  padding: 16px;
  max-height: 70vh;
  overflow: auto;
}

.modal-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  flex: 1;
}
.modal-close {
  margin-left: auto;
  background: transparent;
  border: none;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.18s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-zoom-enter-active,
.modal-zoom-leave-active {
  transition:
    transform 0.18s ease,
    opacity 0.18s ease;
}
.modal-zoom-enter-from,
.modal-zoom-leave-to {
  transform: scale(0.96);
  opacity: 0;
}

/* Simple buttons */
.btn {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
}
.btn-primary {
  background: #3b82f6;
  color: #fff;
  border-color: #357ae8;
}
.btn-secondary {
  background: #2b2b2b;
  color: #e5e5e5;
  border-color: #3a3a3a;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
