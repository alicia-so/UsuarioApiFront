// components
import Header from "@/components/Header";
import { Metadata } from "next";
// sections

// data

const title = "Fichas Médicas";
const description =
  "Aqui você pode cadastrar e consultar as fichas médicas dos seus pacientes.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function Index() {
  return (
    <>
      <Header />
    </>
  );
}
