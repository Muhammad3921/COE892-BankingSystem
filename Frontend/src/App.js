import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Nav";
import SidePanel from "./components/SidePanel/SidePanel";
import PortalNav from "./components/PortalNav/PortalNav";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import SignUp from "./pages/signUp/signUp";
import Login from "./pages/login/login";
import LogOut from "./pages/logout/logout";
//import Profile from './pages/profile/profile';
import PharmaceuticalPortal from "./pages/home/PharmaceuticalPortal";
import Home from "./pages/home-loggedin/Home";
import "./App.css";
// import Scheduler from './pages/scheduler/scheduler';
// import PrescriptionSubmit from './pages/prescription-submit/prescriptionsubmit';
// import DrugInteractionChecker from './pages/drugInteractionChecker/drugInteractionChecker';
// import DrugSupplyTracker from './pages/drugSupplyTrack/drugSupplyTrack';
// import DrugSideEffectReport from './pages/drugSideEffectReport/drugSideEffectReport';
import PrivateRoute from './privateroute';
import UnPrivateRoute from './unprivateroute';
import LogOutPrivateRoute from './logoutprivateroute';
import BranchHome from "./pages/home-branch-loggedin/BranchHome";
import Etransfer from './pages/etransfer/etransfer'
import TransactionHistory from "./pages/transactionHistory/transactionHistory";

function isAuth() {
  return sessionStorage.getItem("token");
}

function App() {
  return (
    <>
      {(() => {
        if (isAuth() === null) {
          return <Navbar />;
        } else {
          return <PortalNav />;
        }
      })()}

      {(() => {
        if (isAuth() !== null) {
          return <SidePanel />;
        }
      })()}
      <Routes>
        <Route exact path="/home" element={<PrivateRoute />}>
          <Route exact path="/home" element={<Home />} />
        </Route>
        <Route exact path="/home-branch" element={<PrivateRoute />}>
          <Route exact path="/home-branch" element={<BranchHome />} />
        </Route>
        <Route exact path="/" element={<UnPrivateRoute />}>
          <Route exact path="/" element={<PharmaceuticalPortal />} />
        </Route>
        <Route exact path="/about" element={<UnPrivateRoute />}>
          <Route exact path="/about" element={<About />} />
        </Route>
        <Route exact path="/services" element={<UnPrivateRoute />}>
          <Route exact path="/services" element={<Contact />} />
        </Route>
        <Route exact path="/signup" element={<UnPrivateRoute />}>
          <Route exact path="/signup" element={<SignUp />} />
        </Route>
        <Route exact path="/login" element={<UnPrivateRoute />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route exact path='/etransfer' element={<PrivateRoute/>}>
          <Route exact path='/etransfer' element={<Etransfer/>} />
        </Route>
        <Route exact path='/transactionHistory' element={<PrivateRoute/>}>
          <Route exact path='/transactionHistory' element={<TransactionHistory/>} />
        </Route>
        {/* <Route exact path='/profile' element={<PrivateRoute/>}>
          <Route exact path='/profile' element={<Profile/>} />
        </Route>
        <Route exact path='/scheduler' element={<PrivateRoute/>}>
          <Route exact path='/scheduler' element={<Scheduler/>} />
        </Route>
        <Route exact path='/prescriptionsubmit' element={<PrivateRoute/>}>
          <Route exact path='/prescriptionsubmit' element={<PrescriptionSubmit/>} />
        </Route>
        <Route exact path='/drug-interaction-checker' element={<PrivateRoute/>}>
          <Route exact path='/drug-interaction-checker' element={<DrugInteractionChecker/>} />
        </Route>
        <Route exact path='/drug-supply-tracker' element={<PrivateRoute/>}>
          <Route exact path='/drug-supply-tracker' element={<DrugSupplyTracker/>} />
        </Route>
        <Route exact path='/side-effect-report' element={<PrivateRoute/>}>
          <Route exact path='/side-effect-report' element={<DrugSideEffectReport/>} />
        </Route> */}
        <Route exact path="/logout" element={<LogOutPrivateRoute />}>
          <Route exact path="/logout" element={<LogOut />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
