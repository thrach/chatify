<template>
    <div class="full-chat-middle">
        <div class="chat-head">
            <div class="user-info">
                <span>To:</span><a href="#">John Mayers</a>
            </div>
            <div class="user-actions">
                <a href="#">
                    <i class="os-icon os-icon-mail-07"></i>
                </a>
                <a href="#">
                    <i class="os-icon os-icon-phone-18"></i>
                </a>
                <a href="#">
                    <i class="os-icon os-icon-phone-15"></i>
                </a>
            </div>
        </div>
        <div class="chat-content-w">
            <div class="chat-content">
                <div class="chat-message">
                    <div class="chat-message-content-w">
                        <div class="chat-message-content">
                            Hi, my name is Mike, I will be happy to assist you
                        </div>
                    </div>
                    <div class="chat-message-avatar">
                        <img alt="" src="img/avatar3.jpg">
                    </div>
                    <div class="chat-message-date">
                        9:12am
                    </div>
                </div>
                <div class="chat-date-separator">
                    <span>Yesterday</span>
                </div>
                <div class="chat-message self">
                    <div class="chat-message-content-w">
                        <div class="chat-message-content">
                            That walls over which the drawers. Gone studies to titles have audiences of and concepts was motivator
                        </div>
                    </div>
                    <div class="chat-message-date">
                        1:23pm
                    </div>
                    <div class="chat-message-avatar">
                        <img alt="" src="img/avatar1.jpg">
                    </div>
                </div>
                <div class="chat-message" v-for="chat in chats">
                    <div class="chat-message-content-w">
                        <div class="chat-message-content" v-text="chat.message">
                        </div>
                    </div>
                    <div class="chat-message-avatar">
                        <img alt="" src="img/avatar3.jpg">
                    </div>
                    <div class="chat-message-date">
                        3:45am
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-controls">
            <div class="chat-input">
                <input placeholder="Type your message here..." type="text">
            </div>
            <div class="chat-input-extra">
                <div class="chat-extra-actions">
                    <a href="#">
                        <i class="os-icon os-icon-mail-07"></i>
                    </a>
                    <a href="#">
                        <i class="os-icon os-icon-phone-18"></i>
                    </a>
                    <a href="#">
                        <i class="os-icon os-icon-phone-15"></i>
                    </a>
                </div>
                <div class="chat-btn">
                    <a class="btn btn-primary btn-sm" href="#">Reply</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
    import { firestore } from '../services/firebase';
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                chats: []
            }
        },

        firestore: {
            chats: firestore.collection('chats').orderBy('created_at', 'desc')
        },

        mounted() {
            this.bindChats();
        },

        methods: {
            ...mapActions('global', ['bindChats'])
        }
    }
</script>