import { AxiosError, AxiosRequestHeaders } from 'axios';
import { ReactText, useEffect, useRef, useState } from 'react';
import { apiPostOrPatch } from '../../helpers/apiRequest';
import { useMyProfileContext } from '../../hooks/useMyProfileContext';
import PostByUserResponse from '../../types/response/PostsByUserResponse';
import { toast } from 'react-toastify';
import { type } from 'os';
import { useNavigate } from 'react-router-dom';
import { ImCross } from 'react-icons/im/';
import useAppContext from '../../hooks/useAppContext';

interface Props {}
const NewPost: React.FC<Props> = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { state, dispatch } = useMyProfileContext();
  const inputRef = useRef<HTMLDivElement>(null);
  const toastId = useRef<ReactText | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const nav = useNavigate();
  const { setModalChildren, setIsModalOpen } = useAppContext();
  const clearFiles = () => {
    setSelectedImage(null);
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const text = inputRef.current?.innerHTML;
    if (text && text !== '') {
      const request = new FormData();
      if (!selectedImage) {
        toast.error('Please Upload An Image...');
        return;
      } else {
        const re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.svg)$/i;
        if (!re.exec(selectedImage.name)) {
          toast.error('Unsopported File Type');
          clearFiles();
          return;
        }
        request.append('file', selectedImage);
      }
      if (inputRef.current && inputRef.current.textContent)
        request.append('caption', inputRef.current.textContent);

      setIsUploading(true);
      try {
        let headers: AxiosRequestHeaders = {};
        const [res, code] = await apiPostOrPatch<FormData, PostByUserResponse>(
          '/api/post/create',
          request,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (p) => {
              const progress = p.loaded / p.total;
              if (toastId.current === null) {
                toastId.current = toast('Upload in Progress', {
                  progress: progress,
                });
              } else {
                toast.update(toastId.current, {
                  progress: progress,
                });
              }
            },
          },
        );
        console.log(res);
        setIsUploading(false);
        if (code >= 200 && code < 300) {
          toast.update(toastId.current as ReactText, {
            render: 'Uploaded Successfully',
            type: 'success',
            progress: undefined,
            autoClose: 5000,
          });
          toastId.current = null;
          dispatch({ type: 'new-post', payload: res as PostByUserResponse });
          if (inputRef.current.innerHTML) inputRef.current.innerHTML = '';
        }
      } catch (err) {
        const error = err as AxiosError;
        console.log(err, error.response);
        setIsUploading(false);
        clearFiles();
        toast.update(toastId.current as ReactText, {
          render: 'Upload Failed',
          type: 'error',
          autoClose: 5000,
        });
        toastId.current = null;
      } finally {
        clearFiles();
      }
    } else {
      toast.info('Please Enter A Caption');
    }
  };
  return (
    <div
      className="flex  
      border-2 border-hints dark:border-d-hints 
      p-4 rounded-lg my-px h-32 gap-5  items-center w-full"
      style={{ minHeight: '8rem', maxWidth: '830px' }}
    >
      <button
        className="rounded-full object-cover w-16 overflow-hidden
       bg-background_variant dark:bg-d-background_variant border-2
        border-transparent group relative"
        onClick={() => {
          if (!selectedImage) return;
          setModalChildren(
            <ImageModal
              imgUrl={`${
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : state?.profile?.photoUrl
              }`}
              setSelectImage={setSelectedImage}
            />,
          );
          setIsModalOpen(true);
        }}
      >
        <img
          src={`${
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : state?.profile?.photoUrl
          }`}
          alt=""
          className="w-full aspect-square z-0 object-cover"
        />
      </button>
      <form
        className=" flex relative h-full w-full rounded-md overflow-hidden"
        action=""
      >
        <div
          className="bg-background_variant dark:bg-d-background_variant h-full w-full 
		   p-3 text-sm overflow-y-auto"
          placeholder="Write somethinig to share..."
          ref={inputRef}
          contentEditable
        />
        <div
          className="absolute flex gap-4 justify-between items-center bottom-2 
		right-2 origin-bottom-right"
        >
          <div className="flex gap-2 justify-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <img
                src="/assets/attatch-image.svg"
                alt="Attatch image"
                className="w-4 dark:invert"
              />
            </label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".jpg, .jpeg, .png, .svg, .gif, .bmp"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  if (e.target.files[0].size > 1000000) {
                    toast.error('File Size Exceeded');
                    return;
                  } else if (e.target.files.length > 1) {
                    toast.info('Only One Image Can Be Uploaded');
                    return;
                  }
                  setSelectedImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <button
            className="btn px-3 py-0.5 h-5 flex justify-center items-center"
            type="submit"
            onClick={handleSubmit}
          >
            {isUploading ? 'Uploading...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Image modal props
interface ImageModalProps {
  imgUrl: string;
  setSelectImage: React.Dispatch<React.SetStateAction<File | null>>;
}

// component to show image in a modal
const ImageModal: React.FC<ImageModalProps> = ({ imgUrl, setSelectImage }) => {
  const { setIsModalOpen } = useAppContext();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      <div
        style={{ maxWidth: '500px', maxHeight: '700px' }}
        className="overflow-auto p-1"
      >
        <img
          src={imgUrl}
          alt="Uploaded Image File"
          className="aspect-video object-contain w-full"
        />
      </div>
      <div className="flex justify-center gap-4">
        <button
          className="btn px-4 py-2"
          onClick={() => {
            setIsModalOpen(false);
            setSelectImage(null);
            toast.info('Image Removed');
          }}
        >
          Remove Image
        </button>
        <button
          className="btn px-4 py-2"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NewPost;
