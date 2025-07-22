import { Link, Outlet } from "@tanstack/react-router";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center justify-between p-4 shadow border-b bg-card">
        <h1 className="text-xl font-semibold">Todo App</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/todos" className="hover:underline">
            Todos
          </Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
