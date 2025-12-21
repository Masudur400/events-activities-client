'use client'
import { useState } from 'react'; 
import { X, Lock, Eye, EyeOff } from 'lucide-react';
import { useChangePassword } from '@/hooks/auth/useChangePassword';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });
  
  const { mutate: changePass, isPending } = useChangePassword();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("New passwords don't match!");
    }
    
    changePass({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    }, {
      onSuccess: () => {
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-950 w-full max-w-md rounded-2xl shadow-2xl border border-yellow-700/30 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Lock size={20} className="text-yellow-700" /> Change Password
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Old Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Old Password</label>
              <div className="relative">
                <input
                  type={showPass.old ? "text" : "password"}
                  required
                  className="w-full border p-3 rounded-xl dark:bg-gray-900 outline-none focus:ring transition-all"
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                />
                <button type="button" onClick={() => setShowPass({...showPass, old: !showPass.old})} className="absolute right-3 top-3.5 text-gray-500">
                  {showPass.old ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <div className="relative">
                <input
                  type={showPass.new ? "text" : "password"}
                  required
                  className="w-full border p-3 rounded-xl dark:bg-gray-900 outline-none focus:ring transition-all"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
                <button type="button" onClick={() => setShowPass({...showPass, new: !showPass.new})} className="absolute right-3 top-3.5 text-gray-500">
                  {showPass.new ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPass.confirm ? "text" : "password"}
                  required
                  className="w-full border p-3 rounded-xl dark:bg-gray-900 outline-none focus:ring transition-all"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <button type="button" onClick={() => setShowPass({...showPass, confirm: !showPass.confirm})} className="absolute right-3 top-3.5 text-gray-500">
                  {showPass.confirm ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isPending ? 'Processing...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;