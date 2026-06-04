import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {add} from "ionicons/icons";
import React, {useEffect, useRef, useState} from "react";
import NewNoteModal from "../components/NewNoteModal";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {useLocation} from "react-router";
import NoteListItem, {Note} from "../components/NoteListItem";

import "./Home.css";

const Home: React.FC = () => {

    const ionModal = useRef<HTMLIonModalElement>(null);

    const [notes, setNotes] = useState<Note[]>([]);
    const location = useLocation();

    // Load list of notes from disk
    useEffect(() => {
        Filesystem.readdir({directory: Directory.Data, path: ""}).then(results => {
            const diskNotes: Note[] = [];
            results.files.forEach((file) => {
                if (file.type === "file") {
                    diskNotes.push({
                        filename: file.name,
                        modified: new Date(file.mtime)
                    });
                }
            });
            setNotes(diskNotes);
        });
    }, [location.pathname]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Notes</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <NewNoteModal ionModal={ionModal}/>
                {
                    notes.length === 0 ?
                        <div id="container"><strong>No Notes</strong></div> :
                        <IonList class="list">
                            {notes.map((note) => {
                                return (
                                    <NoteListItem note={note} />
                                );
                            })}
                        </IonList>
                }
            </IonContent>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton onClick={() => {
                    if (ionModal.current) {
                        ionModal.current.isOpen = true;
                    }
                }}>
                    <IonIcon icon={add}></IonIcon>
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default Home;
