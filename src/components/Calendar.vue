<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center">
      <v-btn icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="94vh">
      <v-calendar v-model="value" :events="events" @change="fetchEvents"></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Calendar',
  data: () => ({
    // 表示する月を指定
    value: new Date('2021/07/01'),
  }),
  // stateに保存された値をmapGettersでimportしたeventsゲッターで取得し、ビューに表示します。
  computed: {
    ...mapGetters('events', ['events']),
    title() {
      return format(this.value, 'yyyy年 M月');
    },
  },
  // ボタンを押すと、mapActionsでimportしたストアのfetchEventsアクションが実行されてデータを取得し、stateに保存されます。
  methods: {
    ...mapActions('events', ['fetchEvents']),
  },
};
</script>
