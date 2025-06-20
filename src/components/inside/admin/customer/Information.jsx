import React from "react";
import { getUserStatus } from "../../../../utils/UserStatus";

const Information = ({ customer }) => {
  const dashboard = [
    {
      totalSuccess: 32,
      totalRescue: 34,
      totalCancel: 2,
      percentSuccess: 95,
      totalPaid: 12000000,
      totalPoint: 120
    }
  ]

  return <div>
    <div className="flex flex-row mx-48 mt-10">
      <div className="border border-[#68A2F0] w-[300px] h-full">
        <img src="../../../../../public/images/icon-web/avatar.jpg" />
      </div>
      {dashboard.map((sum) => (
        <div className="ml-24 mt-5">
          <div className="flex flex-row gap-8">
            <div className="flex flex-row box-dashboard">
              <div className="font-lexend mt-[1px]">
                <p className="text-xl text-center font-semibold">
                  {sum.totalSuccess}
                </p>
                <p className="text-[15px] text-center font-medium">
                  Total Success
                </p>
              </div>
              <div className="ml-3">
                <img src="../../../../../public/images/icon-web/bill.png" width="55px" />
              </div>
            </div>
            <div className="flex flex-row box-dashboard">
              <div className="font-lexend mt-[1px]">
                <p className="text-xl text-center font-semibold">
                  {sum.totalRescue}
                </p>
                <p className="text-[15px] text-center font-medium">
                  Total Rescue
                </p>
              </div>
              <div className="ml-3">
                <img src="../../../../../public/images/icon-web/history.png" width="55px" />
              </div>
            </div>
            <div className="flex flex-row box-dashboard">
              <div className="font-lexend mt-[1px]">
                <p className="text-xl text-center font-semibold">
                  {sum.totalCancel}
                </p>
                <p className="text-[15px] text-center font-medium">
                  Total Cancel
                </p>
              </div>
              <div className="ml-7 mt-[0.1rem]">
                <img src="../../../../../public/images/icon-web/cancel.png" width="45px" />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-8 mt-6">
            <div className="flex flex-row box-dashboard">
              <div className="font-lexend mt-[1px]">
                <p className="text-xl text-center font-semibold">
                  {sum.percentSuccess}
                </p>
                <p className="text-[15px] text-center font-medium">
                  Percent Success
                </p>
              </div>
              <div className="ml-1">
                <img src="../../../../../public/images/icon-web/done_percentage.png" width="50px" />
              </div>
            </div>
            <div className="flex flex-row  box-dashboard">
              <div className="font-lexend mt-[1px]">
                <p className="text-xl text-center font-semibold">
                  {sum.totalPaid.toLocaleString("vi-VN")}
                </p>
                <p className="text-[15px] text-center font-medium">
                  Total Paid
                </p>
              </div>
              <div className="ml-3">
                <img src="../../../../../public/images/icon-web/paid_history.png" width="55px" />
              </div>
            </div>
            <div className="flex flex-row align-item-center box-dashboard">
              <div className="font-lexend mt-[1px]">
                <p className="text-xl text-center font-semibold">
                  {sum.totalPoint}
                </p>
                <p className="text-[15px] text-center font-medium">
                  Total Point
                </p>
              </div>
              <div className="ml-8">
                <img src="../../../../../public/images/icon-web/bill_point.png" width="52px" />
              </div>
            </div>
          </div>
        </div>
      ))
      }
    </div>
    <div className="mt-24 mx-48">
      <table className="w-full text-[#013171]">
        <tbody>
          <tr className="odd:bg-[#e4e4e4] even:bg-white h-[45px]">
            <td className="py-2 px-10 font-semibold w-[35%]">Full Name</td>
            <td className="p-2 font-semibold w-[10%]">:</td>
            <td className="py-2 px-16 text-right">{customer.fullName}</td>
          </tr>
          <tr className="odd:bg-[#e4e4e4] even:bg-white h-[45px]">
            <td className="py-2 px-10 font-semibold">Email</td>
            <td className="p-2 font-semibold">:</td>
            <td className="py-2 px-16 text-right">{customer.email}</td>
          </tr>
          <tr className="odd:bg-[#e4e4e4] even:bg-white h-[45px]">
            <td className="py-2 px-10 font-semibold">Address</td>
            <td className="p-2 font-semibold">:</td>
            <td className="py-2 px-16 text-right">{customer.address}</td>
          </tr>
          <tr className="odd:bg-[#e4e4e4] even:bg-white h-[45px]">
            <td className="py-2 px-10 font-semibold">Phone No.</td>
            <td className="p-2 font-semibold">:</td>
            <td className="py-2 px-16 text-right">{customer.sdt}</td>
          </tr>
          <tr className="odd:bg-[#e4e4e4] even:bg-white h-[45px]">
            <td className="py-2 px-10 font-semibold">Joined Date</td>
            <td className="p-2 font-semibold">:</td>
            <td className="py-2 px-16 text-right">{new Date(customer.createdAt).toLocaleString("vi-VN")}</td>
          </tr>
          <tr className="odd:bg-[#e4e4e4] even:bg-white h-[45px]">
            <td className="py-2 px-10 font-semibold">Status</td>
            <td className="p-2 font-semibold">:</td>
            <td className="py-2 px-16">
              <div
                className={`text-xs py-1 w-[8vh] h-6 rounded-3xl font-bold text-center float-right ${getUserStatus(
                  customer.status
                )}`}
              >
                {customer.status}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>;
};

export default Information;
