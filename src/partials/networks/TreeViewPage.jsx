import React, { useState } from "react";
import { User, Plus, Minus, Info, ChevronRight } from "lucide-react";

// Sample tree data structure - Array of root nodes to support multiple parents
const sampleTreeData = [
  {
    id: "INF8536507",
    name: "David Andrade",
    level: 1,
    personalPV: 150,
    groupPV: 2500,
    left: 7,
    right: 9,
    totalLeftCarry: 100,
    totalRightCarry: 200,
    children: [
      {
        id: "INF4234484",
        name: "Michael Davis",
        level: 2,
        personalPV: 120,
        groupPV: 800,
        left: 3,
        right: 2,
        totalLeftCarry: 80,
        totalRightCarry: 120,
        children: [
          {
            id: "INF52392884",
            name: "Brent Hall",
            level: 3,
            personalPV: 90,
            groupPV: 300,
            left: 1,
            right: 1,
            totalLeftCarry: 50,
            totalRightCarry: 75,
            children: [
              {
                id: "INF40589561",
                name: "Randall Greene",
                level: 4,
                personalPV: 85,
                groupPV: 250,
                left: 0,
                right: 1,
                totalLeftCarry: 40,
                totalRightCarry: 60,
                children: [
                  {
                    id: "INF90762773",
                    name: "Sean Skinner",
                    level: 5,
                    personalPV: 75,
                    groupPV: 200,
                    left: 0,
                    right: 0,
                    totalLeftCarry: 30,
                    totalRightCarry: 45,
                    children: [
                      {
                        id: "INF47794581",
                        name: "Jose Turner",
                        level: 6,
                        personalPV: 70,
                        groupPV: 180,
                        left: 0,
                        right: 0,
                        totalLeftCarry: 25,
                        totalRightCarry: 35,
                        children: [
                          {
                            id: "SHIRAISHI",
                            name: "shiraishi",
                            level: 7,
                            personalPV: 50,
                            groupPV: 0,
                            left: 0,
                            right: 0,
                            totalLeftCarry: 0,
                            totalRightCarry: 0,
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "INF55326858",
            name: "Jeremy Lee",
            level: 3,
            personalPV: 95,
            groupPV: 350,
            left: 2,
            right: 1,
            totalLeftCarry: 60,
            totalRightCarry: 80,
            children: [
              {
                id: "INF13950839",
                name: "Robert Grimes",
                level: 4,
                personalPV: 80,
                groupPV: 220,
                left: 1,
                right: 0,
                totalLeftCarry: 35,
                totalRightCarry: 55,
                children: [],
              },
              {
                id: "TESTUSER",
                name: "test",
                level: 4,
                personalPV: 65,
                groupPV: 150,
                left: 0,
                right: 1,
                totalLeftCarry: 20,
                totalRightCarry: 40,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "INF91650711",
        name: "Carrie Washington",
        level: 2,
        personalPV: 110,
        groupPV: 900,
        left: 4,
        right: 3,
        totalLeftCarry: 90,
        totalRightCarry: 110,
        children: [],
      },
      {
        id: "INF75481323",
        name: "Barbara Duran",
        level: 2,
        personalPV: 100,
        groupPV: 600,
        left: 2,
        right: 2,
        totalLeftCarry: 70,
        totalRightCarry: 90,
        children: [],
      },
    ],
  },
  {
    id: "INF75481323",
    name: "Barbara Duran",
    level: 1,
    personalPV: 100,
    groupPV: 600,
    left: 2,
    right: 2,
    totalLeftCarry: 70,
    totalRightCarry: 90,
    children: [
      {
        id: "INF22334455",
        name: "Sarah Johnson",
        level: 2,
        personalPV: 130,
        groupPV: 450,
        left: 2,
        right: 1,
        totalLeftCarry: 85,
        totalRightCarry: 95,
        children: [
          {
            id: "INF33445566",
            name: "Mark Wilson",
            level: 3,
            personalPV: 110,
            groupPV: 280,
            left: 1,
            right: 0,
            totalLeftCarry: 45,
            totalRightCarry: 65,
            children: [],
          },
        ],
      },
    ],
  },
];

// TreeNode component
const TreeNode = ({ node, level = 0, isLast = false, parentLines = [] }) => {
  const [isExpanded, setIsExpanded] = useState(level < 0); // Auto-expand first 2 levels
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleExpanded = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  // Calculate indentation and connecting lines
  const indent = level * 24;
  const currentLines = [...parentLines, !isLast];

  return (
    <div className="relative">
      {/* Current Node */}
      <div
        className="w-full sm:w-[80%] lg:w-[50%] flex items-center py-1  rounded-lg transition-colors duration-200 relative"
        style={{ paddingLeft: `${indent + 16}px` }}
      >
        {/* Tree Lines */}
        {level > 0 && (
          <div className="absolute left-0 top-0 bottom-0">
            {parentLines.map((shouldDrawLine, index) => (
              <div
                key={index}
                className={`absolute w-px bg-gray-300 ${
                  shouldDrawLine ? "h-full" : "h-0"
                }`}
                style={{ left: `${index * 24 + 12}px` }}
              />
            ))}
            <div
              className="absolute w-6 h-px bg-gray-300 top-1/2"
              style={{ left: `${(level - 1) * 24 + 12}px` }}
            />
            <div
              className="absolute w-px bg-gray-300"
              style={{
                left: `${(level - 1) * 24 + 12}px`,
                height: "50%",
                top: isLast ? "auto" : "0",
                bottom: isLast ? "50%" : "auto",
              }}
            />
          </div>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={toggleExpanded}
          className={`w-4 sm:w-5 h-4 sm:h-5 flex items-center justify-center rounded border ${
            hasChildren
              ? "border-gray-400 hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
              : "border-transparent cursor-default"
          } transition-colors duration-200 mr-2`}
          disabled={!hasChildren}
        >
          {hasChildren &&
            (isExpanded ? (
              <Minus className="w-3 h-3 text-gray-600" />
            ) : (
              <Plus className="w-3 h-3 text-gray-600" />
            ))}
        </button>

        <div
          className="flex flex-row items-center gap-2 sm:gap-3 bg-white/50 border rounded-xl px-2 py-1 cursor-pointer"
          onClick={toggleExpanded}
        >
          {/* User Avatar */}
          <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center  shadow-sm">
            <User className="w-4 h-4 text-white" />
          </div>

          {/* User Info */}
          <div className=" flex flex-row items-center gap-12 sm:gap-14">
            <div className="flex flex-col items-start text-[11px] sm:text-[13px]">
              <span className="font-medium text-gray-800">{node.id}</span>
              <span className="text-gray-600">{node.name}</span>
            </div>

            <div className="flex flex-row items-center gap-1.5 sm:gap-2">
              <span className="flex flex-col text-[10px] sm:text-[12px] text-gray-800 bg-gray-100 px-1.5 py-1 border rounded-lg">
                Level {node.level}
              </span>

              {/* Info Icon with Hover */}
              <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Info className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-500 hover:text-blue-500 cursor-help transition-colors duration-200" />

                {/* Info Card */}
                {isHovered && (
                  <div className="absolute left-0 sm:left-5 top-6 z-50 bg-white rounded-xl shadow-2xl border-2 border-gray-100 p-2 sm:p-3 w-50 sm:w-60 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-4">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-[12px] sm:text-[13px] text-gray-800">
                          {node.name}
                        </div>
                        <div className="text-[12px] sm:text-[13px] text-gray-600">
                          {node.id}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 sm:space-y-2 text-[11px] sm:text-[12px]">
                      <div className="flex justify-between items-center p-1.5 sm:p-2 bg-purple-50 rounded-lg">
                        <span className="text-gray-700 font-medium">
                          Personal PV
                        </span>
                        <span className="font-bold text-purple-600">
                          {node.personalPV}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 sm:p-2 bg-blue-50 rounded-lg">
                        <span className="text-gray-700 font-medium">
                          Group PV
                        </span>
                        <span className="font-bold text-blue-600">
                          {node.groupPV}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex justify-between items-center p-1.5 sm:p-2 bg-gray-100 rounded-lg">
                          <span className="text-gray-600">Left</span>
                          <span className="font-bold text-gray-800">
                            {node.left}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 sm:p-2 bg-gray-100 rounded-lg">
                          <span className="text-gray-600">Right</span>
                          <span className="font-bold text-gray-800">
                            {node.right}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-1.5 sm:p-2 bg-green-50 rounded-lg">
                        <span className="text-gray-700 font-medium">
                          Total Left Carry
                        </span>
                        <span className="font-bold text-green-600">
                          {node.totalLeftCarry}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 sm:p-2 bg-orange-50 rounded-lg">
                        <span className="text-gray-700 font-medium">
                          Total Right Carry
                        </span>
                        <span className="font-bold text-orange-600">
                          {node.totalRightCarry}
                        </span>
                      </div>
                    </div>

                    {/* Arrow pointer */}
                    <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l-2 border-t-2 border-gray-100 rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Children */}
      {isExpanded && hasChildren && (
        <div>
          {node.children.map((child, index) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              isLast={index === node.children.length - 1}
              parentLines={currentLines}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main TreeView component
export const TreeViewPage =() => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-8xl mx-auto">
        <div
          className="bg-blue-50/10 rounded-xl shadow-lg border border-gray-200 h-screen overflow-auto"
          style={{
            backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: "10px 10px",
            backgroundPosition: "0 0",
          }}
        >
          {/* Tree Content */}
          <div className="">
            <div className="hidden md:block bg-gray-50 rounded-lg p-4 ">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Click <Plus className="w-4 h-4 inline mx-1" /> to expand or{" "}
                  <Minus className="w-4 h-4 inline mx-1" /> to collapse nodes
                </span>
                <span>
                  Hover over <Info className="w-4 h-4 inline mx-1" /> for
                  detailed information
                </span>
              </div>
            </div>

            <div className="font-mono text-sm px-2 sm:px-5 py-6">
              {sampleTreeData.map((rootNode, index) => (
                <div key={rootNode.id} className={index > 0 ? "mt-2" : ""}>
                  <TreeNode node={rootNode} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}