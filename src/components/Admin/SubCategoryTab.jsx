"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import { Icon } from "@iconify/react";
import { addSubCategory, updateSubCategory, deleteSubCategory } from "@/api/adminAPI";
import { fetchSubCategories } from "../../Redux/Slices/adminSlice"; // Ensure path is correct

export default function SubCategoryTab() {
  const dispatch = useDispatch();
  
  // 1. Grab data directly from the Store to prevent "Loading..." infinite loops
  const { categories, subCategories, loading } = useSelector((state) => state.admin);

  const [hasMounted, setHasMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({ name: "", category_id: "" });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setHasMounted(true);
    // Auto-fetch subcategories if they aren't there
    if (subCategories.length === 0) {
        dispatch(fetchSubCategories());
    }
  }, [dispatch, subCategories.length]);

  const getCategoryName = (id) => {
    // If store is empty, show nothing instead of "Loading"
    if (!categories || categories.length === 0) return "---";
    const category = categories.find((cat) => cat.id === Number(id));
    return category ? category.name : "Unassigned";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (isEditing) {
        await updateSubCategory(isEditing, formData);
      } else {
        await addSubCategory(formData);
      }
      setStatus("success");
      setFormData({ name: "", category_id: "" });
      setIsEditing(null);
      dispatch(fetchSubCategories()); // Refresh store instead of window reload
    } catch (error) {
      console.error("Forge Error:", error);
      setStatus("error");
    }
  };

  const handleEdit = (sub) => {
    setIsEditing(sub.id);
    setFormData({ name: sub.name, category_id: sub.category_id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-700">
      
      {/* --- SIDEBAR FORM --- */}
      <div className="w-full lg:w-1/3 bg-zinc-900/40 p-6 border border-white/5 backdrop-blur-sm sticky top-24 h-fit shadow-2xl">
        <div className="flex items-center gap-3 mb-6 text-amber-500">
          <Icon icon={isEditing ? "ri:edit-circle-line" : "ri:hammer-line"} className="text-2xl" />
          <h2 className="font-serif text-xl text-white uppercase tracking-widest">
            {isEditing ? "Modify Record" : "New Entry"}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Speciality Title</label>
            <input
              type="text"
              required
              className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white text-sm focus:border-amber-600 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Parent Collection</label>
            <div className="relative">
              <select
                required
                className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white text-sm focus:border-amber-600 outline-none appearance-none cursor-pointer"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">Select Collection...</option>
                {/* Mapping directly from Store categories */}
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name.toUpperCase()}
                  </option>
                ))}
              </select>
              <Icon icon="ri:arrow-down-s-line" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-700 py-4 text-[10px] uppercase font-bold tracking-[0.3em] text-white hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
          >
            {status === "loading" ? <Icon icon="ri:loader-4-line" className="animate-spin" /> : <Icon icon="ri:shield-flash-line" />}
            {isEditing ? "Update Masterwork" : "Commit to Forge"}
          </button>
        </form>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="flex-1 border border-white/5 bg-zinc-900/10 backdrop-blur-md shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/80">
              <th className="p-5 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">SubCategory</th>
              <th className="p-5 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Parent Collection</th>
              <th className="p-5 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {subCategories?.map((sub) => (
              <tr key={sub.id} className="hover:bg-white/[0.03] transition-colors group">
                <td className="p-5 text-sm text-zinc-200">{sub.name}</td>
                <td className="p-5">
                  <span className="inline-block text-[9px] uppercase tracking-[0.2em] px-3 py-1 bg-zinc-800 text-amber-500 border border-amber-600/20 rounded-full">
                    {getCategoryName(sub.category_id)}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-5 opacity-30 group-hover:opacity-100 transition-all">
                    <button onClick={() => handleEdit(sub)} className="text-zinc-400 hover:text-amber-500">
                      <Icon icon="ri:edit-2-line" width="20" />
                    </button>
         
<button 
  onClick={() => {
    if (window.confirm(`Are you sure you want to delete "${sub.name}"?`)) {
      deleteSubCategory(sub.id).then(() => dispatch(fetchSubCategories()));
    }
  }} 
  className="text-zinc-400 hover:text-red-500"
>
  <Icon icon="ri:delete-bin-line" width="20" />
</button>
                    {/* <button onClick={() => deleteSubCategory(sub.id).then(() => dispatch(fetchSubCategories()))} className="text-zinc-400 hover:text-red-500">
                      <Icon icon="ri:delete-bin-line" width="20" />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}