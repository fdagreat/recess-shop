import anime from "animejs";

// light mode animation
const lightAnimation = () => {
  const sunIcon = "#sun";
  anime({
    targets: [sunIcon],
    scale: [0, 1],
    rotate: 180,
    duration: 1200,
  });
};
// dark mode animation
const darkAnimation = () => {
  const moonIcon = "#moon";
  anime({
    targets: [moonIcon],
    scale: [0, 1],
    rotate: [-180, 0],
    duration: 1200,
  });
};

export { lightAnimation, darkAnimation };
