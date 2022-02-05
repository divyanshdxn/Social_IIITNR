import CommunityIcon from '../components/Icons/CommunityIcon';
import EventsIcon from '../components/Icons/EventsIcon';
import PagesIcon from '../components/Icons/PagesIcon';

interface Feature {
  name: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    name: 'Community',
    icon: <CommunityIcon />,
  },
  {
    name: 'Pages',
    icon: <PagesIcon />,
  },
  {
    name: 'Events',
    icon: <EventsIcon />,
  },
];
export default features;
