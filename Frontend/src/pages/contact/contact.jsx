import React from 'react'
import './contact.css';
function Contact() {
    return (
        <div>

        <main className="page">
            <div className="service__image"></div>
            <h2 className="left-box">Features and Services Provided</h2>
            <div>
                <div className="left-box">
                    <h3>Drug Interaction Checker</h3>
                    <p>This tool allows patients and healthcare professionals to input multiple drugs and check for potential interactions, ensuring safe medication management.</p>
                </div>
                <div className="left-box">
                    <h3>Scheduler & Calendar View</h3>
                    <ul>
                        <li><p>Input medication schedules to keep track of your medication routine.</p></li>
                        <li><p>Book, view, cancel, and reschedule doctor appointments, providing flexibility and convenience.</p></li>
                        <li><p>Receive notifications for upcoming appointments and medication times, ensuring that both patients and healthcare providers are well-informed and coordinated.</p></li>
                    </ul>
                </div>
                <div className="left-box">
                    <h3>Side Effect Reporting</h3>
                    <p>Report any side effects experienced from medications through a user-friendly frontend, enhancing communication and patient safety.</p>
                </div>
                <div className="left-box">
                    <h3>Storing Prescription Information</h3>
                    <p>Facilitates the uploading and storing of prescription details, ensuring easy and quick access to crucial medication information.</p>
                </div>
                <div className="left-box">
                    <h3>Comprehensive Medication Information</h3>
                    <p>Empower yourself with in-depth knowledge about your medications. Our Portal's tracking capabilities provide essential details at your fingertips.</p>
                </div>
                <div className="left-box">
                    <h3>Patient Profile</h3>
                    <p>Access and manage your general and medical information, including current and past medications, and medical history.</p>
                </div>
                <div className="left-box">
                    <h3>Storing Prescription Information</h3>
                    <p>Facilitates the uploading and storing of prescription details, ensuring easy and quick access to crucial medication information.</p>
                </div>
            </div>

            
        </main>


    </div>
    )
}

export default Contact 