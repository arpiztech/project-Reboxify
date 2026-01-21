import storageService from "./storageService";
import { STORAGE_KEYS, BOX_STATUS } from "@utils/constants";

class BoxService {
  getAllBoxes() {
    return storageService.get(STORAGE_KEYS.BOXES) || [];
  }

  getBoxById(boxId) {
    const boxes = this.getAllBoxes();
    return boxes.find((box) => box.id === boxId) || null;
  }

  getAvailableBoxes() {
    const boxes = this.getAllBoxes();
    return boxes.filter((box) => box.status === BOX_STATUS.AVAILABLE);
  }

  getRentedBoxes() {
    const boxes = this.getAllBoxes();
    return boxes.filter((box) => box.status === BOX_STATUS.RENTED);
  }

  updateBoxStatus(boxId, status) {
    const boxes = this.getAllBoxes();
    const boxIndex = boxes.findIndex((box) => box.id === boxId);

    if (boxIndex === -1) {
      return { success: false, message: "Box not found" };
    }

    boxes[boxIndex].status = status;
    storageService.set(STORAGE_KEYS.BOXES, boxes);

    return {
      success: true,
      message: "Box status updated",
      box: boxes[boxIndex],
    };
  }

  isBoxAvailable(boxId) {
    const box = this.getBoxById(boxId);
    return box && box.status === BOX_STATUS.AVAILABLE;
  }

  getBoxesByCategory(category) {
    const boxes = this.getAllBoxes();
    return boxes.filter((box) => box.category === category);
  }

  searchBoxes(searchTerm) {
    const boxes = this.getAllBoxes();
    const term = searchTerm.toLowerCase();
    return boxes.filter(
      (box) =>
        box.name.toLowerCase().includes(term) ||
        box.description.toLowerCase().includes(term),
    );
  }

  addBox(boxData) {
    const boxes = this.getAllBoxes();
    const newBox = {
      id: `box_${Date.now()}`,
      ...boxData,
      status: BOX_STATUS.AVAILABLE,
    };
    boxes.push(newBox);
    storageService.set(STORAGE_KEYS.BOXES, boxes);
    return { success: true, message: "Box added successfully", box: newBox };
  }

  updateBox(boxId, updates) {
    const boxes = this.getAllBoxes();
    const boxIndex = boxes.findIndex((box) => box.id === boxId);

    if (boxIndex === -1) {
      return { success: false, message: "Box not found" };
    }

    boxes[boxIndex] = { ...boxes[boxIndex], ...updates };
    storageService.set(STORAGE_KEYS.BOXES, boxes);

    return {
      success: true,
      message: "Box updated successfully",
      box: boxes[boxIndex],
    };
  }

  deleteBox(boxId) {
    const boxes = this.getAllBoxes();
    const filteredBoxes = boxes.filter((box) => box.id !== boxId);

    if (boxes.length === filteredBoxes.length) {
      return { success: false, message: "Box not found" };
    }

    storageService.set(STORAGE_KEYS.BOXES, filteredBoxes);
    return { success: true, message: "Box deleted successfully" };
  }
}

export default new BoxService();
