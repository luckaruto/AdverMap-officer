// @ts-nocheck
import React, { useRef } from "react";

import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setGeocoding } from "../../redux/navSlice";

class LoadScriptOnlyIfNeeded extends LoadScript {
  componentDidMount() {
    const cleaningUp = true;
    const isBrowser = typeof document !== "undefined"; // require('@react-google-maps/api/src/utils/isbrowser')
    const isAlreadyLoaded =
      window.google &&
      window.google.maps &&
      document.querySelector("body.first-hit-completed"); // AJAX page loading system is adding this class the first time the app is loaded
    if (!isAlreadyLoaded && isBrowser) {
      // @ts-ignore
      if (window.google && !cleaningUp) {
        console.error("google api is already presented");
        return;
      }

      this.isCleaningUp().then(this.injectScript);
    }

    if (isAlreadyLoaded) {
      this.setState({ loaded: true });
    }
  }
}

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
    <LoadScriptOnlyIfNeeded
      googleMapsApiKey={window.env.GOOGLE_API}
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
    </LoadScriptOnlyIfNeeded>
  );
}
