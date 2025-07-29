import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>Choose the plan that’s right for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Pro plan gives you access to advanced features and priority support.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Upgrade</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <img
        src="https://c4.wallpaperflare.com/wallpaper/905/357/240/the-batman-2022-batman-dc-comics-the-dark-knight-red-background-hd-wallpaper-preview.jpg"
        alt="Example"
        className="w-full h-[200px] object-cover"
      />
      <CardHeader>
        <CardTitle>Photo Card</CardTitle>
        <CardDescription>With a beautiful image</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This card includes an image header and some supporting text content.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Learn More</Button>
      </CardFooter>
    </Card>
  ),
};
