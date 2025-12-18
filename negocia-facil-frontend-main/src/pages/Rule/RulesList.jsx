import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RuleAPI } from "../../services/RuleAPI";
import { useAuth } from "../../context/AuthContext"; 
import "./RulesList.css";

export default function RulesList() {
  const [rules, setRules] = useState([]);
  const navigate = useNavigate();
  const context = useAuth();

  const fetchRules = async () => {
    try {
      const data = await RuleAPI.getAll();
      setRules(data.content);
    } catch (error) {
      console.error("Erro ao buscar regras:", error);
    }
  };

  const deleteRule = async (id) => {
    try {
      await RuleAPI.delete(id);
      await fetchRules();
    } catch (error) {
      console.error("Erro ao deletar regra:", error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="rules-container">
      <div>
        <h1>Lista de Regras</h1>
        {rules?.length === 0 ? (
          <p>Nenhuma regra encontrada.</p>
        ) : (
          <ul>
            {rules?.map((rule) => (
              <li key={rule.id} className="rule-card">
                <div>
                  <strong>{rule.title}</strong>
                  <p>{rule.description}</p>
                </div>
                {/* Só mostra as ações se for admin */}
                {context.userRoles?.includes("ROLE_ADMIN") && (
                  <div className="rule-actions">
                    <button
                      onClick={() => navigate("edit", { state: rule })}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteRule(rule.id)}
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {context.userRoles?.includes("ROLE_ADMIN") && (
          <button className="new-rule-button" onClick={() => navigate("/rules/new")}>
            Nova Regra
          </button>
        )}
      </div>
    </div>
  );
}
