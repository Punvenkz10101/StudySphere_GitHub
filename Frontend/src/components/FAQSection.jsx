import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is StudySphere and how does it help me?",
      answer:
        "StudySphere is a collaborative study platform designed to help students connect, stay organized, and be more productive. With features like group study, Pomodoro Timer, and Progress Tracker, you can manage your study time effectively, work with others, and keep track of your progress.",
    },
    {
      question: "How do I use the Pomodoro Timer?",
      answer:
        "Simply start the timer in the StudySphere app, and it will guide you through focused study sessions and break intervals. Customize time intervals to fit your preferences, and stay productive throughout your study sessions.",
    },
    {
      question: "Can I join or create group study sessions?",
      answer:
        "Yes! StudySphere’s Group Study Meet feature allows you to join or create virtual study groups with other students who share similar study goals. It’s perfect for group projects, revision sessions, and tackling challenging subjects.",
    },
    {
      question: "How does the Progress Tracker work?",
      answer:
        "The Progress Tracker allows you to set personal or group goals, visualize your completion rates, and view insights into your study patterns. You can track how much time you spend on each subject and celebrate small milestones along the way.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="product" className="bg-[#00334D] py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h2 className="text-[30px] sm:text-[28px] font-bold text-white mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-[17px] sm:text-[16px] font-medium text-white">
          Find answers to common questions about StudySphere and how to make the
          most of its features.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            <div
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="text-[17.5px] sm:text-[16px] font-semibold text-[#00334D] flex-grow">
                {faq.question}
              </h3>
              <div className="text-[#00334D] ml-auto transition-transform duration-200 transform hover:scale-110">
                {activeIndex === index ? (
                  <FiMinus size={20} />
                ) : (
                  <FiPlus size={20} />
                )}
              </div>
            </div>
            {activeIndex === index && (
              <p className="mt-3 text-[15px] sm:text-[14px] font-medium text-gray-900 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
