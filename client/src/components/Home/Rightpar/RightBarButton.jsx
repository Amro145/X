import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RightBarButton = ({ id }) => {
  console.log(id)
  const { userData } = useSelector((state) => state.auth);
  const [isFollow, setIsFollow] = useState(
    userData?.following.includes(id) || false
  );
  console.log(userData?.following);
  useEffect(() => {
    setIsFollow(userData?.following?.includes(id) || false);
  }, [userData, id]);

  return (
    <div className="bg-gray-700 cursor-pointer p-2 rounded-md text-sm font-semibold text-gray-300 flex items-center gap-2">
      {isFollow ? "Unfollow" : "Follow"}
    </div>
  );
};
export default RightBarButton;
