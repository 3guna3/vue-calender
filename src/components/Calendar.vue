<template>
  <div>
    <v-sheet height="100vh">
      <v-calendar></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Calendar',
  // stateに保存された値をmapGettersでimportしたeventsゲッターで取得し、ビューに表示します。
  computed: {
    ...mapGetters('events', ['events']),
  },
  // ボタンを押すと、mapActionsでimportしたストアのfetchEventsアクションが実行されてデータを取得し、stateに保存されます。
  methods: {
    ...mapActions('events', ['fetchEvents']),
  },
};
</script>
