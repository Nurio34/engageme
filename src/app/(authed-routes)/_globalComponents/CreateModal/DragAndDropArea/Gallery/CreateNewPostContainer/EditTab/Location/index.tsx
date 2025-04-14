import LocationIcon from "@/app/_globalComponents/Svg/LocationIcon";
import { KeyboardEvent, RefObject, useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import MarkIcon from "@/app/_globalComponents/Svg/MarkIcon";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";

const libraries: "places"[] = ["places"]; // ✅ Define outside

export type LocationType = {
  lat: number;
  lng: number;
};

function Location({ EditTabWidth }: { EditTabWidth: RefObject<number> }) {
  const { isPlacesModalOpen, setIsPlacesModalOpen, location, setLocation } =
    useCreateModalContext();

  const [userLocation, setUserLocation] = useState<LocationType>({
    lat: 0,
    lng: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  const placesModalRenderCondition1 =
    searchTerm.trim() !== "" || places.length > 0;
  const placesModalRenderCondition2 = location.name.trim() === "";
  const placesModalRenderCondition =
    isPlacesModalOpen &&
    placesModalRenderCondition1 &&
    placesModalRenderCondition2;

  const mapRef = useRef<google.maps.Map | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const InputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setPlaces([]);
        // setIsPlacesModalOpen(false);
        return;
      }
      searchPlaces();
    }, 1000);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchTerm]);

  useEffect(() => {}, [searchTerm, places]);

  useEffect(() => {
    if (InputRef.current && location.name.trim() === "") {
      InputRef.current.focus();
    }
  }, [location]);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const searchPlaces = () => {
    if (!mapRef.current) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);

    const request = {
      query: searchTerm,
      fields: ["name", "geometry"],
      locationBias: { lat: userLocation.lat, lng: userLocation.lat }, // Bias search to a location
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        if (!results) return;
        setPlaces(results);
      } else {
        console.log("Places API error:", status);
      }
    });
  };

  const saveLocation = (place: google.maps.places.PlaceResult) => {
    if (place.name && place.place_id)
      setLocation({ name: place.name, id: place.place_id });
  };

  const handleKeyUp = (
    e: KeyboardEvent<HTMLLIElement>,
    place: google.maps.places.PlaceResult
  ) => {
    const key = e.code;
    if (key === "Space" || key === "Enter") saveLocation(place);
  };

  // ✅ Load Google Maps API once
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  if (loadError) {
    console.error("Error loading Google Maps API:", loadError);
    return <p>Error loading map</p>;
  }

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div
      className="relative px-4 py-2"
      onClick={(e) => {
        e.stopPropagation();
        const { lat, lng } = userLocation;
        if (lat !== 0 && lng !== 0) return;

        getLocation();
      }}
    >
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex items-center gap-2 ">
          {location.name.trim() !== "" && <LocationIcon />}
          <input
            ref={InputRef}
            type="text"
            className={`outline-none bg-transparent
              ${
                location.name.trim() !== ""
                  ? "cursor-not-allowed font-bold"
                  : ""
              }  
            `}
            value={location.name.trim() !== "" ? location.name : searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Add Location"
            onFocus={() => setIsPlacesModalOpen(true)}
            disabled={location.name.trim() !== ""}
          />
        </div>
        {location.name || searchTerm ? (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setLocation({ name: "", id: "" });
              setPlaces([]);
            }}
          >
            <MarkIcon />
          </button>
        ) : (
          <LocationIcon />
        )}
      </div>

      <GoogleMap
        mapContainerStyle={{ display: "none" }}
        center={{ lat: userLocation.lat, lng: userLocation.lng }}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      />

      <ul
        className={`absolute z-10 shadow-sm shadow-base-content bg-base-100 rounded-lg transition-all duration-500 
              ${
                placesModalRenderCondition
                  ? "h-52 overflow-auto opacity-100"
                  : "h-0 overflow-hidden opacity-0"
              }  
            `}
        style={{ width: EditTabWidth.current - 32 - 28 }}
      >
        {places.map((place, index) => (
          <li
            key={index}
            className="hover:bg-base-content/10 cursor-pointer px-2 py-1"
            onClick={() => saveLocation(place)}
            tabIndex={0}
            onKeyUp={(e) => handleKeyUp(e, place)}
          >
            <p className=" font-bold">{place.name}</p>
            <p className="text-xs">{place.formatted_address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Location;
