<template>
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <DialogSection icon="mdi-square" :color="color">
        <v-text-field v-model="name" label="タイトル"></v-text-field>
      </DialogSection>
      <DialogSection icon="mdi-clock-outline">
        <!--v-date-pickerはVuetifyが提供する日付選択カレンダー-->
        <!--v-modelにstartDate変数を指定している。こうすることでカレンダーで選択した日付の値がstartDate変数に代入される-->
        <DateForm v-model="startDate" />
        <!--v-show='!allDay'を指定することで、allDay変数の値がfalseの時だけTimeFormコンポーネントが表示される-->
        <div v-show="!allDay">
          <TimeForm v-model="startTime" />
        </div>
        <span class="px-2">-</span>
        <DateForm v-model="endDate" :isError="isInvalidDatetime" />
        <div v-show="!allDay">
          <TimeForm v-model="endTime" :isError="isInvalidDatetime" />
        </div>
      </DialogSection>
      <DialogSection>
        <CheckBox v-model="allDay" label="終日" class="ma-0 pa-0" />
      </DialogSection>
      <DialogSection icon="mdi-card-text-outline">
        <TextForm v-model="description" />
      </DialogSection>
      <DialogSection icon="mdi-calendar">
        <CalendarSelectForm :value="calendar" @input="changeCalendar($event)" />
      </DialogSection>
      <DialogSection icon="mid-palette">
        <ColorForm v-model="color" />
      </DialogSection>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="cancel">キャンセル</v-btn>
      <!-- isInvalidがtrueの場合disabledでボタンを押せなくする-->
      <v-btn :disabled="isInvalid" @click="submit">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

import DialogSection from '../layouts/DialogSection';
import DateForm from '../forms/DateForm';
import TimeForm from '../forms/TimeForm';
import TextForm from '../forms/TextForm';
import ColorForm from '../forms/ColorForm';
import CheckBox from '../forms/CheckBox';
import CalendarSelectForm from '../forms/CalendarSelectForm';
import { isGreaterEndThanStart } from '../../functions/datetime';

export default {
  name: 'EventFormDialog',
  mixins: [validationMixin],
  components: {
    DialogSection,
    DateForm,
    TimeForm,
    TextForm,
    ColorForm,
    CheckBox,
    CalendarSelectForm,
  },
  data: () => ({
    name: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    description: '',
    color: '',
    allDay: false,
    calendar: null,
  }),
  validations: {
    name: { required },
    startDate: { required },
    endDate: { required },
    calendar: { required },
  },
  computed: {
    ...mapGetters('events', ['event']),
    isInvalidDatetime() {
      return !isGreaterEndThanStart(this.startDate, this.startTime, this.endDate, this.endTime, this.allDay);
    },
    isInvalid() {
      // $v.$invaldは指定したバリデーションのどれかがマッチしない場合trueを返す
      return this.$v.$invalid || this.isInvalidDatetime;
    },
  },
  // createdはVueライフサイクルの１つで、コンポーネントが作成された後に実行する処理を指定することができる
  // this.event.startはCalendarコンポーネントのinitEventメソッドで、eventステートに代入した値を取得している
  // DateFormコンポーネントのpropsで受け取るvalueにはこのstartDateの値が入る
  created() {
    this.name = this.event.name;
    this.startDate = this.event.startDate;
    this.startTime = this.event.startTime;
    this.endDate = this.event.endDate;
    this.endTime = this.event.endTime;
    this.description = this.event.description;
    this.color = this.event.color;
    // timedカラムは時間指定があればtrue、なければfalseを返す
    this.allDay = this.event.timed;
    this.calendar = this.event.calendar;
  },
  methods: {
    ...mapActions('events', ['setEvent', 'setEditMode', 'createEvent', 'updateEvent']),
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false);
    },
    submit() {
      if (this.isInvalid) {
        return;
      }
      const params = {
        // idの値を取り出したいのでスプレッド構文で全ての属性を展開する
        ...this.event,
        name: this.name,
        start: `${this.startDate} ${this.startTime || ''}`,
        end: `${this.endDate} ${this.endTime || ''}`,
        description: this.description,
        color: this.color,
        // timedの値を反転させるので!をつける
        timed: !this.allDay,
        calendar_id: this.calendar.id,
      };
      // idがあれば更新、なければ作成のアクションを実行
      if (params.id) {
        this.updateEvent(params);
      } else {
        this.createEvent(params);
      }
      this.closeDialog();
    },
    cancel() {
      this.setEditMode(false);
      // 新規作成と編集のアクションを分けるための条件分岐、idがないとき(新規作成時)は入力値をリセットする動作
      if (!this.event.id) {
        this.setEvent(null);
      }
    },
    changeCalendar(calendar) {
      this.color = calendar.color;
      this.calendar = calendar;
    },
  },
};
</script>
