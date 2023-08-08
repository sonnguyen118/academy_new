import * as nodemailer from 'nodemailer';
import config from '@config';

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.nodemail_user,
    pass: config.nodemail_password,
  },
});

export async function sendEmail(
  to: string,
  userName: string,
  password: string,
): Promise<void> {
  const subject = 'THÔNG BÁO TẠO TÀI KHOẢN HỌC VIÊN 30SHINE ACADEMY';
  const text = `Chúng tôi đã tạo cho bạn tài khoản ${userName} có mật khẩu là ${password}`;
  const mailOptions = {
    from: config.nodemail_user,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendEmailValidate(
  to: string,
  userName: string,
  password: string,
): Promise<void> {
  const subject =
    'THÔNG BÁO XÁC THỰC THÀNH CÔNG TÀI KHOẢN HỌC VIÊN 30SHINE ACADEMY';
  const text = `Tài khoản ${userName} có mật khẩu là ${password} đã chính thức hoạt động 100% công suất. Hãy vào học vui vẻ nhé!`;
  const mailOptions = {
    from: config.nodemail_user,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
}
