import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    let initialNotes = [
        {
            "_id": "645dd817641684252f5ea13c",
            "user": "645db75ea517215cf132c800",
            "title": "Doctor Visit",
            "description": "Appointment at 5 PM today",
            "tag": "important",
            "date": "2023-05-12T06:09:27.190Z",
            "__v": 0
        },
        {
            "_id": "645dd817641684252f5ea13c",
            "user": "645db75ea517215cf132c800",
            "title": "Doctor Visit",
            "description": "Appointment at 5 PM today",
            "tag": "important",
            "date": "2023-05-12T06:09:27.190Z",
            "__v": 0
        },
        {
            "_id": "645dd817641684252f5ea13c",
            "user": "645db75ea517215cf132c800",
            "title": "Doctor Visit",
            "description": "Appointment at 5 PM today",
            "tag": "important",
            "date": "2023-05-12T06:09:27.190Z",
            "__v": 0
        },
        {
            "_id": "645dd817641684252f5ea13c",
            "user": "645db75ea517215cf132c800",
            "title": "Doctor Visit",
            "description": "Appointment at 5 PM today",
            "tag": "important",
            "date": "2023-05-12T06:09:27.190Z",
            "__v": 0
        },
        {
            "_id": "645dd817641684252f5ea13c",
            "user": "645db75ea517215cf132c800",
            "title": "Doctor Visit",
            "description": "Appointment at 5 PM today",
            "tag": "important",
            "date": "2023-05-12T06:09:27.190Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(initialNotes)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}


export default NoteState;