import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RightBarButton = ({ id }) => {
  const { userData } = useSelector((state) => state.auth);

  // Ensure userData and following exist before initializing the state
  const [isFollow, setIsFollow] = useState(
    userData && userData.following ? userData.following.includes(id) : false
  );

  useEffect(() => {
    if (userData && userData.following) {
      const newFollowStatus = userData.following.includes(id);
      if (newFollowStatus !== isFollow) {
        setIsFollow(newFollowStatus); // Update the state only if there is a change
      }
    }
  }, [userData, id]); // Add isFollow to the dependency list to monitor changes

  return <div>{isFollow ? "unFollow" : "Follow"}</div>;
};

export default RightBarButton;
