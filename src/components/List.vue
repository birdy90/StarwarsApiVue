<template lang='pug'>
  loader(v-if='people && people.length === 0')
  .data(v-else)
    .people-list
      router-link.person(v-for='(person, i) in people' :to='`/person/${i}`')
        .photo
          img(:src='`https://robohash.org/${person.name}`')
        .personal-data
          h3 {{person.name}}
          p Создан{{person.gender === 'female' ? 'а' : ''}}: {{prettyDate(person.created)}}

    .load-next(v-if='canLoadNext' @click='loadNextPage')
      | {{isLoading ? 'Загружается...' : 'Загрузить больше'}}
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loader from './Loader.vue';

export default {
  name: 'list',
  created() {
    if (this.people.length === 0) {
      this.getPeople();
    }
  },
  computed: {
    ...mapState([
      'maxPeople',
      'people',
      'isLoading',
    ]),
    canLoadNext() {
      return this.people.length < this.maxPeople;
    },
  },
  methods: {
    ...mapActions(['getPeople']),
    loadNextPage() {
      const numberOfLoadedPages = this.people.length / 10;
      this.getPeople(numberOfLoadedPages + 1);
    },
    prettyDate(date) {
      const parsed = new Date(date);

      let day = parsed.getDate();
      day = day < 10 ? `0${day}` : day;

      let month = parsed.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;

      const year = parsed.getFullYear();

      return `${day}.${month}.${year}`;
    },
  },
  components: { Loader },
};
</script>

<style scoped>
  .data {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .people-list {
    display: flex;
    flex-wrap: wrap;
  }

  .people-list a {
    text-decoration: none;
    color: inherit;
  }

  .person {
    border: solid 1px lightgrey;
    border-radius: 5px;
    display: flex;
    flex-basis: calc(33.33% - 20px);
    flex-grow: 1;
    align-items: center;
    margin: 10px;
    padding: 10px;
  }

  .person .photo {
    background-color: antiquewhite;
    width: 80px;
  }

  .person .photo img {
    width: 100%;
  }

  .personal-data {
    margin: 10px;
  }

  .load-next {
    background-color: #eee;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px;
    padding: 20px;
    text-align: center;
    width: 20%;
  }

  @media (max-width: 960px) {
    .person {
      flex-basis: calc(50% - 20px);
    }

    .load-next {
      width: 50%;
    }
  }

  @media (max-width: 480px) {
    .person {
      border-radius: 0;
      border-left: none;
      border-right: none;
      border-top: none;
      flex-basis: calc(100% - 20px);
      margin-bottom: 0;
    }

    .load-next {
      border-radius: 0;
      width: 100%;
    }
  }
</style>
