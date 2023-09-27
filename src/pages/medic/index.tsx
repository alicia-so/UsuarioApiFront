// components
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Header from "~/components/Header";
import MainContent from "~/sections/MainContent";
import { useEffect, useState } from "react";

export type MedicalRecord = {
  id: number;
  fullName: string;
  phoneNumber: string;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Index() {
  const { data: session } = useSession();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[] | null>(null);

  useEffect(() => {
    const getAllMedicalRecords = async () => {
      const response = await fetch(`${baseUrl}/fichaMedica/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${session?.user.accessToken}`,
        },
      });

      const data = await response.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const medicalRecords = data.map((medicalRecord: any) => {
        return {
          id: medicalRecord.id,
          fullName: medicalRecord.fullName,
          phoneNumber: medicalRecord.phoneNumber,
        } as MedicalRecord;
      });
      return medicalRecords;
    };

    if (!session) return;
    getAllMedicalRecords().then((medicalRecords) => {
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

  if (session?.user.role === "Medico") {
    return (
      <>
        <Header session={session}></Header>

        <main>
          <MainContent medicalRecords={medicalRecords}></MainContent>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header session={session}></Header>

        <main>
          <Typography>Você não tem permissão para acessar essa página. </Typography>
        </main>
      </>
    );
  }
}
