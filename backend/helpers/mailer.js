const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { SENDER_EMAIL, MAIL_ID, MAIL_SECRET, MAIL_REFRESH, OAUTH_LINK } =
  process.env;

const auth = new OAuth2(MAIL_ID, MAIL_SECRET, MAIL_REFRESH, OAUTH_LINK);

const sendVerificationEmail = (
  receiver_email,
  receiver_name,
  verification_url
) => {
  auth.setCredentials({
    refresh_token: MAIL_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL,
      clientId: MAIL_ID,
      clientSecret: MAIL_SECRET,
      refreshToken: MAIL_REFRESH,
      accessToken: accessToken,
    },
  });
  const mailOptions = {
    from: SENDER_EMAIL,
    to: receiver_email,
    subject: "Verify account",
    html: `<div style="max-width: 1200px; margin: 20px auto"> <div style=" display: flex; align-items: center; justify-content: flex-start; gap: 20px; padding: 12px 0; border-bottom: 2px solid #ececec; " > <img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width: 40px; height: auto" /> <div style="display: flex; align-items: center"> <span style=" color: #3b5998; font-size: 20px; font-weight: 600; margin-left: 16px; " >Action required: Confirm your Facebook account</span > </div> </div> <div> <p style="padding-bottom: 20px">Hi ${receiver_name}</p> <p style="padding-bottom: 20px"> You recently created an account on Facebook. </p> <p style="padding-bottom: 12px"> To complete registraition, please confirm this email address so that we can update your contact information </p> <div style="padding-bottom: 12px; border-bottom: 2px solid #ececec"> <a href=${verification_url} style=" display: inline-block; padding: 8px 16px; border-radius: 2px; font-weight: 600; color: white; background: #3b5998; text-decoration: none; " > Confirm </a> </div> <p></p> </div> </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
const sendVerificationCode = (receiver_email, receiver_name, code) => {
  auth.setCredentials({
    refresh_token: MAIL_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL,
      clientId: MAIL_ID,
      clientSecret: MAIL_SECRET,
      refreshToken: MAIL_REFRESH,
      accessToken: accessToken,
    },
  });
  const mailOptions = {
    from: SENDER_EMAIL,
    to: receiver_email,
    subject: "Verify account",
    html: `<div style="max-width: 1200px; margin: 20px auto"> <div style=" display: flex; align-items: center; justify-content: flex-start; padding: 12px 0; border-bottom: 2px solid #ececec; " > <img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width: 40px; height: auto" /> <div style="display: flex; align-items: center"> <span style=" color: #3b5998; font-size: 20px; font-weight: 600; margin-left: 16px; " >Facebook</span > </div> </div> <div> <p style="padding-bottom: 20px">Hi ${receiver_name}</p> <p>We received a request to reset your Facebook password</p> <p>Enter the following password to reset code</p> <div style=" display: inline-block; padding: 24px 24px; font-weight: 700; color: black; background: #d1dfff; border: 1px solid #3b5998; " > ${code} </div> <p></p> </div> </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

module.exports = { sendVerificationEmail, sendVerificationCode };
