export type Pizza = {
  base: string;
  sauce?: string;
  cheese?: string;
  toppings: { name: string; count: number }[];
};

class PizzaBuilder {
  private pizza: Pizza;

  constructor() {
    this.pizza = { base: "Thin Crust", toppings: [] };
  }

  addSauce(sauce: string) {
    this.pizza.sauce = sauce;
    return this;
  }

  addCheese(cheese: string) {
    this.pizza.cheese = cheese;
    return this;
  }

  addTopping(topping: string) {
    const existing = this.pizza.toppings.find((t) => t.name === topping);
    if (existing) {
      existing.count++;
    } else {
      this.pizza.toppings.push({ name: topping, count: 1 });
    }
    return this;
  }

  reset() {
    this.pizza = { base: "Thin Crust", toppings: [] };
    return this;
  }

  build() {
    return { ...this.pizza, toppings: [...this.pizza.toppings] };
  }
}

export default PizzaBuilder;
