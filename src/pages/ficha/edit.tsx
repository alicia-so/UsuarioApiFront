import { Button, Stack, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "~/components/Header";
import SectionContainer from "~/components/SectionContainer";
import { MedicalRecord } from "..";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Index() {
  const [descricao, setDescricao] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const id = router.query.id as string;

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      fullName: { value: string };
      phoneNumber: { value: string };
      descricao: { value: string };
    };

    const fullName = target.fullName.value;
    const phoneNumber = target.phoneNumber.value;
    const descricao = target.descricao.value;

    const res = await fetch(`${baseUrl}/fichaMedica/EditFicha?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({
        fullName: fullName,
        phoneNumber: phoneNumber,
        descricao: descricao,
      }),
    });

    const json = await res.json();

    if (!res.ok) console.error(json.message);

    alert("Success!");

    router.push("/medic");
  }
  useEffect(() => {
    async function getFichaById() {
      const getFicha = await fetch(`${baseUrl}/fichaMedica/GetById?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
      const ficha = await getFicha.json();

      const fichaParsed = {
        id: ficha.id,
        name: ficha.paciente.fullName,
        phoneNumber: ficha.paciente.phoneNumber,
        description: ficha.descricao,
      } as MedicalRecord;

      return fichaParsed;
    }
    if (!session || !id) return;
    getFichaById().then((ficha) => {
      setDescricao(ficha.description);
      setFullName(ficha.name);
      setPhoneNumber(ficha.phoneNumber);
    });
  }, [id, session]);

  return (
    <>
      <Header session={session}></Header>
      <SectionContainer>
        <form method="post" onSubmit={handleSubmit} noValidate>
          <Stack direction="column" spacing={1}>
            <TextField
              variant="standard"
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <TextField
              variant="standard"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              variant="standard"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <Button type="submit">Salvar</Button>
          </Stack>
        </form>
      </SectionContainer>
    </>
  );
}
