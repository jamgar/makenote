<template>
  <div id="note-list">
    <NoteListItem
      v-for="(note, idx) in notes"
      :key="idx"
      :note="note"
      @setActiveNote="setActiveNote"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NoteListItem from '@/components/NoteListItem.vue'

export default {
  name: 'NoteList',
  components: {
    NoteListItem
  },
  computed: {
    ...mapState(['notes'])
  },
  created() {
    this.$store.dispatch('fetchNotes')
  },
  methods: {
    setActiveNote(note) {
      this.$store.commit('setNote', note)
    }
  }
}
</script>

<style lang="scss" scoped></style>
