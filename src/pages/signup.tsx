import { Button, MenuItem, Stack, TextField } from "@mui/material";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import SectionContainer from "~/components/SectionContainer";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function SignUp({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      lastName: { value: string };
      email: { value: string };
      password: { value: string };
      rePassword: { value: string };
      phoneNumber: { value: string };
      role: { value: string };
    };
    const name = target.name.value;
    const lastName = target.lastName.value;
    const email = target.email.value;
    const password = target.password.value;
    const rePassword = target.rePassword.value;
    const phoneNumber = target.phoneNumber.value;
    const role = target.role.value;

    if (password !== rePassword) {
      alert("Passwords don't match!");
      return;
    }

    const resGetPerfilId = await fetch(`${baseUrl}/perfil/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descricao: role }),
    });
    const jsonGetPerfilId = await resGetPerfilId.json();

    const res = await fetch(`${baseUrl}/user/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        lastname: lastName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        perfilId: jsonGetPerfilId.id,
      }),
    });

    const json = await res.json();

    if (!res.ok) console.error(json.message);

    alert("Success!");

    signIn();
  }

  return (
    <>
      <Header session={session}></Header>
      <SectionContainer>
        <form method="post" onSubmit={handleSubmit} noValidate>
          <Stack direction="column" spacing={1}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <TextField label="First Name" name="name" required />

            <TextField label="Last Name" name="lastName" required />

            <TextField label="Email" name="email" required />

            <TextField
              label="Password"
              name="password"
              required
              type="password"
              autoComplete="current-password"
            />

            <TextField
              label="Re Password"
              name="rePassword"
              required
              type="password"
              autoComplete="current-password"
            />

            <TextField label="Phone Number" name="phoneNumber" required />

            <TextField label="Role" name="role" select required>
              <MenuItem key={1} value={"Medico"}>
                Médico
              </MenuItem>

              <MenuItem key={2} value={"Paciente"}>
                Paciente
              </MenuItem>
            </TextField>

            <Button type="submit">Sign Up</Button>
          </Stack>
        </form>
      </SectionContainer>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
