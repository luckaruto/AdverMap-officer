import React from "react";
import PropTypes from "prop-types";
import { formatFormat, plannedFormat, typeFormat } from "utils/format";
import CarouselImage from "components/Carousels/CarouselImage";
import Heading1 from "components/Text/Heading1";
import Heading2 from "components/Text/Heading2";
import {
  formatFormatUI,
  plannedFormatUI,
  typeFormatUI,
} from "utils/formatToUI";
import {UserRole, UserRoleName} from "../../constants/types";

const UserInfo = ({data}) => {
  const { role,managementWards, managementDistricts, name, email, phone, birthday  } = data;
  console.log(managementWards);
    console.log(role);

    const renderPermission = () =>{
      if (role === UserRole.WARD_ADMIN){
          return (
              <p>
                  <span className="font-bold text-base">Khu vực quản lý: </span>
                  {managementWards.map(ward => {
                      return (
                          <p>* {ward?.name}</p>
                      )
                  })}
              </p>
          )
      } else if (role ===  UserRole.DISTRICT_ADMIN){
          return (
              <p>
                  <span className="font-bold text-base">Khu vực quản lý: </span>
                  {managementDistricts.map(district => {
                      return (
                          <p>* {district?.name}</p>
                      )
                  })}
              </p>
          )
      }
      return (
          <p>
              <span className="font-bold text-base">Khu vực quản lý: </span>
              Tất cả
          </p>
      )
  }
  return (
    <>
      <Heading2 className="text-left text-blue-500">Chi tiết tài khoản</Heading2>
      <div className="flex flex-col gap-4 p-4 ring-2 ring-blue-400">
        {data ? (
          <>
            <p>
              <span className="font-bold text-base">Họ và tên: </span>
              {name}
            </p>
            <p>
              <span className="font-bold text-base">Email: </span>
              {email}
            </p>
            <p>
              <span className="font-bold text-base">Số điện thoaị: </span>
              {phone}
            </p>
            <p>
              <span className="font-bold text-base">Ngày sinh: </span>
              {birthday}
            </p>
              <p>
                  <span className="font-bold text-base">Chức vụ: </span>
                  {UserRoleName[role]}
              </p>
              {renderPermission()}
          </>
        ) : (
          <p>No data</p>
        )}
      </div>
    </>
  );
};
UserInfo.defaultProps = {};
UserInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UserInfo;
