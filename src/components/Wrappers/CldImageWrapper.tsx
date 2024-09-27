"use client";

// import { CldImage } from "next-cloudinary";

 
import { CldImage as CldImageDefault, CldImageProps }  from 'next-cloudinary';

import { sendGTMEvent } from '@next/third-parties/google'
 
const CldImage = (props: CldImageProps) => {
  return <><CldImageDefault onClick={() => sendGTMEvent({ event: 'buttonClicked', value: {...props} })} {...props} /></>
}
 
export default CldImage;

// export default function CldImageWrapped() {
//   return <CldImage {...props} />
// }