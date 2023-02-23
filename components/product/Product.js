import { numberFormat } from "../../lib/helper";
import Image from "next/image";
import Link from "next/link";
import { addToCart, removeFromCart } from "../../redux/cart/action";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Product = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(removeFromCart(product.id))
        dispatch(addToCart(product, 1))
        toast.success(' The product has been added to the cart.    ')
    }

  return (
      <div className="box ">
        <div>
          <div className="img-box ">
            <Image
              className="img-fluid rounded-circle"
              src={product.primary_image}
              width={366}
              height={244}
              placeholder="blur"
              blurDataURL={product.primary_image_blurDataURL}
            />
          </div>
          <div className="detail-box">
            <h5>
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h5>
            <p>{product.description}</p>
            <div className="options">
              <h6>
                <span>$</span>
                {product.is_sale ? (
                  <>
                    <span>{numberFormat(product.sale_price)}</span>
                    <del className="ml-2">{numberFormat(product.price)}</del>
                  </>
                ) : (
                  <span>{numberFormat(product.price)}</span>
                )}
              </h6>
              <a className="pe-auto" onClick={handleAddToCart}>
                <i className="bi bi-cart-fill text-white fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Product;