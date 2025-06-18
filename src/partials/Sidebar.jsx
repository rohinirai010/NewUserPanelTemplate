import React, { useState } from "react";
import {
  Home,
  UserPlus,
  Wallet,
  DollarSign,
  Zap,
  ShoppingCart,
  Settings,
  Mail,
  ChevronDown,
  Network,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";

const Sidebar = ({ isExpanded, setIsExpanded, activeItem, setActiveItem }) => {
  const [dropdownStates, setDropdownStates] = useState({
    Networks: false,
    Tools: false,
  });

  const menuItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: Network, label: "Networks", id: "networks", hasDropdown: true },
    { icon: UserPlus, label: "Register", id: "register" },
    { icon: Wallet, label: "E-Wallet", id: "ewallet" },
    { icon: DollarSign, label: "Payout", id: "payout" },
    { icon: Zap, label: "E-pin", id: "epin" },
    { icon: ShoppingCart, label: "Shopping", id: "shopping" },
    { icon: Settings, label: "Tools", id: "tools", hasDropdown: true },
    { icon: Mail, label: "Mail Box", id: "mailbox" },
  ];

  const toggleDropdown = (itemLabel) => {
    setDropdownStates((prev) => ({
      ...prev,
      [itemLabel]: !prev[itemLabel],
    }));
  };

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (item.hasDropdown) {
      toggleDropdown(item.label);
    }
  };

  // First 5 items for collapsed view
  const collapsedItems = menuItems.slice(0, 5);

  return (
    <>
      {/* Collapsed Sidebar - Always visible on left */}

      <div className="fixed left-0 top-1/4 h-1/2  z-20 w-24 hidden lg:flex flex-col items-center py-4 space-y-4">
        {collapsedItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="relative group">
              <button
                onClick={() => handleItemClick(item)}
                className={`p-2 rounded-full transition-colors  w-12 h-12 flex items-center justify-center cursor-pointer ${
                  activeItem === item.id
                    ? "bg-[#954cea] text-gray-200"
                    : "text-gray-500 hover:bg-purple-100"
                }`}
              >
                <IconComponent className="w-6 h-6" />
              </button>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-blue-400/30 text-[#000] text-[11px] px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-30">
                {item.label}
                {/* Tooltip arrow */}
                <div className="absolute -left-[5px]  top-1/2 transform -translate-y-1/2 -translate-0-x-full w-0 h-0 border-t-5 border-b-5 border-r-5 border-transparent border-r-gray-800"></div>
              </div>
              
            </div>
          );
        })}

        {/* Expand/Collapse Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1  rounded-tl-xl rounded-br-xl text-gray-200 bg-gradient-to-br from-[#836fe8] hover:from-[#ac45cc] via-[#4228c5] to-[#ac45cc] hover:to-[#836fe8] hover:scale-105 flex items-center justify-center mb-4 cursor-pointer"
        >
          <ChevronsRight className="w-6 h-6" />
        </button>
      </div>
      <div className="fixed left-0 bottom-0 w-full  z-20  flex lg:hidden flex-row items-center justify-between py-3 bg-gray-100 shadow-lg px-4 sm:px-8">
        {collapsedItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className={`p-2 rounded-full transition-colors  w-12 h-12 flex items-center justify-center cursor-pointer ${
                activeItem === item.id
                  ? "bg-[#954cea] text-gray-200"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <IconComponent className="w-6 h-6" />
            </button>
          );
        })}
      </div>

      {/* Expanded Sidebar Overlay */}

      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/30 bg-opacity-50 z-45 transition-opacity duration-700 ease-in-out ${
            isExpanded
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsExpanded(false)}
        />

        {/* Full Sidebar */}
        <div
          className={`fixed left-0 top-0 h-full bg-[#f6f4fe] shadow-xl z-50 w-64 transition-all duration-700 ease-in-out transform ${
            isExpanded ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo Header */}
          <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-lg">LOGO</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1  rounded-tl-xl rounded-br-xl text-gray-200 bg-gradient-to-br from-[#836fe8] hover:from-[#ac45cc] via-[#4228c5] to-[#ac45cc] hover:to-[#836fe8] hover:scale-105 flex items-center justify-center  cursor-pointer"
            >
              <ChevronsLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-2 space-y-1 mt-4">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index}>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                      activeItem === item.id
                        ? "bg-purple-100 text-purple-700 border-l-4 border-purple-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-1 bg-[#ffffff] rounded-full">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[12px] font-semibold">
                        {item.label}
                      </span>
                    </div>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform ${
                          dropdownStates[item.label] ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Content */}
                  {item.hasDropdown && dropdownStates[item.label] && (
                    <div className="ml-6 mt-1 space-y-[2px]">
                      <button className="block w-full text-left px-3 py-2 text-[12px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                        Option 1
                      </button>
                      <button className="block w-full text-left px-3 py-2 text-[12px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                        Option 2
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </>
    </>
  );
};

export default Sidebar;