
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById } from "../data/products";  



export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = getProductById(id);

        if (!foundProduct) {
            navigate("/"); // Redirect to home page if product not found
            return;
        }
        setProduct(foundProduct);
    }, [id]);
    if (!product) {
        return <div className="page"><p>Loading...</p></div>;
    }


    return (
            <div className="page"> 
                <div className="container">
                    <div className="product-detail">
                        <div className="product-detail-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-detail-content">
                            <h1 className="product-detail-name">{product.name}</h1>
                            <p className="product-detail-price">${product.price.toFixed(2)}</p>
                            <p className="product-detail-description">{product.description}</p>
                            
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        );
}