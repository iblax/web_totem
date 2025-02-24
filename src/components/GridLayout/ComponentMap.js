import React, { lazy } from "react";

// Lazy load per migliorare le prestazioni
const SelfieComponent = lazy(() => import("../Camera/SelfieCamera.jsx"));
const CustomComponent1 = () => <div style={{ padding: "10px" }}>📦 Primo Box</div>;
const CustomComponent2 = () => <button style={{ }}>🔘 Cliccami</button>;
const CustomComponent3 = () => <img src="https://picsum.photos/200" alt="Immagine" />;

const componentMap = {
  selfie: SelfieComponent,
  custom1: CustomComponent1,
  custom2: CustomComponent2,
  custom3: CustomComponent3,
};

export default componentMap;
