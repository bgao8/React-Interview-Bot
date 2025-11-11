import { useState, useEffect } from 'react';

function MicSelector({ onSelect }) {
    const [mics, setMics] = useState([]);
    const [selectedMic, setSelectedMic] = useState('');

    useEffect(() => {
        async function getMicrophones() {
            try {
                // gives browser access to audio devices, effectively "starts" mic
                await navigator.mediaDevices.getUserMedia({ audio: true });
                // lists all devices
                const devices = await navigator.mediaDevices.enumerateDevices();
                // filters through all 'audioinput' devices
                const micDevices = devices.filter((device) => device.kind === 'audioinput');

                setMics(micDevices);
                if (micDevices.length > 0) {
                    setSelectedMic(micDevices[0].deviceId);
                }
            }
            catch {
                console.error("Failed to retrieve microphones")
            }
        }
        getMicrophones();
    }, [])

    const handleChange = (event) => {
        const selected = mics.find(mic => mic.deviceId === event.target.value);
        setSelectedMic(event.target.value);
        if (onSelect) {
            onSelect(selected);
        }
    }

    return (
        <div>
            <label htmlFor="mic-select">Choose mic: </label>
            {/* dropdown menu */}
            <select id="mic-select" value={selectedMic} onChange={handleChange}>
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