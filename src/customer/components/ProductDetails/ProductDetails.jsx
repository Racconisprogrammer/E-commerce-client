import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress, Rating} from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { mens_kurta } from "../../../Data/Men/men_kurta";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const {products} = useSelector(store=>store)
  let totalRating = 0;
  let totalReviews = 0;
  let countRating = 0;
  let averageRating = 0;
  let resultFloat = 1;
  const ratings = products.products?.ratings;
  const reviews = products.products?.reviews;

  const [selectedSize, setSelectedSize] = useState();
  
  if (ratings && Array.isArray(ratings) && ratings.length > 0) {
    ratings.forEach((item) => {
      totalRating += item.rating;

      countRating += 1;
    });


    reviews.forEach((item)=>{
      totalReviews += 1;
    });


    averageRating = totalRating / ratings.length;
    if (parseFloat('0.' + String(averageRating).split('.')[1]) === 0.5) {
      resultFloat = parseFloat('0.' + String(averageRating).split('.')[1]);
    }
  }
  

  const handleAddToCart = ()=>{
    const data = {productId:params.productId, size:selectedSize.name}
      dispatch(addItemToCart(data))
      console.log("Product ")
        navigate("/cart")
  }
  

  useEffect(()=> {
    const data = {productId:params.productId}
    dispatch(findProductsById(data))
  },[params.productId])

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {products.products?.breadcrumbs && products.products?.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={products.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {products.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={products.products?.imageUrl}
                alt=''
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
            {products.products?.images && products.products?.images?.map((item) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
              {products.products?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
              {products.products?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                {products.products?.discountPrice !== null ?  
                <p className="font-semibold">{products.products?.discountPrice}</p> 
                :
               <p className="opacity-50 line-through">{products.products?.price}</p>
                }
                {products.products?.discountPrice !== null ?  
                <p className="opacity-50 line-through">{products.products?.price}</p> :

                <p className="opacity-50 line-through">{products.products?.discountPrice} </p> 
                }
                <p className="text-green-600 font-semibold">{products.products?.discountPercent}% Off </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                    <Rating name="read-only" value={averageRating} precision={resultFloat} readOnly />
                    <p className="opacity-50 text-sm">{countRating} Ratings</p>
                    <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{totalReviews} Reviews</p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}


                {/* Sizes */}
                <div className="mt-10 mb-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-8">
                    {products.products.sizes && products.products.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-not-allowed bg-gray-50 text-gray-200" :  "cursor-pointer bg-white text-gray-900 shadow-sm",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {!size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Button onClick={handleAddToCart} variant="contained" sx={{px:"2rem", py:"1rem", bgcolor:"#9155fd"}}>
                    Add to cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {products.products?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {products.products?.highlights && products.products?.highlights.map((highlight) => (
                      <li key={highlight.name} className="text-gray-400">
                        <span className="text-gray-600">{highlight.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{products.products?.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

    {/* rating and reviews */}
        <section>
            <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>

            <div className="border p-5">
                <Grid container spacing={7}>
                    <Grid item xs={7}>
                        <div className="space-y-5">
                            {[1,1,1].map((item, index)=><ProductReviewCard key={index}/>)}    

                        </div>

                    </Grid>

                    <Grid item xs={5}>
                        <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
                        <div className="flex items-center space-x-3">
                        <Rating value={averageRating} name='half-rating' readOnly precision={resultFloat} />
                            <p className="opacity-60">{countRating} Ratings</p>
                        </div>
                        <Box className="mt-5">
                            <Grid container alignItems="center">
                                <Grid item xs={2}>
                                    <p>Excellent</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <LinearProgress sx={{bgcolor:"#d0d0d0", borderRadius:4, height:7}} variant="determinate" value={60} color="success" />

                                </Grid>
                            </Grid>
                        </Box>
                        <Box className="mt-5 space-y-3">
                            <Grid container alignItems="center">
                                <Grid item xs={2}>
                                    <p>Very Good</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <LinearProgress sx={{bgcolor:"#d0d0d0", borderRadius:4,
                                     height:7}} variant="determinate" value={30} color="success" />

                                </Grid>
                            </Grid>
                        </Box>
                        <Box className="mt-5 space-y-3">
                            <Grid container alignItems="center">
                                <Grid item xs={2}>
                                    <p>Good</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <LinearProgress sx={{bgcolor:"#d0d0d0", borderRadius:4, height:7}}
                                     variant="determinate" value={25} color="inherit" />

                                </Grid>
                            </Grid>
                        </Box>
                        <Box className="mt-5">
                            <Grid container alignItems="center">
                                <Grid item xs={2}>
                                    <p>Avarage</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <LinearProgress sx={{bgcolor:"#d0d0d0", borderRadius:4, height:7}}
                                     variant="determinate" value={20} color="warning" />

                                </Grid>
                            </Grid>
                        </Box>
                        <Box className="mt-5">
                            <Grid container alignItems="center">
                                <Grid item xs={2}>
                                    <p>Poor</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <LinearProgress sx={{bgcolor:"#d0d0d0", borderRadius:4, height:7}}
                                     variant="determinate" value={10} color="error" />

                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                </Grid>

            </div>
        </section>


        {/* Similar products */}
        <section className="pt-10">

            <h1 className="py-5 text-xl font-bold">Similar products</h1>

            <div className="flex flex-wrap space-y-5">
                {mens_kurta.map((item, index)=><HomeSectionCard product={item} key={index} />)}

            </div>

        </section>
        
      </div>
    </div>
  );
}
