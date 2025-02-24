import React from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const MyGrid = ({ layoutData, cols, rowHeight, width }) => { 
  return (
    <GridLayout
      className="layout"
      layout={layoutData}
      cols={cols}
      rowHeight={rowHeight}
      width={width}
      isDraggable={true}
      isResizable={true}
    >
      {layoutData.map((item) => (
        <div 
          key={item.i} 
          style={{
            background: "#1976d2",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px"
          }}
        >
          Box {item.i}
        </div>
      ))}
    </GridLayout>
  );
};

export default MyGrid;
