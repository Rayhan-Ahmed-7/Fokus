type Subscriber = (value: number) => void;

class CounterManager {
  private static instance: CounterManager;
  private value = 0;
  private subscribers: Subscriber[] = [];

  private constructor() {}

  static getInstance() {
    if (!CounterManager.instance) {
      CounterManager.instance = new CounterManager();
    }
    return CounterManager.instance;
  }

  getValue() {
    return this.value;
  }

  increment() {
    this.value++;
    this.notify();
    return this.value;
  }

  subscribe(fn: Subscriber) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== fn);
    };
  }

  private notify() {
    this.subscribers.forEach((fn) => fn(this.value));
  }
}

export const counterManager = CounterManager.getInstance();
