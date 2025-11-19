

const {Router}= require('express');
const { createBooking,getAllBookings,getSingleBooking,updateBooking} = require('../../controller/booking/booking.controller');
const router = Router();

// Public route to create a booking
router.route('/booking').post(createBooking).get(getAllBookings);
router.route('/booking/:id').get(getSingleBooking)
router.route('/booking/:id/status').put(updateBooking);

module.exports=router;