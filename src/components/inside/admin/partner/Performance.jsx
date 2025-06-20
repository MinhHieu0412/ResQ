import React from "react";

const Performance = () => {
    const dashboard = [
      {      
        totalSuccess: 32,
        avgRate: 3.4,
        totalCancel: 2,
        percentSuccess: 95,
        totalPaid: 12000000 ,
        avgResponse: 1.5
      }
    ];

    const information = [
      {
        username: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        address: 'Tân Bình, Hồ Chí Minh',
        sdt: "+84 909988999",
        createdAt: "2025-02-03",
        status: "Active"
      }
    ];

  return (
    <div>
      <div>
      {dashboard.map((sum) => (
        <div className="ml-44 mt-5">          
          <div className="flex flex-row gap-10">
            <div className="flex flex-row partner-dashboard pl-8">
              <div className="font-lexend mt-[1px]">
                <p className="text-3xl text-center font-semibold">
                  {sum.totalSuccess}
                </p>
                <p className="text-[18px] text-center font-medium">
                  Total Success
                </p>
              </div>
              <div className="ml-6">
                <img src="../../../../../public/images/icon-web/bill.png" width="60px"/>
              </div>
            </div>
            <div className="flex flex-row partner-dashboard">
              <div className="font-lexend mt-[1px]">
                <p className="text-3xl text-center font-semibold">
                  {sum.totalCancel}
                </p>
                <p className="text-[18px] text-center font-medium">
                  Total Cancel
                </p>
              </div>
              <div className="ml-7">
                <img src="../../../../../public/images/icon-web/cancel.png" width="60px"/>
              </div>
            </div>
            <div className="flex flex-row partner-dashboard">
              <div className="font-lexend mt-[1px]">
                <p className="text-3xl text-center font-semibold">
                  {sum.percentSuccess}
                </p>
                <p className="text-[16px] text-center font-medium">
                  Percent Success
                </p>
              </div>
              <div className="ml-5">
                <img src="../../../../../public/images/icon-web/done_percentage.png" width="70px"/>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-10 mt-7">
            <div className="flex flex-row px-6 partner-dashboard">
              <div className="font-lexend mt-[10px]">
                <p className="text-2xl text-center font-semibold">
                  {sum.totalPaid.toLocaleString("vi-VN")}
                </p>
                <p className="text-[18px] text-center font-medium">
                  Revenue
                </p>
              </div>
              <div className="ml-5">
              <img src="../../../../../public/images/icon-web/paid_history.png" width="70px"/>
              </div>
            </div>
            <div className="flex flex-row partner-dashboard">
              <div className="font-lexend mt-[1px]">
                <p className="text-3xl text-center font-semibold">
                  {sum.avgRate}
                </p>
                <p className="text-[18px] text-center font-medium">
                  Average Rate
                </p>
              </div>
              <div className="ml-8">
                <img src="../../../../../public/images/icon-web/rate.png" width="65px"/>
              </div>
            </div>
            <div className="flex flex-row align-item-center partner-dashboard pl-[5px]">
              <div className="font-lexend mt-[1px]">
                <p className="text-3xl text-center font-semibold">
                  {sum.avgResponse} min
                </p>
                <p className="text-[18px] text-center font-medium">
                  Average Response Time
                </p>
              </div>
              <div className="mr-3">
                <img src="../../../../../public/images/icon-web/response_time.png" width="62px"/>
              </div>
            </div>
          </div> 
        </div>
        ))
      }
      </div>      
      <table className="w-[96%] mx-8 table-auto border  rounded-2xl border-r-0 border-l-0 mt-5">
              <thead className="font-raleway border bg-[#68A2F0] text-white h-12 border-r-0 border-l-0">
                <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Phone No.</th>
                <th>Email</th>
                <th>Joined Date</th>
                <th>Total Rescue</th>
                <th>Point</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {information.map((cus, index) => (
                <tr key={index} className="shadow h-12 font-lexend" >
                  <td className="text-center">{cus.id}</td>
                  <td>{cus.username}</td>
                  <td>{cus.sdt}</td>
                  <td>{cus.email}</td>
                  <td>{cus.createdAt.toLocaleString("vi-VN")}</td>
                  <td className="text-center">{cus.total}</td>
                  <td className="text-center">{cus.point}</td>
                  <td>{cus.status}</td>
                  <td>
                    <button onClick={() => setSelectedCustomer(cus)}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
};

export default Performance;
