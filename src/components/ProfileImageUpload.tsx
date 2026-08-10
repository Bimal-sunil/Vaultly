import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit03Icon, Loading03Icon } from "@hugeicons/core-free-icons";
import { supabase } from "../../utils/supabase";

function ProfileImageUpload() {
  const { profile } = useAuth();
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
    } catch (err) {
      console.error("Error uploading profile image:", err);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="relative cursor-pointer w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
      <img
        src={image}
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
      <div className="absolute w-full h-full bg-dark/50 left-0 top-0 flex justify-center items-center">
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
  );
}

export default ProfileImageUpload;
