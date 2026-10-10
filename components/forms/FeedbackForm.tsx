"use client";

import { useState } from "react";
import { feedbackSchema } from "@/lib/validations/feedback";
import { z } from "zod";

export default function FeedbackForm() {
  const [errors, setErrors] = useState<{ phoneNumber?: string; content?: string }>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      phoneNumber: formData.get("phoneNumber") as string,
      content: formData.get("content") as string,
    };

    const result = feedbackSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        phoneNumber: fieldErrors.phoneNumber?.[0],
        content: fieldErrors.content?.[0],
      });
      return;
    }

    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md p-6 border rounded shadow-md bg-white">
      {/* Thêm text-black vào tiêu đề */}
      <h2 className="text-2xl font-bold text-black text-center mb-2">Góp ý khách hàng</h2>
      
      <div>
        {/* Thêm text-gray-800 vào label */}
        <label className="block mb-1 font-medium text-gray-800">Số điện thoại:</label>
        <input name="phoneNumber" type="text" className="border border-gray-300 rounded p-2 w-full text-black outline-none focus:border-blue-500" />
        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
      </div>

      <div>
        {/* Thêm text-gray-800 vào label */}
        <label className="block mb-1 font-medium text-gray-800">Nội dung góp ý:</label>
        <textarea name="content" className="border border-gray-300 rounded p-2 w-full text-black outline-none focus:border-blue-500" rows={4}></textarea>
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
      </div>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded transition-colors mt-2">
        Gửi góp ý
      </button>

      {success && <p className="text-green-600 font-medium text-center">Gửi góp ý thành công!</p>}
    </form>
  );
}