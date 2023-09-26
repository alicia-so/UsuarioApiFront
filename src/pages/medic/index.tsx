// components
import { useSession } from "next-auth/react";
import Header from "~/components/Header";
import MainContent from "~/sections/MainContent";

export type MedicalRecord = {
  id: number;
  pacientName: string;
  phoneNumber: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const medicalRecords = [
  {
    id: 1,
    name: "Ficha 1",
    description: "Ficha 1",
    pacientName: "Paciente 1",
    phoneNumber: "123456789",
    createdAt: "2021-10-01T00:00:00.000Z",
    updatedAt: "2021-10-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Ficha 2",
    description: "Ficha 2",
    pacientName: "Paciente 1",
    phoneNumber: "123456789",
    createdAt: "2021-10-01T00:00:00.000Z",
    updatedAt: "2021-10-01T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Ficha 3",
    description: "Ficha 3",
    pacientName: "Paciente 1",
    phoneNumber: "123456789",
    createdAt: "2021-10-01T00:00:00.000Z",
    updatedAt: "2021-10-01T00:00:00.000Z",
  },
  {
    id: 4,
    name: "Ficha 13",
    description: "Ficha 13",
    pacientName: "Paciente 2",
    phoneNumber: "12345423",
    createdAt: "2021-10-01T00:00:00.000Z",
    updatedAt: "2021-10-01T00:00:00.000Z",
  },
  {
    id: 5,
    name: "Ficha 32",
    description: "Ficha 32",
    pacientName: "Paciente 34",
    phoneNumber: "3123",
    createdAt: "2021-10-01T00:00:00.000Z",
    updatedAt: "2021-10-01T00:00:00.000Z",
  },
];

export default function Index() {
  const { data: session } = useSession();
  return (
    <>
      <Header session={session}></Header>

      <main>
        <MainContent medicalRecords={medicalRecords}></MainContent>
      </main>
    </>
  );
}
