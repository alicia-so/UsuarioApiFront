import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MedicalRecord } from "~/pages/medic";
import { useSession } from "next-auth/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Session } from "next-auth";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function MedicalRecordCard({
  medicalRecord,
}: {
  medicalRecord: MedicalRecord;
}) {
  const { data: session } = useSession();

  const deleteMedicalRecord = async (
    medicalRecord: MedicalRecord,
    session: Session | null,
  ) => {
    if (!session) return;
    const response = await fetch(
      `${baseUrl}/fichaMedica/DeleteFicha?id=${medicalRecord.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${session?.user.accessToken}`,
        },
      },
    );

    const data = await response.json();

    return data;
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {medicalRecord.fullName}
        </Typography>

        <Typography variant="h5" component="div">
          {medicalRecord.id}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {medicalRecord.phoneNumber}
        </Typography>
      </CardContent>

      {session?.user.role === "Paciente" && (
        <CardActions>
          <Button
            size="small"
            href="https://www.linkedin.com/in/aliciasso/"
            target="_blank"
          >
            Leia Mais
          </Button>
        </CardActions>
      )}

      {session?.user.role === "Medico" && (
        <CardActions>
          <Button size="small" href="#" target="_blank">
            Editar
          </Button>

          <Button
            size="small"
            onClick={() => deleteMedicalRecord(medicalRecord, session)}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
