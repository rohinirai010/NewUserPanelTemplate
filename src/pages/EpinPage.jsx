import React, { useState, useMemo } from "react";
import {
  Filter,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  X,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Wallet,
  Send,
} from "lucide-react";
import { DataTable } from "../components/BinarySoftwareCommonComponents/DataTable";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

// E-Wallet Page Component
export const EpinPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("ewallet");
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [activeWalletTab, setActiveWalletTab] = useState("e-wallet"); // e-wallet or e-pin
  const [activeTab, setActiveTab] = useState("statement"); // statement, transfer-history, my-earnings
  const [statusFilter, setStatusFilter] = useState("");
  const [showTransferSlider, setShowTransferSlider] = useState(false);
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transactionFee, setTransactionFee] = useState("10.00");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleProfilePanel = () => {
    setIsProfileExpanded(!isProfileExpanded);
  };

  // Sample e-wallet statement data
  const sampleStatementData = [
    {
      id: 1,
      date: "25 Mar 2025 15:43:15",
      description: "E-pin refunded",
      amount: 100.0,
      type: "credit",
      transactionId: "TXN001",
      balance: 15.84,
    },
    {
      id: 2,
      date: "25 Mar 2025 15:43:14",
      description: "E-pin refunded",
      amount: 100.0,
      type: "credit",
      transactionId: "TXN002",
      balance: 14.84,
    },
    {
      id: 3,
      date: "25 Mar 2025 15:43:12",
      description: "E-pin refunded",
      amount: 100.0,
      type: "credit",
      transactionId: "TXN003",
      balance: 13.84,
    },
    {
      id: 4,
      date: "25 Mar 2025 15:43:11",
      description: "E-pin refunded",
      amount: 100.0,
      type: "credit",
      transactionId: "TXN004",
      balance: 12.84,
    },
    {
      id: 5,
      date: "25 Mar 2025 15:36:58",
      description: "Payout Request",
      amount: 10.0,
      type: "debit",
      transactionId: "TXN005",
      balance: 6.84,
    },
  ];

  // Sample transfer history data
  const sampleTransferData = [
    {
      id: 1,
      date: "24 Mar 2025 10:30:22",
      description: "Fund Transfer to User123",
      amount: 50.0,
      type: "debit",
      transactionId: "TXN101",
      status: "Completed",
    },
    {
      id: 2,
      date: "23 Mar 2025 14:22:11",
      description: "Fund Transfer from User456",
      amount: 25.0,
      type: "credit",
      transactionId: "TXN102",
      status: "Completed",
    },
  ];

  // Sample earnings data
  const sampleEarningsData = [
    {
      id: 1,
      date: "20 Mar 2025 09:15:33",
      description: "Commission Earnings",
      amount: 15.25,
      type: "credit",
      transactionId: "TXN201",
      source: "Referral Bonus",
    },
    {
      id: 2,
      date: "18 Mar 2025 16:45:12",
      description: "Level Bonus",
      amount: 8.75,
      type: "credit",
      transactionId: "TXN202",
      source: "Team Performance",
    },
  ];

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "statement":
        return sampleStatementData;
      case "transfer-history":
        return sampleTransferData;
      case "my-earnings":
        return sampleEarningsData;
      default:
        return sampleStatementData;
    }
  };

  // Define columns based on active tab
  const getColumns = () => {
    const baseColumns = [
        {
            key: "description",
            header: "Description",
            render: (value) => (
              <div className="text-[12px] sm:text-sm text-gray-700">{value}</div>
            ),
          },
          {
            key: "amount",
            header: "Amount",
            render: (value, item) => (
              <div className="flex items-center gap-1">
                <span
                  className={`text-[12px] sm:text-sm font-semibold ${
                    item.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.type === "credit" ? "+" : "-"}${Math.abs(value).toFixed(2)}
                </span>
                {item.type === "credit" ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
              </div>
            ),
          },
      {
        key: "date",
        header: "Transaction Date",
        render: (value) => (
          <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
        ),
      },
     
     
    ];

    if (activeTab === "statement") {
      baseColumns.push({
        key: "balance",
        header: "Balance",
        render: (value) => (
          <div className="text-[12px] sm:text-sm font-semibold text-purple-600">
            ${value}
          </div>
        ),
      });
    }

    if (activeTab === "transfer-history") {
      baseColumns.push({
        key: "status",
        header: "Status",
        render: (value) => (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3" />
            {value}
          </span>
        ),
      });
    }

    if (activeTab === "my-earnings") {
      baseColumns.push({
        key: "source",
        header: "Source",
        render: (value) => (
          <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
        ),
      });
    }

    return baseColumns;
  };

  // Filter data by status
  const filteredData = useMemo(() => {
    const currentData = getCurrentData();
    if (!statusFilter || statusFilter === "all") return currentData;
    return currentData.filter((item) =>
      item.type?.toLowerCase().includes(statusFilter.toLowerCase())
    );
  }, [statusFilter, activeTab]);

  // Calculate stats for e-wallet
  const eWalletStats = {
    balance: 15.84,
    credited: sampleStatementData
      .filter((item) => item.type === "credit")
      .reduce((sum, item) => sum + item.amount, 0),
    debited: sampleStatementData
      .filter((item) => item.type === "debit")
      .reduce((sum, item) => sum + item.amount, 0),
    totalTransactions: sampleStatementData.length,
  };

  const handleFundTransfer = () => {
    setShowTransferSlider(true);
  };

  const handleSubmitTransfer = (e) => {
    e.preventDefault();
    if (!transferTo || !transferAmount || !transactionPassword) {
      alert("Please fill in all required fields");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setShowTransferSlider(false);
      setShowSuccessMessage(true);
      setTransferTo("");
      setTransferAmount("");
      setTransactionPassword("");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1000);
  };

  // Export configuration for DataTable
  const exportConfig = {
    filename: `ewallet-${activeTab}-report`,
    title: `E-Wallet ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report`,
    searchPlaceholder: `Search ${activeTab}...`,
  };

  return (
    <>
      <div className="w-[100%] flex h-screen bg-gray-50">
       
      </div>
    </>
  );
};

export default EpinPage;