<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-end">
            <a class="navbar-item">Name</a>
        </div>
    </nav>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'

    @Component
    export default class Navigation extends Vue {
    }
</script>