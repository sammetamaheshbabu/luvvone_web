const PARACHUTE_ASSETS = [
  "a_bit_low_today",
  "adventure_mode",
  "busy_but_productive",
  "can_t_wait",
  "chilling",
  "couch_potato_mode",
  "counting_the_seconds",
  "craving_your_presence",
  "deep_in_thought",
  "dreaming_of_our_future",
  "energized_ready",
  "exhausted",
  "feeling_accomplished",
  "feeling_goofy",
  "feeling_great",
  "feeling_romantic",
  "full_of_love",
  "grateful_for_you",
  "in_the_zone",
  "missing_our_hugs",
  "missing_you",
  "need_a_hug",
  "on_top_of_the_world",
  "p1",
  "p2",
  "p3",
  "p4",
  "peaceful_vibes",
  "quiet_reflective",
  "silly_wild",
  "soft_hearted",
  "super_excited",
  "thinking_of_us",
  "wandering_heart",
  "your_biggest_fan",
];

function createParachute() {
  const container = document.getElementById("parachutes");
  if (!container) return;

  // Pick random asset
  const assetName =
    PARACHUTE_ASSETS[Math.floor(Math.random() * PARACHUTE_ASSETS.length)];
  // Format label from filename: "missing_you" -> "Missing You"
  let label = assetName.replace(/_/g, " ");
  // Remove "p1", "p2" etc Generic names
  if (label.length <= 2) label = "Luvvone";

  const wrapper = document.createElement("div");
  wrapper.classList.add("parachute");

  const inner = document.createElement("div");
  inner.classList.add("parachute-inner");

  // Structure matches App: Image + Banner
  inner.innerHTML = `
        <img src="assets/parachutes/${assetName}.png" alt="${label}">
        <div class="parachute-banner">${label}</div>
    `;

  wrapper.appendChild(inner);

  // Randomize Start Position (0 to 90vw)
  const startX = Math.random() * 90;
  wrapper.style.left = `${startX}vw`;

  // Randomize Duration (12s to 17s - match App)
  const duration = 12 + Math.random() * 5;

  // Apply Animation
  // NOTE: fall + sway both animate transform, so they must run on different elements.
  wrapper.style.animation = `fall ${duration}s linear forwards`;
  inner.style.animation = `sway ${duration / 3}s ease-in-out infinite alternate`;

  container.appendChild(wrapper);

  // Cleanup after animation
  setTimeout(() => {
    wrapper.remove();
  }, duration * 1000);
}

function startParachuteRain() {
  // Initial spawn
  createParachute();

  // Constant loop to spawn new ones every 3-6 seconds
  setInterval(() => {
    createParachute();
  }, 4000);
}

document.addEventListener("DOMContentLoaded", startParachuteRain);
