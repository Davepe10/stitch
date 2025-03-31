import { useState } from "react";
import { supabase } from "../firebaseConfig";

export default function AvatarUpload({ user, setAvatar }) {
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      const filePath = `avatars/${user.id}.png`;
      const { data, error } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
      if (!error) {
        const { data: publicUrl } = supabase.storage.from("avatars").getPublicUrl(filePath);
        setAvatar(publicUrl.publicUrl);
      }
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="avatarUpload" />
      <label htmlFor="avatarUpload" className="bg-blue-500 text-white px-6 py-2 rounded-full cursor-pointer">
        {uploading ? "Subiendo..." : "Subir Foto"}
      </label>
    </div>
  );
}
