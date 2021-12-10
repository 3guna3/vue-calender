<template>
  <!--Vuetifyを使用するためには<v-app>で全体を囲う必要がある</v-app>-->
  <v-app>
    <v-main>
      <Calendar />
    </v-main>
  </v-app>
</template>

<script>
import Calendar from './components/Calendar';

export default {
  name: 'App',
  components: {
    Calendar,
  },
};
</script>
