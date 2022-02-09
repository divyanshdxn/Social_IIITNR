import React, {
  ChangeEvent, FormEvent, useState
} from 'react';
import { BsCameraFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { apiPostOrPatch, checkToken } from '../../helpers/apiRequest';
import useAppContext from '../../hooks/useAppContext';

const NewPage: React.FC = () => {
  const [formState, setFormState] = useState({ title: '', description: '' });
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const { setIsModalOpen } = useAppContext();
  // This function will be triggered when the file field change
  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.svg)$/i;
      if (!re.exec(e.target.files[0].name)) {
        toast.error('Ivalid File Format.\nPlease select an image file.');
        return;
      }
      setSelectedImage(e.target.files[0]);
    } else {
      toast.error('Please select atleast one image');
    }
  };
  // handle form submit event
  // Send data to api at /api/pages
  // Close the modal only if request successful
  // Show error toast if request failed
  // Show success toast if request successful
  // Clear the form and selected image
  // Make the request to api using apiPostOrPatch
  // Add header multipart/form-data
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formState.title ||
      formState.title === '' ||
      !formState.description ||
      formState.description === ''
    ) {
      toast.error('Please fill all the fields');
      return;
    }
    if (!selectedImage) {
      toast.error('Please select an image');
      return;
    }
    const formData = new FormData();
    formData.append('title', formState.title);
    formData.append('description', formState.description);
    formData.append('file', selectedImage);

    const toastId = toast.loading('Creating Page...', { autoClose: false });
    try {
      const [res, code] = await apiPostOrPatch(
        '/api/pages',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        'post',
      );
      if (checkToken(code) && code >= 200 && code < 300) {
        toast.update(toastId, {
          render: 'Page created successfully',
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
          isLoading: false,
        });
        setFormState({ title: '', description: '' });
        setSelectedImage(null);
        setIsModalOpen(false);
      } else {
        toast.update(toastId, {
          render: 'Error creating page',
          isLoading: false,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      }
      console.log(res);
    } catch (err) {
      toast.update(toastId, {
        render: 'Something went wrong',
        isLoading: false,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
      console.log(err);
    }
  };

  return (
    <form
      className=" flex flex-col shrink w-full h-full justify-center items-center gap-5 "
      style={{ width: '30rem' }}
      onSubmit={handleSubmit}
    >
      <input type="file" id="file-input" hidden onChange={imageChange} />
      <label
        htmlFor="file-input"
        className="cursor-pointer flex flex-col gap-2 justify-center items-center"
      >
        <div
          className="flex items-center justify-center h-28 w-28 rounded-full
	  bg-background_variant dark:bg-d-background_variant overflow-hidden relative"
        >
          {selectedImage && (
            <>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt={selectedImage.name}
              />
            </>
          )}
          <BsCameraFill className="text-primary dark:text-d-primary text-lg" />
        </div>
        <span
          className="text-xs text-text-secondary 
		dark:text-d-text-secondary"
        >
          {selectedImage ? selectedImage.name : 'Select an image'}
        </span>
      </label>
      <fieldset
        className="w-full border-primary border-2 p-4  
	   rounded-md flex flex-col gap-2"
      >
        <legend
          className="text-sm text-text-secondary 
		dark:text-d-text-secondary"
        >
          Page Details
        </legend>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="title" className="text-sm">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => {
              e.preventDefault();
              setFormState({ ...formState, title: e.target.value });
            }}
            value={formState.title}
            placeholder="Enter Page Title"
            className="border-2 border-hints dark:border-d-hints px-1 py-0.5 rounded"
          />
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <textarea
            name="descriptioon"
            id="descriptiono"
            className="w-full h-32 border-2 border-hints dark:border-d-hints px-1 py-0.5 rounded"
            placeholder="Enter Page Description"
            onChange={(e) => {
              e.preventDefault();
              setFormState({ ...formState, description: e.target.value });
            }}
            value={formState.description}
          />
        </div>
      </fieldset>
      <button type="submit" className="btn px-4 py-2 capitalize">
        Create Page
      </button>
    </form>
  );
};
export default NewPage;
