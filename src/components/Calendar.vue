<template>
  <div>
    <h1 class="text-h1">Calendar</h1>
    <!--v-listはulのようなもの-->
    <v-list>
        <!--v-list-itemはliのようなもの-->
        <v-list-item v-for="event in events" :key="event.id">
          {{ event.name }}
        </v-list-item>
      </v-list>
    <v-btn type="submit" @click="fetchEvents()">fetchEvents</v-btn>
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
