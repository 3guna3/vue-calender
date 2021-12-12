import axios from 'axios';
import { format } from 'date-fns';

const apiUrl = 'http://localhost:3000';

// 状態管理するデータを定義する
const state = {
  events: [],
  event: null,
  isEditMode: false,
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
          startDate: format(new Date(state.event.start), 'yyyy/MM/dd'),
          endDate: format(new Date(state.event.end), 'yyyy/MM/dd'),
        }
      : null,
  isEditMode: (state) => state.isEditMode,
};

// eventsデータをstateに保存する関数を定義する
const mutations = {
  setEvents: (state, events) => (state.events = events),
  // event変数にはcreateEventのレスポンスデータが入る。このデータをeventsステートに追加する

  appendEvent: (state, event) => (state.events = [...state.events, event]),
  setEvent: (state, event) => (state.event = event),
  setEditMode: (state, bool) => (state.isEditMode = bool),
};

// axiosでAPIリクエストを送信してeventsデータを取得し、mutationを呼び出す関数を定義する
const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data); // mutationを呼び出す
  },
  // createEventアクションを追加、第２引数にはこのアクションを呼び出す時の引数が代入される。
  async createEvent({ commit }, event) {
    // responseにはデータベースに登録されたeventデータが保存される
    const response = await axios.post(`${apiUrl}/events`, event);
    commit('appendEvent', response.data);
  },
  // setEventアクションはsetEventミューテーションを呼び出すだけで、APIリクエストを送るようなことはしていない
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
  setEditMode({ commit }, bool) {
    commit('setEditMode', bool);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
