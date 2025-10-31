<script setup lang="ts"></script>

<template>
  <button class="button" @click="$emit('click')"><slot></slot></button>
</template>

<style scoped>
.button {
  float: right;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.button:hover {
  background-color: var(--color-background-mute);
  border-color: var(--color-border-hover);
}

.button:disabled,
.button[aria-disabled='true'] {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
  filter: grayscale(0.06);
}

.button:disabled:hover,
.button[aria-disabled='true']:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-border);
}
</style>
