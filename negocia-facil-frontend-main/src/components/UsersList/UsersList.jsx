import { useEffect, useState } from 'react';
import UserAPI from '../../services/UserAPI.js';
import UserCard from "../UserCard/UserCard.jsx";
import Button from '../Button/Button.jsx'
import styles from './UsersList.module.css'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router';

function UsersList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const size = 5;

    useEffect(() => {
        try {
            UserAPI
                .getAll({
                    page: page,
                    size: size,
                })
                .then((data) => {
                    setUsers(data.content);
                    setTotalPages(data.totalPages);
                })
        } catch (err) {
            console.error('Erro ao buscar usuários:', err);
        };
    }, [page, users.length]);

    const nextPage = () => {
        if (page + 1 < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div className={styles.usersList}>
            <ul>
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        id={user.id}
                        imgUrl={user.imgUrl}
                        userName={user.fullName}
                        email={user.username}
                    />
                ))}
            </ul>

            <div className={styles.paginationCard}>
                <button onClick={prevPage} disabled={page === 0} className={styles.paginationButtons}>Anterior</button>
                <span className={styles.pagesText}>Página {page + 1} de {totalPages}</span>
                <button onClick={nextPage} disabled={page + 1 === totalPages} className={styles.paginationButtons}>Próxima</button>
            </div>

            <Button text={"Criar Novo usuário"} action={() => navigate("register")} />
        </div>
    );
}

export default UsersList;