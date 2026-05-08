import { useContext, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { token } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  if (token) {
    return <Dashboard />;
  }

  return (
    <div>
      {isLogin ? <Login /> : <Register />}

      <div className="auth-switch">
        <button
          className="secondary-btn"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Go to Register"
            : "Go to Login"}
        </button>
      </div>
    </div>
  );
}

export default App;