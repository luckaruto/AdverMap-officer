// @ts-nocheck
import React, { useRef } from "react";

import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setGeocoding } from "../../redux/navSlice";

export default function AutocompleteComponent({ className }) {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handlePlaceChanged = () => {
    // @ts-ignore
    const [place] = inputRef.current.getPlaces();
    if (place) {
      // console.log(place.formatted_address);
      // console.log(place.geometry.location.lat(), place.geometry.location.lng());
      dispatch(
        setGeocoding({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address,
        })
      );
    }
  };
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addListener("places_changed", handlePlaceChanged);
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyBZISzd5bODvZpfQUEzlUfLWqcREOx6hUY"}
      libraries={["places"]}
      className={className}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <div className="flex flex-row  justify-center h-[100%] ">
          <div className="relative w-[100%] h-[40px] ">
            <input
              type="text"
              className="pl-[20px] w-full h-full border-[2px] rounded-md border-gray-400 bg-opacity-0 bg-white"
            ></input>
          </div>
        </div>
      </StandaloneSearchBox>
    </LoadScript>
  );
}
