import { LoaderCircle, RotateCw } from "lucide-react";

export default function Loading() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    }}>
      <LoaderCircle size={64} style={{
        animation: 'spin 1s linear infinite',
        display: 'block',
        margin: 'auto',
      }}/>
    </div>
  )
}