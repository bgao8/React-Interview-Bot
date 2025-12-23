interface UserInfoProps {
    position: string;
    setPosition: (value: string) => void;
    level: string;
    setLevel: (value: string) => void;
    company: string;
    setCompany: (value: string) => void;
    type: string;
    setType: (value: string) => void;
    notes: string;
    setNotes: (value: string) => void;
}

export default function UserInfo({
    position, setPosition,
    level, setLevel,
    company, setCompany,
    type, setType,
    notes, setNotes
}: UserInfoProps) {
    return (
        <div>
            <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <input
                type="text"
                placeholder="Level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
            />
            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
        </div>
    );
}