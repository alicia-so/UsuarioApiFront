import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MedicalRecord } from "~/pages/medic";
import { useSession } from "next-auth/react";

export default function MedicalRecordCard({
  medicalRecord,
}: {
  medicalRecord: MedicalRecord;
}) {
  const { data: session } = useSession();
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
        </CardActions>
      )}
    </Card>
  );
}
