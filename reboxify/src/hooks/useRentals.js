import { useState, useEffect } from "react";
import rentalService from "@services/rentalService";
import { useAuth } from "./useAuth";

export const useRentals = () => {
  const { currentUser } = useAuth();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadRentals();
    }
  }, [currentUser]);

  const loadRentals = () => {
    setLoading(true);
    try {
      const userRentals = rentalService.getUserRentals(currentUser.id);
      setRentals(userRentals);
    } catch (error) {
      console.error("Error loading rentals:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActiveRentals = () => {
    return rentals.filter((r) => r.status === "active");
  };

  const getRentalHistory = () => {
    return rentals.filter((r) => r.status === "returned");
  };

  const rentBox = async (boxId) => {
    const result = rentalService.rentBox(currentUser.id, boxId);
    if (result.success) {
      loadRentals();
    }
    return result;
  };

  const returnBox = async (rentalId, condition) => {
    const result = rentalService.returnBox(rentalId, condition);
    if (result.success) {
      loadRentals();
    }
    return result;
  };

  return {
    rentals,
    loading,
    getActiveRentals,
    getRentalHistory,
    rentBox,
    returnBox,
    refreshRentals: loadRentals,
  };
};

export default useRentals;
