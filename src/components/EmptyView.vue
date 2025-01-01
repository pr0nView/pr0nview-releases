<template>
  <q-card flat class="absolute-full flex flex-center">
    <div class="flex column items-center ">
      <q-icon size="240px" :name="icon"></q-icon>
      <div class="empty-heading text-accent">{{ heading }}</div>
      <div class="empty-message">{{ message }}</div>
      <q-btn color="secondary" :label="buttonLabel" class="q-mt-md" @click="emitClick"></q-btn>
    </div>
  </q-card>
</template>

<script setup lang="ts">

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  buttonLabel: {
    type: String,
    required: false,
    default: "Create"
  }
});

const emit = defineEmits<{
  (e: 'buttonClick'): void
}>()

function emitClick() {
  emit("buttonClick");
}
</script>

<style scoped lang="scss">
.empty-heading {
  font-size: 24px;
  font-weight: 500;
}
</style>
