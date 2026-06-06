"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { addProduct, deleteProduct } from "@/api/adminAPI";
import { fetchProducts } from "../../Redux/Slices/productsSlice";

export default function ProductTab() {
  const dispatch = useDispatch();

  // Pulling relevant architectural definitions from Redux state management
  const { subCategories } = useSelector((state) => state.admin);
  const { products, loading } = useSelector((state) => state.products);

  const [hasMounted, setHasMounted] = useState(false);
  const [status, setStatus] = useState(null);

  // Updated Form values referencing sub_category_id
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    material: "",
    sub_category_id: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [otherImageFiles, setOtherImageFiles] = useState([]);

  useEffect(() => {
    setHasMounted(true);
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products?.length]);

  const handleOtherImagesChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setOtherImageFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeQueuedFile = (indexToRemove) => {
    setOtherImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const getSubCategoryLabel = (subId) => {
    if (!subCategories || subCategories.length === 0) return "---";
    const sub = subCategories.find((s) => s.id === Number(subId));
    return sub ? sub.name : "Unassigned Specialty";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.sub_category_id) {
      return alert("Please ensure all parameters and subcategory scopes are mapped.");
    }

    setStatus("loading");
    try {
      await addProduct(formData, thumbnailFile, otherImageFiles);
      setStatus("success");

      // Reset Form State Parameters
      setFormData({ name: "", description: "", price: "", material: "", sub_category_id: "" });
      setThumbnailFile(null);
      setOtherImageFiles([]);

      dispatch(fetchProducts());
    } catch (error) {
      console.error("Asset Processing Engine Error:", error);
      setStatus("error");
      alert("Failed creating database product log registry entry.");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from archives?`)) return;

    try {
      await deleteProduct(id);
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Data Deletion Engine Failure:", error);
      alert("Relational file system removal block occurred.");
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="w-full text-white bg-zinc-950 p-4 space-y-12 animate-in fade-in duration-500">
      
      {/* --- ROW 1: TOP PANEL CREATION WORKBENCH --- */}
      <div className="w-full bg-zinc-900/40 p-8 border border-white/5 backdrop-blur-sm shadow-2xl space-y-6">
        <div className="flex items-center gap-3 text-amber-500 border-b border-zinc-800/60 pb-4">
          <Icon icon="ri:hammer-line" className="text-2xl" />
          <h2 className="font-serif text-xl uppercase tracking-widest text-white">
            Armoury Forge <span className="text-zinc-500 font-sans text-sm tracking-normal font-light">| New Item Matrix</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Primary Metadata Fields Grid layout split */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Piece Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Damascus Scimitar"
                className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white text-sm focus:border-amber-600 outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Acquisition Value (PKR)</label>
              <input
                type="number"
                required
                placeholder="Value structural quote"
                className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white text-sm focus:border-amber-600 outline-none transition-all"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Material Composition</label>
              <input
                type="text"
                placeholder="e.g. High Carbon Spring Steel"
                className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white text-sm focus:border-amber-600 outline-none transition-all"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Relational drop down selector target tracking sub_category_id */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Specialized Sub-Collection Scope</label>
              <div className="relative">
                <select
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white text-sm focus:border-amber-600 outline-none appearance-none cursor-pointer"
                  value={formData.sub_category_id}
                  onChange={(e) => setFormData({ ...formData, sub_category_id: e.target.value })}
                >
                  <option value="">Select Sub-Category Line...</option>
                  {subCategories?.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name.toUpperCase()}
                    </option>
                  ))}
                </select>
                <Icon icon="ri:arrow-down-s-line" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
              </div>
            </div>

            {/* Description spans double column weight inside grid alignment row space */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Historical / Design Context Narrative</label>
              <input
                type="text"
                placeholder="Enter item description records..."
                className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white text-sm focus:border-amber-600 outline-none transition-all"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          {/* Asset uploads section block wrappers split across screen view */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 border border-dashed border-zinc-800 bg-zinc-950/50 rounded">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold mb-2">Showcase Primary Thumbnail Asset</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                className="text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
              />
              {thumbnailFile && (
                <p className="text-[11px] text-emerald-500 mt-3 flex items-center gap-1">
                  <Icon icon="ri:checkbox-circle-line" /> Primary Stack Linked: {thumbnailFile.name}
                </p>
              )}
            </div>

            <div className="p-5 border border-dashed border-zinc-800 bg-zinc-950/50 rounded">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold mb-1">Auxiliary Vault Image Arrays</label>
              <span className="block text-[11px] text-zinc-500 mb-3">Attach multiple supplemental profile dynamic captures.</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleOtherImagesChange}
                className="text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
              />

              {otherImageFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-1">
                  {otherImageFiles.map((file, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] bg-zinc-900 p-2 border border-white/5 rounded">
                      <span className="truncate pr-2 text-zinc-400">{file.name}</span>
                      <button type="button" onClick={() => removeQueuedFile(idx)} className="text-red-400 hover:text-red-500 flex-shrink-0">
                        <Icon icon="ri:close-circle-line" width="16" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Trigger Button Submit Layout interface */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full md:w-64 bg-amber-700 hover:bg-amber-600 py-4 text-[10px] uppercase font-bold tracking-[0.3em] text-white transition-all flex items-center justify-center gap-2 disabled:bg-zinc-800 disabled:text-zinc-500 shadow-lg"
            >
              {status === "loading" ? <Icon icon="ri:loader-4-line" className="animate-spin" /> : <Icon icon="ri:shield-flash-line" />}
              Commit item to Armoury
            </button>
          </div>
        </form>
      </div>

      {/* --- ROW 2: BOTTOM PANEL ACTIVE CATALOG REGISTERED RECORDS --- */}
      <div className="w-full border border-white/5 bg-zinc-900/10 backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="p-6 bg-zinc-950/60 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="ri:archive-line" className="text-zinc-500 text-lg" />
            <h3 className="font-serif text-md text-zinc-300 uppercase tracking-widest">Active Manifest Inventory</h3>
          </div>
          <span className="text-[10px] tracking-widest bg-zinc-900 text-zinc-400 px-3 py-1 border border-zinc-800 rounded-full font-mono">
            {products ? products.length : 0} Total Units Entered
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/40 border-b border-zinc-800/40">
                <th className="p-4 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Weapon Profile Asset</th>
                <th className="p-4 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Sub-Category Line</th>
                <th className="p-4 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Material Blueprint</th>
                <th className="p-4 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Value Metric</th>
                <th className="p-4 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold text-center">Gallery Stack</th>
                <th className="p-4 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold text-right">Registry Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {products?.map((prod) => (
                <tr key={prod.id} className="hover:bg-white/[0.01] transition-colors group">
                  
                  {/* Avatar Visual Thumbnail Container cell */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-12 h-14 bg-zinc-950 border border-zinc-800 overflow-hidden flex-shrink-0 rounded shadow-md">
                      {prod.thumbnail ? (
                        <img src={prod.thumbnail} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] text-zinc-700">N/A</div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-100">{prod.name}</div>
                      <div className="text-[9px] text-zinc-600 font-mono tracking-tight mt-0.5">DB_ID: #{prod.id}</div>
                    </div>
                  </td>

                  {/* Category Map Field Display Cell */}
                  <td className="p-4">
                    <span className="inline-block text-[10px] uppercase tracking-wider px-2.5 py-1 bg-zinc-950 border border-zinc-800/80 text-amber-600/90 rounded">
                      {getSubCategoryLabel(prod.sub_category_id)}
                    </span>
                  </td>

                  <td className="p-4 text-sm text-zinc-400 font-light max-w-xs truncate">
                    {prod.material || <span className="text-zinc-700 italic">No Specs Set</span>}
                  </td>
                  
                  <td className="p-4 text-sm font-mono text-zinc-300">PKR {prod.price}</td>

                  {/* Multi File Array Entry Matrix Column Metric Preview */}
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] tracking-wide px-2 py-1 bg-zinc-950/80 border border-zinc-800/60 text-zinc-500 rounded">
                      <Icon icon="ri:stack-line" className="text-zinc-600" />
                      {prod.images ? prod.images.length : 0} Images Archived
                    </span>
                  </td>

                  {/* Primary Trigger Override Row Manipulation Button Actions */}
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(prod.id, prod.name)}
                      className="text-zinc-600 hover:text-red-500 transition-colors md:opacity-30 group-hover:opacity-100"
                    >
                      <Icon icon="ri:delete-bin-7-line" width="18" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products?.length === 0 && (
          <div className="p-12 text-center text-xs tracking-widest text-zinc-600 uppercase border-t border-zinc-900">
            No items registered inside this collection registry manifest.
          </div>
        )}
      </div>
    </div>
  );
}