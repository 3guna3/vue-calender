<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center" color="grey lighten-3">
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
    <v-sheet height="94vh" class="d-flex">
      <v-sheet width="200px">
        <CalendarList />
      </v-sheet>
      <v-sheet class="flex">
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
          @click:day="initEvent"
        ></v-calendar>
      </v-sheet>
    </v-sheet>

    <!--条件式をdialogMessage !== ''とすることで、初期状態ではダイアログが表示されず
    予定をクリックした時にdialogMessageに値が代入されてダイアログが表示される-->
    <!--@click:outsideというのはダイアログの外側をクリックした際のイベント発火-->
    <v-dialog :value="event !== null" @click:outside="closeDialog" width="600">
      <EventDetailDialog v-if="event !== null && !isEditMode" />
      <EventFormDialog v-if="event !== null && isEditMode" />
    </v-dialog>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { mapGetters, mapActions } from 'vuex';
import EventDetailDialog from '../events/EventDetailDialog';
import EventFormDialog from '../events/EventFormDialog';
import CalendarList from '../calendars/CalendarList';
import { getDefaultStartAndEnd } from '../../functions/datetime';

export default {
  name: 'Calendar',
  components: {
    EventDetailDialog,
    EventFormDialog,
    CalendarList,
  },
  data: () => ({
    // 表示する月を指定
    value: format(new Date(), 'yyyy/MM/dd'),
  }),
  computed: {
    // mapGettersではストアのStateを呼び出して使えるようにする
    ...mapGetters('events', ['events', 'event', 'isEditMode']),
    title() {
      return format(new Date(this.value), 'yyyy年 M月');
    },
  },
  methods: {
    // mapActionsではストアのActionを呼び出して使用できるようにする
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode']),
    // value変数に現在に日にちを代入するメソッド
    setToday() {
      this.value = format(new Date(), 'yyyy/MM/dd');
    },
    // dialogMessage変数に予定名を代入するメソッド
    showEvent({ nativeEvent, event }) {
      this.setEvent(event);
      // 予定をクリックしてshowEventを実行した後にinitEventを実行させないようにする対策
      nativeEvent.stopPropagation();
    },
    // 閉じるボタンを押すと詳細画面が閉じるメソッド
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false);
    },
    // クリックした場所の日付がdateに入る
    initEvent({ date }) {
      // 引数のdateには日付が文字列で返ってくるので、date.replace(/-/g, '/')でハイフンをスラッシュに置換して期待する値に変換する
      date = date.replace(/-/g, '/');
      const [start, end] = getDefaultStartAndEnd(date);
      this.setEvent({ name: '', start, end, timed: true });
      this.setEditMode(true);
    },
  },
};
</script>
