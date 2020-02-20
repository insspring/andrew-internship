import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
import Profile from "../components/Profile";
import ProfileEdit from "../components/editProfile/ProfileEdit";
import PasswordEdit from "../components/editProfile/PasswordEdit";
import EmailEdit from '../components/editProfile/EmailEdit';
import EditAvatar from '../components/editProfile/EditAvatar';
import AddBook from '../components/AddBook';
import UserBooks from '../components/UserBooks';
import BookPage from '../components/BookPage';

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        component: Home
    },
    {
        path: '/user/:userId',
        component: Profile,
        props: true,
    },
    {
        path: '/book/:bookId',
        component: BookPage,
        name: 'book',
        props: true
    },
    {
        path: '/settings/profile',
        component: ProfileEdit
    },
    {
        path: '/settings/avatar',
        component: EditAvatar
    },
    {
        path: '/settings/email',
        component: EmailEdit
    },
    {
        path: '/settings/password',
        component: PasswordEdit
    },
    {
        path: '/books/add',
        component: AddBook
    },
    {
        path: '/user/:userId/books',
        component: UserBooks,
        props: true
    },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
