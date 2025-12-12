
import CallToAction from './CallToAction';
import FAQSection from './FAQSection';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import StatsSection from './StatsSection';
import Testimonials from './Testimonials';
import UpcomingEvents from './UpcomingEvents';

const Home = () => {
    return (
        <div> 
            <HeroSection></HeroSection>
            <UpcomingEvents></UpcomingEvents>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <StatsSection></StatsSection>
            <CallToAction></CallToAction>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;