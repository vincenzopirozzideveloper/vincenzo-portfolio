import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useMemo, useState, useCallback } from "react";

import { github, preview } from "../assets";
import { PROJECTS } from "../constants";
import { ProjectModal } from "./project-modal";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type ProjectCardProps = (typeof PROJECTS)[number] & {
  index: number;
};

// Project Card
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_site_link,
}: ProjectCardProps) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
    <Tilt
      options={{ max: 45, scale: 1, speed: 450 }}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full group cursor-pointer"
      onClick={() => {
        // Click handled by parent via prop drilling in Works
      }}
    >
      <div className="relative w-full h-[230px]">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />

        <div className="absolute inset-0 flex justify-end m-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            onClick={(e) => { e.stopPropagation(); window.open(live_site_link, "_blank", "noreferrer"); }}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img src={preview} alt="Live Site" title="Live Site" className="w-2/3 h-2/3 object-contain" />
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); window.open(source_code_link, "_blank", "noreferrer"); }}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ml-2"
          >
            <img src={github} alt="Github" title="Github" className="w-1/2 h-1/2 object-contain" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-[14px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, tagIdx) => (
          <p key={`Tag-${tagIdx}`} className={cn(tag.color, "text-[14px]")}>#{tag.name}</p>
        ))}
      </div>
    </Tilt>
  </motion.div>
);

// Works
export const Works = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<null | (typeof PROJECTS)[number]>(null);

  const disneyProject = useMemo(() => PROJECTS.find(p => /disney\+\s*clone/i.test(p.name)), []);

  const handleCardClick = useCallback((project: (typeof PROJECTS)[number]) => {
    if (disneyProject && project.name === disneyProject.name) {
      setModalProject(project);
      setIsModalOpen(true);
    }
  }, [disneyProject]);

  return (
    <SectionWrapper>
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>

        {/* About */}
        <div className="w-full flex">
          <motion.p
            variants={fadeIn(undefined, "tween", 0.1, 1)}
            className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            Following projects showcases my skills and experience through
            real-world examples of my work. Each project is briefly described
            with links to code repositories and live demos in it. It reflects my
            ability to solve complex problems, work with different technologies,
            and manage projects effectively.
          </motion.p>
        </div>

        {/* Project Card */}
        <div className="mt-20 flex flex-wrap gap-7">
          {PROJECTS.map((project, i) => (
            <div key={`project-${i}`} onClick={() => handleCardClick(project)}>
              <ProjectCard index={i} {...project} />
            </div>
          ))}
        </div>

        <ProjectModal
          isOpen={isModalOpen}
          title={modalProject?.name ?? ""}
          description={modalProject?.description ?? ""}
          image={modalProject?.image ?? ""}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    </SectionWrapper>
  );
};
