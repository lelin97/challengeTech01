import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  DefaultPasswordInput,
  DefaultPasswordOutput,
  validationPassword,
} from "./validation";
import validatePassword from "../../utils/validatePassword";
import { api } from "../../services/mockApi";

const defaultValues: DefaultPasswordInput = {
  name: "",
  email: "",
  password: "",
};

export default function FormPassword() {
  const { control, formState } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    criteriaMode: "all",
    resolver: zodResolver(validationPassword),
  });
  const isMobile = useMediaQuery("(max-width: 600px)");

  //Foi necessário colocar o erro dessa forma, para pegar múltimos erros, já que com o useForm não é possível
  const [passwordErrors, setPasswordErrors] = useState<any>([]);
  const [message, setMessage] = useState<boolean>(false);
  const [messagePost, setMessagePost] = useState<string>("");
  const [showPasswordValue, setShowPasswordValue] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPasswordValue(!showPasswordValue);
  };

  async function handleSubmit(data: any) {
    const validateSucess = validatePassword(data.password);

    if (validateSucess !== true) {
      setPasswordErrors(validateSucess);
      setMessage(false);
      setMessagePost("");
      return;
    }

    setPasswordErrors([]);
    setMessage(validateSucess);

    try {
      await api.post(
        "https://zbra-frontend-challenge.azurewebsites.net/api/PasswordValidation",
        { body: data }
      );
      setMessagePost("Resultado enviado com sucesso.");
    } catch (error) {
      setMessagePost("Falha ao enviar resultado. Tente novamente.");
    }
  }

  return (
    <>
      <Form<DefaultPasswordInput, DefaultPasswordOutput>
        control={control as any}
        onSubmit={({ data }) => {
          handleSubmit(data);
        }}
      >
        <Grid
          container
          p={1}
          spacing={1}
          sx={{
            border: 3,
            borderRadius: 2,
          }}
        >
          <Grid item xs={12} display={"flex"} justifyContent={"flex-start"}>
            <Typography
              variant="h6"
              fontWeight="bold"
              style={{ textAlign: "center" }}
            >
              Valide sua senha
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <TextField
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    placeholder="Nome"
                    fullWidth
                    type="text"
                  />

                  <Typography color="red">{error?.message}</Typography>
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <TextField
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    placeholder="E-mail"
                    fullWidth
                    type="text"
                  />
                  <Typography color="red">{error?.message}</Typography>
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextField
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    placeholder="Senha"
                    fullWidth
                    type={showPasswordValue ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowPassword}
                          >
                            {showPasswordValue ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Grid item xs={12} mt={1}>
                    {passwordErrors.map((v: string, i: number) => {
                      return (
                        <Typography key={i} color={"red"}>
                          <span style={{ marginRight: 5 }}>•</span>
                          {v}
                        </Typography>
                      );
                    })}
                  </Grid>

                  {!message ? null : (
                    <Typography color={"green"}>Senha válida!</Typography>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid
            container
            item
            xs={12}
            display={"flex"}
            justifyContent={"flex-end"}
            mt={isMobile ? 20 : 4}
          >
            {messagePost && (
              <Grid item xs={isMobile ? 12 : 3}>
                <Typography color={"green"}>{messagePost}</Typography>
              </Grid>
            )}
            <Button
              variant={"contained"}
              type="submit"
              sx={{
                width: isMobile ? "100%" : "10%",
              }}
              disabled={!formState.isValid}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
