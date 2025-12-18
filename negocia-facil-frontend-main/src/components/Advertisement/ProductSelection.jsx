import { useEffect, useState } from "react";
import ProductList from "../Products/ProductList";
import { ProductAPI } from "../../services/ProductAPI";
import "./ProductSelection.css";
import { useAuth } from "../../context/AuthContext";

export function ProductSelection({ selectedProducts, onSelect }) {

    const {user} = useAuth();
    const [allProducts, setAllProducts] = useState([]);
    const availableProducts = allProducts?.filter(
        (product) => !selectedProducts.some((p) => p.id === product.id)
    );

    useEffect(() => {
        loadAllProducts();
    }, []);

    const toggleProductSelection = (product) => {
        if (selectedProducts?.includes(product)) {
            selectedProducts = selectedProducts?.filter((p) => p !== product);
        } else {
            selectedProducts = [...selectedProducts, product];
        }
        handleSelect(selectedProducts)
    }
    

    async function loadAllProducts() {
           
        const data = await ProductAPI.getByUserId(user.id);
        setAllProducts(data.content);
            
    }

    const handleSelect = () => {
        onSelect(selectedProducts);
    };

    return (
        <div>
            {availableProducts?.length > 0 ? (
            <div>
            <strong className="title">Produtos disponíveis para escolher</strong>
            <ProductList
                products={availableProducts}
                showMenuOptions={false}
                showTrashButton={false}
                showCheckBox={true}
                selectedProducts={selectedProducts}
                toggleProductSelection={toggleProductSelection}
            />
            </div>
            ) : (<></>)}
        </div>
    );
}