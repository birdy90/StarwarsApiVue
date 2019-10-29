import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    maxPeople: 0,
    people: [],
    starships: {},
    shownPerson: null,
  },
  mutations: {
    setMaxCount(state, data) {
      state.maxPeople = data;
    },
    setPeopleData(state, data) {
      state.people = [...state.people, ...data];
    },
    setShownPerson(state, data) {
      state.shownPerson = data;
    },
    addStarship(state, data) {
      state.starships = { ...state.starships, [data.link]: data.starship };
    },
    setLoading(state, value) {
      state.isLoading = value;
    },
  },
  actions: {
    getPeople({ commit }, page) {
      commit('setLoading', true);
      fetch(`https://swapi.co/api/people/?page=${page || 1}`)
        .then(data => data.json())
        .then((data) => {
          commit('setLoading', false);
          commit('setMaxCount', data.count);
          commit('setPeopleData', data.results);
        });
    },
    getPerson({ commit }, id) {
      return new Promise((next, error) => {
        const parsedId = parseInt(id, 10);

        if (this.state.people.length === 0) {
          commit('setLoading', true);
          fetch(`https://swapi.co/api/people/${parsedId + 1}/`)
            .then(data => data.json())
            .then((data) => {
              commit('setLoading', false);
              commit('setShownPerson', data);
              next(data);
            })
            .catch(err => error(err));
        } else {
          const person = this.state.people[id];
          next(person);
          commit('setShownPerson', person);
        }
      });
    },
    getStarshipsOfAPerson({ dispatch }, person) {
      person.starships.forEach(ship => dispatch('getStarship', ship));
    },
    getStarship({ commit }, link) {
      if (!this.state.starships[link]) {
        commit('setLoading', true);
        fetch(link)
          .then(data => data.json())
          .then((data) => {
            commit('setLoading', false);
            commit('addStarship', { link, starship: data });
          });
      }
      return this.state.starships[link];
    },
  },
  modules: {
  },
});
