import { Container } from "@mui/material";

interface Props {
  children: React.ReactNode;
  fullWide?: boolean;
  py?: number | { xs?: number; sm?: number; lg?: number; xl?: number };
}

export default function SectionContainer({ children, fullWide, py }: Props) {
  const maxWidth = fullWide ? 1920 : { xs: 358, sm: 756, lg: 1300, xl: 1520 };
  const px = fullWide ? 0 : { xs: 2, sm: 3 };
  const pySection = fullWide ? 0 : py || 7;

  return (
    <Container
      disableGutters={true}
      sx={{
        maxWidth: maxWidth,
        width: "100%",
        px: px,
        py: pySection,
      }}
    >
      {children}
    </Container>
  );
}
