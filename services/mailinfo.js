// emailTemplate.js
export const html = (booking, status) => {
  if (!booking || !status) return "";

  // Determine badge color based on status
  let badgeColor = "#bfbfbf"; // default gray
  if (status === "CONFIRMED") badgeColor = "#28a745"; // green
  else if (status === "CANCELLED") badgeColor = "#dc3545"; // red

  return `
    <div style="font-family: 'Arial', sans-serif; background-color: #f9f5f2; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #fffaf4; border-radius: 10px; overflow: hidden; border: 1px solid #e0d6c3;">
        
        <div style="background-color: #8B5E3C; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Booking ${status}</h1>
        </div>
        
        <div style="padding: 20px; color: #4b3f36;">
          <p>Hi <strong>${booking.user_name}</strong>,</p>
          <p>Your booking status has been updated to:</p>
          <p style="display:inline-block; padding: 5px 12px; background-color: ${badgeColor}; color: #fff; font-weight:bold; border-radius: 5px;">${status}</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #e0d6c3;">Start Time</td>
              <td style="padding: 8px; border: 1px solid #e0d6c3;">${new Date(booking.start_ts).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e0d6c3;">End Time</td>
              <td style="padding: 8px; border: 1px solid #e0d6c3;">${new Date(booking.end_ts).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e0d6c3;">Party Size</td>
              <td style="padding: 8px; border: 1px solid #e0d6c3;">${booking.party_size}</td>
            </tr>
          </table>

          <p style="margin-top: 20px;">Thank you for choosing our service!</p>
          <p style="margin-top: 10px;">Warm regards,<br/>The Booking Team</p>
        </div>

        <div style="background-color: #8B5E3C; color: #fff; text-align: center; padding: 10px;">
          &copy; ${new Date().getFullYear()} Booking System. All rights reserved.
        </div>

      </div>
    </div>
  `;
};
