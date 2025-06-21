import React, { useState, useRef, useEffect } from "react";

import {
  Maximize,
  Plus,
  Minus,
  User,
  RotateCcw,
} from "lucide-react";

// Node Component
const TreeNode = ({ node, onAddNode, onToggleCollapse, level = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showInfoCard, setShowInfoCard] = useState(false);
    const leftChildRef = useRef(null);
    const rightChildRef = useRef(null);
    const nodeRef = useRef(null);
    const [childPositions, setChildPositions] = useState({ left: 0, right: 0, distance: 0 });
  
    // Calculate child positions after render
    useEffect(() => {
      if (node && node.children && !node.collapsed) {
        const hasLeftChild = node.children[0];
        const hasRightChild = node.children[1];
        
        // Always show lines if there are children slots (even if empty)
        if (nodeRef.current) {
          requestAnimationFrame(() => {
            const nodeRect = nodeRef.current.getBoundingClientRect();
            const nodeCenter = nodeRect.left + nodeRect.width / 2;
            
            let leftPos = -60; // Default position for left child
            let rightPos = 60; // Default position for right child
            
            // Adjust positions based on actual child elements if they exist
            if (leftChildRef.current && hasLeftChild) {
              const leftRect = leftChildRef.current.getBoundingClientRect();
              leftPos = leftRect.left + leftRect.width / 2 - nodeCenter;
            }
            
            if (rightChildRef.current && hasRightChild) {
              const rightRect = rightChildRef.current.getBoundingClientRect();
              rightPos = rightRect.left + rightRect.width / 2 - nodeCenter;
            }
            
            const distance = Math.abs(rightPos - leftPos);
            
            setChildPositions({
              left: leftPos,
              right: rightPos,
              distance: distance
            });
          });
        }
      }
    }, [node, node?.collapsed, node?.children]);

    const handleNodeClick = () => {
      if (node && onToggleCollapse) {
        onToggleCollapse(node.id);
      }
    };
  
    const handleAddClick = (e, position) => {
      e.stopPropagation();
      onAddNode(position);
    };
  
    if (!node) {
      return (
        <div className="flex flex-col items-center">
          <button
            onClick={(e) => handleAddClick(e, "node")}
            className="w-18 h-18 border-3 border-dashed border-purple-400 rounded-full flex items-center justify-center hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 group shadow-lg hover:shadow-xl"
          >
            <Plus className="w-10 h-10 text-purple-500 group-hover:text-purple-700" />
          </button>
        </div>
      );
    }
  
    return (
      <div className="flex flex-col items-center relative">
        {/* Node */}
        <div
          ref={nodeRef}
          className="relative "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col items-center">

          <div
            onClick={handleNodeClick}
            className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-white shadow-lg z-10 relative"
          >
            <User className="w-10 h-10 text-white drop-shadow-lg" />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 opacity-20 blur-sm"></div>
          </div>
  
          {/* Node Info */}
          <div className="text-center mt-3">
            <div className="font-bold text-[16px] tracking-wide text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border">{node.id}</div>
            <div className="text-base text-gray-600 mt-1 font-medium">
              Left: <span className="text-purple-600 font-semibold">{node.left}</span> | Right: <span className="text-blue-600 font-semibold">{node.right}</span>
            </div>
          </div>
          </div>
  
          {/* Info Card */}
          {isHovered && (
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl border-2 border-gray-100 p-4 z-50 w-72 backdrop-blur-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[18px] text-gray-800">{node.name}</div>
                  <div className="text-[15px] text-gray-700 font-medium">{node.id}</div>
                </div>
              </div>
  
              <div className="space-y-2 text-[16px]">
                <div className="flex justify-between items-center  p-2 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Personal PV</span>
                  <span className="font-bold text-purple-600">{node.personalPV}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Group PV</span>
                  <span className="font-bold text-blue-600">{node.groupPV}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                    <span className="text-gray-600 ">Left</span>
                    <span className="font-bold text-gray-800">{node.left}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                    <span className="text-gray-600 ">Right</span>
                    <span className="font-bold text-gray-800">{node.right}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium ">Total Left Carry</span>
                  <span className="font-bold text-green-600">{node.totalLeftCarry}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
                  <span className="text-gray-700 font-medium ">Total Right Carry</span>
                  <span className="font-bold text-orange-600">{node.totalRightCarry}</span>
                </div>
              </div>
  
              {/* Arrow */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-l-2 border-t-2 border-gray-100 rotate-45"></div>
            </div>
          )}
        </div>
  
        {/* Children */}
        {node.children && node.children.length > 0 && !node.collapsed && (
          <div className="mt-3 relative">
            {/* Main Vertical Line from parent */}
            <div className="flex justify-center mb-0">
              <div className="w-0.5 h-8 bg-gradient-to-b from-purple-400 to-blue-400 shadow-sm"></div>
            </div>
  
            {/* Dynamic horizontal connecting line - Always show when children array exists */}
            <div className="flex justify-center mb-0 relative">
              {(() => {
               
                
                // Always show lines if children array exists (even if slots are empty)
                let leftOffset = childPositions.left || -80;
                let rightOffset = childPositions.right || 80;
                let lineWidth = childPositions.distance || 160;
                
                // Calculate the starting position of the horizontal line
                const lineStartX = Math.min(leftOffset, rightOffset);
                
                return (
                  <div className="relative flex justify-center">
                    <div 
                      className="h-0.5 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 shadow-sm relative" 
                      style={{ 
                        width: `${lineWidth}px`,
                        transform: `translateX(${lineStartX + (lineWidth / 2)}px)`
                      }}
                    >
                      {/* Left Vertical Line - Always show */}
                      <div 
                        className="absolute top-0 w-0.5 h-8 bg-gradient-to-b from-blue-400 to-purple-400 shadow-sm"
                        style={{ 
                          left: `${leftOffset - lineStartX}px`,
                          transform: 'translateX(-50%)'
                        }}
                      ></div>
                      
                      {/* Right Vertical Line - Always show */}
                      <div 
                        className="absolute top-0 w-0.5 h-8 bg-gradient-to-b from-blue-400 to-purple-400 shadow-sm"
                        style={{ 
                          left: `${rightOffset - lineStartX}px`,
                          transform: 'translateX(-50%)'
                        }}
                      ></div>
                      
                      {/* Connecting dots - Always show */}
                      <div 
                        className="absolute top-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-sm"
                        style={{ 
                          left: `${leftOffset - lineStartX}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      ></div>
                      <div 
                        className="absolute top-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-sm"
                        style={{ 
                          left: `${rightOffset - lineStartX}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })()}
            </div>
  
            <div className="flex justify-center space-x-10 mt-8">
              {/* Left Child */}
              <div className="flex flex-col items-center" ref={leftChildRef}>
                {node.children[0] ? (
                  <TreeNode
                    node={node.children[0]}
                    onAddNode={onAddNode}
                    onToggleCollapse={onToggleCollapse}
                    level={level + 1}
                  />
                ) : (
                  <button
                    onClick={(e) => handleAddClick(e, "left")}
                    className="w-18 h-18 border-3 border-dashed border-purple-400 rounded-full flex items-center justify-center hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 group shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-10 h-10 text-purple-500 group-hover:text-purple-700" />
                  </button>
                )}
              </div>
  
              {/* Right Child */}
              <div className="flex flex-col items-center" ref={rightChildRef}>
                {node.children[1] ? (
                  <TreeNode
                    node={node.children[1]}
                    onAddNode={onAddNode}
                    onToggleCollapse={onToggleCollapse}
                    level={level + 1}
                  />
                ) : (
                  <button
                    onClick={(e) => handleAddClick(e, "right")}
                    className="w-18 h-18 border-3 border-dashed border-purple-400 rounded-full flex items-center justify-center hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 group shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-10 h-10 text-purple-500 group-hover:text-purple-700" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
  
        {/* Collapse indicator */}
        {node.children && node.children.length > 0 && node.collapsed && (
          <div className="mt-3">
            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full border">
              ... {node.childrenCount} more
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Genealogy Tree Component
 export const GenealogyTree = () => {
    const [zoomLevel, setZoomLevel] = useState(60);
    const [treeData, setTreeData] = useState({
      id: "INF00123",
      name: "Brent Hall",
      left: 9,
      right: 14,
      personalPV: 150,
      groupPV: 0,
      totalLeftCarry: 0,
      totalRightCarry: 350,
      collapsed: false,
      childrenCount: 2,
      children: [
        {
          id: "INF75681323",
          name: "John Smith",
          left: 7,
          right: 1,
          personalPV: 120,
          groupPV: 50,
          totalLeftCarry: 100,
          totalRightCarry: 200,
          collapsed: false,
          childrenCount: 2,
          children: [
            {
              id: "LANGLANG1",
              name: "Lang Lang",
              left: 6,
              right: 0,
              personalPV: 80,
              groupPV: 30,
              totalLeftCarry: 50,
              totalRightCarry: 100,
              collapsed: false,
              children: [
                {
                  id: "SAM123",
                  name: "Sam Wilson",
                  left: 5,
                  right: 0,
                  personalPV: 60,
                  groupPV: 20,
                  totalLeftCarry: 25,
                  totalRightCarry: 75,
                  collapsed: false,
                  children: [null, null], // Empty children array to show lines
                },
                null,
              ],
            },
            {
              id: "INF3874705",
              name: "Mike Johnson",
              left: 0,
              right: 0,
              personalPV: 90,
              groupPV: 40,
              totalLeftCarry: 60,
              totalRightCarry: 120,
              collapsed: false,
              children: [null, null], // Empty children array to show lines
            },
          ],
        },
        {
          id: "INF18536507",
          name: "Sarah Davis",
          left: 4,
          right: 9,
          personalPV: 110,
          groupPV: 60,
          totalLeftCarry: 80,
          totalRightCarry: 180,
          collapsed: false,
          childrenCount: 4,
          children: [
            {
              id: "INF9165071",
              name: "Alex Brown",
              left: 3,
              right: 0,
              personalPV: 70,
              groupPV: 25,
              totalLeftCarry: 40,
              totalRightCarry: 90,
              collapsed: false,
              children: [
                {
                  id: "INF98459470",
                  name: "Emma White",
                  left: 2,
                  right: 0,
                  personalPV: 50,
                  groupPV: 15,
                  totalLeftCarry: 20,
                  totalRightCarry: 60,
                  collapsed: false,
                  children: [null, null], // Empty children array to show lines
                },
                null,
              ],
            },
            {
              id: "INF42341484",
              name: "David Wilson",
              left: 3,
              right: 5,
              personalPV: 95,
              groupPV: 45,
              totalLeftCarry: 70,
              totalRightCarry: 140,
              collapsed: false,
              children: [
                {
                  id: "INF55326858",
                  name: "Lisa Garcia",
                  left: 1,
                  right: 1,
                  personalPV: 65,
                  groupPV: 20,
                  totalLeftCarry: 30,
                  totalRightCarry: 80,
                  collapsed: false,
                  children: [null, null], // Empty children array to show lines
                },
                {
                  id: "INF52392884",
                  name: "Tom Martinez",
                  left: 0,
                  right: 4,
                  personalPV: 75,
                  groupPV: 35,
                  totalLeftCarry: 50,
                  totalRightCarry: 110,
                  collapsed: false,
                  children: [null, null], // Empty children array to show lines
                },
              ],
            },
          ],
        },
      ],
    });
  
    const handleZoomIn = () => {
      setZoomLevel((prev) => Math.min(prev + 5, 200));
    };
  
    const handleZoomOut = () => {
      setZoomLevel((prev) => Math.max(prev - 5, 50));
    };
  
    const handleRefresh = () => {
      setZoomLevel(100);
      // Reset tree data or fetch fresh data
    };
  
    const handleFullscreen = () => {
      const element = document.getElementById("tree-container");
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    };
  
    const handleAddNode = (position) => {
      // Navigate to register page
      console.log("Adding node at position:", position);
    };
  
    const handleToggleCollapse = (nodeId) => {
      const toggleNodeCollapse = (node) => {
        if (node.id === nodeId) {
          return { ...node, collapsed: !node.collapsed };
        }
        if (node.children) {
          return {
            ...node,
            children: node.children.map((child) =>
              child ? toggleNodeCollapse(child) : child
            ),
          };
        }
        return node;
      };
  
      setTreeData((prevData) => toggleNodeCollapse(prevData));
    };
  
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg h-full flex flex-col border border-gray-200">
        {/* Tree Container */}
        <div
          id="tree-container"
          className="flex-1 overflow-auto p-4 rounded-xl bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50"
        >
          <div className="flex flex-row items-center justify-end space-x-2 mb-4">
            <button
              onClick={handleZoomOut}
              className="p-1   rounded-xl bg-white hover:bg-gray-100 border-2 border-gray-200 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm font-bold px-3 py-1  bg-white rounded-xl border-2 border-gray-200 shadow-md">{zoomLevel}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 rounded-xl bg-white hover:bg-gray-100 border-2 border-gray-200 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              title="Zoom In"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleRefresh}
              className="p-1 rounded-xl bg-white hover:bg-gray-100 border-2 border-gray-200 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              title="Refresh"
            >
              <RotateCcw className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleFullscreen}
              className="p-1 rounded-xl bg-white hover:bg-gray-100 border-2 border-gray-200 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              title="Fullscreen"
            >
              <Maximize className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div
            className="flex justify-center items-start min-h-full"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
            }}
          >
            <TreeNode
              node={treeData}
              onAddNode={handleAddNode}
              onToggleCollapse={handleToggleCollapse}
            />
          </div>
        </div>
      </div>
    );
  };