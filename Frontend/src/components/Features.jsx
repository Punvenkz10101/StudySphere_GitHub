import AOS from "aos";
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: true, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});
export default function FeaturesSection() {
  const features = [
    {
      title: "Group Study Meet",
      description:
        "Experience the benefits of group study, no matter the distance. StudySphere's Group Study Meet brings together users with similar goals or subjects. Share ideas, support each other, and deepen your understanding through collaboration. Perfect for tackling tough subjects, group projects, or revising together for exams. Connect seamlessly and make studying a shared journey.",
      image: "/GroupStudy.gif", // Use the direct URL path for the public folder
      reverse: false,
    },
    {
      title: "Pomodoro Timer",
      description:
        "Staying on track is easy with StudySphere’s built-in Pomodoro Timer. Structure your study sessions using customizable time intervals, perfect for balancing focused work and well-timed breaks. Monitor your progress throughout the day to stay energized and productive, session by session. Enjoy the flexibility to adapt each session to your unique needs, ensuring you make the most of every study moment.",
      image: "/Pomodoro.gif", // Direct URL path for public folder image
      reverse: true,
    },
    {
      title: "Progress Tracker",
      description:
        "Gain insights into your study habits with StudySphere’s Progress Tracker. Set group or individual goals, visualize your completion rate, and celebrate small wins as you go. Our analytics dashboard makes it easy to see your study patterns, helping you adjust your approach and reach your academic goals faster. Stay motivated with clear milestones guiding your journey.",
      image: "/Progress.gif", // Direct URL path for public folder image
      reverse: false,
    },
  ];

  return (
    <section id="features" className="bg-[#00334D] relative pt-10 pb-5">
      <div className="max-w-5xl mx-auto px-4 text-center mb-8">
        <div className="mb-6">
          <span className="inline-block h-1 w-16 bg-white rounded-full mb-4"></span>
          <h2 className="text-2xl md:text-[38px] font-bold text-white mb-2 drop-shadow-lg transition duration-300 hover:scale-105">
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
            <div className="md:w-1/2 p-2 flex justify-center md:justify-start">
              <img
                data-aos="fade-up-right"
                data-aos-offset="200"
                src={feature.image}
                alt={feature.title}
                className={`transition-transform duration-300 transform hover:scale-105 ${
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
              <div className="bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
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
