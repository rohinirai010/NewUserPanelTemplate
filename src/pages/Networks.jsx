import React, { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useSelector } from "react-redux";
import  {GenealogyTree} from "../partials/networks/NetworksPageReusableComponents";

// Main Networks Page
const NetworksPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("networks");
  const [activeTab, setActiveTab] = useState("genealogy");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const tabs = [
    { id: "genealogy", label: "Genealogy Tree" },
    { id: "sponsor", label: "Sponsor Tree" },
    { id: "tree-view", label: "Tree View" },
    { id: "downline", label: "Downline Members" },
    { id: "referral", label: "Referral Members" },
  ];

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleReset = () => {
    setSearchQuery("");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "genealogy":
        return <GenealogyTree />;
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-lg mb-2">Coming Soon</div>
              <div className="text-gray-500">
                This feature will be available soon.
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex h-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Networks Content */}
        <main className="flex-1 overflow-hidden px-4 py-2 lg:ml-20">
          {/* Page Header */}
          <div className="mb-4">
            <h2 className="block lg:hidden text-lg font-medium mb-1 ">
              Networks
            </h2>
            <p className="text-gray-600 text-sm">
              Manage your network structure and relationships
            </p>
          </div>

          {/* Tab Navigation with Search */}
          <div className="bg-white rounded-xl shadow-sm mb-3">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-2 ">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-colors ${
                      activeTab === tab.id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Section */}
              {/* <div className="flex flex-row items-center space-x-2">
                <div className="flex flex-row gap-2">

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search network..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 sm:pl-9 pr-2 sm:pr-4 py-0.5 sm:py-1.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-[11px] sm:text-xs w-36 sm:w-60"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3  sm:w-4 h-3 sm:h-4" />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-3 py-0.5 sm:py-1.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors text-xs font-semibold"
                >
                  Search
                </button>
                </div>
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors text-xs font-semibold"
                >
                  Reset
                </button>
              </div> */}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden mb-[5rem]">{renderTabContent()}</div>
        </main>

        {/* Footer */}
        <footer className="hidden lg:block bg-white border-t p-4 text-center lg:ml-24">
          <p className="text-sm text-gray-500">
            Copyright @ All right reserved. 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NetworksPage;
