export async function resize(file: File, size = 256) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = size;
  canvas.height = size;

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  const ratio = 1;

  const x = 0;
  const y = 0;

  ctx?.drawImage(bitmap, 0, 0, size, size);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      'image/webp',
      1
    );
  });
}
