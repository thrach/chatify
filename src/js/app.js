require('./bootstrap.js');

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import VueSweetAlert from 'vue-sweetalert2';
import router from './router';
import store from './store';
import { auth } from './services/firebase';
import { mapMutations, mapGetters, mapActions } from 'vuex';

Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.use(VueSweetAlert);

Vue.component('mobile-menu', require('./components/MobileMenu.vue').default);
Vue.component('main-menu', require('./components/MainMenu.vue').default);
Vue.component('top-bar', require('./components/TopBar.vue').default);
Vue.component('sidebar-avatar', require('./components/sidebars/avatar').default);
Vue.component('sidebar-menu', require('./components/sidebars/menu').default);
Vue.component('sidebar-right', require('./components/sidebars/right').default);
Vue.component('notification', require('./components/global/notification').default);
Vue.component('contact-tabs', require('./components/sidebars/tabs/contacts').default);
Vue.component('middle-chat', require('./components/MiddleChat').default);

let app = false;

auth.onAuthStateChanged(() => {
    if (! app) {
        app = new Vue({
            el: '#app',
            router,
            store,

            computed: {
                ...mapGetters('global', [
                    'showTemplateMenu',
                    'user'
                ])
            },

            updated() {
                this.updateShowTemplateMenu();
            },

            mounted() {
                this.updateShowTemplateMenu();
                this.bindUser();
            },

            methods: {
                ...mapMutations('global', [
                    'setShowTemplateMenu',
                    'setUser',
                    'setNotificationFields',
                    'setShowNotification'
                ]),

                ...mapActions('global', ['bindUser']),

                updateShowTemplateMenu() {
                    const currentRouteName = this.$router.history.current.name;
                    this.setShowTemplateMenu(currentRouteName !== 'login' && currentRouteName !== 'register');
                },

                showSuccessNotification(message) {
                    const payload = {
                        title: 'Great Job!',
                        description: message,
                        type: 'success'
                    };

                    this.setAndShowNotification(payload);
                },

                showErrorNotification(message) {
                    const payload = {
                        title: 'Oooops, something went wrong!',
                        description: message,
                        type: 'danger'
                    };

                    this.setAndShowNotification(payload);
                },

                setAndShowNotification(payload) {
                    this.setNotificationFields(payload);
                    this.setShowNotification(true);
                }
            }
        });

        require('./main');
    }
});
