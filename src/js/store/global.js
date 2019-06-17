import { vuexfireMutations, firestoreAction } from 'vuexfire';
import {auth, firestore} from '../services/firebase';

export default {
    namespaced: true,

    state: {
        showTemplateMenu: false,

        user: {},

        currentChat: {
            messages: []
        },

        notification: {
            show: false,
            title: 'Well done',
            description: 'Great job!',
            type: 'success'
        },

        chats: []
    },

    getters: {
        showTemplateMenu: state => state.showTemplateMenu,

        user: state => state.user,

        notification: state => state.notification
    },

    mutations: {
        ...vuexfireMutations,

        setShowTemplateMenu: (state, showMenu) => state.showTemplateMenu = showMenu,

        setUser: (state, user) => state.user = user,

        setUserFields: (state, {field, value}) => state.user[field] = value,

        setNotificationFields: (state, {title, description, type}) => {
            state.notification.title = title;
            state.notification.description = description;
            state.notification.type = type;
        },

        setShowNotification: (state, show) => state.notification.show = show
    },

    actions: {
        bindChats: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('chats', firestore.collection('chats'));
        }),

        bindUser: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('user', firestore.collection('users').doc(auth.currentUser.uid));
        })
    }
}