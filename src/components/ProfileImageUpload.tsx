import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit03Icon, Loading03Icon, Delete01Icon } from "@hugeicons/core-free-icons";
import { supabase } from "../../utils/supabase";

function ProfileImageUpload() {
  const { profile, refreshProfile } = useAuth();
  const [image, setImage] = useState<string>(profile?.avatar_url || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files[0];
      if (!file) return;
      setIsUploading(true);
      setImage(URL.createObjectURL(file));

      const filePath = `${profile?.id}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);
      
      // Append a timestamp to the URL to force the browser to ignore its cache
      const updatedUrl = `${publicUrl}?t=${Date.now()}`;

      const { error: updateError } = await supabase
        .from("Profiles")
        .update({ avatar_url: updatedUrl })
        .eq("id", profile?.id);

      if (updateError) {
        throw updateError;
      }
      
      // Tell the global app state to fetch the new image URL so the Header updates!
      await refreshProfile();
    } catch (err) {
      console.error("Error uploading profile image:", err);
    } finally {
      setIsUploading(false);
    }
  };
  const handleRemove = async () => {
    try {
      setIsUploading(true);
      const { error: updateError } = await supabase
        .from("Profiles")
        .update({ avatar_url: null })
        .eq("id", profile?.id);

      if (updateError) throw updateError;

      // Clean up the storage bucket
      await supabase.storage.from("avatars").remove([`${profile?.id}`]);

      setImage("");
      await refreshProfile();
    } catch (err) {
      console.error("Error removing profile image:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group cursor-pointer w-24 h-24 rounded-full overflow-hidden border-2 border-accent flex items-center justify-center bg-dark-accent">
        {image ? (
          <img
            src={image}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-dark font-bold text-3xl uppercase">
            {profile?.first_name?.[0] || "U"}
          </span>
        )}
        <div className="absolute w-full h-full bg-dark/50 left-0 top-0 flex justify-center items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          {isUploading ? (
            <HugeiconsIcon
              icon={Loading03Icon}
              className="w-8 h-8 text-accent animate-spin"
            />
          ) : (
            <HugeiconsIcon icon={Edit03Icon} className="w-8 h-8 text-accent" />
          )}
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </div>
      </div>
      
      {image && (
        <button
          onClick={handleRemove}
          disabled={isUploading}
          className="flex items-center gap-2 px-5 py-2.5 mt-1 rounded-[12px] border border-[rgba(255,99,71,0.5)] text-[#FF6347] bg-[rgba(255,99,71,0.05)] hover:bg-[rgba(255,99,71,0.15)] transition-colors font-medium text-sm"
        >
          <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />
          Remove Image
        </button>
      )}
    </div>
  );
}

export default ProfileImageUpload;
