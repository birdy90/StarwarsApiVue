<template lang='pug'>
  loader(v-if='shownPerson === null')
  .data(v-else)
    a.person
      .photo
        img(:src='`https://robohash.org/${shownPerson.name}`')
      .personal-data
        h3 {{shownPerson.name}}
        p Создан{{shownPerson.gender === 'female' ? 'а' : ''}}: {{prettyDate(shownPerson.created)}}
        p Родил{{shownPerson.gender === 'female' ? 'ась' : 'ся'}}: {{shownPerson.birth_year}}

        p(v-if='shownPerson.gender === `female`') Пол: женский
        p(v-else-if='shownPerson.gender === `male`') Пол: мужской
        p(v-else) Пол: не определён

      .starships.empty(v-if='shownPerson.starships.length === 0') Кораблей нет
      .starships(v-else) Корабли:
        ul
          li.starship(v-for='ship in shownPerson.starships')
            div(v-if='starships[ship]')
              b {{starships[ship].name}}
              |
              | [{{starships[ship].model}}]
            div(v-else)
              | информаиция о корабле загружается

    router-link.go-back(to='/') К списку
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loader from './Loader.vue';

export default {
  name: 'person',
  created() {
    this.getPerson(this.$route.params.id)
      .then(person => this.getStarshipsOfAPerson(person));
  },
  computed: {
    ...mapState([
      'starships',
      'shownPerson',
    ]),
  },
  methods: {
    ...mapActions([
      'getPerson',
      'getStarshipsOfAPerson',
    ]),
    prettyDate(date) {
      const parsed = new Date(date);

      let day = parsed.getDate();
      day = day < 10 ? `0${day}` : day;
      let month = parsed.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      const year = parsed.getFullYear();

      return `${day}.${month}.${year}`;
    },
    goBack() {
      return window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    },
  },
  components: { Loader },
};
</script>


<style scoped>
  .data-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .loader {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .data {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .person {
    border-bottom: solid 1px lightgrey;
    display: flex;
    flex-basis: calc(100% - 20px);
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 10px;
    width: 100%;
  }

  .person .photo {
    background-color: antiquewhite;
    max-width: 300px;
    width: 80%;
  }

  .person .photo img {
    width: 100%;
  }

  .personal-data {
    display: flex;
    flex-direction: column;
    margin: 10px;
    text-align: center;
  }

  .go-back {
    background-color: #eee;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px;
    padding: 20px;
    text-align: center;
    width: 20%;
  }

  @media (max-width: 960px) {
    .go-back {
      width: 50%;
    }
  }

  @media (max-width: 480px) {
    .go-back {
      border-radius: 0;
      width: 100%;
    }
  }
</style>
