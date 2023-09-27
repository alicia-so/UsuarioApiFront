// components
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "~/components/Header";
import MainContent from "~/sections/MainContent";
import { MedicalRecord } from "../medic";
import { Typography } from "@mui/material";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Index() {
  const { data: session } = useSession();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[] | null>(null);

  useEffect(() => {
    const getMedicalRecordsFromUser = async () => {
      const response = await fetch(
        `${baseUrl}/fichaMedica/GetAllFromPaciente?id=${session?.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${session?.user.accessToken}`,
          },
        },
      );

      const data = await response.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const medicalRecords = data.map((medicalRecord: any) => {
        return {
          id: medicalRecord.id,
          descricao: medicalRecord.descricao,
          paciente: {
            fullName: medicalRecord.paciente.fullName,
            phoneNumber: medicalRecord.paciente.phoneNumber,
          },
          medico: {
            fullName: medicalRecord.medico.fullName,
            phoneNumber: medicalRecord.medico.phoneNumber,
          },
        } as MedicalRecord;
      });
      return medicalRecords;
    };

    if (!session) return;
    getMedicalRecordsFromUser().then((medicalRecords) => {
      setMedicalRecords(medicalRecords);
    });
  }, [setMedicalRecords, session]);

  if (!medicalRecords) {
    return (
      <>
        <Header session={session}></Header>

        <main>
          <Typography>Não há fichas médicas cadastradas. </Typography>
        </main>
      </>
    );
  }

  return (
    <>
      <Header session={session}></Header>
      <main>
        <MainContent medicalRecords={medicalRecords}></MainContent>
      </main>
    </>
  );
}
