import { AiOutlineLock, AiOutlineMail } from "react-icons/ai"
import { Input } from "../components/form/Input"
import { SignupGithub } from "../components/ui/SignupGithub"
import { SignupGoogle } from "../components/ui/SignupGoogle"
import { Button } from "../components/ui/Button"
import { Welcome } from "../components/ui/Welcome"
import { RememberSection } from "../components/form/RememberSection"
import { NotRegisteredYet } from "../components/form/NotRegisteredYet"



export const MentorSignIn = () => {
  return (
    <div>
      <Welcome type='Login'/>
      <SignupGoogle/>
      <SignupGithub/>
      <Input
        labelText="Email"
        placeholder="Email"
        Icon={<AiOutlineMail />}
        error=""
        type="email"
      />
      <Input
        labelText="Password"
        placeholder="Password"
        Icon={<AiOutlineLock />}
        error=""
        type="password"
      />
      <Button buttonText="Login" color="bg-orange-600 text-white"/>
      <RememberSection/>
      <NotRegisteredYet/>
    </div>
  )
}
