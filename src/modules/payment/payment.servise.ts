import axios from "axios";
import config from "../../app/config";
import { UserModel } from "../User/user-model";

const cratePaymentDB = async (id: string) => {
  const transactionId = `TNX-${Date.now()}`;
  const user = await UserModel.findById({ _id: id });
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: transactionId,
    success_url: `https://travel-tips-server-three.vercel.app/api/v1/confirmation?id=${id}`,
    fail_url: "https://travel-tips-server-three.vercel.app/api/v1/failed",
    cancel_url: "https://travel-tips-server-three.vercel.app/api/v1",
    amount: "10.0",
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: user?.name,
    cus_email: user?.email,
    cus_add1: "Dhaka",
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "N/A",
    cus_phone: user?.mobileNumber,
    type: "json",
  });

  return response.data;
};
const confirmationService = async (id: string) => {
  const data = {
    status: "BLOCKED",
  };
  await UserModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
};

export const paymentService = {
  cratePaymentDB,
  confirmationService,
};
