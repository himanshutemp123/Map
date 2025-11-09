// ----- 1. Firebase Setup -----
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAbLLxenCaKez7TAPGNXu5SmDv8eEyV2s",
  databaseURL: "https://realtime-database-c9653-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ----- 2. Google Map Setup -----
const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 0, lng: 0 },
  zoom: 15,
});

const busMarker = new google.maps.Marker({
  map: map,
  title: "College Bus",
  icon: {
    url: "https://cdn-icons-png.flaticon.com/512/61/61168.png", // bus icon
    scaledSize: new google.maps.Size(50, 50)
  }
});

// ----- 3. Get Live Data from Firebase -----
onValue(ref(db, "buses/bus1"), (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const { lat, lng } = data;
    busMarker.setPosition({ lat, lng });
    map.setCenter({ lat, lng });
  }
});
