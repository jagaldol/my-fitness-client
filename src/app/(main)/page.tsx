import LogoutButton from "@/components/logout"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      매인페이지
      <div>내용</div>
      <LogoutButton />
    </main>
  )
}
