import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RightBarButton = ({ id }) => {
  console.log(id);
  const { userData } = useSelector((state) => state.auth);
  const [isFollow, setIsFollow] = useState(
    userData?.following.includes(id) || false
  );
  console.log(id);
  console.log(userData?.following);
  useEffect(() => {
    setIsFollow(userData?.following.includes(id));
  }, [userData, id]);
  console.log(isFollow);

  const handle = () => {
    // مثلاً تقلب الحالة
    setIsFollow((prev) => !prev);
  };

  return <div onClick={handle}>{isFollow ? "unFollow" : "Follow"}</div>;
};
export default RightBarButton;
