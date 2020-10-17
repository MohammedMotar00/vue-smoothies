import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/Main.vue";
import AddSmoothie from "../components/AddSmoothie.vue";
import EditSmoothie from "../components/EditSmoothie.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/add-smoothie",
      name: "AddSmoothie",
      component: AddSmoothie,
    },
    {
      path: "/edit-smoothie/:smoothie_slug",
      name: "EditSmoothie",
      component: EditSmoothie,
    },
  ],
});
