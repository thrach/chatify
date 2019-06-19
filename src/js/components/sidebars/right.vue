<template>
    <div class="full-chat-right">
        <div class="user-intro" v-if="user !== null">
            <div class="avatar">
                <img alt="" :src="user.avatar">
            </div>
            <div class="user-intro-info">
                <h5 class="user-name" v-text="user.name"></h5>
                <div class="user-sub">
                    San Francisco, CA
                </div>
                <div class="user-social">
                    <a href="#">
                        <i class="os-icon os-icon-twitter"></i>
                    </a>
                    <a href="#">
                        <i class="os-icon os-icon-facebook"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="chat-info-section">
            <div class="ci-header">
                <i class="os-icon os-icon-documents-03"></i><span>Shared Files</span>
            </div>
            <div class="ci-content">
                <div class="ci-file-list">
                    <ul>
                        <li>
                            <a href="#">Annual Revenue.pdf</a>
                        </li>
                        <li>
                            <a href="#">Expenses.xls</a>
                        </li>
                        <li>
                            <a href="#">Business Plan.doc</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="chat-info-section">
            <div class="ci-header">
                <i class="os-icon os-icon-documents-07"></i><span>Shared Photos</span>
            </div>
            <div class="ci-content">
                <div class="ci-photos-list">
                    <img alt="" src="img/portfolio9.jpg">
                    <img alt="" src="img/portfolio2.jpg">
                    <img alt="" src="img/portfolio12.jpg">
                    <img alt="" src="img/portfolio14.jpg">
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters('global', ['user']),
        }
    }
</script>