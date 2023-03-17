import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Staff() {
  const router = useRouter();
  useEffect(() => {
    router.push('/staff/profile');
  },[]);
}
