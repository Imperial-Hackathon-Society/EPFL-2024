"use client";

import {
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

export default function DoctorPage() {
  function FormButton({ name, x }: { name: string; x: number }) {
    return (
      <FormControl>
        <FormLabel>
          <Typography sx={{ fontSize: "1.3rem" }}>{name}</Typography>
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
    );
  }

  const r = Array.from({ length: 20 }, () =>
    parseFloat(Math.random().toFixed(2))
  );

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
            <Tab color="neutral">
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Button 3
              </Typography>
            </Tab>
            <Tab color="neutral">
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Button 4
              </Typography>
            </Tab>
          </TabList>
          <TabPanel value={0} sx={{ maxHeight: "80vh", overflowY: "scroll" }}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(
                  (formData as any).entries()
                );
                const val = Object.values(formJson).map(parseFloat);

                fetch("http://localhost:5001", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ value: val }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Success:", data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
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
              <button type="submit">Submit</button>
            </form>
          </TabPanel>
        </Tabs>
      </Sheet>
    </div>
  );
}
