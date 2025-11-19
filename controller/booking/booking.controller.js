const bookingModel = require('../../database/model/booking.model');
const { html } = require('../../services/mailinfo');
const sequelize = require('../../database/connection').sequelize;
const { sendMail } = require('../../services/sendingMail');
try {
const createBooking = async(req,res)=>{
    if(!req.body){
        return res.status(400).json({error: 'Request body is missing'});
    }
    console.log(req.body);
    const { user_name,
        user_email,
        start_ts,
        end_ts,
        party_size,
        } = req.body;

 const status = 'PENDING' ;
  if(!user_name || !user_email || !start_ts || !end_ts || !party_size){
    return res.status(400).json({error: 'Required booking details are missing'});
  }
 bookingModel.create({
    user_name,
    user_email, 
    start_ts,
    end_ts,
    party_size,
    status
})

    res.status(201).json({message: 'Booking created successfully'});




    // Logic to handle user (e.g., create user, authenticate, etc.)

}
} catch (error) {
    console.error("Error defining createBooking function:", error);
}   

try {
const getAllBookings = async(req,res)=>{
    const bookings = await bookingModel.findAll();
    console.log(bookings);
    res.status(200).json(bookings);
}
} catch (error) {
    console.error("Error defining getAllBookings function:", error);
}
try {
const getSingleBooking = async(req,res)=>{
    const {id} = req.params;
    const booking = await bookingModel.findByPk(id);
    if(!booking){
        return res.status(404).json({error: 'Booking not found'});
    }
    res.status(200).json(booking);
}
} catch (error) {
    console.error("Error defining getSingleBooking function:", error);
}
try {
const updateBooking = async(req,res)=>{
    // Logic to update a booking
    const {id} = req.params;
    const {status} = req.body;
    const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

    const booking = await bookingModel.findByPk(id);
    if(!booking){
        return res.status(404).json({error: 'Booking not found'});
    }
    bookingModel.update({status},{
        where: {id}
    });
     if (status === 'CONFIRMED' || status === 'CANCELLED') {
    const mailInfo = {
    to: booking.user_email,
    subject: `Booking ${status}`,
    html : html(booking, status)
  };
  await sendMail(mailInfo);
    }

return res.json({ message: 'Booking status updated successfully' })


            }
} catch (error) {
    console.error("Error defining updateBooking function:", error);
}
module.exports= {createBooking,getAllBookings,getSingleBooking, updateBooking};