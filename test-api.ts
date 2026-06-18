import fetch from "node-fetch";

async function check() {
  try {
    const res = await fetch("http://localhost:3000/api/google-reviews?lang=pt");
    console.log("Status color:", res.status);
    const text = await res.text();
    console.log("Response text body:", text.substring(0, 500));
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

check();
