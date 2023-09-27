import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "~/components/Header";
import SectionContainer from "~/components/SectionContainer";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Index() {
  const [pacientes, setPacientes] = useState<
    | {
        id: string;
        fullName: string;
      }[]
    | null
  >(null);
  const { data: session } = useSession();

  const router = useRouter();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      pacienteId: { value: string };
      medicoId: { value: string };
      descricao: { value: string };
    };

    const pacienteId = target.pacienteId.value;
    const medicoId = target.medicoId.value;
    const descricao = target.descricao.value;

    const res = await fetch(`${baseUrl}/fichaMedica/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({
        pacienteId: pacienteId,
        medicoId: medicoId,
        descricao: descricao,
      }),
    });

    const json = await res.json();

    if (!res.ok) console.error(json.message);

    alert("Success!");
  }
  useEffect(() => {
    async function getPacientes() {
      const getPacientes = await fetch(`${baseUrl}/user/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
      const pacientes = await getPacientes.json();

      const filteredPacientes = pacientes.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (paciente: any) => paciente.perfis.descricao === "Paciente",
      ) as { id: string; fullName: string }[];
      return filteredPacientes;
    }
    if (!session) return;
    getPacientes().then((pacientes) => setPacientes(pacientes));
  }, [session, router]);

  return (
    <>
      <Header session={session}></Header>
      <SectionContainer>
        <form method="post" onSubmit={handleSubmit} noValidate>
          <Stack direction="column" spacing={1}>
            <input hidden value={session?.user.id} name="medicoId"></input>
            <TextField label="Descrição" name="descricao" required />

            <TextField label="Paciente" name="pacienteId" select required>
              <MenuItem value="">Selecione um paciente</MenuItem>
              {pacientes &&
                pacientes.map((paciente) => (
                  <MenuItem key={paciente.id} value={paciente.id}>
                    {paciente.fullName}
                  </MenuItem>
                ))}
            </TextField>

            <Button type="submit">Criar</Button>
          </Stack>
        </form>
      </SectionContainer>
    </>
  );
}
