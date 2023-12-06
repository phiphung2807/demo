import { instance } from "./instance";

export const UpdateBillById = (bill: any) => {
    return instance.put(`/bills/update/${bill._id}`, bill);
};
export const GetAllBill = () => {
    return instance.get(`/bills`);
};
export const GetBillById = (_billId: string) => {
    return instance.get(`/bills/${_billId}`);
};

export const DeleteBillById = (_id: string) => {
    return instance.delete(`/bills/delete/${_id}`);
};
export const GetBillByUser = (userId: string) => {
    return instance.get(`/bills/user/${userId}`);
};
export const CheckOut = (bill: any) => {
    return instance.post(`/bills/checkout`, bill);
};
