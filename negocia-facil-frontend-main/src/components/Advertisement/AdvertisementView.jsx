import ProductList from "../Products/ProductList";
import CompleteAdvertisementCard from "./CompleteAdvertisementCard";
import { AdvertisementAPI } from "../../services/AdvertisementAPI";
import "./AdvertisementView.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdvertisementView() {

    const { id } = useParams();
    const [advertisement, setAdvertisement] = useState({});

    useEffect(() => {
        loadAdvertisement();
    }, []);

    async function loadAdvertisement() {      
        const data = await AdvertisementAPI.getById(id);
        await setAdvertisement(data);            
    }

    return (
        <div className="container">
            <h1>Detalhes do do Anúncio</h1>
            <CompleteAdvertisementCard id={advertisement.id} creationTime={advertisement.createdAt} itemsCount={advertisement.products?.length} description={advertisement.description} showAdvertiser={true} showOptions={false}/>
            <h2 className="titulo-produtos">Produtos</h2>
            <ProductList products={advertisement.products || []} />
            <button className="button-voltar" type="button" onClick={() => window.history.back()}>Voltar</button>
            <a href={`mailto:${advertisement.advertiser?.username}?subject=Interesse no anúncio ${advertisement.id} no Negocia Fácil IFPB`} class="email-button">Contatar anunciante</a>

        </div>
    );
}