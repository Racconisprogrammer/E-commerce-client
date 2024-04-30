import {
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_FAILURE,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE, FIND_ALL_PRODUCTS_REQUEST, FIND_ALL_PRODUCTS_SUCCESS, FIND_ALL_PRODUCTS_FAILURE,

} from "./ActionType";
import {api, API_BASE_URL} from "../../config/apiConfig";

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST });

    const {
        colors,
        minPrice,
        maxPrice,
        minDiscount,
        category,
        stock,
        sort,
        pageNumber,
        pageSize,
    } = reqData;

    try {
        const { data } = await api.get(
            `${API_BASE_URL}/api/products?color=${colors}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
        );
        
        console.log("product data ", data)
        dispatch({type:FIND_PRODUCTS_SUCCESS, payload:data})

    } catch (error) { 
        dispatch({type:FIND_PRODUCTS_FAILURE, payload:error.message})
    }
};

export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    const {productId} = reqData;

    try {
        const  {data}  = await api.get(`${API_BASE_URL}/api/products/id/${productId}`);

        dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS, payload:data})

    } catch (error) { 
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE, payload:error.message})
    }
};

export const findAllProducts = (name) => async (dispatch) => {
    dispatch({ type: FIND_ALL_PRODUCTS_REQUEST });

    try {
        const  {data}  = await api.get(`${API_BASE_URL}/api/products/all?categoryName=${name}`);

        dispatch({type:FIND_ALL_PRODUCTS_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:FIND_ALL_PRODUCTS_FAILURE, payload:error.message})
    }
};

export const createRatingsAndReviews = (product) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST });

        const ratingsData = {
            rating: product.stars,
            productId: product.productId,
        };

        const reviewsData = {
            review: product.description,
            productId: product.productId,
        };

        const ratingsResponse = await api.post(`${API_BASE_URL}/api/ratings/`, ratingsData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const reviewsResponse = await api.post(`${API_BASE_URL}/api/reviews/`, reviewsData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: reviewsResponse.data,
        });
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    }
};

export const createProduct = (product) => async (dispatch)=> {
    try {
        dispatch({type:CREATE_PRODUCT_REQUEST})


        const formData = new FormData();
        formData.append('file1', product.file1);
        formData.append('file2', product.file2);
        formData.append('file3', product.file3);
        formData.append('file4', product.file4);
        formData.append('file5', product.file5);
        formData.append('brand', product.brand);
        formData.append('title', product.title);
        formData.append('details', product.details);
        formData.append('color', product.color);
        formData.append('discountedPrice', product.discountedPrice);
        formData.append('price', product.price);
        formData.append('discountedPercent', product.discountedPercent);
        formData.append('quantity', product.quantity);
        formData.append('topLevelCategory', product.topLevelCategory);
        formData.append('secondLevelCategory', product.secondLevelCategory);
        formData.append('thirdLevelCategory', product.thirdLevelCategory);
        formData.append('description', product.description);
        formData.append('highlights', product.highlights);


        const {data} = await api.post(`${API_BASE_URL}/api/admin/products/`, formData, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        });


        dispatch({
            type:CREATE_PRODUCT_SUCCESS,
            payload:data,
        });
    } catch (error) {
        dispatch({type:CREATE_PRODUCT_FAILURE, payload:error.message});
    }
}

export const deleteProduct = (productid) => async (dispatch)=> {
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST})

        const {data} = await api.delete(`${API_BASE_URL}/api/admin/products/${productid}/delete`)
        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:productid,
        })
    } catch (error) {
        dispatch({type:DELETE_PRODUCT_FAILURE, payload:error.message})
    }
}
