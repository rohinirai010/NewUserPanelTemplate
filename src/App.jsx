import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import ProtectedRoute from "../src/routes/ProtectedRoute";

import "./css/style.css";

import './i18n';



// User Side imports
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordRecovery from "./pages/PasswordRecovery";

function App() {

  const location = useLocation();
  const dispatch = useDispatch();
  

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change


  return (
    <>
      <Routes>
        {/* Routes for Admin */}
        {/* <Route exact path="/admin/profile" element={<AdminProfile />} />
        <Route exact path="/admin/payment-approval" element={<PaymentApproval />} /> */}

        {/* <Route exact path="/admin/dashboard" element={<AdminDashboard />} /> */}
        {/* <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin/register" element={<Register />} />
        <Route exact path="/admin/profile" element={<AdminProfile />} />
        <Route exact path="/admin/my-referrals" element={<MyReferrals />} />
        <Route exact path="/admin/my-downline" element={<MyDownline />} />
        <Route exact path="/admin/trading-accounts" element={<TradingAccounts />} />
        <Route exact path="/admin/economic-calender" element={<EconomicCalender />} />
        <Route exact path="/admin/platforms" element={<Platforms />} />
        <Route exact path="/admin/level-income" element={<LevelIncome />} />
        <Route exact path="/admin/referral-income" element={<SpotReferralIncome />} />
        <Route exact path="/admin/ib-dashboard" element={<IBDashboard />} />
        <Route exact path="/admin/reports" element={<Reports />} />
        <Route exact path="/admin/ib-levels" element={<IBLevels />} />
        <Route exact path="/admin/payment-history" element={<PaymentHistory />} />
        <Route exact path="/admin/ticket-management" element={<HelpDesk />} /> */}

        {/* Routes for User */}

        <Route
          exact
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route exact path="/" element={<Login />} />
        <Route exact path="/password-recover" element={<PasswordRecovery />} />
        <Route exact path="/user/register" element={<Register />} />
       
        {/* <Route exact path="/members-list" element={<MembersList />} />

        <Route exact path="/edit-info" element={<EditMemberInfo />} />
        <Route exact path="/edited-info" element={<MembersEditedSummary />} />
        <Route exact path="/create-subadmin" element={<CreateSubAdmin />} />
        <Route exact path="/kyc-history" element={<KycHistory />} />
        <Route exact path="/add-qr" element={<AddQRCode />} />
        <Route exact path="/deposit-history" element={<DepositHistory />} />
        <Route exact path="/withdraw-history" element={<WithdrawalHistory />} /> */}
      </Routes>
    </>
  );
}

export default App;