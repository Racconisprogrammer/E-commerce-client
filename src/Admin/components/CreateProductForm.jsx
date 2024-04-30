import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createProduct} from "../../State/Product/Action";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {getCategory} from "../../State/Category/Action";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



const CreateProductForm = () => {

    const {category} = useSelector(store=>store)

    useEffect(() => {
        dispatch(getCategory())
    }, []);

    const [productData, setProductData] = useState({
        file1:[],
        file2:[],
        file3:[],
        file4:[],
        file5:[],
        brand:"",
        title:"",
        color:"",
        discountedPrice:"",
        highlights:"",
        price:"",
        discountedPercent:"",
        quantity:"",
        topLevelCategory:"",
        secondLevelCategory:"",
        thirdLevelCategory:"",
        description:"",
        details:"",
    });

    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")



    const handleChange = (e) => {
        console.log("change ", e)
        const {name, value} = e.target;
        setProductData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Prooooo ", productData)
        dispatch(createProduct(productData))

    }

    return (
        <div className='p-10'>


            <Typography
                variant='h3'
                sx={{textAlign: "center"}}
                className="py-10 text-center"
            >
                Add new product
            </Typography>
            <form
                onSubmit={handleSubmit}
                className="createProductContainer min-h-screen"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            id="file1"
                            multiple
                            type="file"
                            onChange={(e) => handleChange({target: {name: "file1", value: e.target.files[0]}})}
                        />
                        <label htmlFor="file1">
                            <Button component="span">
                                Upload File 1
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            id="file2"
                            multiple
                            type="file"
                            onChange={(e) => handleChange({target: {name: "file2", value: e.target.files[0]}})}
                        />
                        <label htmlFor="file2">
                            <Button component="span">
                                Upload File 2
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            id="file3"
                            multiple
                            type="file"
                            onChange={(e) => handleChange({target: {name: "file3", value: e.target.files[0]}})}
                        />
                        <label htmlFor="file3">
                            <Button component="span">
                                Upload File 3
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            id="file4"
                            multiple
                            type="file"
                            onChange={(e) => handleChange({target: {name: "file4", value: e.target.files[0]}})}
                        />
                        <label htmlFor="file4">
                            <Button component="span">
                                Upload File 4
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            id="file5"
                            multiple
                            type="file"
                            onChange={(e) => handleChange({target: {name: "file5", value: e.target.files[0]}})}
                        />
                        <label htmlFor="file5">
                            <Button component="span">
                                Upload File 3
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Brand"
                            name="brand"
                            value={productData.brand}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={productData.title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Color"
                            name="color"
                            value={productData.color}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            value={productData.quantity}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Discounted Price"
                            name="discountedPrice"
                            value={productData.discountedPrice}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Discount Percentage"
                            name="discountedPercent"
                            value={productData.discountedPercent}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Top Level Category</InputLabel>
                            <Select
                                name="topLevelCategory"
                                value={productData.topLevelCategory}
                                onChange={handleChange}
                                label="Top Level Category">
                                {category.category?.map((item) =>
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Second Level Category</InputLabel>
                            <Select
                                name="secondLevelCategory"
                                value={productData.secondLevelCategory}
                                onChange={handleChange}
                                label="Second Level Category">
                                {category.category
                                    ?.find((item) => item.name === productData.topLevelCategory)
                                    ?.subcategories?.map((item) => (
                                        <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Third Level Category</InputLabel>
                            <Select
                                name="thirdLevelCategory"
                                value={productData.thirdLevelCategory}
                                onChange={handleChange}
                                label="Third Level Category">
                                {category.category
                                    ?.find((item) => item.name === productData.topLevelCategory)
                                    ?.subcategories?.find((item) => item.name === productData.secondLevelCategory)
                                    ?.subcategories?.map((item) => (
                                        <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            name="description"
                            rows={3}
                            value={productData.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <label htmlFor="details">Details</label>
                        <CKEditor
                            editor={ClassicEditor}
                            name="details"
                            id="details"
                            data={`<div>${productData.details}</div>`}
                            onReady={editor => {
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                handleChange({
                                    target: {
                                        name: "details",
                                        value: data,
                                    },
                                });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <label htmlFor="highlights">Highlights</label>
                        <CKEditor
                            editor={ClassicEditor}
                            name="highlights"
                            id="highlights"
                            data={`<div>${productData.highlights}</div>`}
                            onReady={editor => {
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                handleChange({
                                    target: {
                                        name: "highlights",
                                        value: data,
                                    },
                                });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{p: 1.8}}
                            className="py-20"
                            size="large"
                            type="submit">

                            Add new product
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </div>
    );
};

export default CreateProductForm