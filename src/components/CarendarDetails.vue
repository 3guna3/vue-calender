<template>
  <div>
    <h1>CalendarDetails</h1>
    <div v-for="event in events" :key="event.id">
      <h2>{{ event.name }}</h2>
      <p>start: {{ event.start }}</p>
      <p>end: {{ event.end }}</p>
      <p>description: {{ event.description }}</p>
    </div>
    <button type="submit" @click="fetchEvents()">fetchEvents</button>
  </div>
</template>

<script>
export default {
  name: 'CalendarDetails',
  data: () => ({
    events: [],
  }),
  methods: {
    fetchEvents() {
      axios
        .get('http://localhost:3000/events')
        .then((response) => {
          this.events = response.date;
        })
        .catch((error) => {
          console.error(error)
        });
    },
  },
};
</script>