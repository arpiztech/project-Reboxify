import storageService from "./storageService";
import { STORAGE_KEYS, ENVIRONMENTAL_IMPACT } from "../utils/constants";

class AnalyticsService {
  calculateEnvironmentalImpact() {
    const rentals = storageService.get(STORAGE_KEYS.RENTALS) || [];
    const returnedRentals = rentals.filter((r) => r.status === "returned");

    const totalBoxesReused = returnedRentals.length;
    const plasticSaved =
      totalBoxesReused * ENVIRONMENTAL_IMPACT.PLASTIC_SAVED_PER_BOX;
    const carbonReduced =
      totalBoxesReused * ENVIRONMENTAL_IMPACT.CARBON_REDUCED_PER_BOX;

    return {
      totalBoxesReused,
      plasticSaved: Number(plasticSaved.toFixed(2)),
      carbonReduced: Number(carbonReduced.toFixed(2)),
    };
  }

  getUserStats(userId) {
    const rentals = storageService.get(STORAGE_KEYS.RENTALS) || [];
    const transactions = storageService.get(STORAGE_KEYS.TRANSACTIONS) || [];

    const userRentals = rentals.filter((r) => r.userId === userId);
    const userTransactions = transactions.filter((t) => t.userId === userId);

    const activeRentals = userRentals.filter(
      (r) => r.status === "active",
    ).length;
    const completedRentals = userRentals.filter(
      (r) => r.status === "returned",
    ).length;

    const totalSpent = userTransactions
      .filter((t) => t.type === "rent")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalRefunded = userTransactions
      .filter((t) => t.type === "return")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      activeRentals,
      completedRentals,
      totalRentals: userRentals.length,
      totalSpent,
      totalRefunded,
      totalTransactions: userTransactions.length,
    };
  }

  getRevenueStats() {
    const transactions = storageService.get(STORAGE_KEYS.TRANSACTIONS) || [];

    const totalRevenue = transactions
      .filter((t) => t.type === "rent")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalRefunds = transactions
      .filter((t) => t.type === "return")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalRevenue,
      totalRefunds,
      netRevenue: totalRevenue - totalRefunds,
    };
  }

  getPopularBoxes() {
    const rentals = storageService.get(STORAGE_KEYS.RENTALS) || [];
    const boxes = storageService.get(STORAGE_KEYS.BOXES) || [];

    const boxRentalCount = {};
    rentals.forEach((rental) => {
      boxRentalCount[rental.boxId] = (boxRentalCount[rental.boxId] || 0) + 1;
    });

    return boxes
      .map((box) => ({
        ...box,
        rentalCount: boxRentalCount[box.id] || 0,
      }))
      .sort((a, b) => b.rentalCount - a.rentalCount);
  }

  getRecentActivity(limit = 10) {
    const transactions = storageService.get(STORAGE_KEYS.TRANSACTIONS) || [];
    return transactions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }
}

export default new AnalyticsService();
