/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { IUser } from '@/types/userTypes';
import { format } from 'date-fns';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Camera, Home, Pen, Shield, User } from 'lucide-react';
import { z } from 'zod';

interface ProfileProps {
  user: IUser;
  onUpdate?: (user: IUser) => void;
}

// ---------------- Zod Schemas ----------------
const nameSchema = z.string()
  .min(2, { message: "Name must be at least 2 characters long." })
  .max(50, { message: "Name cannot exceed 50 characters." })
  .optional();

const phoneSchema = z.string()
  .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
    message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
  })
  .optional();

const bioSchema = z.string()
  .min(10, { message: "Bio must be at least 10 characters long." })
  .max(100, { message: "Bio cannot exceed 100 characters." })
  .optional();

const addressSchema = z.string()
  .max(100, { message: "Address cannot exceed 100 characters." })
  .optional();

// ---------------- Profile Component ----------------
const Profile = ({ user, onUpdate }: ProfileProps) => {


  const getRoleIcon = (role?: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return <Shield size={18} />; // super admin icon
      case "HOST":
        return <Home size={18} />;   // host icon
      case "USER":
        return <User size={18} />;   // regular user
      default:
        return <User size={18} />;   // default icon
    }
  };


  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user?.picture || undefined); // instant preview

  const formattedDate =
    user?.createdAt && !isNaN(new Date(user.createdAt).getTime())
      ? format(new Date(user.createdAt), "dd MMMM yyyy")
      : "N/A";

  // ---------------- IMAGE UPDATE ----------------
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);

    const toastId = toast.loading('Updating profile picture...');

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/update-profile`, {
        method: 'PATCH',
        body: data,
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to update picture');
      const result = await res.json();
      toast.success('Profile picture updated!', { id: toastId });

      // UI instant update
      setImagePreview(result.data.picture || '');
      onUpdate?.(result.data);
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ---------------- BIO UPDATE ----------------
  const handleBioUpdate = async () => {
    const toastId = toast.loading('Updating bio...');
    try {
      setLoading(true);
      const bioValidation = bioSchema.safeParse(formData.bio);
      if (!bioValidation.success) {
        setErrors({ bio: bioValidation.error.issues[0]?.message || "Invalid bio" });
        toast.dismiss(toastId);
        return;
      } else {
        setErrors({ ...errors, bio: '' });
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/update-profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: formData.bio }),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to update bio');
      const result = await res.json();
      toast.success('Bio updated!', { id: toastId });
      onUpdate?.(result.data);
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ---------------- INFO UPDATE ----------------
  // const handleInfoUpdate = async () => {
  //   const newErrors: { [key: string]: string } = {};
  //   let hasError = false;

  //   // Validate Name
  //   const nameValidation = nameSchema.safeParse(formData.name);
  //   if (!nameValidation.success) {
  //     newErrors.name = nameValidation.error.issues[0]?.message || "Invalid name";
  //     hasError = true;
  //   }

  //   // Validate Phone
  //   const phoneValidation = phoneSchema.safeParse(formData.phone);
  //   if (!phoneValidation.success) {
  //     newErrors.phone = phoneValidation.error.issues[0]?.message || "Invalid phone";
  //     hasError = true;
  //   }

  //   // Validate Address
  //   const addressValidation = addressSchema.safeParse(formData.address);
  //   if (!addressValidation.success) {
  //     newErrors.address = addressValidation.error.issues[0]?.message || "Invalid address";
  //     hasError = true;
  //   }

  //   if (hasError) {
  //     setErrors(newErrors);
  //     return;
  //   } else {
  //     setErrors({});
  //   }

  //   const toastId = toast.loading('Updating profile info...');
  //   try {
  //     setLoading(true);
  //     const payload = {
  //       name: formData.name,
  //       phone: formData.phone,
  //       address: formData.address,
  //     };
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/update-profile`, {
  //       method: 'PATCH',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload),
  //       credentials: 'include',
  //     });
  //     if (!res.ok) throw new Error('Failed to update info');
  //     const result = await res.json();
  //     toast.success('Profile updated!', { id: toastId });
  //     onUpdate?.(result.data);
  //   } catch (err: any) {
  //     toast.error(err.message || 'Something went wrong', { id: toastId });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleInfoUpdate = async () => {
  const newErrors: { [key: string]: string } = {};
  const payload: any = {};

  // NAME
  if (formData.name.trim() !== '') {
    const nameValidation = nameSchema.safeParse(formData.name);
    if (!nameValidation.success) {
      newErrors.name = nameValidation.error.issues[0].message!;
    } else {
      payload.name = formData.name;
    }
  }

  // PHONE
  if (formData.phone.trim() !== '') {
    const phoneValidation = phoneSchema.safeParse(formData.phone);
    if (!phoneValidation.success) {
      newErrors.phone = phoneValidation.error.issues[0].message!;
    } else {
      payload.phone = formData.phone;
    }
  }

  // ADDRESS
  if (formData.address.trim() !== '') {
    const addressValidation = addressSchema.safeParse(formData.address);
    if (!addressValidation.success) {
      newErrors.address = addressValidation.error.issues[0].message!;
    } else {
      payload.address = formData.address;
    }
  }

  // ❌ Nothing to update
  if (Object.keys(payload).length === 0) {
    toast.error("Please update at least one field");
    return;
  }

  // ❌ Validation errors
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});

  const toastId = toast.loading('Updating profile info...');
  try {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/update-profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to update info');

    const result = await res.json();
    toast.success('Profile updated!', { id: toastId });
    onUpdate?.(result.data);
  } catch (err: any) {
    toast.error(err.message || 'Something went wrong', { id: toastId });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-950 rounded-2xl shadow-lg p-6 border border-yellow-700/40 flex flex-col md:flex-row gap-6">

        {/* ---------------- LEFT: IMAGE + BIO ---------------- */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-4">

          {/* Avatar with Camera Icon */}
          <div className="relative">
            <img
              src={imagePreview}
              alt="User Avatar"
              className="w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-yellow-700 shadow-lg object-cover"
            />
            <label
              htmlFor="file-upload"
              className="absolute top-0 right-4   p-2 rounded-full cursor-pointer bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
            >
              <Camera size={20} color="white" />
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Bio BELOW IMAGE */}
          <div className="w-full relative mt-2">
            <textarea
              value={formData.bio}
              placeholder='Write something about you.'
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20"
            />
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
            <button
              onClick={handleBioUpdate}
              disabled={loading}
              className="absolute -top-3 -right-3 md:-top-4 md:right-0 p-2 rounded-full bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg   shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50  "
            >
              <Pen size={18} color="white" />
            </button>
          </div>
        </div>

        {/* ---------------- RIGHT: INFO ---------------- */}
        <div className="flex-1 flex flex-col space-y-3 text-gray-700 dark:text-gray-200">
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
              className="w-full border p-2 rounded-md 0"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <p className="flex items-center gap-2">
            {getRoleIcon(user?.role)}
            <span>{user?.role || "N/A"}</span>
          </p>

          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full border p-2 rounded-md bg-gray-100 dark:bg-neutral-600 cursor-not-allowed"
          />

          <div>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Phone"
              className="w-full border p-2 rounded-md "
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Address"
              className="w-full border p-2 rounded-md "
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <input
            type="text"
            value={formattedDate}
            disabled
            className="w-full border p-2 rounded-md bg-gray-100 dark:bg-neutral-600 cursor-not-allowed "
          />

          <button
            onClick={handleInfoUpdate}
            disabled={loading}
            className="mt-2 w-full p-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
          >
            Update Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
