import { useState, useEffect } from "react";

interface MicSelectorProps {
  value?: string;
  onSelect: (device: MediaDeviceInfo) => void;
}

function MicSelector({ value, onSelect }: MicSelectorProps) {
  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    async function getMicrophones() {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const micDevices = devices.filter(
          (device) => device.kind === "audioinput"
        );
        setMics(micDevices);
      } catch (error) {
        console.error("Failed to retrieve microphones", error);
      }
    }

    getMicrophones();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = mics.find(
      (mic) => mic.deviceId === event.target.value
    );
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div>
      <label htmlFor="mic-select"></label>
      <select
        id="mic-select"
        value={value ?? ""}
        onChange={handleChange}
      >
        {mics.map((mic, index) => (
          <option key={mic.deviceId} value={mic.deviceId}>
            {mic.label || `Microphone ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MicSelector;