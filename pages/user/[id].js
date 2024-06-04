import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>User {id}</h1>
      <p>This is the user page for user {id}.</p>
    </div>
  );
}
