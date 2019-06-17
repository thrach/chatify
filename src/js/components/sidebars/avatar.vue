<template>
    <div class="logged-user-w avatar-inline">
        <div class="logged-user-i">
            <div class="avatar-w">
                <img alt="" :src="user.avatar">
            </div>
            <div class="logged-user-info-w">
                <div class="logged-user-name" v-text="user.name"></div>
                <div class="logged-user-role">
                    Administrator
                </div>
            </div>
            <div class="logged-user-toggler-arrow">
                <div class="os-icon os-icon-chevron-down"></div>
            </div>
            <div class="logged-user-menu color-style-bright">
                <div class="logged-user-avatar-info">
                    <div class="avatar-w">
                        <img alt="" :src="user.avatar">
                    </div>
                    <div class="logged-user-info-w">
                        <div class="logged-user-name" v-text="user.name"></div>
                        <div class="logged-user-role">
                            Administrator
                        </div>
                    </div>
                </div>
                <div class="bg-icon">
                    <i class="os-icon os-icon-wallet-loaded"></i>
                </div>
                <ul>
                    <li>
                        <a href="apps_email.html"><i class="os-icon os-icon-mail-01"></i><span>Incoming Mail</span></a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" @click.prevent="$router.replace('profile')">
                            <i class="os-icon os-icon-user-male-circle2"></i>
                            <span>Profile Details</span>
                        </a>
                    </li>
                    <li>
                        <a href="users_profile_small.html"><i class="os-icon os-icon-coins-4"></i><span>Billing Details</span></a>
                    </li>
                    <li>
                        <a href="#"><i class="os-icon os-icon-others-43"></i><span>Notifications</span></a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="logout">
                            <i class="os-icon os-icon-signs-11"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script scoped>
    import { auth } from '../../services/firebase';
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters('global', ['user'])
        },

        methods: {
            logout() {
                auth.signOut()
                    .then(() => {
                        this.$router.push('login');
                    })
            }
        }
    }
</script>