<template>
  <div id="note">
    <div class="note__header">
      <input
        v-model.trim="title"
        type="title"
        placeholder="Note Title"
        id="title"
        class="input__textbox input__textbox--note"
      />
      <button @click="saveNote" class="btn btn--outline note__btn">Save</button>
    </div>
    <TextEditor :note="note" />
  </div>
</template>

<script>
import TextEditor from '@/components/TextEditor.vue'

export default {
  props: ['note'],
  components: {
    TextEditor
  },
  computed: {
    title: {
      get() {
        return this.note.title
      },
      set(title) {
        this.$store.commit('updateNoteTitle', { title })
      }
    }
  },
  methods: {
    saveNote() {
      console.log('note saved')
    }
  }
}
// Save a note
</script>

<style lang="scss" scoped>
#note {
  width: 100%;
}
.note__header {
  display: flex;
  margin-bottom: 1.5rem;
}
.input__textbox--note {
  flex-grow: 1;
}
.note__btn {
  margin: 0;
}
</style>
