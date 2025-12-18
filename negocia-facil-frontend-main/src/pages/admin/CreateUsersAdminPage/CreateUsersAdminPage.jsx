import styles from './CreateUsersAdminPage.module.css'
import UserForm from "../../../components/UserForm/UserForm.jsx";
import UserAPI from '../../../services/UserAPI.js';

function CreateUsersAdminPage() {

    async function handleCreateUser(data) {
        try {
            await UserAPI.create(data);
            alert("Usuário criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar usuário:", error.response?.data || error.message || error);
            alert("Ocorreu um erro ao criar o usuário. Verifique o console para mais detalhes.");
        }
    }
    return (
        <div className={styles.mainContent}>
            <div className={styles.formHeader}>
                <h2>Formulário de cadastro</h2>
            </div>
            <UserForm action={handleCreateUser} />
        </div>
    )
}
export default CreateUsersAdminPage