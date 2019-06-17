export default {
    data() {
        return {
            errors: {
                email: null,
                password: null
            }
        }
    },

    computed: {
        hasEmailError() {
            return this.errors.email !== null;
        },

        hasPasswordError() {
            return this.errors.password !== null;
        },
    },

    methods: {
        clearErrors() {
            this.errors.email = null;
            this.errors.password = null;
        },

        handleErrors(error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    this.errors.email = error.message;
                    break;
                case 'auth/user-not-found':
                    this.errors.email = error.message;
                    break;
                case 'auth/email-already-in-use':
                    this.errors.email = error.message;
                    break;
                case 'auth/wrong-password':
                    this.errors.password = error.message;
                    break;
                case 'auth/weak-password':
                    this.errors.password = error.message;
                    break;
            }
        }
    }
}