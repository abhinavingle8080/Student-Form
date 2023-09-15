import React, {useState} from 'react'
import emailjs from '@emailjs/browser';
import '../styles/StudentForm.css';
import logo from '../img/logo.png';


export default function StudentForm() {

    const [showCoupon, setShowCoupon] = useState(false);

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        dob: '',
        gender: '',
        contact: '',
        parentContact: '',
        education: '',
        itLevel: '',
        fees: '',
        paidFees: '',
        coupon: ''
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setData({...data, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send student data to the server
        const response = await fetch('https://sheetdb.io/api/v1/yzxopq700oss7', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Submission successful');

            sendEmail();
        } else {
            console.error('Submission failed');
        }
    };

    const sendEmail = () => {
        // Your Email.js configuration
        const emailService = 'service_7jnl14s';
        const emailTemplate = 'template_eh24x34';
        const publicKey = 'k1v0FLc-9rb5d4uuU';

        const templateParams = {
            from_name: 'Non Criterion Technology',
            to_email: data.email,
            to_name: data.firstName,
        }

        emailjs
            .send(emailService, emailTemplate, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent successfully:', response);
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
            });
    };


    async function applyCoupon() {

        console.log("apply coupon in progress");

        try {
            // Fetch the list of valid coupons
            const response = await fetch('https://sheetdb.io/api/v1/wczhv5i1nbin5', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('Failed to fetch coupons');
                return;
            }

            const couponData = await response.json();
            const validCoupons = couponData.map((coupon) => coupon.code);

            // Check if the entered coupon is valid
            if (validCoupons.includes(data.coupon)) {
                // Apply a discount based on the coupon code
                if (data.coupon === couponData.code) {
                    data.paidFees -= couponData.amount; // 30% discount
                } else if (data.coupon === couponData.code) {
                    data.paidFees -= couponData.amount; // 20% discount
                } else if (data.coupon === couponData.code) {
                    data.paidFees -= couponData.amount; // 10% discount
                }

                // Update the UI or show a message indicating the discount was applied
            } else {
                // Handle the case where the coupon is not valid
                // You can display an error message or take other actions
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
        }
    }


    return (
        <>
            <div className="container mt-5">
                <div className="student-form">
                    <img className={"logo"} src={logo}/>
                    <h2 className="form-heading">Registration Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={data.age}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={data.dob}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="YYYY-MM-DD"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="itLevel">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={data.gender}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="Beginner">Male</option>
                                <option value="Intermediate">Female</option>
                                <option value="Advanced">Others</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact:</label>
                            <input
                                type="tel"
                                id="contact"
                                name="contact"
                                value={data.contact}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="parentContact">Parent Contact:</label>
                            <input
                                type="tel"
                                id="parentContact"
                                name="parentContact"
                                value={data.parentContact}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="education">Education:</label>
                            <select
                                id="education"
                                name="education"
                                value={data.education}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="High School">High School</option>
                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                <option value="Master's Degree">Master's Degree</option>
                                <option value="Ph.D.">Ph.D.</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="itLevel">Level in IT:</label>
                            <select
                                id="itLevel"
                                name="itLevel"
                                value={data.itLevel}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Advanced">Experienced</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="paidFees">Paid Fees:</label>
                            <input
                                type="number"
                                id="paidFees"
                                name="paidFees"
                                value={data.paidFees}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button
                            className="coupon-btn"
                            type="button"
                            onClick={() => setShowCoupon(!showCoupon)}
                        >
                            {showCoupon ? 'Hide Coupon' : 'Apply Coupon -->'}
                        </button>
                        {showCoupon && (
                            <div className="form-group">
                                <label htmlFor="coupon">Coupon:</label>
                                <input
                                    type="text"
                                    id="coupon"
                                    name="coupon"
                                    value={data.coupon}
                                    onChange={handleChange}
                                    onInput={applyCoupon}
                                    className="form-control"
                                />
                            </div>
                        )}
                        <button className="btn btn-primary submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
