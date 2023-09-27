// components
import { Button, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Header from "~/components/Header";
import SectionContainer from "~/components/SectionContainer";
import MainContent from "~/sections/MainContent";

export type MedicalRecord = {
  id: number;
  pacientName: string;
  name: string;
  phoneNumber: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export default function Index() {
  const { data: session } = useSession();
  console.log("🚀 ~ file: index.tsx:20 ~ Index ~ session:", session);

  return (
    <>
      <Header session={session}></Header>
      <main>
        <SectionContainer>
          <Stack direction="column" spacing={1}>
            <Typography variant="h1">Bem vindo!</Typography>

            {session?.user.role === "Paciente" && (
              <Button size="small" href="/pacient">
                Ver suas fichas médicas
              </Button>
            )}

            {session?.user.role === "Medico" && (
              <Button size="small" href="/medic">
                Lista de fichas médicas
              </Button>
            )}
          </Stack>
        </SectionContainer>
      </main>
    </>
  );
}
