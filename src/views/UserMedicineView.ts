import UserMedicine from '../models/UserMedicine';

class UserMedicineView {
  list(userMedicines: UserMedicine[]) {
    return userMedicines.map((userMedicine) => ({
      id: userMedicine.id,
      active: userMedicine.active,
      amount: userMedicine.amount,
      instruction: userMedicine.instruction,
      beginDate: userMedicine.beginDate,
      endDate: userMedicine.endDate,
      medicine: {
        id: userMedicine.medicine.id,
        name: userMedicine.medicine.name,
      },
    }));
  }

  details(userMedicine: UserMedicine) {
    return {
      id: userMedicine.id,
      userId: userMedicine.userId,
      diseaseId: userMedicine.diseaseId,
      medicineId: userMedicine.medicineId,
      active: userMedicine.active,
      amount: userMedicine.amount,
      instruction: userMedicine.instruction,
      beginDate: userMedicine.beginDate,
      endDate: userMedicine.endDate,
    };
  }
}

export default UserMedicineView;
