import React from "react";
import "./contact.css";
function Contact() {
  return (
    <div>
      <main className="page">
        <div className="service__image"></div>
        <h2 className="left-box">Features and Services Provided</h2>
        <div>
          <div className="left-box">
            <h3>Account management</h3>
            <p>
              Clients can open, close, and manage their accounts, with their
              accounts accessible from any branch in the institution.
            </p>
          </div>
          <div className="left-box">
            <h3>Transaction History</h3>
            <p>
              A centralized database of client transaction history is maintained
              allowing easy access and tracking of financial activities.
            </p>
          </div>
          <div className="left-box">
            <h3>Client Account Details</h3>
            <p>
              Client account details availible, including balances, account
              types such as savings or checkings, account numbers, account
              status and client's personal information.
            </p>
          </div>
          <div className="left-box">
            <h3>Seamless Transactions</h3>
            <p>
              Transactions are processed and synchronized jointly between all
              branches, ensuring seamless financial operations within and across
              branches.
            </p>
          </div>
          <div className="left-box">
            <h3>Cash Management</h3>
            <p>
              Branch-specific cash management operations are enabled to monitor
              and track cash flow within each branch.
            </p>
          </div>
          <div className="left-box">
            <h3>Staff Scheduling</h3>
            <p>
              Branch-specific staff scheduling capabilities are provided to
              manage employee shifts and ensure efficient staffing across
              branches.
            </p>
          </div>
          <div className="left-box">
            <h3>Security Measures</h3>
            <p>
              Robust security measures are implemented to prevent unauthorized
              access to confidential banking information and ensure data
              privacy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact;
