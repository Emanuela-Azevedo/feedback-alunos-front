import { useState } from "react";
import logoIfpb from "../../assets/logo-ifpb.png";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    // tenta logar
    const success = await login(matricula, password);

    if (!success) {
      alert("Matrícula ou senha inválidas");
      return;
    }

    // se deu certo, não precisa fazer nada aqui
    // AppRoutes vai detectar isLoggedIn=true e userType definido
    // e renderizar a tela correta automaticamente
  };

  return (
      <div className="login-container">
        <img src={logoIfpb} alt="Logo IFPB" className="logo" />
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="matricula">Matrícula:</label>
            <input
                type="text"
                id="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
  );
}

export default Login;