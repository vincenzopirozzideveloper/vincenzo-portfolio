import { MobileWarning } from "./mobile-warning";
import { HeroMobile } from "./hero-mobile";
import { AboutMobile } from "./about-mobile";
import { WorksMobile } from "./works-mobile";
import { FeedbacksMobile } from "./feedbacks-mobile";
import { ContactMobile } from "./contact-mobile";

export const MobileLayout = () => {
  return (
    <div className="min-h-screen bg-black">
      <MobileWarning />
      <HeroMobile />
      <AboutMobile />
      <WorksMobile />
      <FeedbacksMobile />
      <ContactMobile />
    </div>
  );
};