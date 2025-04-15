import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RightBarButton = ({ id }) => {
  const { userData } = useSelector((state) => state.auth);
  const [isFollow, setIsFollow] = useState(
    userData?.following.includes(id) || false
  );
  console.log(id);
  console.log(userData?.following);
  useEffect(() => {
    setIsFollow(userData?.following?.includes(id) || false);
  }, [userData, id]);

  return <div>{isFollow ? "Unfollow" : "Follow"}</div>;
};
export default RightBarButton;
