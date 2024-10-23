import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '@/store/slices/bookingSlice';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const BookingForm = ({ venueId, onClose }) => {
  const dispatch = useDispatch();
  const { venues } = useSelector((state) => state.venue);
  const [formData, setFormData] = useState({
    date: '',
    slot: '',
    type: '',
    alternateDate: '',
    alternateSlot: '',
  });

  const venue = venues.find(v => v._id === venueId || v.id === venueId);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createBooking({ venueId: venueId ,...formData}));
//     onClose();
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createBooking({ venueId: venueId, ...formData })).unwrap();
      toast.success('Booking successfully created!');
      onClose();
    } catch {
      toast.error('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg max-w-md w-full m-4">
        <h2 className="text-2xl font-bold mb-4 text-primary">Book {venue.name}</h2>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slot" className="block text-gray-700 font-bold mb-2">Slot</label>
          <select
            id="slot"
            name="slot"
            value={formData.slot}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select a slot</option>
            <option value="Forenoon">Forenoon</option>
            <option value="Afternoon">Afternoon</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Event Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select event type</option>
            <option value="Cultural">Cultural</option>
            <option value="Official">Official</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="alternateDate" className="block text-gray-700 font-bold mb-2">Alternate Date (Fill Same if No Alternate)</label>
          <input
            type="date"
            id="alternateDate"
            name="alternateDate"
            value={formData.alternateDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="alternateSlot" className="block text-gray-700 font-bold mb-2">Alternate Slot (Fill Same if No Alternate)</label>
          <select
            id="alternateSlot"
            name="alternateSlot"
            value={formData.alternateSlot}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a slot</option>
            <option value="Forenoon">Forenoon</option>
            <option value="Afternoon">Afternoon</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
          >
            Submit Booking
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

BookingForm.propTypes = {
  venueId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookingForm;