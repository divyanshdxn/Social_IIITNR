interface Props {
  type: 'events' | 'pages';
  buttons: string[];
}

const PagesAndEventsPanel: React.FC<Props> = ({ type, buttons }) => {
  return (
    <div
      className="flex-1 flex flex-col justify-between border-2  border-hints 
	  dark:border-d-hints rounded-xl py-2 px-4 w-full "
    >
      <div>
        <h2 className="capitalize font-medium">Your {type}</h2>
        <div className="w-3/4 border-b-2 border-b-primary h-1" />
      </div>
      <div
        className="flex-1 flex flex-col justify-center items-center 
      text-text-secondary dark:text-text-d-secondary"
      >
        <span>Uhh No...</span>
        <span>You don't have any</span>
      </div>
      <div className="flex justify-end gap-2">
        {buttons.map((btn, index) => (
          <button className="btn px-2 text-xs capitalize h-5" key={index}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};
export default PagesAndEventsPanel;
