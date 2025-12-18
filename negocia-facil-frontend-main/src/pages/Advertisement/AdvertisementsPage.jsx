import { useState, useEffect } from "react";
import { AdvertisementAPI } from "../../services/AdvertisementAPI";
import CompleteAdvertisementCard from "../../components/Advertisement/CompleteAdvertisementCard";
import './AdvertisementsPage.css';
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

function AdvertisementsPage() {

    const navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [advertisements, setAdvertisements] = useState([]);
    
    useEffect(() => {
        setAdvertisements([]);
        loadAdvertisements();
    }, [category]);

    async function loadAdvertisements() {
        if (category === "") { // Se a categoria não estiver filtrada
            let data = await AdvertisementAPI.getAll();
            setAdvertisements(data.content);
        } else { // Se a categoria estiver filtrada
            try {
                const response = await AdvertisementAPI.getByCategory(category);

                if (response.status === 204) {
                    setAdvertisements([]);
                } else {
                    setAdvertisements(response.data.content);
                }
            } catch (error) {
                console.error("Erro ao filtrar categoria:", error);
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
        navigate(`edit/${id}`);
    }

    return (
        <div className="advertisements-page">
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Todas as categorias</option>
                <option value="BOOK">Livro</option>
                <option value="UNIFORM">Uniforme</option>
                <option value="PERIPHERAL">Periférico</option>
                <option value="BACKPACK">Mochila</option>
                <option value="CALCULATOR">Calculadora</option>
                <option value="OTHERS">Outros</option>
            </select>
            {advertisements?.length === 0 ? (
                <p className="mensagem-de-aviso">Nenhum anúncio encontrado.</p>
            ) : (
                <div className="advertisements-list">

                    {advertisements?.map((ad) => (
                        <>
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
                                showOptions={false}
                                showAdvertiser={true} />
                            <Button text={"Ver detalhes"} action={() => navigate(`/advertisements/details/${ad.id}`)}></Button>
                        </>
                    ))}
                </div>
            )}

        </div>
    );
}
export default AdvertisementsPage;