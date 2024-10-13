"use client";

import Loading from "@/app/components/Loading";
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
import { useZkLoginSession } from "@shinami/nextjs-zklogin/client";
import { Check, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

type DoctorRequest = {
  title: string;
  name: string;
  date: Date;
  data: string;
  id: string;
};

export default function PatientPage() {
  const [requests, setRequests] = useState<DoctorRequest[]>([
  ]);

  const [updater, setUpdater] = useState(0);

  const update = () => setUpdater(updater => updater + 1);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/pat_get");
      const data = await res.json();
      setRequests(data);
    })();
  }, [updater]);

  useEffect(() => {
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const { isLoading } = useZkLoginSession();
  if (isLoading) return <Loading />; 

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
                    {request.title} ({new Date(request.date).toLocaleString()})
                  </Typography>
                </ListItemContent>
                <ListItemDecorator>
                  <ButtonGroup variant="soft" size="lg">
                    <IconButton onClick={async () => {
                      await fetch("/api/req_reply", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: request.id, reply: true }),
                      });
                      update();
                    }}>
                      <Check />
                    </IconButton>
                    <IconButton onClick={async () => {
                      await fetch("/api/req_reply", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: request.id, reply: false }),
                      });
                      update();
                    }}>
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
