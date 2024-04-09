import React from "react";

const LoadingEffect = () => {
  const loadingContainerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const loadingWaveStyle = {
    width: "300px",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  };

  const loadingBarStyle = {
    width: "20px",
    height: "10px",
    margin: "0 5px",
    backgroundColor: "#3498db",
    borderRadius: "5px",
    animation: "loading-wave-animation 1s ease-in-out infinite",
  };

  const loadingBar2Style = {
    ...loadingBarStyle,
    animationDelay: "0.1s",
  };

  const loadingBar3Style = {
    ...loadingBarStyle,
    animationDelay: "0.2s",
  };

  const loadingBar4Style = {
    ...loadingBarStyle,
    animationDelay: "0.3s",
  };

  return (
    <div style={loadingContainerStyle}>
      {" "}
      <div style={loadingWaveStyle}>
        {" "}
        <div style={loadingBarStyle}></div> <div style={loadingBar2Style}></div>{" "}
        <div style={loadingBar3Style}></div>{" "}
        <div style={loadingBar4Style}></div>{" "}
      </div>
    </div>
  );
};

export default LoadingEffect;
