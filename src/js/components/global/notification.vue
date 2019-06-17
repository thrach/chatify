<template>
    <div class="alert alert-dismissible" v-if="notification.show"
         :class="getClassObject()"  role="alert">
        <button class="close" @click.prevent="setShowNotification(false)" type="button">
            <span aria-hidden="true"> ×</span>
        </button>
        <strong v-text="notification.title"></strong>
        <span v-text="notification.description"></span>
    </div>
</template>

<script scoped>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        computed: {
            ...mapGetters('global', ['notification']),

            alertType() {
                return `alert-${this.$store.getters['global/notification'].type}`;
            },
        },

        methods: {
            ...mapMutations('global', [
                'setShowNotification',
            ]),

            getClassObject() {
                if (this.notification.show)
                    return `fade show ${this.alertType}`;
            }
        }
    }
</script>