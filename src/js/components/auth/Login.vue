<template>
    <div class="all-wrapper menu-side with-pattern">
        <div class="auth-box-w">
            <div class="logo-w">
                <img alt="" src="img/logo-big.png">
            </div>
            <h4 class="auth-header">
                Login Form
            </h4>
            <form action="">
                <div class="form-group" :class="{'has-error has-danger': hasEmailError}">
                    <label for=""> Email address</label>
                    <input class="form-control"
                        v-model="email"
                        placeholder="Enter email"
                        type="email">
                    <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                    <div class="help-block form-text with-errors form-control-feedback" v-if="hasEmailError">
                        <ul class="list-unstyled">
                            <li v-text="errors.email"></li>
                        </ul>
                    </div>
                </div>
                <div class="form-group" :class="{'has-error has-danger': hasPasswordError}">
                    <label for="">Password</label>
                    <input class="form-control" v-model="password" placeholder="Enter your password" type="password">
                    <div class="pre-icon os-icon os-icon-fingerprint"></div>
                    <div class="help-block form-text with-errors form-control-feedback" v-if="hasPasswordError">
                        <ul class="list-unstyled">
                            <li v-text="errors.password"></li>
                        </ul>
                    </div>
                </div>
                <div class="buttons-w">
                    <button class="btn btn-primary"
                        :disabled="! formIsValid"
                        :class="{'disabled': ! formIsValid}"
                        @click="signIn">Log me in</button>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox">Remember Me
                        </label>
                    </div>
                    <router-link to="register">Register</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script scoped>
    import { auth } from '../../services/firebase';
    import loginRegisterMixin from '../../mixins/login-register';
    import { mapActions } from 'vuex';

    export default {
        mixins: [loginRegisterMixin],

        data() {
            return {
                email: null,
                password: null
            }
        },

        computed: {
            formIsValid() {
                return this.email !== null && this.password !== null;
            }
        },

        methods: {
            ...mapActions('global', ['bindUser']),

            signIn() {
                this.clearErrors();

                auth.signInWithEmailAndPassword(this.email, this.password)
                    .then(user => {
                        this.bindUser();
                        this.$router.replace('home');
                    }).catch(error => {
                        console.debug(error);
                        this.handleErrors(error)
                    })
            }
        }
    }
</script>