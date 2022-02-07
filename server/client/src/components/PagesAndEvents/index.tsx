import NewPage from '../NewPage';
import PagesList from './PagesList';
import PagesAndEventsPanel from './Panel';

interface Props {}
const PagesAndEvents: React.FC<Props> = () => {
  return (
    <div
      className="sticky translate-y-6 mx-8 right-10 top-12 
	  hidden lg:flex flex-col basis-1/5 rounded-xl z-20 bg-background 
	  dark:bg-d-background overflow-hidden gap-6"
      style={{ height: 'calc(90% - 3rem)', minWidth: '18rem' }}
    >
      <PagesAndEventsPanel
        type="pages"
        buttons={[['Join'], ['Create', <NewPage />]]}
        children={<PagesList />}
      />
      <PagesAndEventsPanel type="events" buttons={[['Past Events']]} />
    </div>
  );
};

export default PagesAndEvents;
