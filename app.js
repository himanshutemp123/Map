// ----- 1. Initialize Firebase (modular) -----
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAbLLxenCaKez7TAPGNXu5SmDv8eEyV2s",
  databaseURL: "https://realtime-database-c9653-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ----- 2. Initialize Google Map -----
let map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 0, lng: 0 },
  zoom: 14
});

let busMarker = new google.maps.Marker({
  position: { lat: 0, lng: 0 },
  map: map,
  title: "Bus 1"
});

// ----- 3. Track location in real-time -----
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Update Firebase
      set(ref(db, 'buses/bus1'), { lat, lng })
        .catch(err => console.error("Firebase update error:", err));

      // Update Map Marker
      busMarker.setPosition({ lat, lng });
      map.setCenter({ lat, lng });

      // Update coordinates display
      document.getElementById('coords').innerText = `Lat: ${lat}, Lng: ${lng}`;
    },
    (error) => console.error("Geolocation error:", error),
    { enableHighAccuracy: true }
  );
} else {
  alert("Geolocation is not supported by your browser.");
}
