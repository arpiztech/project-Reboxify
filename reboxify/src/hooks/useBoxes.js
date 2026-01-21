import { useContext } from "react";
import BoxContext from "@context/BoxContext";

export const useBoxes = () => {
  const context = useContext(BoxContext);

  if (!context) {
    throw new Error("useBoxes must be used within BoxProvider");
  }

  return context;
};

export default useBoxes;
