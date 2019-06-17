<template>
    <div class="element-wrapper">
        <div class="element-box">
            <form>
                <div class="element-info">
                    <div class="element-info-with-icon">
                        <div class="element-info-icon">
                            <div class="os-icon os-icon-wallet-loaded"></div>
                        </div>
                        <div class="element-info-text">
                            <h5 class="element-inner-header">
                                Profile Settings
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input class="form-control" id="email" v-model="email" placeholder="Enter email" type="email">
                            <div class="help-block form-text with-errors form-control-feedback"></div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input class="form-control" id="name" v-model="name" placeholder="Enter name" type="text">
                            <div class="help-block form-text with-errors form-control-feedback"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input class="form-control" id="password" placeholder="Password" type="password">
                            <div class="help-block form-text text-muted form-control-feedback">
                                Minimum of 6 characters
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input class="form-control" placeholder="Confirm Password" id="confirm_password" type="password">
                            <div class="help-block form-text with-errors form-control-feedback"></div>
                        </div>
                    </div>
                </div>
                <div class="form-buttons-w">
                    <button class="btn btn-primary"
                        :disabled="! formIsValid"
                        :class="{'disabled': ! formIsValid}"
                        @click.prevent="updateUserProfile"
                        type="submit">Update</button>
                </div>
                <fieldset class="form-group">
                    <legend>
                        <span>Avatar</span>
                    </legend>
                    <dropzone :options="dropzoneOptions"
                        id="avatarDropzone"
                        ref="avatarDropzone"
                        @vdropzone-success="avatarUploadSuccess"
                        :use-custom-slot="true">
                        <span>Drop files here or click to upload</span>
                    </dropzone>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script scoped>
    import { firestore, auth, storage } from '../../services/firebase';
    import { mapMutations } from 'vuex';
    import dropzone from 'vue2-dropzone';

    export default {
        data() {
            return {
                email: auth.currentUser.email,
                dropzoneOptions: {
                    url: '/',
                    thumbnailWidth: 200,
                }
            }
        },

        components: { dropzone },

        computed: {
            firebaseKey() {
                return this.$store.getters['global/user'].firebaseKey;
            },

            formIsValid() {
                return ! _.isEmpty(this.email) && ! _.isEmpty(this.name);
            },

            name: {
                get() {
                    return this.$store.getters['global/user'].name
                },
                set(value) {
                    this.updateUserFields('name', value);
                }
            }
        },

        methods: {
            ...mapMutations('global', ['setUserFields']),

            updateUserFields(field, value) {
                const payload = {
                    field,
                    value
                };

                this.setUserFields(payload);
            },

            updateUserProfile() {
                auth.currentUser.updateEmail(this.email)
                .then(success => {
                    if (! _.isEmpty(this.password) && this.password === this.current_password)
                        auth.currentUser.updatePassword(this.password);

                    firestore.collection('users').doc(auth.currentUser.uid)
                    .update({name: this.name})
                    .then(success => {
                        this.$root.showSuccessNotification('Your profile settings were updated successfully')
                    }).catch(error => {
                        this.$root.showErrorNotification(error.message);
                    });
                }).catch(error => {
                    this.$root.showErrorNotification(error.message);
                });
            },

            avatarUploadSuccess (file,response) {
                const avatarRef = storage.ref().child('avatars').child(auth.currentUser.uid);

                avatarRef.putString(file.dataURL, 'data_url')
                .then(snapshot => {
                    storage.ref(avatarRef.fullPath).getDownloadURL()
                    .then(url => {
                        firestore.collection('users').doc(auth.currentUser.uid)
                        .update({avatar: url})
                        .then(success => {
                            this.$root.showSuccessNotification('Avatar uploaded successfully')
                        }).catch(error => {
                            this.$root.showErrorNotification(error.message);
                        });
                    }).catch(error => {
                        this.$root.showErrorNotification(error.message);
                    });
                }).catch(error => {
                    this.$root.showErrorNotification(error.message);
                });
            },
        }
    }
</script>