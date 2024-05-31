import { FieldValues } from "react-hook-form";
import uploadToImgBB from "./uploadToImgBB";

const modifyUpdateFormData =async (values : FieldValues,compareObject : any)=>{
    console.log(values)
    if(values?.lostDate){
        values.lostDate = new Date(values.lostDate).toISOString();

    }
    if(values?.foundDate){
        values.foundDate = new Date(values.foundDate).toISOString();

    }
    const updatedValues = {} as any;
     for (const key in values) {
      if (values[key] !== "" && values[key] !== compareObject[key]) {
        (updatedValues as any)[key] = values[key];
      }
    }
    if (values.file) {
        const itemImg = await uploadToImgBB(values.file);
        updatedValues.itemImg = itemImg;
        delete updatedValues.file;
      }
      delete updatedValues.file;
      console.log(updatedValues)

return updatedValues

}

export default modifyUpdateFormData