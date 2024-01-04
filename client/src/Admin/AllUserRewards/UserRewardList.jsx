import React from "react";

const UserRewardList = ({ userRewards, loading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-violet-50 text-left uppercase">
          <tr>
            <th className="text-sm py-3 px-5">
              <h2 className="w-max">Name</h2>
            </th>
            <th className="text-sm py-3 pr-5">
              <h2 className="w-max">Email</h2>
            </th>
            <th className="text-sm py-3 pr-5">
              <h2 className="w-max">Points</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="py-3 px-5 text-center">
                Loading...
              </td>
            </tr>
          ) : (
            userRewards.map((reward) => (
              <tr key={reward._id} className="border-b">
                <td className="py-3 px-5">{reward?.userId?.name}</td>
                <td className="py-3 pr-5">{reward?.userId?.email}</td>
                <td className="py-3 pr-5">{reward?.points}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!loading && userRewards.length === 0 && (
        <div className="text-center py-5">
          <h4 className="md:text-3xl text-xl font-medium text-gray-500">
            No User Rewards data found!
          </h4>
        </div>
      )}
    </div>
  );
};

export default UserRewardList;
