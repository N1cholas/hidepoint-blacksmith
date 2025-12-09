<script setup lang="ts">
defineProps({
  show: Boolean,
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="close">OK</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  min-width: 60vh;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--td-bg-color-container);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: var(--td-text-color-primary);
}

.modal-body {
  margin: 20px 0;
  color: var(--td-text-color-primary);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-default-button {
  background-color: var(--td-bg-color-component);
  border: 1px solid var(--td-component-border);
  color: var(--td-text-color-primary);
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.modal-default-button:hover {
  background-color: var(--td-bg-color-component-hover);
  border-color: var(--td-component-border);
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
