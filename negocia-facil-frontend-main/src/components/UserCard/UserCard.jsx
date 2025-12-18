import styles from './UserCard.module.css'
import { Edit, Trash } from "lucide-react";
import {useNavigate} from "react-router-dom";
import UserAPI from '../../services/UserAPI';
export default function UserCard({id, imgUrl, userName, email}) {

    const navigate = useNavigate();

    async function confirmDelete() {
        const confirm = window.confirm(`Tem certeza que deseja excluir o usuário ${userName}?`);
        if (!confirm) return;

        const token = localStorage.getItem("token");
        try {
            await UserAPI.delete(id);
            alert("Usuário excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            alert("Erro ao excluir o usuário.");
        }
    }

    return (
        <div className={styles.userCard}>
            <div className={styles.userInfo}>
                <img src={"https://th.bing.com/th/id/R.9a95e0eedc8214479caa052ca16f5e43?rik=6A75vFqSudXYrQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-Avatar-PNG-Picture.png&ehk=JgY%2fNqgXZ7IrJOZTg6KX4fcktLW5VC7fNYTNxieBCYA%3d&risl=&pid=ImgRaw&r=0"} alt={`Profile photo of ${userName}`} width={50} height={50}/>
                <div className={styles.userNameAndEmailCard}>
                    <span>{userName}</span>
                    <span>{email}</span>
                </div>
            </div>
            <div className={styles.buttonsCard}>
                <button onClick={() => navigate(`/users/${id}`)} className={styles.editButton}>
                    <Edit size={20}/>
                </button>
                <button onClick={confirmDelete} className={styles.deleteButton} >
                    <Trash size={20}/>
                </button>
            </div>
        </div>


    )
}
