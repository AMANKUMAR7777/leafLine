const startTime = new Date("2025-01-01T00:00:00Z");

function secondsSinceStart() {
  return (Date.now() - startTime.getTime()) / 1000;
}
function formatNum(n) {
  return Math.floor(n).toLocaleString("en-IN");
}
function updateStats() {
  const s = secondsSinceStart();
  document.getElementById("trees").textContent = formatNum(150 * s + Math.random() * 50);
  document.getElementById("species").textContent = formatNum(8700 + s * 0.001 + Math.random() * 3);
  document.getElementById("forest-loss").textContent = formatNum(s * 0.25 + Math.random() * 2);
  const aqi = Math.max(0, Math.round(75 + Math.sin(s / 1200) * 8 + (Math.random() - 0.5) * 5));
  document.getElementById("aqi").textContent = aqi;
}
updateStats();
setInterval(updateStats, 800);





//shery js
Shery.mouseFollower({
  //Parameters are optional.
  skew: true,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});
Shery.makeMagnet(".btn, h1" /* Element to target.*/, {
  //Parameters are optional.
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});

Shery.imageMasker(".info-section img" /* Element to target.*/, {
  //Parameters are optional.
  mouseFollower: true,
  text: "View more",
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});

Shery.imageEffect(".images", {
  style: 6,
  gooey: true,
});















