import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Manager() {
  const router = useRouter();
  useEffect(() => {
    router.push('/manager/profile');
  }, []);    
}
