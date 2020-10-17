<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title" />
      </div>

      <div v-for="(ing, idx) in ingredients" :key="idx" class="field">
        <label class="blue-text" for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[idx]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div class="field add-ingredients">
        <label for="add-ingredients">Add an ingredients:</label>
        <input
          type="text"
          name="add-ingredients"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
        <i class="material-icons add" @click.prevent="addIng">add_circle</i>
      </div>

      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink adda">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";
import slugify from "slugify";

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null,
    };
  },

  methods: {
    AddSmoothie() {
      if (this.title) {
        this.feedback = null;

        // create slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug,
          })
          .then(() => {
            this.$router.push({ name: "Main" });
          })
          .catch((err) => console.log(err));
      } else {
        this.feedback = "You must enter a smoothie title";
      }
    },

    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        console.log(this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredients!";
      }
    },

    deleteIng(ing) {
      this.ingredients = this.ingredients.filter((ingredient) => {
        return ingredient !== ing;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;

  h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .field {
    margin: 20px auto;
    position: relative;
  }

  .add {
    visibility: hidden;
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #e91e63;
    font-size: 2em;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  .adda:hover {
    opacity: 0.7;
  }

  .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
}

@media (max-width: 1030px) {
  .add-smoothie .add {
    visibility: visible;
  }
}

@media (max-width: 400px) {
  h2 {
    font-size: 1.7em !important;
  }
}
</style>