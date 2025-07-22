import { Link, Outlet } from "@tanstack/react-router"

function App() {

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/todos">Todos</Link>
      </nav>
      <main><Outlet/></main>
    </div>

  )
}

export default App
