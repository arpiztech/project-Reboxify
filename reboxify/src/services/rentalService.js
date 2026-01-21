import storageService from "./storageService";
import boxService from "./boxService";
import authService from "./authService";
import {
  STORAGE_KEYS,
  RENTAL_STATUS,
  BOX_STATUS,
  TRANSACTION_TYPES,
  REFUND_PERCENTAGES,
  RETURN_CONDITIONS,
} from "@utils/constants";

class RentalService {
  rentBox(userId, boxId) {
    const box = boxService.getBoxById(boxId);
    const user = authService.getCurrentUser();

    if (!box) {
      return { success: false, message: "Box not found" };
    }

    if (box.status !== BOX_STATUS.AVAILABLE) {
      return { success: false, message: "Box is not available" };
    }

    if (!user || user.id !== userId) {
      return { success: false, message: "User not authenticated" };
    }

    if (user.wallet < box.deposit) {
      return { success: false, message: "Insufficient wallet balance" };
    }

    const rental = {
      id: `rental_${Date.now()}`,
      userId,
      boxId,
      rentDate: new Date().toISOString(),
      returnDate: null,
      deposit: box.deposit,
      status: RENTAL_STATUS.ACTIVE,
      returnCondition: null,
    };

    const transaction = {
      id: `txn_${Date.now()}`,
      userId,
      type: TRANSACTION_TYPES.RENT,
      amount: -box.deposit,
      boxId,
      timestamp: new Date().toISOString(),
      description: `Rented ${box.name}`,
    };

    const rentals = storageService.get(STORAGE_KEYS.RENTALS) || [];
    const transactions = storageService.get(STORAGE_KEYS.TRANSACTIONS) || [];

    rentals.push(rental);
    transactions.push(transaction);

    storageService.set(STORAGE_KEYS.RENTALS, rentals);
    storageService.set(STORAGE_KEYS.TRANSACTIONS, transactions);

    boxService.updateBoxStatus(boxId, BOX_STATUS.RENTED);
    authService.updateWallet(userId, -box.deposit);

    return { success: true, message: "Box rented successfully", rental };
  }

  returnBox(rentalId, condition = RETURN_CONDITIONS.GOOD) {
    const rentals = storageService.get(STORAGE_KEYS.RENTALS) || [];
    const rentalIndex = rentals.findIndex((r) => r.id === rentalId);

    if (rentalIndex === -1) {
      return { success: false, message: "Rental not found" };
    }

    const rental = rentals[rentalIndex];

    if (rental.status !== RENTAL_STATUS.ACTIVE) {
      return { success: false, message: "Rental already returned" };
    }

    const refundPercentage =
      condition === RETURN_CONDITIONS.GOOD
        ? REFUND_PERCENTAGES.GOOD
        : REFUND_PERCENTAGES.DAMAGED;

    const refundAmount = Math.floor(rental.deposit * refundPercentage);

    rentals[rentalIndex] = {
      ...rental,
      returnDate: new Date().toISOString(),
      status: RENTAL_STATUS.RETURNED,
      returnCondition: condition,
    };

    const transactions = storageService.get(STORAGE_KEYS.TRANSACTIONS) || [];
    const transaction = {
      id: `txn_${Date.now()}`,
      userId: rental.userId,
      type: TRANSACTION_TYPES.RETURN,
      amount: refundAmount,
      boxId: rental.boxId,
      timestamp: new Date().toISOString(),
      description: `Returned box - ${condition} condition`,
    };

    transactions.push(transaction);

    storageService.set(STORAGE_KEYS.RENTALS, rentals);
    storageService.set(STORAGE_KEYS.TRANSACTIONS, transactions);

    boxService.updateBoxStatus(rental.boxId, BOX_STATUS.AVAILABLE);
    authService.updateWallet(rental.userId, refundAmount);

    return {
      success: true,
      message: "Box returned successfully",
      refund: refundAmount,
      rental: rentals[rentalIndex],
    };
  }

  getAllRentals() {
    return storageService.get(STORAGE_KEYS.RENTALS) || [];
  }

  getUserRentals(userId) {
    const rentals = this.getAllRentals();
    return rentals.filter((r) => r.userId === userId);
  }

  getActiveRentals(userId) {
    const rentals = this.getUserRentals(userId);
    return rentals.filter((r) => r.status === RENTAL_STATUS.ACTIVE);
  }

  getRentalHistory(userId) {
    const rentals = this.getUserRentals(userId);
    return rentals.filter((r) => r.status === RENTAL_STATUS.RETURNED);
  }

  getRentalById(rentalId) {
    const rentals = this.getAllRentals();
    return rentals.find((r) => r.id === rentalId) || null;
  }

  getRentalsByBox(boxId) {
    const rentals = this.getAllRentals();
    return rentals.filter((r) => r.boxId === boxId);
  }

  getTotalRentals() {
    return this.getAllRentals().length;
  }

  getActiveRentalsCount() {
    const rentals = this.getAllRentals();
    return rentals.filter((r) => r.status === RENTAL_STATUS.ACTIVE).length;
  }

  getTotalRevenue() {
    const rentals = this.getAllRentals();
    return rentals.reduce((total, rental) => total + rental.deposit, 0);
  }
}

export default new RentalService();
