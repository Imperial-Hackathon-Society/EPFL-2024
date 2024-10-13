"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Sheet,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import { useZkLoginSession } from "@shinami/nextjs-zklogin/client";
import { useState } from "react";

export default function DoctorPage() {
  const [name, setName] = useState("");

  const { user, isLoading } = useZkLoginSession();
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  function FormButton({ name, x }: { name: string; x: number }) {
    let formattedName = name.replace(/_/g, " ");
    formattedName = formattedName.replace(/\b\w/g, (c) => c.toUpperCase());

    return (
      <Grid xs={6}>
        <FormControl>
          <FormLabel>
            <Typography sx={{ fontSize: "1.3rem" }}>{formattedName}</Typography>
          </FormLabel>
          <Input
            type="number"
            sx={{ pointerEvents: "all" }}
            name={name}
            defaultValue={x}
            required
            slotProps={{
              input: {
                min: 0,
                max: 1,
                step: 0.01,
              },
            }}
          />
        </FormControl>
      </Grid>
    );
  }

  // const r = Array.from({ length: 20 }, () =>
  //   parseFloat(Math.random().toFixed(2))
  // );

  const r = [
    0.23, 0.46, 0.77, 0.43, 0.92, 0.1, 0.65, 0.11, 0.79, 0.82, 0.64, 0.24, 0.05,
    0.71, 0.77, 0.02, 0.93, 0.82, 0.44, 0.77,
  ];

  return (
    <div
      className="centered fadein"
      style={{
        width: "80%",
        height: "90%",
      }}
    >
      <Sheet
        sx={{
          padding: 1,
          borderRadius: 13,
          border: "3px solid #000",
        }}
      >
        <Tabs>
          <TabList>
            <Tab color="neutral">
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Patient Records
              </Typography>
            </Tab>
            <Tab color="neutral">
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                AI Inference
              </Typography>
            </Tab>
          </TabList>
          <TabPanel value={0} sx={{ maxHeight: "80vh", overflowY: "scroll" }}>
            <FormControl sx={{ mb: 4 }}>
              <FormLabel sx={{ fontSize: "1.3rem" }}>Request Name</FormLabel>
              <Input
                type="text"
                sx={{ pointerEvents: "all" }}
                id="name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(
                  (formData as any).entries()
                );
                const val = Object.values(formJson).map(parseFloat);

                await fetch("/api/doc_pat", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    data: val,
                    title: name,
                    name: user.wallet,
                    date: new Date(),
                    id: Math.random().toString(36).substring(7),
                  }),
                });
              }}
            >
              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <FormButton name="Age_normalized" x={r[0]} />
                <FormButton name="Blood_Pressure_normalized" x={r[1]} />
                <FormButton name="Weight_normalized" x={r[2]} />
                <FormButton name="Cholesterol_normalized" x={r[3]} />
                <FormButton name="Glucose_level_normalized" x={r[4]} />
                <FormButton name="Heart_rate_normalized" x={r[5]} />
                <FormButton name="Respiratory_rate_normalized" x={r[6]} />
                <FormButton name="Body_Temperature_normalized" x={r[7]} />
                <FormButton name="Oxygen_Saturation_normalized" x={r[8]} />
                <FormButton name="BMI_normalized" x={r[9]} />
                <FormButton name="Liver_Function_normalized" x={r[10]} />
                <FormButton name="Kidney_Function_normalized" x={r[11]} />
                <FormButton name="Hemoglobin_normalized" x={r[12]} />
                <FormButton name="Platelet_Count_normalized" x={r[13]} />
                <FormButton
                  name="White_Blood_Cell_Count_normalized"
                  x={r[14]}
                />
                <FormButton name="Red_Blood_Cell_Count_normalized" x={r[15]} />
                <FormButton name="Urea_Level_normalized" x={r[16]} />
                <FormButton name="Creatinine_Level_normalized" x={r[17]} />
                <FormButton name="Calcium_Level_normalized" x={r[18]} />
                <FormButton name="Sodium_Level_normalized" x={r[19]} />
              </Grid>
              <Button
                type="submit"
                size="lg"
                color="primary"
                variant="solid"
                sx={{
                  marginTop: 4,
                  width: "100%",
                  fontSize: "1.5rem",
                }}
              >
                Submit
              </Button>
            </form>
          </TabPanel>
          <TabPanel value={1}></TabPanel>
        </Tabs>
      </Sheet>
    </div>
  );
}
