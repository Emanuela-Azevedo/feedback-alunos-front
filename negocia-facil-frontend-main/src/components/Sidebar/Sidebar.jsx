import {Home, Package, Tag, Shield, LogOut, Users} from "lucide-react";
import SidebarHeader from "./SidebarHeader/SidebarHeader.jsx";
import styles from './Sidebar.module.css';
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

function Sidebar(){

    const context = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        { icon: <Home size={20} />, label: "Início", path: "/home"  },
        { icon: <Package size={20} />, label: "Produtos", path: `/products/user/${context.user?.id}`  },
        { icon: <Tag size={20} />, label: "Anúncios", path: `/advertisements/user/${context.user?.id}` },
        { icon: <Shield size={20} />, label: "Regras", path: "/rules"   }
    ];

    // Só adiciona o menu Usuários se for admin
    if (context.userRoles?.includes("ROLE_ADMIN")) {
        menuItems.push({ icon: <Users size={20} />, label: "Usuários", path: "/users" });
    }

    const handleLogout = () => {
        context.logout();
        navigate("/auth/login");
    }

    return (
        <aside className={styles.aside}>
            <SidebarHeader imgUrl={"https://th.bing.com/th/id/R.9a95e0eedc8214479caa052ca16f5e43?rik=6A75vFqSudXYrQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-Avatar-PNG-Picture.png&ehk=JgY%2fNqgXZ7IrJOZTg6KX4fcktLW5VC7fNYTNxieBCYA%3d&risl=&pid=ImgRaw&r=0"} userName={context.user?.fullName}/>
            <nav className={styles.nav}>
                {
                    menuItems.map((item, index) =>
                        (
                            <NavLink className={styles.link} key={index} to={item.path}>
                                <span className={styles.svgImage}>{item.icon}</span>
                                <span className={styles.text}>{item.label}</span>
                            </NavLink>
                        )
                    )
                }
            </nav>
            <button className={styles.link} onClick={handleLogout}><LogOut className={styles.svgImage} size={20}/> <span className={styles.text}>Sair</span></button>
        </aside>
    )
}
export default Sidebar