<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center">
      <!--今日の月に戻るボタン-->
      <v-btn outlined small class="ma-4" @click="setToday">今日</v-btn>
      <!--prev()メソッドはVuetifyのカレンダーコンポーネントで定義されているメソッド-->
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <!--next()メソッドはVuetifyのカレンダーコンポーネントで定義されているメソッド-->
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="94vh">
      <!--ここにref="calendar"とすることで、v-btnでv-calendarで定義されているメソッドを呼び出せる-->
      <!--day-formatとmanth-formatはCalendarsコンポーネントに渡すことができるprops-->
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        @change="fetchEvents"
        locale="ja-jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :manth-format="(timestamp) => new Date(timestamp.date).getManth() + 1 + '/'"
        @click:event="showEvent"
      ></v-calendar>
    </v-sheet>

    <!--条件式をdialogMessage !== ''とすることで、初期状態ではダイアログが表示されず
    予定をクリックした時にdialogMessageに値が代入されてダイアログが表示される-->
    <v-dialog :value="dialogMessage !== ''">
      <h1>{{ dialogMessage }}</h1>  
    </v-dialog>>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Calendar',
  data: () => ({
    // 表示する月を指定
    value: format(new Date(), 'yyyy/MM/dd'),
    dialogMessage:'',
  }),
  // stateに保存された値をmapGettersでimportしたeventsゲッターで取得し、ビューに表示します。
  computed: {
    ...mapGetters('events', ['events']),
    title() {
      return format(new Date(this.value), 'yyyy年 M月');
    },
  },
  // ボタンを押すと、mapActionsでimportしたストアのfetchEventsアクションが実行されてデータを取得し、stateに保存されます。
  methods: {
    ...mapActions('events', ['fetchEvents']),
    // value変数に現在に日にちを代入するメソッド
    setToday() {
      this.value = format(new Date(), 'yyyy/MM/dd');
    },
    // dialogMessage変数に予定名を代入するメソッド
    showEvent({ event }) {
      this.dialogMessage = event.name
    },
  },
};
</script>
