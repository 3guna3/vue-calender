import axios from 'axios';
import { serializeEvent } from '../../functions/serializers';

const apiUrl = 'http://localhost:3000';

// 状態管理するデータを定義する
const state = {
  events: [],
  event: null,
  isEditMode: false,
};

// stateの値を取り出す関数を定義する
const getters = {
  events: (state) => state.events.map((event) => serializeEvent(event)),
  event: (state) => serializeEvent(state.event),
  isEditMode: (state) => state.isEditMode,
};

// eventsデータをstateに保存する関数を定義する
const mutations = {
  setEvents: (state, events) => (state.events = events),
  // event変数にはcreateEventのレスポンスデータが入る。このデータをeventsステートに追加する
  appendEvent: (state, event) => (state.events = [...state.events, event]),
  setEvent: (state, event) => (state.event = event),
  // removeEventミューテーションはeventsステートから削除した予定だけ除く処理
  removeEvent: (state, event) => (state.events = state.events.filter((e) => e.id !== event.id)),
  // resetEventミューテーションはeventステートにnullを代入する処理
  resetEvent: (state) => (state.event = null),
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
  // deleteEventアクションを追加、引数には予定のidを受け取りApiを叩いて予定を削除する
  // Apiを叩いた後removeEventミューテーションとresetEventミューテーションを実行する
  async deleteEvent({ commit }, id) {
    const response = await axios.delete(`${apiUrl}/events/${id}`);
    commit('removeEvent', response.data);
    commit('resetEvent');
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
