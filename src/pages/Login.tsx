import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/config/firebase";
import { log } from "console";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const hanldeLoginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <MaxWidthWrapper>
      <Link to={"/"}></Link>
      <Button onClick={hanldeLoginWithGoogle}>Login Google</Button>
    </MaxWidthWrapper>
  );
};

export default Login;
