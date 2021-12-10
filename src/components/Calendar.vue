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
    <!--@click:outsideというのはダイアログの外側をクリックした際のイベント発火-->
    <v-dialog :value="event !== null" @click:outside="closeDialog" width="600">
      <EventDetailDialog v-if="event !== null" />
    </v-dialog>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { mapGetters, mapActions } from 'vuex';
import EventDetailDialog from './EventDetailDialog';

export default {
  name: 'Calendar',
  components: {
    EventDetailDialog,
  },
  data: () => ({
    // 表示する月を指定
    value: format(new Date(), 'yyyy/MM/dd'),
  }),
  computed: {
    // mapGettersではストアのStateを呼び出して使えるようにする
    ...mapGetters('events', ['events', 'event']),
    title() {
      return format(new Date(this.value), 'yyyy年 M月');
    },
  },
  methods: {
    // mapActionsではストアのActionを呼び出して使用できるようにする
    ...mapActions('events', ['fetchEvents', 'setEvent']),
    // value変数に現在に日にちを代入するメソッド
    setToday() {
      this.value = format(new Date(), 'yyyy/MM/dd');
    },
    // dialogMessage変数に予定名を代入するメソッド
    showEvent({ event }) {
      this.setEvent(event);
    },
    // 閉じるボタンを押すと詳細画面が閉じるメソッド
    closeDialog() {
      this.setEvent(null);
    },
  },
};
</script>
