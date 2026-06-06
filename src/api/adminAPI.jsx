import { supabase } from "@/Helpers/Supabase";



// Helpers to extract files paths safely for deletion
const getStoragePathFromUrl = (publicUrl) => {
  try {
    const url = new URL(publicUrl);
    const pathParts = url.pathname.split("/").slice(3); // Drops /storage/v1/object/
    return pathParts.join("/");
  } catch (err) {
    console.error("Invalid URL parser error:", err);
    return null;
  }
};


// Categories
export const getCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");
  console.log("getCategories:", { data, error });
  if (error) throw error;
  return data;
};

// Add or update category with image upload


export const addCategory = async (category, file) => {
  let imageUrl = null;

  if (file) {
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

    // Upload file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("categories")
      .upload(`images/${fileName}`, file, { upsert: true });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicData } = supabase.storage
      .from("categories")
      .getPublicUrl(`images/${fileName}`);

    imageUrl = publicData.publicUrl; // this is the URL to save in your table
  }

  // Insert category with name, description, and image
  const { data, error } = await supabase
    .from("categories")
    .insert([{ ...category, image: imageUrl }])
    .select(); // select returns the inserted row(s)

  if (error) throw error;
  return data;
};




// Update Category


export const updateCategory = async (id, updates, file) => {
  let imageUrl = updates.image; // Starts with the existing image URL

  // ONLY try to upload if a new file actually exists
  if (file && file instanceof File) {
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const filePath = `images/${fileName}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("categories")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("categories")
      .getPublicUrl(filePath);
      
    imageUrl = publicData.publicUrl;
  }

  // We remove the image from the 'updates' object before spreading 
  // so we don't accidentally overwrite it with an old/empty value.
  const { image, ...restOfUpdates } = updates;

  const { data, error } = await supabase
    .from("categories")
    .update({ 
      ...restOfUpdates, 
      image: imageUrl // This will be the NEW url if file exists, or the OLD url if not
    })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};
// Delete category
export const deleteCategory = async (id) => {
  // 1. Get the category first to know its image path
  const { data: catData, error: fetchError } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();
  if (fetchError) throw fetchError;

  // 2. Delete image from storage if exists
  if (catData.image) {
    // Extract the file path from the public URL
    // Example: https://PROJECT.supabase.co/storage/v1/object/public/categories/images/123.png
    const url = new URL(catData.image);
    // supabase storage path comes after '/object/' in the URL
    const pathParts = url.pathname.split("/").slice(3); 
    const filePath = pathParts.join("/"); 

    const { error: delError } = await supabase.storage
      .from("categories")
      .remove([filePath]);
    if (delError) console.error("Failed to delete image from storage:", delError);
  }

  // 3. Delete category from database
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
};


// Subcategories
export const getSubCategories = async () => {
  const { data, error } = await supabase.from('sub_categories').select('*');
  if (error) throw error;
  return data;
};

export const addSubCategory = async (subCategory) => {
  const { data, error } = await supabase.from('sub_categories').insert([subCategory]);
  if (error) throw error;
  return data;
};

export const updateSubCategory = async (id, updates) => {
  const { data, error } = await supabase.from('sub_categories').update(updates).eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteSubCategory = async (id) => {
  const { data, error } = await supabase.from('sub_categories').delete().eq('id', id);
  if (error) throw error;
  return data;
};

// Products
export const getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
};



// --- PRODUCTS API ---
export const addProduct = async (product, thumbnailFile, otherImageFiles) => {
  console.log("🚀 [addProduct] Starting execution flow...");
  console.log("📦 Incoming Product Data fields:", product);
  console.log("📷 Thumbnail file present:", !!thumbnailFile);
  console.log("📚 Secondary files count queued:", otherImageFiles?.length || 0);

  let thumbnailUrl = null;
  let otherImagesUrls = [];

  // 1. Upload Main Showcase Thumbnail
  if (thumbnailFile) {
    const thumbName = `${Date.now()}_thumb_${thumbnailFile.name.replace(/\s+/g, "_")}`;
    console.log(`📤 Uploading thumbnail to storage as: images/${thumbName}`);
    
    const { data: thumbData, error: thumbUploadError } = await supabase.storage
      .from("products")
      .upload(`images/${thumbName}`, thumbnailFile, { upsert: true });

    if (thumbUploadError) {
      console.error("❌ Storage Thumbnail Upload Fault:", thumbUploadError);
      throw thumbUploadError;
    }
    console.log("✅ Thumbnail uploaded successfully:", thumbData);

    const { data: publicThumbData } = supabase.storage
      .from("products")
      .getPublicUrl(`images/${thumbName}`);

    thumbnailUrl = publicThumbData.publicUrl;
    console.log("🔗 Generated Public Thumbnail URL:", thumbnailUrl);
  }

  // 2. Loop & Upload Gallery Secondary Files
  if (otherImageFiles && otherImageFiles.length > 0) {
    console.log("🔄 Starting loop for secondary images array upload...");
    for (const [index, file] of otherImageFiles.entries()) {
      const fileName = `${Date.now()}_other_${file.name.replace(/\s+/g, "_")}`;
      console.log(`📤 [${index + 1}/${otherImageFiles.length}] Uploading file: images/${fileName}`);
      
      const { data: imgData, error: fileUploadError } = await supabase.storage
        .from("products")
        .upload(`images/${fileName}`, file, { upsert: true });

      if (fileUploadError) {
        console.error(`❌ Secondary Image [${index + 1}] Upload Fault:`, fileUploadError);
        throw fileUploadError;
      }

      const { data: publicImgData } = supabase.storage
        .from("products")
        .getPublicUrl(`images/${fileName}`);

      otherImagesUrls.push(publicImgData.publicUrl);
    }
    console.log("✅ All secondary images uploaded. URLs gathered:", otherImagesUrls);
  }

  // Final database payload construction
  const finalPayload = {
    ...product,
    thumbnail: thumbnailUrl,
    images: otherImagesUrls, // Renamed tracking column key here matching your schema update
  };

  console.log("⚡ [DB Write Attempt] Inserting structured record payload into Supabase 'products':", finalPayload);

  // 3. Database Row Insertion targeting sub_category_id
  const { data, error } = await supabase
    .from("products")
    .insert([finalPayload])
    .select();

  if (error) {
    console.error("❌ Supabase DB Write Error caught! Details below:");
    console.error("➡️ Error Code:", error.code);
    console.error("➡️ Message string text:", error.message);
    console.error("➡️ Hint description from Supabase:", error.hint);
    throw error;
  }

  console.log("🎉 Success! Row created inside database:", data);
  return data;
};

export const deleteProduct = async (id) => {
  console.log(`🗑️ [deleteProduct] Initiating archival purge request for ID: ${id}`);
  
  const { data: productData, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("❌ Error fetching item details prior to deletion profile step:", fetchError);
    throw fetchError;
  }

  const filesToDelete = [];

  if (productData.thumbnail) {
    const thumbPath = getStoragePathFromUrl(productData.thumbnail);
    if (thumbPath) filesToDelete.push(thumbPath);
  }

  // Updated to parse from your new 'images' table data parameter array 
  if (productData.images && productData.images.length > 0) {
    productData.images.forEach((url) => {
      const path = getStoragePathFromUrl(url);
      if (path) filesToDelete.push(path);
    });
  }

  if (filesToDelete.length > 0) {
    console.log("🧹 Found file artifacts in storage bucket to purge:", filesToDelete);
    const { error: storageDelError } = await supabase.storage
      .from("products")
      .remove(filesToDelete);

    if (storageDelError) {
      console.warn("⚠️ Non-breaking Warning: Storage bucket clean block:", storageDelError);
    } else {
      console.log("✨ Associated file assets stripped cleanly from Storage bucket.");
    }
  }

  console.log(`⚡ Sending DELETE query to database for row reference ID: ${id}`);
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("❌ DB Row deletion command was terminated by an error:", error);
    throw error;
  }

  console.log("✅ Row removed from records database matrix successfully.");
  return data;
};

//update product
export const updateProduct = async (id, updates, newThumbnailFile, newOtherImageFiles) => {
  console.log(`🔄 [updateProduct] Initiating update flow for ID: ${id}`);
  
  let finalThumbnailUrl = updates.thumbnail;
  let finalImagesArray = [...(updates.images || [])];

  // 1. Handle Thumbnail Replacement
  if (newThumbnailFile && newThumbnailFile instanceof File) {
    console.log("📤 New thumbnail file detected. Uploading...");
    const cleanThumbName = newThumbnailFile.name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_.-]/g, "");
    const thumbName = `${Date.now()}_thumb_${cleanThumbName}`;
    
    const { error: thumbUploadError } = await supabase.storage
      .from("products")
      .upload(`images/${thumbName}`, newThumbnailFile, { upsert: true });

    if (thumbUploadError) throw thumbUploadError;

    const { data: publicThumbData } = supabase.storage
      .from("products")
      .getPublicUrl(`images/${thumbName}`);

    finalThumbnailUrl = publicThumbData.publicUrl;
    console.log("🔗 New Thumbnail URL:", finalThumbnailUrl);
  }

  // 2. Handle Appending New Secondary Gallery Images
  if (newOtherImageFiles && newOtherImageFiles.length > 0) {
    console.log(`🔄 Uploading ${newOtherImageFiles.length} new auxiliary gallery images...`);
    for (const file of newOtherImageFiles) {
      const cleanFileName = file.name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_.-]/g, "");
      const fileName = `${Date.now()}_other_${cleanFileName}`;
      
      const { error: fileUploadError } = await supabase.storage
        .from("products")
        .upload(`images/${fileName}`, file, { upsert: true });

      if (fileUploadError) throw fileUploadError;

      const { data: publicImgData } = supabase.storage
        .from("products")
        .getPublicUrl(`images/${fileName}`);

      finalImagesArray.push(publicImgData.publicUrl);
    }
    console.log("✅ New gallery images appended. Total collection size:", finalImagesArray.length);
  }

  // Prevent breaking schema definitions by pulling explicit keys out
  const { thumbnail, images, ...restOfUpdates } = updates;

  const finalPayload = {
    ...restOfUpdates,
    thumbnail: finalThumbnailUrl,
    images: finalImagesArray
  };

  console.log("⚡ [DB Update Request] Sending payload to Supabase:", finalPayload);

  // 3. Update Database Row
  const { data, error } = await supabase
    .from("products")
    .update(finalPayload)
    .eq("id", id)
    .select();

  if (error) {
    console.error("❌ Supabase DB Update Error:", error);
    throw error;
  }

  console.log("🎉 Product successfully updated in database:", data);
  return data;
};