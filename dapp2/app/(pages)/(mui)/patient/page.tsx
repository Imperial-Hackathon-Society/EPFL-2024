"use client";

import {
  ButtonGroup,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Typography,
} from "@mui/joy";
import { Check, X } from "lucide-react";
import { Fragment, useState } from "react";

type DoctorRequest = {
  name: string;
  date: Date;
  data: string;
  type: "encrypt" | "decrypt";
};

export default function PatientPage() {
  const [requests, setRequests] = useState<DoctorRequest[]>([
    {
      name: "Doctor 179812",
      date: new Date(),
      data: "data",
      type: "encrypt",
    },
    {
      name: "Doctor 179812",
      date: new Date(),
      data: "data",
      type: "encrypt",
    },
    {
      name: "Doctor 179812",
      date: new Date(),
      data: "data",
      type: "encrypt",
    },
  ]);

  return (
    <div className="centered fadein">
      <Sheet
        sx={{
          padding: 6,
          borderRadius: 13,
          border: "3px solid #000",
        }}
      >
        <Typography sx={{ fontSize: "3rem", fontWeight: "bold", mb: 2 }}>
          Approval Requests
        </Typography>
        <List component="nav" sx={{ minWidth: 500 }}>
          {requests.map((request, i) => (
            <Fragment>
              <ListItem key={i}>
                <ListItemContent>
                  <Typography sx={{ fontSize: "2rem" }}>
                    Doctor 179812
                  </Typography>
                </ListItemContent>
                <ListItemDecorator>
                  <ButtonGroup variant="soft" size="lg">
                    <IconButton>
                      <Check />
                    </IconButton>
                    <IconButton>
                      <X />
                    </IconButton>
                  </ButtonGroup>
                </ListItemDecorator>
              </ListItem>
              {i < requests.length - 1 && <ListDivider />}
            </Fragment>
          ))}
          {requests.length === 0 && (
            <Typography sx={{ fontSize: "2rem" }}>
              You're all up to date!
            </Typography>
          )}
        </List>
      </Sheet>
    </div>
  );
}
