"use client";
import { useState, useEffect } from "react";
import BackButton from "@/components/ui/back-button";
import FormInput from "@/app/components/form-input/FormInput";

type Profile = {
  fullName: string;
  phone: string;
  company?: string;
  position?: string;
  region?: string;
};

const regions = ["Qaraqalpaqstan", "Tashkent", "Samarqand", "Xorezm", "Nawayi"];
// const languages = ["Uzbek", "Russian", "English"];

const MyProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // TODO: replace with API call
    setProfile({
      fullName: "John Doe",
      phone: "+998901234567",
      company: "Bizler Group",
      position: "Menejer",
      region: "Tashkent",
    });
  }, []);

  if (!profile) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <BackButton />
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="bg-background p-4 space-y-4">
        <FormInput
          legend="Jaylasqan mámleket"
          as="select"
          options={regions}
          defaultValue={profile.region}
        />
        <FormInput
          legend="Mekeme atı"
          type="text"
          defaultValue={profile.company}
        />
        <FormInput legend="Baylanıs" type="text" defaultValue={profile.phone} />
        <FormInput legend="FAÁ" type="text" defaultValue={profile.fullName} />

        <button className="w-full mt-4 px-4 py-2 rounded-lg text-white bg-primary/70 hover:bg-primary/80 transition-all duration-200">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
