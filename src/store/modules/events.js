import axios from 'axios';

const apiUrl = 'http://localhost:3000';

// 状態管理するデータを定義する
const state = {
  events: [],
  event: null,
};

// stateの値を取り出す関数を定義する
const getters = {
  events: (state) =>
    state.events.map((event) => {
      return {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      };
    }),
  event: (state) =>
    state.event
      ? {
          ...state.event,
          start: new Date(state.event.start),
          end: new Date(state.event.end),
        }
      : null,
};

// eventsデータをstateに保存する関数を定義する
const mutations = {
  setEvents: (state, events) => (state.events = events),
  setEvent: (state, event) => (state.event = event),
};

// axiosでAPIリクエストを送信してeventsデータを取得し、mutationを呼び出す関数を定義する
const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data); // mutationを呼び出す
  },
  // setEventアクションはsetEventミューテーションを呼び出すだけで、APIリクエストを送るようなことはしていない
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
