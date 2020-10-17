<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} smoothie</h2>

    <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>

      <div v-for="(ing, idx) in smoothie.ingredients" :key="idx" class="field">
        <label class="blue-text" for="ingredient">Ingredient:</label>
        <input
          type="text"
          name="ingredient"
          v-model="smoothie.ingredients[idx]"
        />
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
        <button class="btn pink adda">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null,
    };
  },

  methods: {
    EditSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;

        // create slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug,
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
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredients!";
      }
    },

    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        (ingredient) => {
          return ingredient !== ing;
        }
      );
    },
  },

  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.edit-smoothie {
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
  .edit-smoothie .add {
    visibility: visible;
  }
}

@media (max-width: 400px) {
  h2 {
    font-size: 1.7em !important;
  }
}
</style>