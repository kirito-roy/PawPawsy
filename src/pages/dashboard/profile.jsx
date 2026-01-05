import { useEffect, useState, useRef } from "react";
import { Avatar } from "primereact/avatar";
import {
  PencilIcon,
  XMarkIcon,
  CheckIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { useAuth } from "@/components/auth/AuthContext";
import AuthService from "@/services/api/auth";
import { sweetAlert } from "@/components/SweetAlert/SweetAlert";

export const ProfilePageSkeleton = () => (
  <div className="p-4 sm:p-6 mt-9 space-y-8 animate-pulse">
    <div className="shadow-lg dark:bg-gray-800 rounded-xl p-6">
      <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8">
        <div className="relative shrink-0 mb-4 md:mb-0">
          <div className="h-[110px] w-[110px] bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="grow w-full">
          <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded-sm w-1/3 mx-auto md:mx-0"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-sm w-1/2 mx-auto md:mx-0 mt-2"></div>
        </div>
      </div>
    </div>
  </div>
);

export function ProfilePage() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = sweetAlert();
  const fileInputRef = useRef(null);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const maxSizeInMB = 2;
    if (file.size > maxSizeInMB * 1024 * 1024) {
      showError(`File is too large. Max size is ${maxSizeInMB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64String = reader.result;
      try {
        await AuthService.uploadProfilePicture(base64String);
        const freshProfile = await AuthService.getCurrentUser();
        setProfile(freshProfile);
        showSuccess("Profile picture updated successfully!");
      } catch (err) {
        console.error("Failed to upload profile picture:", err);
        showError(
          err.response?.data?.msg || "Failed to upload profile picture."
        );
      }
    };
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditData({ name: profile.name, email: profile.email });
    }
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editData.name.trim() || !editData.email.trim()) {
      showError("Name and email cannot be empty.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(editData.email)) {
      showError("Please enter a valid email address.");
      return;
    }

    try {
      const updatedProfile = await AuthService.updateProfile(editData);
      setProfile(updatedProfile);
      setIsEditing(false);
      showSuccess("Profile updated successfully!");
    } catch (err) {
      showError(err.response?.data?.msg || "Failed to update profile.");
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  useEffect(() => {
    if (!authUser) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const profileRes = await AuthService.getCurrentUser();
        setProfile(profileRes);
      } catch (err) {
        console.error("❌ Error fetching profile data:", err);
        showError("Failed to load your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  if (loading || !profile) {
    return <ProfilePageSkeleton />;
  }

  return (
    <div className="p-4 sm:p-6 mt-9 space-y-8">
      <Card className="shadow-lg dark:bg-gray-800">
        <CardBody>
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8">
            <div className="relative shrink-0 mb-4 md:mb-0">
              {profile?.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt={profile?.name || "Profile"}
                  className="h-[110px] w-[110px] rounded-full object-cover"
                />
              ) : (
                <Avatar
                  label={profile?.name?.[0]?.toUpperCase() || "A"}
                  size="xlarge"
                  shape="circle"
                  className="h-[110px] w-[110px] bg-indigo-500 text-4xl text-white"
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />
              <button
                onClick={handleAvatarClick}
                className="absolute bottom-1 right-1 p-2 text-white bg-gray-700 rounded-full shadow-md hover:bg-gray-600 transition-colors"
                title="Change profile picture"
              >
                <CameraIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="grow w-full">
              <div className="flex justify-between items-start">
                <div className="grow">
                  {isEditing ? (
                    <div className="space-y-4 max-w-sm">
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="w-full p-2 text-xl font-bold bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      />
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                        className="w-full p-2 text-md bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                  ) : (
                    <>
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="dark:text-white"
                      >
                        {profile?.name}
                      </Typography>
                      <Typography
                        color="gray"
                        className="text-md font-normal dark:text-gray-400 mt-1"
                      >
                        {profile?.email}
                      </Typography>
                    </>
                  )}
                </div>
                <button
                  onClick={handleEditToggle}
                  className="p-2 text-gray-500 rounded-full hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                  title={isEditing ? "Cancel Edit" : "Edit Profile"}
                >
                  {isEditing ? (
                    <XMarkIcon className="w-6 h-6" />
                  ) : (
                    <PencilIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {isEditing && (
                <div className="mt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700"
                  >
                    <CheckIcon className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProfilePage;