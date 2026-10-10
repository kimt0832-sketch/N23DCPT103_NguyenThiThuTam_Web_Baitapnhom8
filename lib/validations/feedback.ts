import { z } from "zod";

// Regex kiểm tra số điện thoại nhà mạng VN (10 số, bắt đầu bằng 03, 05, 07, 08, 09)
const vnPhoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

export const feedbackSchema = z.object({
  phoneNumber: z.string().regex(vnPhoneRegex, {
    message: "Số điện thoại không đúng định dạng Việt Nam.",
  }),
  content: z.string().min(21, {
    message: "Nội dung phải trên 20 ký tự.",
  }),
});