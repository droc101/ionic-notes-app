import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonFabButton,
    IonFab
} from '@ionic/react';
import {add} from "ionicons/icons";
import React, {useRef} from "react";
import NewNoteModal from "../components/NewNoteModal";

const Home: React.FC = () => {

    const ionModal = useRef<HTMLIonModalElement>(null);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle size="large">Notes</IonTitle>
                        </IonToolbar>
                        <IonToolbar>
                            <IonSearchbar placeholder={"Search Notes"} showCancelButton={"focus"}/>
                        </IonToolbar>
                    </IonHeader>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem detail={true} routerLink="/editor/abc">
                        <IonLabel>
                            <h3>Note 1</h3>
                            <p>Last modified sometime</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
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
            <NewNoteModal ionModal={ionModal}/>
        </IonPage>
    );
};

export default Home;
