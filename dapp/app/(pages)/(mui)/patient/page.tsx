"use client";

import Loading from "@/app/components/Loading";
import useMultisigTransaction from "@/app/hooks/useMultisig";
import { send } from "@/lib/shared/transaction";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Modal,
  ModalClose,
  Sheet,
  Step,
  StepIndicator,
  Stepper,
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

function CStep({ step, x, t }: { step: number; x: number; t: string }) {
  const variant = x < step ? "solid" : x === step ? "outlined" : "soft";

  return (
    <Step
      orientation="vertical"
      indicator={
        <StepIndicator
          variant={variant}
          sx={{
            fontWeight: x === step ? "bold" : "normal",
          }}
        >
          {x + 1}
        </StepIndicator>
      }
      sx={{ fontWeight: x === step ? "bold" : "normal" }}
    >
      {t}
    </Step>
  );
}

export default function PatientPage() {
  const [requests, setRequests] = useState<DoctorRequest[]>([]);
  const [updater, setUpdater] = useState(0);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [res, setRes] = useState<any>(null);

  const [reqId, setReqId] = useState<string>("");

  const update = () => setUpdater((updater) => updater + 1);

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

  const signAndExecute = useMultisigTransaction();

  const { isLoading } = useZkLoginSession();
  if (isLoading) return <Loading />;

  return (
    <div className="centered fadein">
      <Modal
        aria-labelledby="close-modal-title"
        open={open}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>) => {
          setOpen(false);
        }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{ width: 600, borderRadius: "md", p: 3 }}
        >
          <Typography
            component="h2"
            id="close-modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: "lg", mb: 4 }}
          >
            Request Submitted
          </Typography>
          <Stepper sx={{ width: "100%" }}>
            <CStep step={step} x={0} t="Password" />
            <CStep step={step} x={1} t="Processing Data" />
            <CStep step={step} x={2} t="Signing Transaction" />
          </Stepper>

          {step === 0 && (
            <FormControl>
              <Input
                type="password"
                placeholder="Password"
                sx={{ width: "100%", mt: 4, pointerEvents: "all" }}
                required
              />
              <Button
                sx={{ mt: 2 }}
                onClick={async () => {
                  setStep(1);
                  const res1 = await fetch("/api/req_reply", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: reqId }),
                  });
                  update();

                  const theReq = await res1.json();
                  const res = await fetch("http://localhost:5001", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ value: theReq.data.data }),
                  });
                  const data = await res.json();
                  console.log(data);
                  setRes(data);
                  setStep(2);

                  // Wait for the data to be processed
                  setTimeout(() => {
                    setStep(3);
                  }, 1000);

                  return;

                  send(
                    signAndExecute,
                    (tx) => [
                      // tx.object(
                      //   "0xd057d067fde385314a63580becbbdd3da7a2bbc6d2d6e07d787ae2c6a04f0daf"
                      // ),
                      // tx.pure.address(theReq.name),
                      // tx.pure.vector("u8", new Uint8Array([1, 2, 3, 4])),
                    ],
                    "healthdata::add_illness_block",
                    10000000n,
                    (result) => {
                      console.log(result);
                    }
                  );
                }}
              >
                Next
              </Button>
            </FormControl>
          )}
          {(step === 1 || step === 2) && (
            <div
              style={{
                width: "100%",
                minHeight: "100px",
                position: "relative",
              }}
            >
              <Loading />
            </div>
          )}
          {step === 3 && (
            <Typography sx={{ mt: 4 }}>
              Transaction has been submitted to the blockchain. The <strong>AI model</strong> has
              predicted that you may be suffering from <strong>{res.decrypted_result}</strong>. Please
              consult a doctor for further diagnosis.
            </Typography>
          )}
        </Sheet>
      </Modal>
      <Sheet
        sx={{
          padding: 6,
          borderRadius: 13,
          border: "3px solid #000",
        }}
      >
        <Typography sx={{ fontSize: "3rem", fontWeight: "bold", mb: 2 }}>
          Patient: Approval Requests
        </Typography>
        <List component="nav" sx={{ minWidth: 500 }}>
          {requests.map((request, i) => (
            <Fragment key={i}>
              <ListItem>
                <ListItemContent>
                  <Typography sx={{ fontSize: "2rem" }}>
                    {request.title} ({new Date(request.date).toLocaleString()})
                  </Typography>
                </ListItemContent>
                <ListItemDecorator>
                  <ButtonGroup variant="soft" size="lg">
                    <IconButton
                      onClick={async () => {
                        setReqId(request.id);
                        setOpen(true);
                      }}
                    >
                      <Check />
                    </IconButton>
                    <IconButton
                      onClick={async () => {
                        await fetch("/api/req_reply", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            id: request.id,
                          }),
                        });
                        update();
                      }}
                    >
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
