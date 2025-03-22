const nodemailer = require("nodemailer");

exports.sendEmailNotification = async (email, status, lwd) => {
    let subject, text;

    if (status === "approved") {
        subject = "Resignation Approved";
        text = `Your resignation has been approved. Your last working day is set to ${new Date(lwd).toLocaleDateString()}.`;
    } else {
        subject = "Resignation Rejected";
        text = "Your resignation request has been rejected.";
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text,
    });
};
