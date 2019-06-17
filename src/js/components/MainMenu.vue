<template>
    <div class="menu-w menu-position-side menu-side-left menu-layout-mini sub-menu-style-over sub-menu-color-bright menu-activated-on-hover menu-has-selected-link color-style-transparent color-scheme-light selected-menu-color-light" v-show="showTemplateMenu">
        <div class="logo-w">
            <a class="logo" href="javascript:void(0)" @click.prevent="$router.replace('home')">
                <div class="logo-element"></div>
                <div class="logo-label">
                    Chatify
                </div>
            </a>
        </div>
        <sidebar-avatar></sidebar-avatar>
        <h1 class="menu-page-header">
            Page Header
        </h1>
        <sidebar-menu></sidebar-menu>
    </div>
</template>

<script scoped>
    import globalMixin from '../mixins/global';

    export default {
        mixins: [globalMixin],
    }
</script>