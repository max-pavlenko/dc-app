"use client";

import { useEffect, useState } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { useAppSelector } from "@/store/store";
import {useTranslations} from 'next-intl';
import toast from 'react-hot-toast';

export default function ProfilePage() {
   const { user, isLoading } = useAppSelector((state) => state.auth);
   const t = useTranslations();
   
   if (isLoading) {
      return (
          <div className="flex justify-center items-center h-screen bg-gray-900">
             <CircularProgress />
          </div>
      );
   }
   
   if (!user) return null;
   
   const handleCopyID = () => {
      navigator.clipboard.writeText(user.userID).then(() => {
         toast.success(t('Notification.Success.copyID'));
      });
   };
   
   return (
       <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
             <div className="flex flex-col items-center">
                <Avatar
                    src={user?.avatar}
                    sx={{ width: 80, height: 80, bgcolor: "#5865F2" }}
                    className="mb-4"
                >
                   {user.username.charAt(0).toUpperCase()}
                </Avatar>
                
                <h1 className="text-2xl font-semibold">{t('Common.username')}: {user.username}</h1>
                <p className="text-gray-400 text-sm">{user.email}</p>
             </div>
             
             <div className="mt-6 bg-gray-600 p-2 rounded-lg flex items-center justify-between">
                <span className="text-gray-300 text-sm">ID: {user.userID}</span>
                <button
                    onClick={handleCopyID}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                >
                   Copy
                </button>
             </div>
          </div>
       </div>
   );
}
