import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <Avatar className="w-52 h-52 p-8">
        <AvatarImage src="/notFound.png" />
        <AvatarFallback>😵</AvatarFallback>
      </Avatar>

      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">
        Oops! The page you are looking for does not exist.
      </p>

      <Button
        onClick={() => navigate({ to: "/" })}
        className="px-6 py-3 rounded-lg shadow-md text-primary-foreground"
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
