import { useState } from 'react';

function MicSelector({ onSelect }) {
    const [mics, setMics] = useState([]);
    const [selectedMic, setSelectedMic] = useState('');

    useEffect(() => {
        async function getMicrophones() {
            try {
                // gives browser access to audio devices
                await navigator.mediaDevices.getUserMedia({ audio: true });
                const devices = await navigator.mediaDevices.enumerateDevices();
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

    return (
        <div>
            Recording with: {selectedMic}
        </div>
    )
}

export default MicSelector;