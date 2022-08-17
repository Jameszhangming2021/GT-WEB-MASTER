<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.card {
    border: none;
    background: #ffffff;
    padding: 15px;
    box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1) ;
}
</style>