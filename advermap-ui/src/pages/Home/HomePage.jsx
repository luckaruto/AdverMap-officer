// @ts-nocheck
import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/appSlice";
import { fetchSurfaces } from "redux/surfaceSlice";

import {
  selectGeocoding,
  selectOrigin,
  setOrigin,
  selectReportValue,
  selectAdverValue,
  selectAddressGeocoding,
  setAddressGeocoding,
} from "../../redux/navSlice";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import SomeDetailComponent from "../../components/SomeDetail/SomeDetailComponent";
import ToolComponent from "../../components/ToolBar/ToolComponent";
import AdvertisementComponent from "components/Advertisement/AdvertisementComponent";
import Text from "../../components/Text/Text";

import Loader from "../../components/Loader/Loader";

import { useNavigate } from "react-router-dom";
import { ReactComponent as SvgDelete } from "../../assets/images/delete.svg";
import { ReactComponent as SvgCompass } from "../../assets/images/compass.svg";
import { fetchSpaces } from "redux/spaceSlice";
import { testParams } from "services/apis/constants";

const defaultProps = {
  center: {
    lat: 12.79375530641856,
    lng: 106.72228643720966,
  },
  zoom: 12,
};

const customIcon = new L.Icon({
  iconUrl: require("../../assets/images/marker.png"),
  iconSize: [38, 38],
});

const customIconAdRed = new L.Icon({
  iconUrl: require("../../assets/images/advertisementRed.png"),
  iconSize: [38, 38],
});

const customIconAdGreen = new L.Icon({
  iconUrl: require("../../assets/images/advertisementGreen.png"),
  iconSize: [38, 38],
});

const customIconAdOrange = new L.Icon({
  iconUrl: require("../../assets/images/advertisementOrange.png"),
  iconSize: [38, 38],
});

const customIconReportRed = new L.Icon({
  iconUrl: require("../../assets/images/reportRed.png"),
  iconSize: [38, 38],
});

const customIconReportGreen = new L.Icon({
  iconUrl: require("../../assets/images/reportGreen.png"),
  iconSize: [38, 38],
});

export default function HomePage() {
  const [spaces, setSpaces] = useState([]);
  const [report, setReport] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mapRef = useRef(null);
  const geocoding = useSelector(selectGeocoding);
  const origin = useSelector(selectOrigin);
  const reportValue = useSelector(selectReportValue);
  const AdverValue = useSelector(selectAdverValue);

  const [show, setShow] = useState(false);

  const [selectedSpace, setSelectedSpace] = useState(null);

  const [marker, setMarker] = useState(null);

  const { token, snackbar, params } = useSelector((state) => state.appState);
  const { entities, error, loading } = useSelector((state) => state.spaces);
  const {
    entities: entitiesSurface,
    error: errorSurface,
    loading: loadingSurface,
  } = useSelector((state) => state.surfaces);

  const HandleFalse = () => {
    setState(false);
  };

  const HandleTrue = () => {
    setState(true);
  };

  useEffect(() => {
    if (origin) {
      mapRef?.current?.setView([origin.lat, origin.lng], defaultProps.zoom, {
        animate: true,
        duration: 1,
      });
    }
    // Fit the map to the geocoding result
  }, [origin, mapRef]);

  const onClickToMyLocation = () => {
    if (origin !== null) {
      mapRef.current.setView([origin.lat, origin.lng], defaultProps.zoom, {
        animate: true,
        duration: 1,
      });
    } else return;
  };

  const handleClickMarker = (space) => {
    setShow(true);

    setSelectedSpace(space);
    dispatch(setAddressGeocoding(space.address));
  };

  const handleClickMarkerReport = (report) => {
    navigate(`/detailsReport/${report.id}`, { state: report });
  };

  useEffect(() => {
    const reqParams = params.content;

    // @ts-ignore
    dispatch(fetchSpaces({ params: reqParams, token }));

    setShow(false);
  }, [params]);

  useEffect(() => {
    if (selectedSpace) {
      console.log(selectedSpace.id);
      const id = selectedSpace.id;
      let reqParams;
      if (id) {
        reqParams = { spaceId: id };
      } else reqParams = { cityIds: 1 };
      // @ts-ignore
      dispatch(fetchSurfaces({ params: reqParams, token }));
    }
  }, [selectedSpace]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading, loadingSurface]);

  // useEffect(() => {

  //   const fetchReport = async () => {
  //     try {
  //       const data = await ReportService.getReport(existingIdentifier);

  //       setReport((prev) => {
  //         return data;
  //       });
  //       console.log("fetch report:", data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchReport();
  // }, []);

  // if (spaces.length <= 0) return <Loader title="Loading songs..." />;

  return (
    <>
      <div className="w-full h-screen m-auto  gap-4 flex flex-row">
        <div className={`relative ${show ? "h-full w-full" : "h-full w-full"}`}>
          <button
            className="absolute top-5 right-6 z-10  "
            onClick={onClickToMyLocation}
          >
            <SvgCompass className="h-10 w-10"></SvgCompass>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[90%] h-[9%] md:h-[20%]">
            <ToolComponent className="w-full h-full" />
          </div>

          {/* MapContainer */}
          <MapContainer
            center={{
              lat: origin?.lat || defaultProps.center.lat,
              lng: origin?.lng || defaultProps.center.lng,
            }}
            zoom={defaultProps.zoom}
            style={{ height: "100vh", width: "100%" }}
            className="relative z-0"
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {entities.length > 0 ? (
              <MarkerClusterGroup>
                {AdverValue &&
                  entities.map((space, index) => (
                    <Marker
                      key={index}
                      position={[space.latitude, space.longitude]}
                      icon={
                        space.planned
                          ? space.totalSurface > 0
                            ? customIconAdOrange
                            : customIconAdGreen
                          : customIconAdRed
                      }
                      eventHandlers={{
                        click: (e) => handleClickMarker(space),
                      }}
                    >
                      <Popup>
                        <SomeDetailComponent
                          format={space.format}
                          type={space.type}
                          address={space.address}
                          planned={space.planned}
                        />
                      </Popup>
                    </Marker>
                  ))}
                {reportValue &&
                  report.map((report, index) => (
                    <Marker
                      key={index}
                      position={[report.latitude, report.longitude]}
                      icon={state ? customIconReportGreen : customIconReportRed}
                      eventHandlers={{
                        click: (e) => handleClickMarkerReport(report),
                      }}
                    ></Marker>
                  ))}
              </MarkerClusterGroup>
            ) : (
              <p>Loading...</p>
            )}
          </MapContainer>
        </div>
        {show && (
          <div className="relative flex flex-col h-full w-[20%] overflow-auto">
            <button
              className="flex items-end justify-end"
              onClick={() => setShow(false)}
            >
              <SvgDelete className="h-5 w-5"></SvgDelete>
            </button>
            {entitiesSurface.length > 0 ? (
              entitiesSurface.map((surface) => (
                <AdvertisementComponent
                  key={surface.id} // Add a unique key here
                  className=" m-2 p-2 rounded-xl border-gray-200"
                  format={surface.format}
                  width={surface.width}
                  height={surface.height}
                  type={selectedSpace.type}
                  formatspace={selectedSpace.format}
                  address={selectedSpace.address}
                  surfaceid={surface.id}
                  selectedSpace={selectedSpace}
                  HandleTrue={HandleTrue}
                />
              ))
            ) : (
              <Text className={"font-bold text-center m-auto"}>
                Không có biển quảng cáo trên địa điểm này
              </Text>
            )}
          </div>
        )}
      </div>
    </>
  );
}
