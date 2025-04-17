import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RightBarButton = ({ id }) => {
  const { userData } = useSelector((state) => state.auth);

  // تأكد من وجود userData ووجود following قبل تهيئة الحالة
  const [isFollow, setIsFollow] = useState(
    userData && userData.following ? userData.following.includes(id) : false
  );

  useEffect(() => {
    if (userData && userData.following) {
      const newFollowStatus = userData.following.includes(id);
      if (newFollowStatus !== isFollow) {
        setIsFollow(newFollowStatus); // تحديث الحالة فقط إذا كان هناك تغيير
      }
    }
  }, [userData, id]); // إضافة isFollow في القائمة لمراقبة التغييرات

  return <div>{isFollow ? "unFollow" : "Follow"}</div>;
};

export default RightBarButton;
