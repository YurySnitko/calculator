class Subject {
  value;
  listeners = [];

  constructor(initialValue = undefined) {
    this.value = initialValue;
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  next(value) {
    this.value = value;
    this.listeners.forEach(function (listener) {
      listener.call(undefined, value);
    });
  }

  getValue() {
    return this.value;
  }
}

export default Subject;
