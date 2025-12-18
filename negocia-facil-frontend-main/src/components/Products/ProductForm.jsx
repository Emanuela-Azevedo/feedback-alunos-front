import { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import { ProductAPI } from "../../services/ProductAPI";
import { toast } from "react-toastify";

function ProductForm({ productToEdit, onCancel, onSave }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Venda");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setPrice(productToEdit.price);
      setQuantity(productToEdit.quantity);
      setCategory(productToEdit.category);
      setType(productToEdit.forExchange ? "Troca" : "Venda");
      setDescription(productToEdit.description);
    } else {
      clearForm();
    }
  }, [productToEdit]);

  function clearForm() {
    setTitle("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setType("Venda");
    setDescription("");
  }

  function handleCancel() {
    clearForm();
    onCancel();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !price || !quantity || !category) {
      toast.dismiss();
      toast.warn("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      title,
      price: Number(price),
      quantity: Number(quantity),
      category,
      description,
      forExchange: type === "Troca",
      userId: 1,
    };

    try {
      toast.dismiss();

      let savedProduct;
      if (productToEdit && productToEdit.id) {
        savedProduct = await ProductAPI.update(productToEdit.id, payload);
        toast.success("Produto atualizado com sucesso!");
      } else {
        savedProduct = await ProductAPI.create(payload);
        toast.success("Produto cadastrado com sucesso!");
      }

      clearForm();
      onSave();
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.formItem}
          type="text"
          placeholder="Título do Produto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={!productToEdit}
        />

        <div className={styles.inlineGroup}>
          <input className={styles.formItem}
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required={!productToEdit}
            min="0"
          />
          <input className={styles.formItem}
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required={!productToEdit}
            min="0"
          />
        </div>

        <div className={styles.inlineGroup}>
          <select className={styles.formItem}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required={!productToEdit}
          >
            <option value="">Categoria</option>
            <option value="BOOK">Livro</option>
            <option value="UNIFORM">Uniforme</option>
            <option value="PERIPHERAL">Periférico</option>
            <option value="BACKPACK">Mochila</option>
            <option value="CALCULATOR">Calculadora</option>
            <option value="OTHERS">Outros</option>
          </select>

          <select className={styles.formItem} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Venda">Venda</option>
            <option value="Troca">Troca</option>
          </select>
        </div>

        <textarea className={styles.formItem}
          placeholder="Descrição"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancel} onClick={handleCancel}>
            Cancelar
          </button>
          <button type="submit" className={styles.save}>
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;