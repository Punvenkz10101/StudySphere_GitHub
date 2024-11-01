import featureImage1 from '../assets/Group discussion (8).gif';
import featureImage2 from '../assets/Work time (1).gif';
import featureImage3 from '../assets/Team work (1).gif';

export default function FeaturesSection() {
  const features = [
    {
      title: "Group Study Meet",
      description: "Experience the benefits of group study, no matter the distance. StudySphere's Group Study Meet brings together users with similar goals or subjects. Share ideas, support each other, and deepen your understanding through collaboration. Perfect for tackling tough subjects, group projects, or revising together for exams.",
      image: featureImage1,
      reverse: false,
    },
    {
      title: "Pomodoro Timer",
      description: "Staying on track is easy with StudySphere’s built-in Pomodoro Timer. Structure your study sessions using customizable time intervals, perfect for balancing focused work and well-timed breaks. Monitor your progress throughout the day and keep your energy levels high, all while getting more done.",
      image: featureImage2,
      reverse: true,
    },
    {
      title: "Progress Tracker",
      description: "Gain insights into your study habits with StudySphere’s Progress Tracker. Set group or individual goals, visualize your completion rate, and celebrate small wins as you go. Our analytics dashboard makes it easy to see your study patterns, helping you adjust your approach and reach your academic goals faster.",
      image: featureImage3,
      reverse: false,
    },
  ];

  return (
    <section className="bg-[#00334D] py-16 relative"> {/* Changed to solid color */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
  {/* Decorative Element */}
  <div className="mb-8"> {/* Adjusted bottom margin */}
    <span className="inline-block h-1 w-24 bg-white rounded-full mb-5"style={{ position: 'relative', top: '-12px' }} ></span> {/* Reduced margin to create space */}
    <h2 className="text-[47px] font-bold text-white mb-2 drop-shadow-lg transition duration-300 hover:scale-105 -mt-7">
      What Makes StudySphere Unique?
    </h2>
    <p className="text-[18px] font-semibold text-white mb-7 flex justify-center items-center">
      Dive into the innovative features designed to transform your study sessions into engaging and productive experiences!
    </p>
    <span className="inline-block h-1 w-24 bg-white rounded-full mb-6"style={{ position: 'relative', top: '4px' }} ></span> {/* Adjusted bottom margin */}
  </div>
</div>

      
      
      {/* Features List */}
      <div className="space-y-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center my-12 ${feature.reverse ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Image Section */}
            <div className="md:w-1/2 p-4">
              <img
                src={feature.image}
                alt={feature.title}
                className="transition-transform duration-300 transform hover:scale-105 mt-[-120px] ml-[120px]"
              />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 p-4 mt-[-110px] mr-[90px]"> {/* Added negative margins to move the text card up and right */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:bg-white">
          <h3 className="text-3xl font-bold text-[#00334D] mb-4 text-center">{feature.title}</h3>
          <p className="text-lg font-semibold text-[#00334D]">{feature.description}</p>
        </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
