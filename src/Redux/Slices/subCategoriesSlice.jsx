import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCategoriesAPI } from "../../api/Api";
import { fetchSubCategoriesAPI } from "../../api/Api";
import { fetchProductsAPI } from "../../api/Api";

// Async thunks

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  console.log("loadingggg");
  
  const data = await fetchCategoriesAPI();
  console.log("loaded data",data);
  
  return data;
});

export const fetchSubCategories = createAsyncThunk('products/fetchSubCategories', async () => {
  const data = await fetchSubCategoriesAPI();
  return data;
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const data = await fetchProductsAPI();
  return data;
});

const initialState = {
  categories: [],
  subCategories: [],
  products: [],
  loading: false,
  error: null,
};


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(fetchCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
      .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // SubCategories
      .addCase(fetchSubCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchSubCategories.fulfilled, (state, action) => { state.loading = false; state.subCategories = action.payload; })
      .addCase(fetchSubCategories.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // Products
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export default productSlice.reducer;
