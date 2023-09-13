import React, {useState} from 'react'
import emailjs from "emailjs-com";
import '../Style/StudentF.css';

export default function StudentForm() {

    const [data, setData] = useState({
        name: '',
        email: '',
    });

    const [emailSubject, setEmailSubject] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleChange = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    const handleEmailChange = (e) => setEmailSubject(e.target.value);
    const handleMessageChange = (e) => setEmailMessage(e.target.value);

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

            // Send email
            sendEmail();
        } else {
            console.error('Submission failed');
        }
    };

    const sendEmail = () => {
        // Your Email.js configuration
        const emailService = 'service_7jnl14s'; // Replace with your Email.js service ID
        const emailTemplate = 'template_eh24x34'; // Replace with your Email.js template ID
        const userId = 'k1v0FLc-9rb5d4uuU'; // Replace with your Email.js user ID

        emailjs
            .send(emailService, emailTemplate, {
                to_email: data.email,
                subject: emailSubject,
                message: emailMessage,
            }, userId)
            .then((response) => {
                console.log('Email sent successfully:', response);
                setIsEmailSent(true);
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
                setIsEmailSent(false);
            });
    };

    return (
        <>
            <div className="App">
                <h1>Student Information Form</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Student Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    /><br/><br/>
                    <input
                        type="email"
                        placeholder="Student Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                    /><br/><br/>
                    <button type="submit" onClick={sendEmail}>Submit</button>
                </form>
            </div>
        </>
    )
}
