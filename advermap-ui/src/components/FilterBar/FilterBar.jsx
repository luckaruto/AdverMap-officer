import FilterCity from "components/FilterBar/FilterCity";
import Heading1 from "components/Text/Heading1";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCities, setLoading } from "redux/appSlice";
import { UserService } from "services/user/UserService";
import { useNavigate } from "react-router-dom";
import { PAGE } from "components/constants";
import { setPermission } from "redux/permission";

export default function FilterBar() {
  const { tokenPayload, token, params } = useSelector(
    // @ts-ignore
    (state) => state.appState || {}
  );

  let userId = null;
  // Check if tokenPayload is not null
  if (tokenPayload && tokenPayload.userId !== undefined) {
    // Destructure userId from tokenPayload
    userId = tokenPayload.userId;
  } else {
    // If tokenPayload is null or userId is undefined, set userId to null (or perform your desired action)
    userId = null;
  }
  console.log(userId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPermission = async () => {
    dispatch(setLoading(true));
    const { role, cities } = await UserService.getPermission(userId, token);
    dispatch(setPermission({role,cities}));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (userId) {
      getPermission();
    } else navigate(PAGE.LOGIN.path);
  }, [token]);

  return (
    <>
      <FilterCity />

      <div className="mt-4 flex flex-col gap-4">
        <Heading1 className="text-base">Thông tin các trường tìm kiếm</Heading1>
        <div className="flex flex-row gap-4 justify-center">
          <div>
            <span className="font-bold text-base">Thành phố: </span>
            {params.info.city && params.info.city.name}
          </div>
          <div>
            <span className="font-bold text-base">Quận: </span>
            {params.info.district && params.info.district.name}
          </div>
          <div>
            <span className="font-bold text-base">Phường: </span>
            {params.info.ward && params.info.ward.name}
          </div>
        </div>
      </div>
    </>
  );
}
