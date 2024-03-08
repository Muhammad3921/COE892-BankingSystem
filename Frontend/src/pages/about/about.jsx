import React from "react";
import './about.css';
function About() {
	document.title = 'About Page';
	return (
		<div>

			<main className="page">
				<h2 className="left-box">Our Shared Challenge</h2>
				<div className="about__image"></div>
				<div className="left-box">
					<p>In a world where health is paramount, a group of friends faced a common struggle - tracking medication. Juggling multiple prescriptions, varied dosages, and different schedules created a chaotic scenario. The need for a cohesive solution led to the birth of Pharmaceutical Portal.</p>
					<br/>
					<hr className="separator" />
				</div>
				

				<h2 className="left-box">Our Solution: Pharmaceutical Portal Web App</h2>
				<div>
					<div className="left-box">
						<h3>Simplifying Medication Management</h3>
						<p>Pharmaceutical Portal is a user-friendly web app designed to streamline the process of tracking and managing medications. Our solution goes beyond basic reminders; it integrates notification services and a calendar system to ensure you never miss a dose.</p>
					</div>
					<div className="left-box">
						<h3>Seamlessly Integrated Notification Services</h3>
						<p>Receive timely reminders through the app, keeping you informed about when to take your medication. Customizable notification preferences cater to individual needs, making it a tailored experience for each user.</p>
					</div>
					<div className="left-box">
						<h3>Calendar Integration for Effortless Planning</h3>
						<p>Pharmaceutical Portal syncs with your calendar, providing a comprehensive overview of your medication schedule. This integration ensures that your medication plan aligns seamlessly with your daily activities, reducing the chances of missed doses.</p>
						<br/>
					<hr className="separator" />
					</div>
				</div>

				<h2 className="left-box">Take a Deep Dive with Pharmaceutical Portal</h2>
				<div>
					<div className="left-box">
						<h3>Comprehensive Medication Information</h3>
						<p>Beyond its tracking capabilities, Pharmaceutical Portal empowers users with in-depth knowledge about their medications. Take a deep dive into:</p>
						<h4>1. Side Effects</h4>
						<p>-Access detailed information on potential side effects associated with your medication.</p>
						<h4>2. Dosage Guidance</h4>
						<p>-Understand the correct dosage for each medication, ensuring safe and effective use.</p>
						<h4>3. Personalized Insights</h4>
						<p>-Receive tailored insights based on your medication history and preferences.</p>
						<h4>4. Interaction Warnings</h4>
						<p>-Stay informed about potential interactions between different medications.</p>
					</div>
					<div className="left-box">
						<h3>Educational Resources for Empowered Health</h3>
						<p>Pharmaceutical Portal offers a library of resources to enhance your understanding of medications, fostering a proactive approach to your health. Stay informed, make informed decisions, and take control of your well-being with Pharmaceutical Portal.</p>
						<br/>
					<hr className="separator" />
					</div>
				</div>

				<br />
				<br />
				<br />
				<p className="left-box">Join us on the journey to simplified medication management and empowered health with Pharmaceutical Portal. Your well-being, our priority.</p>
			</main>


		</div>


	)
}

export default About
