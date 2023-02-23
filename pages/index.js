
import Features from "../components/Features";
import ProductsTab from "../components/product/ProductsTab";
import About from "../components/About";
import Contact from "../components/Contact";
import axios from "axios";
import { handleError } from "../lib/helper";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Home = ({ productsTab, error }) => {
  useEffect(() => {
    error && toast.error(error)
  }, [error])


  return (
    <>
    <Features />
    {productsTab && <ProductsTab tabs={productsTab} />}
    <About />
    <Contact/>
   
    </>
  )
}

export default Home;

export async function getServerSideProps() {
  try {
    const res = await axios.get("products/products-tabs")
    // console.log(res.data.data);
    return {
      props: {
        productsTab: res.data.data 
      }
    }
  } catch (err) {
    return {
      props: {
        error: handleError(err)
      }
    }
  }
}
