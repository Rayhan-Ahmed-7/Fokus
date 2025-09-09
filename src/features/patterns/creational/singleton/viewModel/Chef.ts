// --- Singleton Chef Class ---
class Chef {
  private static instance: Chef | null = null;
  public id: number;

  private constructor(id: number) {
    this.id = id;
  }

  public static getInstance(): Chef {
    if (!Chef.instance) {
      Chef.instance = new Chef(1); // Always the same Chef
    }
    return Chef.instance;
  }

  cook(meal: string) {
    return `${meal} cooked by Chef #${this.id}`;
  }
}

export default Chef;
