import { AxiosError, AxiosRequestHeaders } from 'axios';
import { ReactText, useEffect, useRef, useState } from 'react';
import { apiPostOrPatch } from '../../helpers/apiRequest';
import { useMyProfileContext } from '../../hooks/useMyProfileContext';
import PostByUserResponse from '../../types/response/PostsByUserResponse';
import { toast } from 'react-toastify';
import { type } from 'os';
import { useNavigate } from 'react-router-dom';

interface Props {}
const NewPost: React.FC<Props> = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { state, dispatch } = useMyProfileContext();
  const inputRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const toastId = useRef<ReactText | null>(null);
  const nav = useNavigate();
  const clearFiles = () => {
    if (fileRef.current) fileRef.current.value = '';
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const text = inputRef.current?.innerHTML;
    if (text && text !== '') {
      const request = new FormData();
      if (
        !fileRef.current ||
        fileRef.current.value === '' ||
        (fileRef.current.files && fileRef.current.files?.length <= 0)
      ) {
        toast.error('Please Upload An Image...');
        return;
      } else if (fileRef.current.files) {
        const re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.svg)$/i;
        if (!re.exec(fileRef.current.files[0].name)) {
          toast.error('Unsopported File Type');
          clearFiles();
          return;
        }
        request.append('file', fileRef.current?.files[0]);
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
      }
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      if (isUploading) inputRef.current.contentEditable = 'false';
      else {
        inputRef.current.contentEditable = 'true';
        inputRef.current.innerHTML = '';
      }
    }
  }, [isUploading]);
  return (
    <div
      className="flex  
      border-2 border-hints dark:border-d-hints 
      p-4 rounded-lg my-px h-32 gap-5  items-center w-full"
      style={{ minHeight: '8rem', maxWidth: '830px' }}
    >
      <button
        className="rounded-full object-cover w-16 overflow-hidden bg-background_variant dark:bg-d-background_variant"
        onClick={() => {
          nav('profile');
        }}
      >
        <img src={`${state?.profile?.photoUrl}`} alt="" className="w-full" />
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
              ref={fileRef}
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
export default NewPost;
