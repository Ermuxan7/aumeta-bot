"use client";
import { useState, useEffect } from "react";
import BackButton from "@/components/ui/back-button";
import FormInput from "@/app/components/form-input/FormInput";

type Profile = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  region?: string;
  language?: string;
};

const regions = ["Qaraqalpaqstan", "Tashkent", "Samarqand", "Xorezm", "Nawayi"];
const languages = ["Uzbek", "Russian", "English"];

const MyProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // TODO: replace with API call
    setProfile({
      fullName: "John Doe",
      email: "example@gmail.com",
      phone: "+998901234567",
      company: "Bizler Group",
      position: "Menejer",
      region: "Tashkent",
      language: "Uzbek",
    });
  }, []);

  if (!profile) return <p className="text-center mt-8">Loading...</p>;

  const handleSave = () => {
    // TODO: API call to save changes
    alert("Profile updated!");
    setEditMode(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <BackButton />
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 space-y-4">
        <FormInput
          legend="Full Name"
          type="text"
          defaultValue={profile.fullName}
          readOnly={!editMode}
        />

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <FormInput
            legend="Email"
            type="email"
            defaultValue={profile.email}
            readOnly={!editMode}
          />
          <FormInput
            legend="Phone"
            type="text"
            defaultValue={profile.phone}
            readOnly={!editMode}
          />
        </div>

        <FormInput
          legend="Company"
          type="text"
          defaultValue={profile.company}
          readOnly={!editMode}
        />

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <FormInput
            legend="Region"
            as="select"
            options={regions}
            defaultValue={profile.region}
            disabled={!editMode}
          />
          <FormInput
            legend="Language"
            as="select"
            options={languages}
            defaultValue={profile.language}
            disabled={!editMode}
          />
        </div>

        <button
          onClick={editMode ? handleSave : () => setEditMode(true)}
          className={`w-full mt-4 px-4 py-2 rounded-lg text-white transition ${
            editMode
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {editMode ? "Save" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
