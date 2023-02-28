import { useRouter } from "next/router";

export default function Users() {
    const router = useRouter();
    router.push('profile');
}
