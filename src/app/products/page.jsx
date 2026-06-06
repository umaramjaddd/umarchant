"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllProducts from "@/components/AllProducts";

import {
  fetchCategories,
  fetchSubCategories,
  fetchProducts
} from "@/Redux/Slices/productsSlice";

export default function Products() {
  const dispatch = useDispatch();

  const { categories, products } = useSelector((state) => state.products);

  useEffect(() => {
    // 🔐 fetch ONLY if not already fetched
    if (categories.length === 0) {
      console.log("getting categories & subcategories");
      dispatch(fetchCategories());
      dispatch(fetchSubCategories());
    }

    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, categories.length, products.length]);

  return (
    

    <div className="flex flex-col px-3 gap-8 max-w-7xl w-full self-center bg-white">
           
            <AllProducts title="Full Archive" showAll="yes" />
            </div>
           

   
  );
}
