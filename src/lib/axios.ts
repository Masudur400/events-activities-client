 



import axios from 'axios'

// ১. প্রাইভেট এপিআই এর জন্য (Logged in users)
export const privateApi = axios.create({
  baseURL: "/proxy",
  withCredentials: true,
})

// ২. পাবলিক এপিআই এর জন্য (No token needed)
export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: false, // এখানে false দিন
})
