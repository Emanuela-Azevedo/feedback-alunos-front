import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RuleAPI from "../../services/RuleAPI";
import "./RuleForm.css"

export default function RuleForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const rule = location.state;

  const [title, setTitle] = useState(rule?.title || "");
  const [description, setDescription] = useState(rule?.description || "");

  const saveRule = async () => {
    const data = {
      title,
      description,
      active: true, // você pode ajustar esse valor conforme necessário
    };

    try {
      if (rule) {
        await RuleAPI.update(rule.id, data);
      } else {
        await RuleAPI.create(data);
      }
      navigate("/rules");
    } catch (error) {
      console.error("Erro ao salvar regra:", error);
    }
  };

  return (
    <div>
      <div className="main-container">
        <h1>{rule ? "Editar Regra" : "Nova Regra"}</h1>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea"
        ></textarea>
        <button className="btn" onClick={saveRule}>
          Salvar
        </button>
      </div>
    </div>
  );
}
