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

const countries = ["Qaraqalpaqstan", "Uzbekistan", "Kazakhstan", "Russia"];
const regions = [
  "Tashkent",
  "Samarqand",
  "Buxoro",
  "Xorezm",
  "Nawayi",
  "Farg‘ona",
  "Andijon",
  "Qashqadaryo",
  "Surxondaryo",
  "Jizzax",
  "Sirdaryo",
  "Qaraqalpaqstan",
];
const sectors = [
  "IT / Texnologiya",
  "Ta’lim",
  "Sog‘liqni saqlash",
  "Moliya / Bank",
  "Qurilish",
  "Qishloq xo‘jaligi",
  "Ishlab chiqarish",
  "Transport / Logistika",
  "Savdo / Marketing",
  "Turizm / Mehmonxona",
];
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
      <h2 className="text-2xl font-semibold mb-4">Meniń profilim</h2>

      <div className="bg-background p-4 space-y-4">
        <FormInput
          legend="Jaylasqan mámleket"
          as="select"
          options={countries}
          defaultValue={profile.region}
        />
        <FormInput legend="Region" as="select" options={regions} />
        <FormInput legend="Taraw" as="select" options={sectors} />
        <FormInput
          legend="Mekeme atı"
          type="text"
          defaultValue={profile.company}
        />
        <FormInput legend="Baylanıs" type="text" defaultValue={profile.phone} />
        <FormInput legend="FAÁ" type="text" defaultValue={profile.fullName} />

        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Saqlaw
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
