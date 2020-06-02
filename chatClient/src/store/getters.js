export default {
  unReadCount(state) {
    let count = 0
    state.unRead.forEach(v => {
      count += v.count
    })
    return count
  }
}
