import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const customEase = CustomEase.create(
  "customEase",
  "M0,0 C0.6,0.01 0.05,0.95 1,1",
);

export default customEase;
