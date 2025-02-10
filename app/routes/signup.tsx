import { Form } from "@remix-run/react"
import { useState } from "react"
import { authClient } from "~/utils/auth.client"
 
export default function SignUp() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
 
  const signUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    })
  }
 
  return (
    <div>
      <h2>
        Sign Up
      </h2>
      <Form
        onSubmit={signUp}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
        >
          Sign Up
        </button>
      </Form>
    </div>
  )
}