class SnapshotState {
  constructor() {
    this.statesCollection = [];
  }

  getLastState() {
    return this.statesCollection[this.statesCollection.length - 1];
  }

  pushState(state) {
    this.statesCollection.push(state);
  }
}

export default SnapshotState;
