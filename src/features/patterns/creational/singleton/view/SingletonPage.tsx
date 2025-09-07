import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/services/notification/toast";
import Chef from "../viewModel/Chef";

export default function SingletonPage() {
  const [chef, setChef] = useState<Chef | null>(null);
  const [orders, setOrders] = useState<string[]>([]);
  const [orderItem, setOrderItem] = useState("Pizza");

  const hireChef = () => {
    const hiredChef = Chef.getInstance();
    if (!chef) {
      setChef(hiredChef);
      toast.success(`Chef #${hiredChef.id} hired 👨‍🍳`);
    } else {
      toast.warning(
        `You already have Chef #${hiredChef.id}, no new chef created!`
      );
    }
  };

  const placeOrder = () => {
    if (!chef) {
      toast.error("Hire a Chef first before placing orders!");
      return;
    }
    const result = chef.cook(orderItem);
    setOrders((prev) => [...prev, result]);
    toast.success(result);
  };

  return (
    <div className="p-6 flex flex-col gap-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center">🍳 Singleton Pattern</h1>
      <p className="text-center text-muted-foreground">
        In this restaurant, no matter how many chefs you try to hire, there’s
        always only <b>one Head Chef</b>!
      </p>

      <div className="flex justify-center gap-4">
        <Button onClick={hireChef}>Hire New Chef</Button>
      </div>

      {chef && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-4xl">👨‍🍳</span>
              Chef #{chef.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The only chef in this restaurant.
            </p>
          </CardContent>
        </Card>
      )}

      <Separator />

      <div className="flex flex-col gap-4">
        <Select value={orderItem} onValueChange={(val) => setOrderItem(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a meal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pizza">Pizza</SelectItem>
            <SelectItem value="Pasta">Pasta</SelectItem>
            <SelectItem value="Burger">Burger</SelectItem>
            <SelectItem value="Salad">Salad</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={placeOrder}>Place Order</Button>
      </div>

      {orders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>🧾 Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-1">
              {orders.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
