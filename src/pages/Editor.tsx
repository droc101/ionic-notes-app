import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonTextarea,
    IonButtons,
    IonBackButton
} from '@ionic/react';
import {RouteComponentProps} from "react-router-dom";
import React from "react";

type EditorProps = RouteComponentProps<{ name: string; }>;

const Editor: React.FC<EditorProps> = ({match}) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonBackButton defaultHref="#"></IonBackButton>
                            </IonButtons>
                            <IonTitle size="large">{match.params.name}</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {/* TODO: full height textarea */}
                <IonTextarea placeholder="Type Here"></IonTextarea>
            </IonContent>
        </IonPage>
    );
};

export default Editor;
