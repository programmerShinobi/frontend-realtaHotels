import { GetServerSideProps, NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { doUpdatePhotoUsers, doUserRequest } from "@/redux/Actions/Users/reduceActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import { Box } from "@mui/material";

interface Props {
  dirs: string[];
}

const EditProfile: NextPage<Props> = ({ dirs }) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const dispatchEditPhoto = useDispatch();


  const handleUpload = async () => {
    const userId: any = localStorage.getItem("userId");
    setUploading(true);
    try {

      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);

      const isDataUpload = {
        usproId:userId,
        usproPhoto: "Admin_" + selectedFile.name
      }
      
      dispatchEditPhoto(doUpdatePhotoUsers(userId, isDataUpload));
      localStorage.setItem('profilePhotoMe', isDataUpload.usproPhoto);
      router.reload()      
    } catch (error: any) {
      console.log(error.message);
    }
    setUploading(false);
  };

    return (
      <>
        <LayoutAdmin>
          <p className="text-gray-700 text-3xl mb-16 font-bold">Profile</p>
          <Box className="grid col-1 bg-white h-50 shadow-xl rounded-md">
            <label className="pt-3 text-center font-bold">Profile Photo</label>  
            <hr className="mt-3"/>
            <Box className="max-w-4xl mx-auto pt-3 space-y-3 pb-3">
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
                <Box className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                  {selectedImage ? (
                    <img src={selectedImage} alt="" />
                  ) : (
                    <span>Select Photo</span>
                  )}
                </Box>
              </label>
              <button
                className="shadow-lg w-40 px-4 py-2 mx-auto rounded-md items-center bg-orange-100 text-center text-sm font-medium normal-case text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                onClick={handleUpload}
                disabled={uploading}
                style={{ opacity: uploading ? ".5" : "1" }}>
                  <p>{uploading ? "Uploading.." : "Upload"}</p>
              </button>
            </Box>
          </Box>
          <Box className="grid mt-3 col-1 bg-white h-50 shadow-xl rounded-md">
            <label className="pt-3 text-center font-bold">Profile Me</label>
            <hr className="mt-3" />
            <label className="text-center mt-3 mb-3 text-gray-400">On progress...</label>
          </Box>
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

export default EditProfile;