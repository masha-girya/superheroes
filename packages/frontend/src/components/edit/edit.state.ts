import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { ISuperhero } from '../../types';
import { createFormData } from '../../utils/helpers';
import { useRequest } from '../../utils/hooks';
import { addSuperhero, updateSuperhero } from '../../utils/api';
import { dataURLtoFile } from '../../utils/helpers/image.helper';

interface IProps {
  hero: ISuperhero,
}

export const useEditState = ({ hero }: IProps) => {
  const { pathname } = useLocation();
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const convertedImages = [hero.images]
    .flat()
    .map(image => dataURLtoFile(`data:image/png;base64,${image}`, `${image.slice(0, 8)}.jpg`));

  const [newImages, setNewImages] = useState<File[]>(convertedImages);
  const { sendUniqueRequest, isLoading, isError } = useRequest();

  const currImages = useMemo(() => {
    if (hero.images.length === 0) {
      return [];
    }

    return Array.isArray(hero.images)
      ? hero.images.map(image => `data:image/png;base64,${image}`)
      : [`data:image/png;base64,${hero.images}`];
  }, []);

  const formik = useFormik({
    initialValues: {
      ...hero,
      images: currImages,
    },
    onSubmit: async (values) => {
      const {
        nickname,
        real_name: realName,
        origin_description: originDescription,
        catch_phrase: catchPhrase,
        superpowers,
        images,
      } = values;

      if (nickname.length === 0
        || realName.length === 0
        || originDescription.length === 0
        || catchPhrase.length === 0
        || superpowers.length === 0
        || images.length === 0
      ) {
        setError('There must not be empty fields');

        return;
      }

      const formData = createFormData(values, newImages);

      let response;

      if (pathname.includes('/add')) {
        response = await sendUniqueRequest(() => (
          addSuperhero(formData)));
      }

      if (pathname.includes('/edit')) {
        response = await sendUniqueRequest(() => (
          updateSuperhero(hero.id, formData)));
      }

      if (response) {
        setIsSuccess(true);
        window.scrollTo({ top: document.body.scrollHeight });
      }
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      const uploadedImages = Array.from(files)
        .map((file) => URL.createObjectURL(file));

      formik.setFieldValue(
        'images',
        [...formik.values.images, ...uploadedImages],
      );

      setNewImages(prev => [...Array.from(files), ...prev]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...formik.values.images];

    updatedImages.splice(index, 1);

    formik.setFieldValue('images', updatedImages);

    const updatedNewImages = [...newImages];

    updatedNewImages.splice(index, 1);
    setNewImages(updatedNewImages);
  };

  useEffect(() => {
    setError('');
  }, [formik.values]);

  return {
    error,
    formik,
    isError,
    isSuccess,
    isLoading,
    currImages,
    handleDeleteImage,
    handleImageUpload,
  };
};
