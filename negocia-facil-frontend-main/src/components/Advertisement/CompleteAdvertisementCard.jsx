import SimpleAdvertisementCard from "./SimpleAdvertisementCard.jsx";
import {useState} from "react";
import "./CompleteAdvertisementCard.css";
import { MoreVertical } from "lucide-react";

export default function CompleteAdvertisementCard({
    id,
    advertiserUsername,
    advertiserFullname,
    creationTime,
    itemsCount,
    description,
    showOptions,
    onEdit,
    onDelete,
    showAdvertiser
}) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <div className='user-advertisement-card'>
                {showAdvertiser && (
                    <div>
                        <p>{advertiserUsername}</p>
                        <p>{advertiserFullname}</p>
                    </div>
                )}
                <SimpleAdvertisementCard
                    id={id}
                    creationTime={creationTime}
                    description={description}
                    itemsCount={itemsCount} />
                
                {showOptions && (<div className="advertisement-dropdown"
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                >
                    <MoreVertical />
                    {showMenu && (
                        <div>
                            <button onClick={onEdit}>
                                Editar
                            </button>
                            <button onClick={() => onDelete(id)}>
                                Excluir
                            </button>
                        </div>
                    )}
                </div>)}

            </div>

        </>
    );
}