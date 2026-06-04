import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from "@ionic/react";
import React from "react";
import {trash} from "ionicons/icons";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {useHistory} from "react-router-dom";

type Note = {
    // The filename of this note
    filename: string,
    // The last modified time of this note
    modified: Date
}

type NoteListItemProps = {
    note: Note
}

const NoteListItem: React.FC<NoteListItemProps> = ({note}) => {

    const history = useHistory();

    const deleteNote = async () => {
        await Filesystem.deleteFile({
            path: note.filename,
            directory: Directory.Data
        });
        history.push("/");
    };

    return (
        <IonItemSliding key={note.filename}>
            <IonItem detail={true} routerLink={"/editor/" + note.filename} >
                <IonLabel>
                    <h3>{note.filename}</h3>
                    <p>{note.modified.toLocaleString()}</p>
                </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
                <IonItemOption color="danger" expandable onClick={deleteNote}>
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
}

export default NoteListItem;
export type {Note};