import Address from "../../components/cart/Address";
import Coupon from "../../components/cart/Coupon";
import Payment from "../../components/cart/Payment";
import { clearCart, decrement, increment, removeFromCart } from "../../redux/cart/action";
import { numberFormat, salePercent } from "../../lib/helper";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [coupon, setCoupon] = useState({ code: null, percent: 0 });
    const [addressId, setAddressId] = useState(null);
    const state = useSelector(state => state.shoppingCart);
    const dispatch = useDispatch()

    useEffect(() => {
        setCart(state.cart)
    }, [state])

    if (cart == null) {
        return (
            <div className="cart-loadnig">
                <div className="spinner-border spinner-border-sm ms-2 cart-spiner"></div>
            </div>
        )
    }
    return (
        <>
            {cart.length != 0 ? (
                <section className="single_page_section layout_padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <div className="row gy-5">
                                    <div className="col-12">
                                        <div className="table-responsive  table-hover">
                                            <table className="table table-bordered">
                                                <thead >
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Number</th>
                                                        <th> Total price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart.map(item => (
                                                        <tr key={item.id}>
                                                            <th>
                                                                <Image src={item.primary_image} placeholder="blur" blurDataURL={item.primary_image_blurDataURL} width={100} height={66} alt="primary-image" />
                                                            </th>
                                                            <td className="fw-bold ">{item.name}</td>
                                                            <td>
                                                                <div>
                                                                    {item.is_sale ? (
                                                                        <>
                                                                            <span>{numberFormat(item.sale_price)}</span>
                                                                            <del className="me-1">{numberFormat(item.price)}</del>
                                                                        </>
                                                                    ) : (
                                                                        <span>{numberFormat(item.price)}</span>
                                                                    )}
                                                                    <span className='ms-1'>$</span>
                                                                </div>
                                                                {item.is_sale && (
                                                                    <div className="text-danger">
                                                                        {salePercent(item.price, item.sale_price)}% Discount
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div className="input-counter">
                                                                    <span onClick={() => item.qty < item.quantity && dispatch(increment(item.id))} className="plus-btn">
                                                                        +
                                                                    </span>
                                                                    <div className="input-number">{item.qty}</div>
                                                                    <span onClick={() => item.qty > 1 && dispatch(decrement(item.id))} className="minus-btn">
                                                                        -
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {item.is_sale ? (
                                                                    <span>{numberFormat(item.sale_price * item.qty)}</span>
                                                                ) : (<span>{numberFormat(item.price * item.qty)}</span>)}
                                                                <span className='ms-1'>$</span>
                                                            </td>
                                                            <td>
                                                                <i onClick={() => dispatch(removeFromCart(item.id))} className="bi bi-x text-danger fw-bold fs-4 cursor-pointer"></i>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="btn-box">
                                        <button onClick={() => dispatch(clearCart())} className="btn1  mb-4">   Clearing the shopping cart</button>
                                    </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-12 col-md-6">
                                        <Coupon coupon={coupon} setCoupon={setCoupon} />
                                    </div>
                                    <div className="col-12 col-md-6 d-flex justify-content-end align-items-baseline">
                                        <Address setAddressId={setAddressId} />
                                    </div>
                                </div>
                                <div className="row justify-content-center mt-5">
                                    <div className="col-12 col-md-6">
                                        <div className="card">
                                            <div className="card-body p-4">
                                                <h5 className="card-title fw-bold">Cart total  </h5>
                                                <ul className="list-group mt-4">
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <div> Total price:</div>
                                                        <div>
                                                            {numberFormat(cart.reduce((total, product) => {
                                                                return product.is_sale ? (total + product.sale_price * product.qty) : (total + product.price * product.qty)
                                                            }, 0))}
                                                          $
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <div>Discount :
                                                            <span className="text-danger ms-1">{coupon.percent}%</span>
                                                        </div>
                                                        <div className="text-danger">
                                                            {numberFormat(cart.reduce((total, product) => {
                                                                return product.is_sale ? (total + product.sale_price * product.qty) : (total + product.price * product.qty)
                                                            }, 0) * (coupon.percent / 100))}
                                                            $
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <div> Price paid:</div>
                                                        <div>
                                                            {numberFormat((cart.reduce((total, product) => {
                                                                return product.is_sale ? (total + product.sale_price * product.qty) : (total + product.price * product.qty)
                                                            }, 0)) - (cart.reduce((total, product) => {
                                                                return product.is_sale ? (total + product.sale_price * product.qty) : (total + product.price * product.qty)
                                                            }, 0) * (coupon.percent / 100)))}
                                                            $
                                                        </div>
                                                    </li>
                                                </ul>
                                                <Payment cart={cart} coupon={coupon} addressId={addressId} />
                                             
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="cart-empty">
                    <div className="text-center">
                        <div>
                            <i className="bi bi-basket-fill" style={{ fontSize: '80px' }}></i>
                        </div>
                        <h4 className="text-bold ">    Your shopping cart is empty</h4>
                        <Link href="/menu">
                            <a className="btn btn-outline-dark mb-5 mt-3">View products </a>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default CartPage;