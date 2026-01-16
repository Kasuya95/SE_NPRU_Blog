const supabase = require("./supabase.config");

const deleteSupabaseFile = async (publicUrl) => {
  if (!publicUrl) return;

  const filePath = publicUrl.split("/uploads/")[1];
  if (!filePath) return;

  await supabase.storage.from("uploads").remove([`uploads/${filePath}`]);
};

module.exports = deleteSupabaseFile;
