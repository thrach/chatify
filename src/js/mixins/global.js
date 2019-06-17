import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('global', ['showTemplateMenu'])
    },
}