import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Session } from "next-auth/core/types";
import { signIn, signOut } from "next-auth/react";

export default function Header({ session }: { session: Session | null }) {
  return (
    <Box sx={{ flexGrow: 1 }} component="header">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {!session
              ? "App Fichas Médicas"
              : session?.user.role === "paciente"
              ? " Minhas Fichas Médicas"
              : "Gerenciar Fichas Médicas"}
          </Typography>

          {session && (
            <Button color="warning" onClick={() => signOut()}>
              Logout
            </Button>
          )}

          {!session && (
            <>
              <Button color="inherit" onClick={() => signIn()}>
                Login
              </Button>

              <Button color="inherit" href="/signup">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
