<template>
    <div class="breadcrumbbar">
        <div class="row align-items-center">
            <div class="col-md-8 col-lg-8">
                <h3>{{ leftName }}</h3>
            </div>
            <div class="col-md-4 col-lg-4" style="text-align: right">
                {{ rightName }}                    
            </div>
        </div>          
    </div>
</template>

<script>

export default {
    data() {
        return {
            leftName: 'Leader Board',
            rightName: ''
        }
    },
    created () {
        this.rightName = ''
        this.$bus.on('setLeftBreadScrumbar', (value) => {
            this.leftName = value
        })
        this.$bus.on('setRightBreadScrumbar', (value) => {
            this.rightName = value
        })
    },
    mounted () {
        this.rightName = ''
    }
}
</script>
