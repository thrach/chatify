import Vuex from 'vuex';
import Vue from 'vue';
import { vuexfireMutations } from 'vuexfire';

Vue.use(Vuex);

import global from './global';

export default new Vuex.Store({
    modules: {
        global
    },

    mutations: vuexfireMutations
});