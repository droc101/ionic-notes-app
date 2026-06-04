import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTextarea,
    IonTitle,
    IonToast,
    IonToolbar
} from '@ionic/react';
import {RouteComponentProps, useHistory} from "react-router-dom";
import React, {useEffect, useRef} from "react";
import {saveOutline, trashBinOutline} from "ionicons/icons";
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";

import "./Editor.css";

type EditorProps = RouteComponentProps<{ name: string; }>;

const Editor: React.FC<EditorProps> = ({match}) => {

    const toast = useRef<HTMLIonToastElement>(null);
    const textarea = useRef<HTMLIonTextareaElement>(null);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                if (!textarea.current) return;
                const contents = await Filesystem.readFile({
                    path: match.params.name,
                    directory: Directory.Data,
                    encoding: Encoding.UTF8,
                });
                textarea.current.value = contents.data.toString();
            } catch (statException) {
                console.error(statException);
            }
        })();
    }, [textarea]);

    const save = async () => {
        if (!toast.current || !textarea.current || !textarea.current.value) {
            return;
        }
        await Filesystem.writeFile({
            path: match.params.name,
            data: textarea.current.value,
            directory: Directory.Data,
            encoding: Encoding.UTF8
        });
        toast.current.isOpen = true;
    };

    const deleteNote = async () => {
        await Filesystem.deleteFile({
            path: match.params.name,
            directory: Directory.Data
        });
        history.push("/");
    };

    function onWillDismiss() {
        if (!toast.current) return;
        toast.current.isOpen = false;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"></IonBackButton>
                    </IonButtons>
                    <IonButtons slot="secondary">
                        <IonButton onClick={save}>
                            <IonIcon slot="icon-only" icon={saveOutline}></IonIcon>
                        </IonButton>
                        <IonButton onClick={deleteNote}>
                            <IonIcon slot="icon-only" icon={trashBinOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle size="large">{match.params.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonTextarea placeholder="Type Here" ref={textarea} class="editor"></IonTextarea>
            </IonContent>
            <IonToast message="Save Complete" duration={5000} ref={toast} onWillDismiss={onWillDismiss}/>
        </IonPage>
    );
};

export default Editor;
