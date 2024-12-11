import AOS from "aos";

import "aos/dist/aos.css"; // Ensure you include the AOS CSS

// Initialize AOS with optional settings

AOS.init({
  // Global settings:
  disable: false, // Set to true to disable AOS on certain devices (use function or breakpoint)
  startEvent: "DOMContentLoaded", // Event that triggers AOS initialization
  initClassName: "aos-init", // CSS class added to the element on initialization
  animatedClassName: "aos-animate", // CSS class added after animation
  useClassNames: false, // If true, adds `data-aos` values as classes on scroll
  disableMutationObserver: false, // If true, disables mutation observing
  debounceDelay: 50, // Delay for debounce in milliseconds
  throttleDelay: 99, // Delay for throttle in milliseconds

  // Animation settings:

  offset: 120, // Offset (in px) from the original trigger point
  delay: 200, // Delay (in ms) between trigger and animation
  duration: 2000, // Duration (in ms) for the animation
  easing: "ease", // Easing function for animations
  once: false, // If true, animation only happens once
  mirror: true, // If true, animations happen when scrolling past elements (backward)
  anchorPlacement: "top-bottom", // Defines which position of the element triggers animation
});

// Refresh animations on content updates
AOS.refresh();



export default function FeaturesSection() {
  const features = [
    {
      title: "Group Study Meet",
      description:
        "Experience the benefits of group study, no matter the distance. StudySphere's Group Study Meet brings together users with similar goals or subjects. Share ideas, support each other, and deepen your understanding through collaboration. Perfect for tackling tough subjects, group projects, or revising together for exams. Connect seamlessly and make studying a shared journey.",
      image: "/GroupStudy.gif",
    },
    {
      title: "Pomodoro Timer",
      description:
        "Staying on track is easy with StudySphere’s built-in Pomodoro Timer. Structure your study sessions using customizable time intervals, perfect for balancing focused work and well-timed breaks. Monitor your progress throughout the day to stay energized and productive, session by session. Enjoy the flexibility to adapt each session to your unique needs, ensuring you make the most of every study moment.",
      image: "/Pomodoro.gif",
      reverse: true,
    },
    {
      title: "Progress Tracker",
      description:
        "Gain insights into your study habits with StudySphere’s Progress Tracker. Set group or individual goals, visualize your completion rate, and celebrate small wins as you go. Our analytics dashboard makes it easy to see your study patterns, helping you adjust your approach and reach your academic goals faster. Stay motivated with clear milestones guiding your journey.",
      image: "/Progress.gif",
      reverse: false,
    },
  ];

  return (
    <section id="features" className="bg-[#00334D] relative pt-10 pb-5">
      <div className="max-w-5xl mx-auto px-4 text-center mb-8">
        <div className="mb-6">
          <span className="inline-block h-1 w-16 bg-white rounded-full mb-4"></span>
          <h2 className="text-[26px] md:text-[38px] font-bold text-white mb-2 drop-shadow-lg transition duration-300 hover:scale-105">
            What Makes StudySphere Unique?
          </h2>
          <p className="text-sm md:text-[16px] font-medium text-white mb-5">
            Dive into the innovative features designed to transform your study
            sessions into engaging and productive experiences!
          </p>
          <span className="inline-block h-1 w-16 bg-white rounded-full mt-4"></span>
        </div>
      </div>

      <div className="space-y-7 px-2 md:px-0">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center my-9 ${
              feature.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Section */}
            <div className="lg:w-1/2 p-2 flex justify-center lg:justify-start">
              <img
                data-aos="fade-up-right"
                src={feature.image}
                alt={feature.title}
                className={`transition-transform duration-500 ease-in-out transform hover:scale-105 ${
                  index === 1
                    ? "mt-[-20px] md:mt-[-120px] md:ml-[95px]"
                    : "mt-[-20px] md:mt-[-86px] md:ml-[155px]"
                }`}
                style={{ width: "100%", maxWidth: "375px", height: "auto" }}
              />
            </div>

            {/* Text Section */}
            <div
              data-aos="fade-down-right"
              className={`md:w-1/2 p-2 text-center md:text-left ${
                index === 1
                  ? "mt-0 md:mt-[-60px] md:ml-[90px]"
                  : "mt-0 md:mt-[-75px] md:mr-[150px]"
              }`}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105">
                <h3 className="text-lg text-center md:text-[26px] font-bold text-[#00334D] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[15px] md:text-[15.5px] font-medium text-[#00334D]">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
