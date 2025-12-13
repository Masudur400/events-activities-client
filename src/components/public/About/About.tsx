import AboutHeader from '../AboutHeader'; 
import WhyChooseUs from '../WhyChooseUs'; 
import StatsSection from '../StatsSection';
import Testimonials from '../Testimonials';
import PartnersSection from '../PartnersSection';
import OurTeam from '../OurTeam';
import ServicesSection from '../ServicesSection';
import CallToAction from '../CallToAction';

const About = () => {
    return (
        <div>
            <AboutHeader></AboutHeader> 
            <StatsSection></StatsSection>
            <WhyChooseUs></WhyChooseUs>
            <OurTeam></OurTeam>
            <PartnersSection></PartnersSection> 
            <Testimonials></Testimonials>
            <ServicesSection></ServicesSection>
            <CallToAction></CallToAction>
        </div>
    );
};

export default About;