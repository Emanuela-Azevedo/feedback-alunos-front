import ProductList from "../Products/ProductList.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductSelection } from "./ProductSelection.jsx";
import "./AdvertisementForm.css";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdvertisementForm({advertisement, onUpdate, isNew}) {


    const navigate = useNavigate();
    const datetime = new Date(advertisement.createdAt);

    const {user} = useAuth();
    
    const [products, setProducts] = useState(advertisement.products || []);
    const [description, setDescription] = useState(advertisement.description || "");

    useEffect(() => {
        setProducts(advertisement.products || []);
        setDescription(advertisement.description || "");
    }, [advertisement]);

    function updateAdvertisement(event) {
        event.preventDefault();
        if (products.length === 0) {
            alert("Adicione pelo menos um produto ao anúncio antes de salvar.");
            return;
        }

        advertisement.description = description;
        advertisement.products = products;
        advertisement.advertiser = user;
        onUpdate(advertisement.id, advertisement);
        navigate(`/advertisements/user/${user.id}`);
    }

    const removeProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
    }

    return (
        <div className="advertisement-form">
            {!isNew && 
                <div>
                    <p>ID: {advertisement.id}</p>
                    <p>{datetime.toLocaleDateString("pt-BR")}</p>
                    <p>{datetime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p>

                </div>}
            <p>Quantidade de itens no anúncio: {products.length}</p>
            <form className="form-description" onSubmit={updateAdvertisement}>
                <label>
                    Descrição:
                </label>
                <textarea name="description" defaultValue={advertisement.description} onChange={e => setDescription(e.target.value)} />
                

                <button id="save-button" type="submit">Salvar</button>

            </form>
            <button id="cancel-button" onClick={() => navigate("/advertisements")}>Cancelar</button>
            {products.length > 0 ? (
                <div>
                    <h3>Produtos anunciados</h3>
                    <ProductList
                        products={products}
                        onDelete={removeProduct}
                        showMenuOptions={false}
                        showTrashButton={true}
                        showCheckBox={false}
                        />
                </div>) : (
                <p>Nenhum produto anunciado.</p>
            )}
                <ProductSelection selectedProducts={products} onSelect={setProducts} />
        </div>
    );
}