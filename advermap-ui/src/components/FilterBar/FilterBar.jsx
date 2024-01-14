import FilterCity from "components/FilterBar/FilterCity";
import Heading1 from "components/Text/Heading1";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCities, setLoading } from "redux/appSlice";
import { UserService } from "services/user/UserService";

export default function FilterBar() {
  const { tokenPayload, token, params } = useSelector(
    // @ts-ignore
    (state) => state.appState || {}
  );

  const { userId } = tokenPayload || {};
  console.log(userId);

  const dispatch = useDispatch();

  const getPermission = async () => {
    dispatch(setLoading(true));
    const { role, cities } = await UserService.getPermission(userId, token);
    dispatch(setCities(cities));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    console.log("getPermission");
    getPermission();
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
