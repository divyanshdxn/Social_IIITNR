import ReactModal, { Props } from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import useAppContext from '../../hooks/useAppContext';
import { useEffect } from 'react';

const Modal: React.FC<Partial<Props>> = (props) => {
  const { setIsModalOpen, isModalOpen, darkMode, modalChildren } =
    useAppContext();
  ReactModal.setAppElement('#root');
  useEffect(() => {
    console.log(darkMode);
  });
  return (
    <div
      className={`${
        !isModalOpen && 'hidden'
      } absolute inset-0 w-full h-full flex justify-center items-center z-0`}
    >
      <ReactModal
        {...props}
        isOpen={isModalOpen}
        style={{
          overlay: {
            height: '100%',
            width: '100%',
            zIndex: 100,
            background: `${
              darkMode ? 'rgba(40,40,40,0.5)' : 'rgba(0,0,0,0.6)'
            }`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            height: 'fit-to-content',
            width: 'fit-to-content',
            zIndex: 200,
            top: '0',
            left: '0',
            position: 'relative',
            borderRadius: '1.5rem',
            margin: '2rem',
          },
        }}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => (setIsModalOpen ? setIsModalOpen(false) : null)}
        >
          <AiFillCloseCircle className="text-red-500" />
        </button>
        <div className="w-full h-full bg-background dak:bg-d-background p-5">
          {modalChildren}
        </div>
      </ReactModal>
    </div>
  );
};

export default Modal;
