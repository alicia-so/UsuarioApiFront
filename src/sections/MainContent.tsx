// components
import { Stack } from "@mui/material";
import MedicalRecordCard from "~/components/MedicalRecordCard";
import SectionContainer from "~/components/SectionContainer";
import { MedicalRecord } from "~/pages";
// sections

export default function MainContent({
  medicalRecords,
}: {
  medicalRecords: MedicalRecord[];
}) {
  return (
    <>
      <SectionContainer>
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
