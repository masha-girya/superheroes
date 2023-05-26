export function imagesToString(
  images: Express.Multer.File[] | Express.Multer.File,
) {
  const base64Images = Array.isArray(images)
    ? images.map((image) => Buffer.from(image.buffer).toString('base64'))
    : [Buffer.from(images.buffer).toString('base64')];

  return base64Images;
}

export function cutDescription(text: string) {
  const slicedText = text.split(' ').slice(0, 15);

  if(slicedText.length === 0) {
    return text;
  }

  return slicedText.join(' ') + '...';
}
