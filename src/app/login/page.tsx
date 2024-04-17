import LoginForm from "@/containers/login/LoginForm"

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>로그인페이지</h1>
      <LoginForm />
      <div>내용</div>
    </main>
  )
}
