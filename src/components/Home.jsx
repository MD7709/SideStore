import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';
import '../App.css';

const Home = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    const convert24HourTo12Hour = (time) => {
        const [hour, minute] = time.split(':');
        const period = hour >= 12 ? 'PM' : 'AM';
        const adjustedHour = hour % 12 || 12;
        return `${adjustedHour}:${minute} ${period}`;
    };

    const calculateEndTime = (startTime, duration) => {
        const [hour, minute] = startTime.split(':').map(Number);
        const endTime = new Date(0, 0, 0, hour, minute + duration);
        const endHour = endTime.getHours();
        const endMinute = endTime.getMinutes();
        const period = endHour >= 12 ? 'PM' : 'AM';
        const adjustedHour = endHour % 12 || 12;
        return `${adjustedHour}:${endMinute < 10 ? '0' : ''}${endMinute} ${period}`;
    };

    const fetchAppointments = async () => {
        try {
            console.log('Fetching appointments...');
            const response = await fetch('https://your-deployed-backend/api/appointments'); // Use the correct API endpoint

            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`Failed to fetch appointments: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Fetched data:', data);

            // Process and format data as needed
            const formattedData = data.map(item => ({
                id: item.id,
                serviceName: item.service_offer_name || 'Service Name',
                status: item.is_cancelled ? 'Cancelled' : (item.is_completed ? 'Completed' : 'Pending'),
                username: item.customer_name || 'Username',
                startTime: convert24HourTo12Hour(item.time_in) || 'Start Time',
                endTime: calculateEndTime(item.time_in, item.duration) || 'End Time',
                stylist: item.staff_name || 'Stylist',
                customerType: item.customer_type || 'Customer Type',
                paidAmount: parseFloat(item.amount_paid).toFixed(2) || '0.00',
                duration: item.duration || 'Duration',
                paymentStatus: item.payment_mode || 'Payment Mode'
            }));
            setAppointments(formattedData.slice(0, 7)); // Limiting to 7 appointments
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('Failed to fetch appointments. Please try again later.');
            setAppointments([]); // Clear appointments on error
        }
    };

    useEffect(() => {
        fetchAppointments();
        const interval = setInterval(fetchAppointments, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container">
            <div className="side-section"></div>
            <div className="main-section">
                {error && <div className="error-message">{error}</div>}
                <div className="appointment-cards">
                    {appointments.map(appointment => (
                        <Appointment key={appointment.id} appointment={appointment} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
