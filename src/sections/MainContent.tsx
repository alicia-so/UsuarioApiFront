// components
import { Button, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import MedicalRecordCard from "~/components/MedicalRecordCard";
import SectionContainer from "~/components/SectionContainer";
import { MedicalRecord } from "~/pages/medic";
// sections

export default function MainContent({
  medicalRecords,
}: {
  medicalRecords: MedicalRecord[];
}) {
  const { data: session } = useSession();

  return (
    <>
      <SectionContainer>
        {session?.user.role === "Medico" && (
          <Stack>
            <Button href="/ficha/create">Criar Ficha</Button>
          </Stack>
        )}

        <Stack
          useFlexGap
          direction="row"
          columnGap={2}
          rowGap={2}
          flexWrap="wrap"
          justifyContent="center"
        >
          {medicalRecords.map((medicalRecord, index) => (
            <MedicalRecordCard
              key={index}
              medicalRecord={medicalRecord}
            ></MedicalRecordCard>
          ))}
        </Stack>
      </SectionContainer>
    </>
  );
}
