import { GetServerSideProps, NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { doUpdatePhotoUsers } from "@/redux/Actions/Users/reduceActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LayoutAdmin from "@/components/Layout/LayoutAdmin";

interface Props {
  dirs: string[];
}

const EditUserPhoto: NextPage<Props> = ({ dirs })=> {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  // // useDispatch API POST users
  const dispatchEditPhoto = useDispatch();

  const handleUpload = async () => {
    setUploading(true);
    try {
       
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);

      const isDataUpload = {
        usproId:24,
        usproPhoto: selectedFile.name
      }
      console.info(isDataUpload)
      dispatchEditPhoto(doUpdatePhotoUsers(24, isDataUpload));
      router.reload()      
    } catch (error: any) {
      console.log(error.message);
    }
    setUploading(false);
  };

    return (
      <>
        <LayoutAdmin>
          <p className="text-gray-700 text-3xl mb-16 font-bold">Edit Profile</p>
          <div className="grid col-1 bg-white shadow-sm">
            <div className="max-w-4xl mx-auto p-20 space-y-6">
              <label>
                <input
                  type="file"
                  hidden
                  onChange={({ target }) => {
                    if (target.files) {
                      const file = target.files[0];
                      setSelectedImage(URL.createObjectURL(file));
                      setSelectedFile(file);
                    }
                  }}
                />
                <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                  {selectedImage ? (
                    <img src={selectedImage} alt="" />
                  ) : (
                    <span>Select Photo</span>
                  )}
                </div>
              </label>
              <button
                onClick={handleUpload}
                disabled={uploading}
                style={{ opacity: uploading ? ".5" : "1" }}
                className="bg-red-600 p-3 w-32 text-center rounded text-white"
              >
                {uploading ? "Uploading.." : "Upload"}
              </button>
              {/* <div className="mt-20 flex flex-col space-y-3">
                {dirs.map((item) => (
                  <Link key={item} href={"/images/" + item}>
                    <label className="text-blue-500 hover:underline">{item}</label>
                  </Link>
                ))}
              </div> */}
            </div>
          </div>
        </LayoutAdmin>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"));
    props.dirs = dirs as any;
    return { props };
  } catch (error) {
    return { props };
  }


};

export default EditUserPhoto;