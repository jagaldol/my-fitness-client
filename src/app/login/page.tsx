import LoginForm from "@/containers/login/LoginForm"
import Image from "next/image"
import Logo from "@/static/logo.svg"

export default function Login() {
  return (
    <main className="flex min-h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Image src={Logo} alt="로고" priority className="select-none" />
        <div className="py-5">
          <h1 className="font-GmarketSansMedium font-bold text-6xl">Fitness</h1>
          <p className="pl-44 text-lg">Behind</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
