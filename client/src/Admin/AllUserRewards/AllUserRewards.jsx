import React from "react";
import PageTitle from "../../Pages/Shared/PageTitle";
import useGetAllUserReward from "../../API/useGetAllUserReward";
import UserRewardList from "./UserRewardList";

const AllUserRewards = () => {
  const [userRewards, loading] = useGetAllUserReward();

  return (
    <>
      <PageTitle title="All User Rewards" />
      <div className="my-5 w-full bg-white text-gray-600 rounded-lg border">
        <div className="p-5 border-b">
          <h1 className="text-xl font-semibold">User Rewards</h1>
        </div>
        <UserRewardList userRewards={userRewards} loading={loading} />
      </div>
    </>
  );
};

export default AllUserRewards;
