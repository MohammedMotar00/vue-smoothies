<template>
  <div class="main container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)"
          >delete</i
        >
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, idx) in smoothie.ingredients" :key="idx">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link
          :to="{
            name: 'EditSmoothie',
            params: { smoothie_slug: smoothie.slug },
          }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";

export default {
  name: "Main",
  data() {
    return {
      smoothies: [],
    };
  },

  methods: {
    deleteSmoothie(id) {
      // Delete doc from firestore
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter((smoothie) => {
            return smoothie.id != id;
          });
        });
    },
  },

  created() {
    db.collection("smoothies")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;

  .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;

    &:hover {
      opacity: 0.7;
    }
  }

  h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }

  .ingredients {
    margin: 30px auto;

    li {
      display: inline-block;
    }
  }
}

@media (max-width: 600px) {
  .main {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 400px) {
  .main {
    grid-template-columns: 1fr;

    h2 {
      font-size: 1.4em;
    }
  }
}
</style>
