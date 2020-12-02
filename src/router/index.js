import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import ListItem from "../components/ListItem.vue";
import SignUp from "../views/SignUp.vue";
import Editor from "../views/Editor.vue";
import DetailsArticle from "../views/DetailsArticle.vue";
import DetailsQuestion from "../views/DetailsQuestion.vue";
import ListItemHot from "../components/ListItemHot.vue";
import People from "../views/People.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "",
        component: Main,
        children: [
          {
            path: "",
            name: "home",
            component: ListItem
          },
          {
            path: "hot",
            name: "hot",
            component: ListItemHot
          }
        ]
      },
      {
        path: "/article/:id",
        name: "detailsArticle",
        component: DetailsArticle
      },
      {
        path: "/question/:id",
        name: "detailsQuestion",
        component: DetailsQuestion
      }
    ]
  },
  {
    path: "/people/:id",
    component: People,
    children: [
      {
        path: "",
        name: "peopleMain",
        component: ListItem
      },
      {
        path: "articles",
        name: "peopleArticles",
        component: ListItem
      }
    ]
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  {
    path: "/editor/:articleId",
    name: "editor",
    component: Editor
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
