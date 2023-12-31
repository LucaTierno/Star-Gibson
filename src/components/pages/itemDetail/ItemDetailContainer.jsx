import { useContext, useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import Swal from "sweetalert2";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";

const ItemDetailContainer = () => {
  window.scrollTo(0, 0);
  
  const [productSelected, setProductSelected] = useState({});
  const [showCounter, setShowCounter] = useState(true);

  const { id } = useParams();
  const { addToCart, getQuantityById } = useContext(CartContext);

  let totalQuantity = getQuantityById(id);
  console.log(totalQuantity);

  useEffect(() => {
    let itemCollection = collection(db, "productos");
    let refDoc = doc(itemCollection, id);
    getDoc(refDoc).then((res) => {
      setProductSelected({ id: res.id, ...res.data() });
    });
  }, [id]);

  const onAdd = (cantidad) => {
    let item = {
      ...productSelected,
      quantity: cantidad,
    };

    addToCart(item);

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1200,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Producto agregado al carrito",
    });

    setShowCounter(false);
  };

  return (
    <ItemDetail
      productSelected={productSelected}
      onAdd={onAdd}
      initial={totalQuantity}
      showCounter={showCounter}
    />
  );
};

export default ItemDetailContainer;
