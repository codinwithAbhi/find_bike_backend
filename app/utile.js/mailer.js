import nodemailer from'nodemailer';

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  /**
   * Send email
   * @param {Object} mailOptions - Mail options for Nodemailer
   */
  sendMail(mailOptions) {
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error:', error);
      }
      console.log('Email sent: ' + info.response);
    });
  }

  /**
   * Notify garage about a new request
   * @param {String} garageEmail - Garage's email address
   * @param {String} customerName - Customer's name
   * @param {String} requestMessage - Details of the request
   * @param {String} contact - Customer's contact number
   * @param {String} serviceType - Type of service requested
   * @param {String} vehicleType - Type of vehicle
   */
  notifyToGarage(garageEmail, customerName, requestMessage, contact, serviceType, vehicleType) {
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: garageEmail,
      subject: 'New Service Request',
      html: `
        <h1>New Service Request</h1>
        <h2>Customer Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${customerName}</li>
          <li><strong>Contact:</strong> ${contact}</li>
        </ul>
        <h2>Request Details:</h2>
        <ul>
          <li><strong>Service Type:</strong> ${serviceType}</li>
          <li><strong>Vehicle Type:</strong> ${vehicleType}</li>
          <li><strong>Message:</strong> ${requestMessage}</li>
        </ul>
        <p>Please contact the customer to proceed with the request.</p>
      `,
    };

    this.sendMail(mailOptions);
    console.log(`notifyToGarage has run and email is sent to ${garageEmail}`); // [CHANGED! Final log]
  }

   /**
   * Notify customer about the request status
   * @param {String} customerEmail - Customer's email address
   * @param {String} garageName - Garage's name
   * @param {String} status - Status of the request (Accepted, Rejected, Completed)
   * @param {String} serviceType - Type of service requested
   * @param {String} vehicleType - Type of vehicle
   */
   requestStatus(customerEmail, garageName, status, serviceType, vehicleType) {
    console.log(`requestStatus is running with status: ${status}`); // [CHANGED! Debug log]

    let subject;
    let body;

    if (status === "Accepted") {
      subject = 'Request Accepted';
      body = `
        <h1>Request Accepted</h1>
        <p>Your request for <strong>${serviceType}</strong> for your <strong>${vehicleType}</strong> has been accepted by ${garageName}.</p>
        <p>The garage will contact you soon to proceed with the service.</p>
      `;
    } else if (status === "Rejected") {
      subject = 'Request Rejected';
      body = `
        <h1>Request Rejected</h1>
        <p>We regret to inform you that your request for <strong>${serviceType}</strong> for your <strong>${vehicleType}</strong> has been rejected by ${garageName}.</p>
        <p>We apologize for the inconvenience. You may choose another service provider from our platform.</p>
      `;
    } else if (status === "Completed") {
      subject = 'Request Completed';
      body = `
        <h1>Request Completed</h1>
        <p>Your request for <strong>${serviceType}</strong> for your <strong>${vehicleType}</strong> has been successfully completed by ${garageName}.</p>
        <p>Thank you for choosing our service. We hope to serve you again!</p>
      `;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: subject,
      html: body,
    };

    this.sendMail(mailOptions);
    console.log(`requestStatus has run and email is sent to ${customerEmail}`); // [CHANGED! Final log]
  }


 
}

export default NotificationService;
