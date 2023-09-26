import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MedicalRecord } from "~/pages";
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
          {medicalRecord.pacientName}
        </Typography>

        <Typography variant="h5" component="div">
          {medicalRecord.name}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {medicalRecord.phoneNumber}
        </Typography>

        <Typography variant="body2">{medicalRecord.description}</Typography>
      </CardContent>

      {session && (
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

      {!session && (
        <CardActions>
          <Button size="small" href="#" target="_blank">
            Editar
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
