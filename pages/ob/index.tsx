import { useRouter } from "next/router";
import { useEffect } from "react";

export default function OB() {
  const router = useRouter();
  useEffect(() => {
    router.push('/ob/profile');
  }, []);
}
