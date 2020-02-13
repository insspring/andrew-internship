import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
import Profile from "../components/Profile";
import ProfileEdit from "../components/editProfile/ProfileEdit";
import PasswordEdit from "../components/editProfile/PasswordEdit";
import EmailEdit from '../components/editProfile/EmailEdit';

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        component: Home
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/settings/profile',
        component: ProfileEdit
    },
    {
        path: '/settings/email',
        component: EmailEdit
    },
    {
        path: '/settings/password',
        component: PasswordEdit
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
