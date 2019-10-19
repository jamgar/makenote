<template>
  <div>
    <h3>Dashboard</h3>
    <TextEditor id="myeditor" />
  </div>
</template>

<script>
import TextEditor from '@/components/TextEditor.vue'

export default {
  name: 'Dashboard',
  components: {
    TextEditor
  }
}
</script>

<style lang="scss" scoped></style>
