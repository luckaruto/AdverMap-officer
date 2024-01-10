import React from "react";
export const plannedFormat = (value) => {
	switch (value) {
	  case true:
		return "Đã chứng nhận";
		break;
  
	  default:
		return "Chưa chứng nhận";
		break;
	}
  };
  export const typeFormat = (value) => {
	switch (value) {
	  case "PUBLIC_LAND":
		return "Công cộng";
		break;
  
	  default:
		return "Cá Nhân";
		break;
	}
  };
  export const formatFormat = (value) => {
	switch (value) {
	  case "COMMERCIAL_ADS":
		return "Biển quảng cáo";
		break;
  
	  default:
		return "Chưa xác định";
		break;
	}
  };
  
  export const formatImgUrl = (value) => {
	// Check if value is an array
	if (!Array.isArray(value)) {
	  return "Không có ảnh";
	}
  
	return (
	  <>
		{value.length > 0
		  ? value.map((url, index) => (
			  <p key={index}>
				<button>
				  <a href={url} target="_blank" rel="noopener noreferrer">
					Ảnh {index + 1}
				  </a>
				</button>
			  </p>
			))
		  : "Không có ảnh"}
	  </>
	);
  };