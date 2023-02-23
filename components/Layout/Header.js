import heroImage from "../../public/images/hero-bg.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const state = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    setCart(state.cart);
  }, [state]);

  return (
    
    <div className={router.pathname === "/" ? "" : "sub_page"}>
      <div className="hero_area">
        <div className="bg-box">
          <Image
            src={heroImage}
            placeholder="blur"
            layout="fill"
            alt="hero-image"
          />
        </div>

        <header className="header_section">
          <div className="container">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <Link href="/">
                <a className="navbar-brand">
                  <span>McDonald's</span>
                </a>
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mx-auto">
                  <li
                    className={
                      router.pathname === "/" ? "nav-item active" : "nav-item"
                    }
                  >
                    <Link href="/">
                      <a className="nav-link"> Home</a>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/menu"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link href="/menu">
                      <a className="nav-link"> Menu</a>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/about"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link href="/about">
                      <a className="nav-link"> About</a>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/contact"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link href="/contact">
                      <a className="nav-link"> Contact</a>
                    </Link>
                  </li>
                </ul>
                <div className="user_option">
                  <a href="" className="user_link">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </a>
                  <Link href="/cart">
                    <a
                      href=""
                      className="user_link cart_link position-relative"
                    >
                      <i
                        className="bi bi-cart3 "
                        style={{ fontSize: 20 }}
                        aria-hidden="true"
                      ></i>
                      <span className="position-absolute top-0 translate-middle badge rounded-pill">
                        {cart.length}
                      </span>
                    </a>
                  </Link>

                  <form className="form-inline">
                    <button
                      className="btn  my-2 my-sm-0 nav_search-btn"
                      type="submit"
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </form>
                  {user ? (
                    <Link href="/profile">
                      <a className="btn-auth order_online">Profile</a>
                    </Link>
                  ) : (
                    <Link href="/auth/login">
                      <a className="btn-auth order_online">Login</a>
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </header>

        {router.pathname === "/" && (
          <section className="slider_section">
            <div
              id="customCarousel1"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7 col-lg-6">
                        <div className="detail-box">
                          <h1>Fast Food Restaurant</h1>
                          <p>
                            Doloremque, itaque aperiam facilis rerum, commodi,
                            temporibus sapiente ad mollitia laborum quam
                            quisquam esse error unde. Tempora ex doloremque,
                            labore, sunt repellat dolore, iste magni quos nihil
                            ducimus libero ipsam.
                          </p>
                          <div className="btn-box">
                            <a href="" className="btn1">
                              Order Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7 col-lg-6">
                        <div className="detail-box">
                          <h1>Fast Food Restaurant</h1>
                          <p>
                            Doloremque, itaque aperiam facilis rerum, commodi,
                            temporibus sapiente ad mollitia laborum quam
                            quisquam esse error unde. Tempora ex doloremque,
                            labore, sunt repellat dolore, iste magni quos nihil
                            ducimus libero ipsam.
                          </p>
                          <div className="btn-box">
                            <a href="" className="btn1">
                              Order Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7 col-lg-6">
                        <div className="detail-box">
                          <h1>Fast Food Restaurant</h1>
                          <p>
                            Doloremque, itaque aperiam facilis rerum, commodi,
                            temporibus sapiente ad mollitia laborum quam
                            quisquam esse error unde. Tempora ex doloremque,
                            labore, sunt repellat dolore, iste magni quos nihil
                            ducimus libero ipsam.
                          </p>
                          <div className="btn-box">
                            <a href="" className="btn1">
                              Order Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <ol className="carousel-indicators">
                  <li
                    data-bs-target="#customCarousel1"
                    data-bs-slide-to="0"
                    className="active"
                  ></li>
                  <li
                    data-bs-target="#customCarousel1"
                    data-bs-slide-to="1"
                  ></li>
                  <li
                    data-bs-target="#customCarousel1"
                    data-bs-slide-to="2"
                  ></li>
                </ol>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Header;
