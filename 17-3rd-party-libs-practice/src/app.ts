import axios from "axios";

const form = document.querySelector("form")!;

const addressInput = document.getElementById("address") as HTMLInputElement;

const GOOGLE_API_KEY = "IMAGINE_API_KEY_HERE";

declare var google: any;

type GoogleResponse = {
  results: { geometry: { location: { lat: number; lon: number } } }[];
  status: "OK" | "ZERO_RESULTS" | string;
};

async function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // send to google API
  // honestly I don't wanna to get this API since it requires credit card info
  // don't wanna bother with other API and following their response shape either because conceptually it's the same thing in course context
  // and I'll practice writing types interfaces etc in my own project enough

  await axios
    .get<GoogleResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`,
    )
    .then((response) => {
      console.log(response);
      if (response.data.status !== "OK") {
        throw new Error("Something went wrong, could not fetch location");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34, lng: 150 },
        zoom: 8,
      });
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((error) => {
      alert(error.message);
      console.log(error);
    });
}
form.addEventListener("submit", searchAddressHandler);
