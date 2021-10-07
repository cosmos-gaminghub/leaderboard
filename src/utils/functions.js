export function setLeftBreadScrumbar (value) {
    this.$bus.emit('setLeftBreadScrumbar', value)
}

export function setRightBreadScrumbar (value) {
    this.$bus.emit('setRightBreadScrumbar', value)
}