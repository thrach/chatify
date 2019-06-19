<template>
    <div class="all-wrapper menu-side with-pattern">
        <div class="auth-box-w wider">
            <div class="logo-w">
                <a href="index.html"><img alt="" src="img/logo-big.png"></a>
            </div>
            <h4 class="auth-header">
                Create new account
            </h4>
            <form>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group" :class="{'has-error has-danger': hasEmailError}">
                            <label for="email">Email address</label>
                            <input class="form-control" id="email" v-model="email" placeholder="Enter email" type="email">
                            <div class="pre-icon os-icon os-icon-email-2-at2"></div>
                            <div class="help-block form-text with-errors form-control-feedback" v-if="hasEmailError">
                                <ul class="list-unstyled">
                                    <li v-text="errors.email"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input class="form-control" id="name" v-model="name" placeholder="Enter your name" type="text">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group" :class="{'has-error has-danger': hasPasswordError}">
                            <label for=""> Password</label>
                            <input class="form-control" v-model="password" placeholder="Password" type="password">
                            <div class="pre-icon os-icon os-icon-fingerprint"></div>
                        </div>
                        <div class="help-block form-text with-errors form-control-feedback" v-if="hasPasswordError">
                            <ul class="list-unstyled">
                                <li v-text="errors.password"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="">Confirm Password</label>
                            <input class="form-control" v-model="confirm_password" placeholder="Password" type="password">
                        </div>
                    </div>
                </div>
                <div class="buttons-w">
                    <button class="btn btn-primary"
                        :disabled="! formIsValid"
                        :class="{'disabled': ! formIsValid}"
                        @click="register">Register Now</button>
                </div>

                <router-link to="login">Login</router-link>
            </form>
        </div>
    </div>
</template>

<script scoped>
    import { auth, firestore } from '../../services/firebase';
    import loginRegisterMixin from '../../mixins/login-register';
    import { mapActions } from 'vuex';

    export default {
        mixins: [loginRegisterMixin],

        data() {
            return {
                email: null,
                password: null,
                confirm_password: null,
                name: null
            }
        },

        computed: {
            formIsValid() {
                return ! _.isEmpty(this.email) &&
                    ! _.isEmpty(this.password) &&
                    this.password === this.confirm_password &&
                    ! _.isEmpty(this.name.trim());
            }
        },

        methods: {
            ...mapActions('global', ['bindUser']),

            register() {
                auth.createUserWithEmailAndPassword(this.email, this.password)
                    .then(response => {
                        firestore.collection('users')
                        .doc(response.user.uid)
                        .set({
                            name: this.name,
                            avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
                            contacts: [],
                            chats: []
                        }).then(response => {
                            this.bindUser();
                            this.$router.push('home');
                        }).catch(error => {
                            console.debug(error);
                        });
                    }).catch(error => {
                        console.debug(error);
                        this.handleErrors(error);
                    })
            }
        }
    }
</script>