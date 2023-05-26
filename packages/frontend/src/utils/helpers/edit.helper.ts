import { ISuperhero } from '../../types';

export const createFormData = (
  values: Omit<ISuperhero, 'id'>,
  newImages: File[] | null,
) => {
  const {
    nickname,
    real_name: realName,
    origin_description: originDescription,
    catch_phrase: catchPhrase,
    superpowers,
  } = values;

  const formData = new FormData();

  if (newImages) {
    newImages.forEach(img => formData.append(
      'images',
      new Blob([img]),
      img.name,
    ));
  }

  formData.append('nickname', nickname.trim());
  formData.append('real_name', realName.trim());
  formData.append('origin_description', originDescription.trim());
  formData.append('catch_phrase', catchPhrase.trim());
  formData.append('superpowers', superpowers.trim());

  return formData;
};
