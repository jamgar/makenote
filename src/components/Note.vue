<template>
  <div id="note">
    <div class="note__header">
      <input
        v-model.trim="title"
        type="text"
        ref="title"
        placeholder="Note Title"
        id="title"
        class="input__textbox input__textbox--note"
      />
      <button @click="saveNote" class="btn btn--outline note__btn">
        {{ isEditingNote ? 'Update' : 'Save' }}
      </button>
    </div>
    <TextEditor :note="note" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TextEditor from '@/components/TextEditor.vue'

export default {
  props: ['note'],
  components: {
    TextEditor
  },
  computed: {
    ...mapState(['isEditingNote']),
    title: {
      get() {
        return this.note.title
      },
      set(title) {
        this.$store.commit('updateNoteTitle', { title })
      }
    }
  },
  watch: {
    note() {
      if (this.title === '') {
        this.$refs.title.focus()
      }
    }
  },
  methods: {
    saveNote() {
      if (this.title === '') {
        this.title = 'Untitled Note'
      }
      if (!this.isEditingNote) {
        this.$store.dispatch('addNote')
        this.$store.commit('updateIsEditingNote', true)
      } else {
        this.$store.dispatch('updateNote')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#note {
  width: 100%;
}
.note__header {
  background-color: #fff;
  display: flex;
  padding: 1rem;
  margin-bottom: 0.5rem;
}
.input__textbox--note {
  flex-grow: 1;
}
.note__btn {
  margin: 0;
}
</style>
