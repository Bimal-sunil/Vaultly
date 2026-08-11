import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import Popup from "../components/Popup";

function AccountDetails() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  // State to hold form data (features will be implemented by user)
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [email, setEmail] = useState(profile?.email || "");

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = () => {
    // To be implemented
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);

      if (profile?.avatar_url) {
        await supabase.storage.from("avatars").remove([`${profile.id}`]);
      }
      const { error: rpcError } = await supabase.rpc("delete_user");
      if (rpcError) throw rpcError;

      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
    } catch (err) {
      console.error("Error deleting account:", err);
    } finally {
      setIsDeleting(false);
      setIsDeletePopupOpen(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-12">
      {/* Header */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} className="text-accent w-8 h-8" />
        <h1 className="font-primary text-3xl font-semibold text-light">
          Account Details
        </h1>
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center gap-6">
        <InputField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button label="Save Changes" onClick={handleSave} />
      </div>

      {/* Danger Zone */}
      <div className="w-full mt-12 flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-[#FF6347]">Danger Zone</h2>
        <div className="bg-dark-accent p-6 rounded-[15px] border border-[rgba(255,99,71,0.2)] flex flex-col gap-4">
          <p className="text-accent-bg text-sm">
            Once you delete your account, there is no going back. All your
            subscriptions and settings will be permanently erased.
          </p>
          <button
            className="w-full flex items-center justify-center gap-2 p-4 rounded-[15px] bg-[rgba(255,99,71,0.1)] border border-[rgba(255,99,71,0.5)] text-[#FF6347] hover:bg-[rgba(255,99,71,0.2)] transition-colors mt-2"
            onClick={() => setIsDeletePopupOpen(true)}
          >
            <HugeiconsIcon icon={Delete02Icon} className="w-6 h-6" />
            <span className="text-lg font-medium">Delete Account</span>
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      <Popup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        title="Delete Account?"
        description="This action is permanent and cannot be undone. All your subscriptions and personal data will be lost forever."
        onConfirm={handleDeleteAccount}
        confirmText="Yes, Delete My Account"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default AccountDetails;
