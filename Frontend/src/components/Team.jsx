import React from "react";

const Team = () => {
  return (
    <section id="support" className="pb-4 pt-10 bg-white lg:pb-11 lg:pt-3">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 text-center">
            <div className="mx-auto mb-8 max-w-[450px]">
              <span className="block text-[33px] lg:text-[33px] font-bold text-[#00334D] mb-0">
                Our Team
              </span>

              <h2 className="text-3xl font-bold text-[#00334D] mb-4 sm:text-[36px]">
                Our Creative Minds
              </h2>
              <p className="text-base text-[15px] font-medium text-[#00334D] ">
                Meet the talented professionals behind StudySphere. Each member
                brings unique skills and perspectives to elevate your study
                experience.
              </p>
            </div>
          </div>
        </div>

        {/* Centered Row with Three Cards */}
        <div className="flex justify-center items-center flex-wrap gap-6 md:gap-8">
          <TeamCard
            name="Puneeth Venkat"
            profession="Team Lead/Web Developer"
            description="Puneeth is a dedicated developer specializing in crafting intuitive and responsive web applications. His technical expertise ensures a smooth user experience."
            imageSrc="/Puneeth.jpg"
            linkedin="https://www.linkedin.com/in/puneeth-venkat-7731b5293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            github="https://github.com/Punvenkz10101"
          />
          <TeamCard
            name="Bharath"
            profession="Web Developer"
            description="Bharath keeps everything on track with his keen organizational skills and strategic planning. His dedication ensures that each project meets its goals efficiently."
            imageSrc="/bharath.jpeg"
            linkedin="https://www.linkedin.com/in/bharath-pothula/"
            github="https://github.com/Bharathpothula205"
          />
          <TeamCard
            name="Harsha Kumar"
            profession="UI/UX Designer"
            description="Harsha's eye for design transforms complex ideas into user-friendly interfaces. He excels in creating visually appealing and functional designs that enhance engagement give."
            imageSrc="/HarshaKumarSM.jpeg"
            linkedin=""
            github=""
          />
        </div>
      </div>
    </section>
  );
};

export default Team;

const TeamCard = ({ imageSrc, name, profession, description,linkedin,github }) => {
  return (
    <div className="w-full max-w-[300px] transform transition-transform duration-300 hover:scale-105">
      <div className="mx-auto mb-0 rounded-lg overflow-hidden shadow-md group ">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-72 object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
        <div className="text-center p-4 bg-[#00334D] transition-colors duration-300 hover:bg-[#00263d]">
          <h3 className="text-[19px] font-semibold text-white mb-1 transition-transform duration-300 group-hover:translate-y-1">
            {name}
          </h3>
          <p className="text-[14px] font-medium text-gray-200 mb-2">
            {profession}
          </p>
          {/* Description - hidden on small screens */}
          <p className="text-[13px] text-gray-200 opacity-90 group-hover:opacity-100 transition-opacity duration-300 mb-2 hidden md:block">
            {description}
          </p>

          {/* Social Icons - Using grid for consistent spacing */}
          <div className="grid grid-flow-col gap-6 justify-center mt-3">
            <a
              href={linkedin}
              target="_blank"
              className="text-white hover:text-gray-400 inline-flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M22.23 0H1.77C.79 0 0 .774 0 1.729V22.27C0 23.226.79 24 1.77 24h20.46c.98 0 1.77-.774 1.77-1.729V1.73C24 .774 23.21 0 22.23 0zM7.08 20.452H3.55V9.05h3.53v11.402zM5.316 7.538A2.07 2.07 0 015.31 3.4a2.07 2.07 0 110 4.138zm15.07 12.914h-3.53v-5.884c0-1.4-.027-3.197-1.95-3.197-1.953 0-2.25 1.526-2.25 3.103v5.978H9.622V9.05h3.39v1.563h.047c.47-.89 1.617-1.83 3.33-1.83 3.56 0 4.215 2.347 4.215 5.395v6.275z" />
              </svg>
            </a>
            <a
              href={github}
              target="_blank"
              className="text-white hover:text-gray-400 inline-flex items-center justify-center"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M12 .296C5.373.296 0 5.672 0 12.296c0 5.278 3.438 9.743 8.207 11.318.6.11.82-.26.82-.58v-2.165c-3.34.725-4.04-1.615-4.04-1.615-.546-1.387-1.332-1.757-1.332-1.757-1.089-.745.083-.73.083-.73 1.204.086 1.837 1.234 1.837 1.234 1.07 1.832 2.807 1.303 3.492.996.11-.775.42-1.303.762-1.603-2.665-.303-5.466-1.333-5.466-5.931 0-1.31.467-2.382 1.235-3.221-.123-.302-.536-1.524.117-3.176 0 0 1.007-.323 3.3 1.23.957-.266 1.983-.399 3.005-.404 1.02.005 2.048.138 3.008.404 2.29-1.553 3.294-1.23 3.294-1.23.657 1.652.244 2.874.12 3.176.77.839 1.235 1.911 1.235 3.221 0 4.608-2.807 5.623-5.48 5.921.43.372.81 1.102.81 2.222v3.293c0 .323.215.694.824.576C20.565 22.036 24 17.57 24 12.296 24 5.672 18.627.296 12 .296z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

