import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlide from '../Categoryslid/CategorySlide';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { cartContext } from '../../Context/Cart/Cart';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/Wish/Wish';


function Home() {
  const {AddProductToWish}=useContext(WishContext)
  async function getAllProuduct() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  const {AddProductToCart}=useContext(cartContext)
  async function addProduct(id) {
    const res = await AddProductToCart(id)
    if(res.status==="success"){
        toast.success(res.message,{duration:2000})
    }else
    {
        toast.error(res.message,{duration:2000})
    }
}
  let { data, isLoading } = useQuery("allProduct", getAllProuduct)
  if (isLoading === true) {
    return <>
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    </>
  }
  return (
    <>
      <div className='container pt-5'>
        <HomeSlider />
        <CategorySlide />
        <div className="row g-3">
          {
            data?.data.data.map((product, idx) => <div key={idx} className="col-md-2 ">
              <Link to={"/details" + "/" + product._id} className="inner">
                <img src={product.imageCover} className='w-100' alt="" />
                <h6 className='text-success my-2'>{product.category.name}</h6>
                <h6>{product.title.split(" ").slice(0, 2).join("")}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <p>{product.price}EGP</p>
                  <p><span><i className='fa-solid fa-star text-warning'></i></span>{product.ratingsAverage}</p>
                </div>
              </Link>
              <div className='d-flex w-100 justify-content-end'>
                <span><i onClick={()=>{AddProductToWish(product._id)}} className='fa-solid fa-heart text-black'></i></span>
                </div>
              <button onClick={()=>{addProduct(product._id)}} className='btn btn-success w-100'>+ADD TO CART</button>
            </div>)
          }
        </div>
      </div>
    </>
  )
}

export default Home;
