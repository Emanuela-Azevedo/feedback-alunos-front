import { useState, useEffect } from "react";
import { AdvertisementAPI } from "../../services/AdvertisementAPI";
import CompleteAdvertisementCard from "../../components/Advertisement/CompleteAdvertisementCard";
import './AdvertisementsPage.css';
import { useParams, useNavigate } from "react-router-dom";

function UserAdvertisementsPage() {

    const { userId } = useParams();
    const navigate = useNavigate();

    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        loadAdvertisements();
    }, []);

    async function loadAdvertisements() {

        if (userId !== null) { // Se for a página de anúncios do próprio usuário
            try {
                const response = await AdvertisementAPI.getByAdvertiserId(userId);
                if (response.status === 204) {
                    setAdvertisements([]);
                } else {
                    setAdvertisements(response.data.content);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }


    const handleDelete = async (id) => {
        try {
            await AdvertisementAPI.delete(id);
            loadAdvertisements();
            console.info("Anúncio deletado com sucesso!");
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleEdit = (id) => {
        navigate(`/advertisements/edit/${id}`);
    }

    const handleNewAdvertisement = () => {
        navigate("/advertisements/new");
    }

    return (
        <div className="advertisements-page">
            {advertisements?.length === 0 ? (
                <p className="mensagem-de-aviso">Nenhum anúncio encontrado.</p>
            ) : (
                <div className="advertisements-list">

                    {advertisements?.map((ad) => (
                        <CompleteAdvertisementCard
                            key={ad.id}
                            id={ad.id}
                            creationTime={ad.createdAt}
                            description={ad.description}
                            itemsCount={ad.products.length}
                            onDelete={() => handleDelete(ad.id)}
                            onEdit={() => handleEdit(ad.id)}
                            advertiserUsername={ad.advertiser?.username}
                            advertiserFullname={ad.advertiser?.fullName}
                            showOptions={true}
                            showAdvertiser={false} />
                    ))}
                </div>
            )}
            <button id="botao-novo-anuncio" onClick={handleNewAdvertisement}>Novo anúncio</button>
        </div>
    );
}

export default UserAdvertisementsPage;