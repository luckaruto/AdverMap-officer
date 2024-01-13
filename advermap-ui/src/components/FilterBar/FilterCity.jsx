import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Selector from "./Selector";
import Button from "@mui/material/Button";
import { setParams } from "redux/appSlice";
import { info } from "sass";

const FilterCity = () => {
  // @ts-ignore
  const { cities,params } = useSelector((state) => state.appState);

  const {info}=params

  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');

  const [cityData, setCityData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setCityData(cities || []);
  }, [cities]);

  useEffect(() => {
    if (city) {
      // @ts-ignore
      setDistrictData(city.districts || []);
    } else {
      setDistrictData([]);
    }
  }, [city]);

  useEffect(() => {
    if (district) {
      // @ts-ignore
      setWardData(district.wards || []);
    } else {
      setWardData([]);
    }
  }, [district]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setDistrict("");
    setWard("");
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setWard("");
  };

  const handleWardChange = (e) => {
    const selectedWard = e.target.value;
    setWard(selectedWard);
  };

  const handleUpdateFilter = () => {
    dispatch(
      setParams({
        content: {
          // @ts-ignore
          cityId: city.id,
          // @ts-ignore
          wardIds: ward.id,
          // @ts-ignore
          districtIds: district.id,
        },
        info: {
          city,
          ward,
          district,
        },
      })
    );
  };

  return (
    <>
      <div className="flex flex-row gap-2">
        <Selector
          label="Thành Phố"
          data={cityData}
          selectedValue={city}
          onChange={handleCityChange}
        />
        <Selector
          label="Quận"
          data={districtData}
          selectedValue={district}
          onChange={handleDistrictChange}
        />
        <Selector
          label="Phường"
          data={wardData}
          selectedValue={ward}
          onChange={handleWardChange}
        />
      </div>
      <div className="mt-4 flex flex-row justify-center">
        <Button onClick={handleUpdateFilter} variant="contained" color="info">
          Update Filter
        </Button>
      </div>
    </>
  );
};

export default FilterCity;
