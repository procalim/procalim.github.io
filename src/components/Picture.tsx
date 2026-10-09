import { forwardRef, type ImgHTMLAttributes } from "react";

/**
 * An <img> that offers the browser a WebP copy first. The .webp sits next to
 * the .jpg under public/brand/ (same name), and is about 40% lighter; the JPEG
 * stays as the fallback and for anything that reads `src` directly. The
 * <picture> takes no box of its own, so the image lays out as before.
 *
 * صورة بنسخة WebP أخفّ بنحو ٤٠٪، والـ JPG احتياطي.
 */
const Picture = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement> & { src: string }>(
  ({ src, ...props }, ref) => (
    <picture className="contents">
      {/\.jpe?g$/i.test(src) && <source type="image/webp" srcSet={src.replace(/\.jpe?g$/i, ".webp")} />}
      <img ref={ref} src={src} {...props} />
    </picture>
  ),
);

Picture.displayName = "Picture";

export default Picture;
