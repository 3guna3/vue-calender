<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <!-- :classとすることで条件を指定することができ、その条件を満たすときにclassを適用することができる-->
      <v-btn text v-on="on" :class="{ 'red lighten-4 rounded': isError }">
        {{ formatDateToJa(value) || '日付を選択' }}
      </v-btn>
    </template>
    <v-date-picker
      :value="value.replace(/\//g, '-')"
      @input="$emit('input', $event.replace(/-/g, '/'))"
      notitle
      locale="ja-ja"
      :day-format="(value) => new Date(value).getDate()"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { formatDateToJa } from '../functions/datetime';

export default {
  name: 'DateForm',
  props: ['value', 'isError'],
  methods: {
    formatDateToJa,
  },
};
</script>

<!--propsで受け取る値は変更不可のため、v-modelに指定することができない-->
<!--そのため、:valueにpropsから受け取る値を保持する変数、@inputにその変数の値が更新された時に呼び出す処理を指定-->
<!--$eventにはDatePickerで選択した日付が入る-->
<!--$emit('input', $event)を実行すると親コンポーネントの値を更新する-->
