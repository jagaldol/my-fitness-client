export default function SessionBox({ session }: { session: any }) {
  return (
    <div>
      <p>{session.toString()}</p>
    </div>
  )
}
