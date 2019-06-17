<template>
    <div class="full-chat-left">
        <div class="os-tabs-w">
            <ul class="nav nav-tabs upper centered">
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': activeTab === 'chats'}" href="javascript:void(0)" @click.prevent="setActiveTab('chats')">
                        <i class="os-icon os-icon-mail-14"></i>
                        <span>Chats</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': activeTab === 'contacts'}" href="javascript:void(0)" @click.prevent="setActiveTab('contacts')">
                        <i class="os-icon os-icon-ui-93"></i>
                        <span>Contacts</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': activeTab === 'favorites'}" href="javascript:void(0)" @click.prevent="setActiveTab('favorites')">
                        <i class="os-icon os-icon-ui-02"></i>
                        <span>Favorites</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="user-list" v-if="activeTab === 'chats'">
            <div class="user-w" v-for="user in activeChats">
                <div class="avatar with-status status-green">
                    <img alt="" :src="user.avatar">
                </div>
                <div class="user-info">
                    <div class="user-name" v-text="user.name"></div>
                </div>
            </div>
        </div>
        <div class="user-list" v-if="activeTab === 'contacts'">
            <div class="chat-search">
                <div class="element-search">
                    <input placeholder="Search users by name..." type="text" v-model="userSearch" @input="searchUsers">
                </div>
            </div>
            <div class="user-w" v-for="contact in contacts">
                <div class="avatar with-status status-green">
                    <img alt="" :src="contact.avatar">
                </div>
                <div class="user-info">
                    <div class="user-name" v-text="contact.name"></div>
                </div>
            </div>
            <div class="user-w" v-for="user in users" @click="addToContactsAlert(user.uid)">
                <div class="avatar with-status status-green">
                    <img alt="" :src="user.avatar">
                </div>
                <div class="user-info">
                    <div class="user-name" v-text="user.name"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
    import { auth, firestore } from '../../../services/firebase';
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        firestore: {
            documents: firestore.collection('documents'),
        },

        data() {
            return {
                activeTab: 'chats',
                userSearch: null,
                users: [],
                activeChats: [],
                currentAddedUserFirebaseKey: null,
                currentAddedUserContacts: [],
            }
        },

        computed: {
            ...mapGetters('global', ['user']),

            contacts() {
                return _.filter(this.$store.getters['global/user'].contacts, contact => {
                    return contact.hasOwnProperty('uid') && ! _.isEmpty(contact.uid);
                });
            },

            isAlreadyContact() {

            }
        },

        methods: {
            ...mapMutations('global', ['setUserFields']),

            setActiveTab(tab) {
                this.activeTab = tab;
            },

            searchUsers: _.debounce(function () {
                if (! _.isEmpty(this.userSearch))
                    firestore.collection('users')
                    .get()
                    .then(snapshot => {
                        this.users = _.filter(snapshot.docs.map(user => {
                            if (user.data().name.toLowerCase().includes(this.userSearch.toLowerCase())
                                && user.id !== auth.currentUser.uid)
                                return {...user.data(), uid: user.id};
                        }), user => user !== undefined);
                    });
                else
                    this.users = [];
            }, 500),

            addToContactsAlert (userUid) {
                this.$swal({
                    title: 'Do you want to add this user as your contact?',
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonText:'Yes!',
                    cancelButtonText: 'No',
                }).then((result) => {
                    if (result.value) {
                        let contacts = this.user.contacts;
                        console.debug(userUid);
                        firestore.collection('users')
                            .doc(userUid)
                            .get()
                            .then(snapshot => {
                                contacts.push({
                                    uid:  snapshot.id,
                                    name:  snapshot.data().name,
                                    avatar:  snapshot.data().avatar,
                                });

                                firestore.collection('users')
                                    .doc(auth.currentUser.uid)
                                    .update({contacts: contacts})
                                    .then(success => {
                                        // this.$root.showSuccessNotification('Your profile settings were updated successfully');
                                        this.$swal(
                                            'Added!',
                                            'Contact successfully added to your contact list',
                                            'success'
                                        )
                                    }).catch(error => {
                                    this.$root.showErrorNotification(error.message);
                                });

                                let newUsersContacts = snapshot.data().contacts;
                                newUsersContacts.push({
                                    uid: auth.currentUser.uid,
                                    name: this.user.name,
                                    avatar: this.user.avatar
                                });

                                firestore.collection('users')
                                    .doc(snapshot.id)
                                    .update({contacts: newUsersContacts})

                        }, function (errorObject) {
                            console.log("The read failed: " + errorObject.code);
                        });
                    }
                });
            },
        },

        updateCurrentAddedUser() {
            console.debug('updating');
        },

        watch: {
            documents (newDocuments) {
                console.debug(newDocuments, 'new documents');
            }
        }
    }
</script>