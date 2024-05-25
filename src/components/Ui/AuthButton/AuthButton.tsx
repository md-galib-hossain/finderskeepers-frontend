
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AuthButton = async () => {
  // const userInfo = getUserInfo();
  // console.log(userInfo);
  const router = useRouter();
  const handleLogout = () => {
    // logoutUser(router);
  };
  return (
    <>

        <Button onClick={handleLogout} color="error">
          Logout
        </Button>
    
        <Button component={Link} href="/login">
          Login
        </Button>

    </>
  );
};

export default AuthButton;
